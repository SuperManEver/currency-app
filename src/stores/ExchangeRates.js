import { observable, computed, action, reaction } from 'mobx';
import toPairs from 'lodash/toPairs';

import FetchRatesOperation from 'operations/FetchExchangeRates';

class ExchangeRates {
  @observable baseCurrency = 'USD';
  @observable inProgress = false;
  @observable exchangeRates = {};

  @action
  updateRates(rates) {
    this.exchangeRates = rates;
  }

  @action
  updateBaseCurrency(currency) {
    this.baseCurrency = currency;
  }

  @action
  enableInProgress() {
    this.inProgress = true;
  }

  @action
  disableInProgress() {
    this.inProgress = false;
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
  currency => {
    new FetchRatesOperation(store).run();
  },
);

export default store;
