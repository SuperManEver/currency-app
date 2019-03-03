import { observable, action } from 'mobx';

import ExchangeRates from 'stores/ExchangeRates';

class Currency {
  @observable name = '';
  @observable value = 0;
  @observable favorite = false;

  constructor(name, value, favorite = false) {
    this.name = name;
    this.value = value;
    this.favorite = favorite;
  }

  @action
  makeFavorite() {
    this.favorite = true;
  }

  @action
  toggleFavorite() {
    this.favorite = !this.favorite;
    ExchangeRates.updateFavoriteCurrencies(this.name);
  }
}

export default Currency;
