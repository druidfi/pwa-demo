import { types } from 'mobx-state-tree';
import { tap } from 'ramda';
import uniqid from 'uniqid';
import { Feed } from './Feed';
import { Alert } from './Alert';
import { Article } from './Article';

export const Store = types.model({
  alert: types.maybe(Alert),
  feeds: types.array(Feed),
  openFeed: types.maybe(types.reference(Feed)),
  openArticle: types.maybe(types.reference(Article)),
  token: types.maybe(types.string),
}).actions(self => ({
  setAlert: (message, type = 'danger') => {
    self.alert = Alert.create({ message, type });
  },
  removeAlert: () => {
    self.alert = undefined;
  },
  addFeed: url => tap(feed => self.feeds.push(feed), Feed.create({ id: uniqid(), url })),
  removeFeed: feedToRemove => {
    self.feeds.splice(self.feeds.indexOf(feedToRemove), 1);
  },
  setOpenFeed: feedToOpen => {
    self.openFeed = feedToOpen;
  },
  removeOpenFeed: () => {
    self.openFeed = undefined;
  },
  refreshFeeds: () => {
    self.feeds.map(feed => feed.refresh());
  },
  setOpenArticle: articleToOpen => {
    self.openArticle = articleToOpen;
  },
  removeOpenArticle: () => {
    self.openArticle = undefined;
  },
  setToken: token => {
    self.token = token;
  },
}));
