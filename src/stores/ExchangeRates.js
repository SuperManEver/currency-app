import { observable } from 'mobx';

class ExchangeRates {
  @observable baseCurrency = 'USD';
  @observable exchangeRates = {};
}

const store = new ExchangeRates();

export default store;
