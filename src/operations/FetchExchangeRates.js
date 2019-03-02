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

      const result = await axios.get(URL);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
}

export default FetchExchangeRates;
