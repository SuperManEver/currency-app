import ExchangeRatesStore from 'stores/ExchangeRates';

const URL = 'https://api.exchangeratesapi.io/latest?base=USD';

class FetchExchangeRates {
  run() {
    console.log('fetch!');
  }
}

export default FetchExchangeRates;
