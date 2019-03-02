import { observable, computed, action } from 'mobx';

class ExchangeRates {
  @observable baseCurrency = 'USD';
  @observable exchangeRates = {};

  @action
  updateRates(rates) {
    this.exchangeRates = rates;
  }

  @computed
  get toSelectFormat() {
    const currencies = [this.baseCurrency, ...Object.keys(this.exchangeRates)];
    return currencies.map(key => ({ value: key, label: key }));
  }
}

const store = new ExchangeRates();

export default store;
