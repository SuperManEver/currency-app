import axios from 'axios';
import toPairs from 'lodash/toPairs';

import { Currency } from 'models';

class FetchExchangeRates {
  store;

  constructor(store) {
    this.store = store;
  }

  async run() {
    try {
      const URL = `https://api.exchangeratesapi.io/latest?base=${
        this.store.baseCurrency
      }`;

      this.store.enableInProgress();

      const {
        data: { rates },
      } = await axios.get(URL);

      const currencies = toPairs(rates).map(rate => new Currency(...rate));

      this.store.updateRates(currencies);
      this.store.disableInProgress();
    } catch (err) {
      console.error(err);
      this.store.disableInProgress();
    }
  }

  enableLoading() {}
}

export default FetchExchangeRates;
