import { observable, computed, action, reaction } from 'mobx';

import FetchRatesOperation from 'operations/FetchExchangeRates';

class ExchangeRates {
  @observable baseCurrency = 'USD';
  @observable inProgress = false;
  @observable exchangeRates = [];
  favoritesCurrencies = observable(['AUD', 'CZK', 'RUB', 'HUF']);

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
  get rates() {
    return this.exchangeRates
      .filter(rate => rate.name !== this.baseCurrency)
      .sort((a, b) => {
        if (a.favorite && !b.favorite) {
          return -1;
        } else {
          return 1;
        }
      });
  }

  @computed
  get toSelectFormat() {
    const currencies = this.exchangeRates
      .filter(currency => currency.name !== this.baseCurrency)
      .map(currency => currency.name);

    const allCurrencies = [this.baseCurrency, ...currencies];
    return allCurrencies.map(key => ({ value: key, label: key }));
  }
}

const store = new ExchangeRates();

export const onBaseCurrencyChange = reaction(
  () => store.baseCurrency,
  () => {
    new FetchRatesOperation(store).run();
  },
);

export default store;
