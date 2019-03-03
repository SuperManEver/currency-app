import { FAVORITES_LOCAL_STORAGE } from 'shared/constants';

class SaveFavorites {
  run(store) {
    console.log('save');

    localStorage.setItem(
      FAVORITES_LOCAL_STORAGE,
      JSON.stringify(store.favoritesCurrencies.slice()),
    );
  }
}

export default SaveFavorites;
