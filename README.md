# REasSET
## About the project
Give the opportunity to rent an apartment and buy it at the same time!
## About the product
The REasSET is a platform for real estate acquisition through collective investment.
## Novelty
Renting-redeeming! With the help of the PET token, it becomes possible to divide the real estate object for a large number of investors. A smart contract guarantees the fulfillment of conditions, reducing transaction costs.
## Team
* Yuriy Zubov, Project Owner
* Albert Ibragimov, Blockchain Developer
* Mikhail Malyshev, Frontend Developer
* Dmitriy Kuchin, Blockchain Specialist
## The platform
Etherium, because currently available interface and a set of tools (waiting for the development of QTUM :))
## Difficulty
Fee for transactions (you can not use iteration through all the accounts)
### Plan (briefly).
Create an investor's dashboard (front-end)
- Conditions (5% per year)
- Make an amount (multiple of 10 000) - conditionally payment gateway
- Display the number of RET
- Display available revenue output (conditional payment gateway)

Create a tenant's dashboard (front end)
- Selection of the property
- Displaying the amount of rent payment taking into account the redemption
- Increase payment engine to reduce redemption time
- OK - call a smart contract
- Number of RETs accumulated for redemption
- The remaining amount of time before redemption

Create three smart contracts (Investor N, Renter N, Dividend)
* Investor N (address of the contract)
  - The amount of RET
  - The cost of the object in RET
* Tenant N (address of the contract)
  - Number of payments in RET
  - 5% we transfer to a smart contract Dividend
  - 4.26% (Or from the value of the slider) remains on the contract and accumulates with the following payments for redemption
* Dividend
  - Accumulated amount of% for the investor (part is displayed in the office available for withdrawal in accordance with the proportion of the total value of the object)

## How to build 
### TestRPC via Truffle
``` bash
cd ~/REasSET
cat truffle.js // project configuration file
rm -r build
truffle compile // compile contracts
truffle migrate // deploy contracts to the network
```

### Deploy to public test network (kovan)

``` bash
cd ~/REasSET
rm -r build
truffle migrate --network kovan
# check deployed contract at https://kovan.etherscan.io
```

### Front-end
Every real estate object related page has corresponding contract address hardcoded in the meta tag `<meta name="contractAddress" value="..." />`, so in order to make it work you need to put your contract address here by yourself. Also, MetaMask won't work if you open a page with `file://`, so you need to run a simple http server, e.g. 
``` bash
cd app
python3 -m http.server
# app will be accessible at http://localhost:8000
```

# На русском

## О проекте
Дать возможность снимать квартиру и выкупить ее одновременно!
## О продукте
Платформа REasSET для приобретения недвижимости с помощью коллективного инвестирования.
## Новизна
Арендуя-выкупаем! С помощью токена   RET появляется возможность делить объект недвижимости на большое количество инвесторов. Смарт-контракт гарантирует выполнение условий, сокращая операционные издержки.
## Платформа
Этнериум, т.к. в настоящее время доступнее интерфейс и набор инструментов (ждем развития QTUM:))
## Трудность
Плата за транзакции (нельзя классический перебор использовать)

### План (кратко).
Создать кабинет инвестора (фронтэнд) 
- Условия (5% в год)
- Внести сумму (кратно 10 000) - условно платежный шлюз
- Отобразить кол-во RET
- Отобразить доступный вывод дохода (условный платежный шлюз)

Создать кабинет арендатора (фронтэнд)
- Выбор объекта недвижимости
- Отображение суммы арендного платежа с учетом выкупа
- Движок увеличения платежа для сокращения времени выкупа
- ОК - вызов смарт-контракта
- Кол-во RET накопленного на выкуп
- Оставшееся кол-во времени до выкупа
               
Создать три смарт-контракта (Инвестор N, Арендатор N,  Дивиденд)
* Инвестор N (адрес контракта)
  - Сумма RET
  - Стоимость объекта в RET
* Арендатор N (адрес контракта)
  - Кол-во платежа в RET
  - 5% переводим на смартконтракт Дивиденд
  - 4.26%(или от значения бегунка) остается на контракте и накапливается со следующими платежами на выкуп
* Дивиденд
  - Накопленная сумма  % для инвестора (часть отображается в кабинете доступная для вывода в соответствии с долей от общей суммы стоимости объекта)

## Команда
* Юрий Зубов, Владелец проекта
* Альберт Ибрагимов, Blockchain разработчик
* Михаил Малышев, Frontend разработчик
* Дмитрий Кучин, Blockchain специалист
