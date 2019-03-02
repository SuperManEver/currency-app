import { observable, computed, action, reaction } from 'mobx';
import toPairs from 'lodash/toPairs';

class ExchangeRates {
  @observable baseCurrency = 'USD';
  @observable exchangeRates = {};

  @action
  updateRates(rates) {
    this.exchangeRates = rates;
  }

  @action
  updateBaseCurrency(currency) {
    this.baseCurrency = currency;
  }

  @computed
  get toSelectFormat() {
    const currencies = Object.keys(this.exchangeRates).filter(
      currency => currency !== this.baseCurrency,
    );

    const allCurrencies = [this.baseCurrency, ...currencies];
    return allCurrencies.map(key => ({ value: key, label: key }));
  }

  @computed
  get toPairs() {
    return toPairs(this.exchangeRates).filter(
      ([name, _]) => name !== this.baseCurrency,
    );
  }
}

const store = new ExchangeRates();

export const onBaseCurrencyChange = reaction(
  () => store.baseCurrency,
  currency => console.log('currency exchane: ', currency),
);

export default store;
