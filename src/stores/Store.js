import { types } from 'mobx-state-tree';
import { tap } from 'ramda';
import { Feed } from './Feed';
import { Alert } from './Alert';

export const Store = types.model({
  feeds: types.array(Feed),
  alert: types.maybe(Alert),
}).actions(self => ({
  addFeed: url => tap(feed => self.feeds.push(feed), Feed.create({ url })),
  removeFeed: feedToRemove => self.feeds.splice(self.feeds.indexOf(feedToRemove), 1),
  openFeed: feedToOpen => self.feeds.forEach(feed => feed.setOpen(feed === feedToOpen)),
  refreshFeeds: () => self.feeds.map(feed => feed.refresh()),
  showDangerAlert: message => self.alert = Alert.create({ message, type: 'danger' }),
  clearAlert: () => self.alert = undefined,
})).views(self => ({
  getOpenFeed: () => self.feeds.find(feed => feed.open),
}));
