import { observable, action } from 'mobx';

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
  }
}

export default Currency;
