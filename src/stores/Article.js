import { types } from 'mobx-state-tree';

export const Article = types.model({
  id: types.identifier,
  link: types.string,
  title: types.string,
  description: types.string,
  date: types.string,
  image: types.maybe(types.string),
});
