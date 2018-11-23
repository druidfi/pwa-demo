import { onSnapshot } from 'mobx-state-tree';
import { Store } from './Store';

const loadStoreFromLocalStorage = () => {
  const initialState = JSON.parse(localStorage.getItem('dev-news-store'));

  if (!initialState) {
    return Store.create();
  }

  try {
    return Store.create(initialState);
  } catch (exception) {
    return Store.create();
  }
};

export const initializeStore = () => {
  const store = loadStoreFromLocalStorage();

  onSnapshot(store, (snapshot) => {
    localStorage.setItem('dev-news-store', JSON.stringify(snapshot));
  });

  return store;
};
