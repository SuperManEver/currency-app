class Currency {
  name = '';
  value = 0;
  favorite = false;

  constructor(name, value, favorite = false) {
    this.name = name;
    this.value = value;
    this.favorite = favorite;
  }
}

export default Currency;
