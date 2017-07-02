var price;

if ($("#buyoutPayment").length != 0) { // если в карточке объекта арендатора
	$("#buyoutPayment").html($("#buyoutSlider").val()); // начальное выкупное значение
	$("#total").html(parseInt($("#fixedPrice").html()) + parseInt($("#buyoutSlider").val()));

	$("#buyoutSlider").on('input', function() {
		$("#buyoutPayment").html(this.value);
		changeBuyoutTime(this.value);
		setTotalPayment(parseInt(this.value) + parseInt($("#fixedPrice").html()));
	});

	function changeBuyoutTime(buyoutPayment) {
		var yearly = buyoutPayment * 12;
		var yearsToBuyOut = Math.round(price / yearly);
		var lastDigit = yearsToBuyOut % 10;
		var declention;
		if (lastDigit == 1) declention = " год";
		else if (lastDigit == 2 || lastDigit == 3 || lastDigit == 4) declention = " года";
		else declention = " лет";
		$("#buyoutTime").html("~" + yearsToBuyOut + declention);
	}

	function setTotalPayment(total) {
		$("#total").html(total);
	}

} else if ($("#dividendValue").length != 0) { // если в карточке объекта инвестора
	$("#investmentValue").on('input', function() {
		setYearlyRevenue(this.value);
	});

	function setYearlyRevenue(investment) {
		var revenue = investment * 0.05;
		$("#dividendValue").html(revenue + " в год");
	}
}


window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        //alert("Для корректной работы подключитесь к Koven Testnet через MetaMask");
    }
    window.contract = web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"investingComplite","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isRent","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"investors","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"leasePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"undistributedIncome","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"investingTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"rent","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"investingSum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tenantDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tenant","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"investingStart","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdrawal","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"targetPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"invest","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"deposits","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_targetPrice","type":"uint256"},{"name":"_investingTime","type":"uint256"}],"payable":false,"type":"constructor"}]
	).at('0xec1fb01a6ae42e5c3b23c259b2bcf5a54f9a7db3');

	$("#objectPrice").html().replace(/ /g, "");

	// get prices from blockchain and then init
	getTargetPriceEth(function(priceEth) {
		$("#objectPrice").html(etherToRub(priceEth));
		price = parseInt($("#objectPrice").html());
		changeBuyoutTime(parseInt($("#buyoutSlider").val()));
	});
	
	getLeasePriceEth(function(priceEth) {
		$("#fixedPrice").html(etherToRub(priceEth));
		changeBuyoutTime(parseInt($("#buyoutSlider").val()));
	});
});

function rubToEther(rub) {
	return rub / 55 / 2500;
}

function etherToRub(eth) {
	return eth * 55 * 2500;
}

function getTargetPriceEth(callback) {
	contract.targetPrice(function(_, a) {
		callback(a.c[0]/10000);
	});
}

function getLeasePriceEth(callback) {
	contract.leasePrice(function(_, a) {
		callback(a.c[0]/10000);
	});
}

function invest() {
    var value = $("#investmentValue").val();
    contract.invest({ "value": value.toString() }, function(a) { console.log(a); });
}

function rent() {
    var value = web3.toWei(rubToEther(parseInt($("#total").html())), 'Ether');
    contract.rent.sendTransaction({ "value": value }, function(a) { console.log(a); });
}