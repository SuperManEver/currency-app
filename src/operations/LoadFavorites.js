import ExchangeRates from 'stores/ExchangeRates';

import { FAVORITES_LOCAL_STORAGE } from 'shared/constants';

class LoadFavorites {
  run() {
    const data = JSON.parse(localStorage.getItem(FAVORITES_LOCAL_STORAGE));

    ExchangeRates.initFavorites(data);
  }
}

export default LoadFavorites;
