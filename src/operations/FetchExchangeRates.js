import axios from 'axios';

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

      this.store.disableInProgress();

      this.store.updateRates(rates);
    } catch (err) {
      console.error(err);
      this.store.disableInProgress();
    }
  }

  enableLoading() {}
}

export default FetchExchangeRates;
