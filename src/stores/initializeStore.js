import { onSnapshot } from 'mobx-state-tree';
import { Store } from './Store';

const loadStoreFromLocalStorage = () => {
  const initialState = JSON.parse(localStorage.getItem('dev-news-store'));

  if (!initialState) {
    return Store.create();
  }

  return Store.create(initialState);
};

export const initializeStore = () => {
  const store = loadStoreFromLocalStorage();

  onSnapshot(store, (snapshot) => {
    localStorage.setItem('dev-news-store', JSON.stringify(snapshot));
  });

  return store;
};
