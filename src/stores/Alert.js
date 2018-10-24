import { types } from 'mobx-state-tree';

export const Alert = types.model({
  message: types.string,
  type: types.string,
});
