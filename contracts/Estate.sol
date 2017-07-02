	pragma solidity ^0.4.6;
	/// Minimal version of solc compiler must be specified

	contract Estate {

		string public name;
		uint256 public targetPrice;
		uint256 public investingStart;
		uint256 public investingTime;

		address[] public investors;
		mapping(address=>uint256) public shares;
		uint256 public investingSum;
		bool public investingComplite;

		mapping(address=>uint256) public deposits;

		uint256 public leasePrice;
		uint256 public tenantDeposit;
		address public tenant;
		bool public isRent;

		uint256 public undistributedIncome;

		function Estate(string _name, uint256 _targetPrice, uint256 _investingTime, uint256 _leasePrice) {
			name = _name;
			targetPrice = _targetPrice;
			leasePrice = _leasePrice;
			investingStart = now;
			investingTime = _investingTime;
		}

		function invest() payable {
			require(now <= (investingStart + investingTime));
			require(!investingComplite);

			var investShares = shares[msg.sender];
			if (investShares == 0){
				investors.push(msg.sender);
			}

			var investingOverflow = msg.value + investingSum - targetPrice;
			if (investingOverflow < 0){
				shares[msg.sender] += msg.value;
				investingSum += msg.value;
			}
			else {
				var currentValue = targetPrice - investingSum;
				shares[msg.sender] += currentValue;
				investingSum += currentValue;
				investingComplite = true;

				deposits[msg.sender] += msg.value - currentValue;
			}
		}

		function withdrawal() returns (bool) {
			uint256 amount = 0;

			if (now >= (investingStart + investingTime) && !investingComplite){
				amount += shares[msg.sender];
				shares[msg.sender] = 0;
			}

			amount += deposits[msg.sender];
			deposits[msg.sender] = 0;

			// todo: distribution income

			if (!msg.sender.send(amount)) {
				deposits[msg.sender] = amount;
				return false;
			}

			return true;
		}

		function rent() payable {
			uint256 minAmount = 0;
			if (isRent) {
				require(msg.sender == tenant);
				minAmount = leasePrice;
			}
			else {
				isRent = true;
				minAmount = leasePrice + tenantDeposit;
			}

			require(msg.value >= minAmount);

			undistributedIncome += leasePrice;
			deposits[msg.sender] = msg.value - minAmount;
		}
	}