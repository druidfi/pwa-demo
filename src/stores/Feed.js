import { types, flow } from 'mobx-state-tree';

export const Feed = types.model({
  // Status data
  url: types.string,
  open: types.optional(types.boolean, false),
  weight: types.optional(types.number, 0),
  loading: types.optional(types.boolean, false),
  connected: types.optional(types.boolean, false),
  // Fetched data
  title: types.maybe(types.string),
  image: types.maybe(types.string),
  link: types.maybe(types.string),
  description: types.maybe(types.string),
  date: types.maybe(types.string),
  items: types.optional(types.array(types.model({
    link: types.string,
    title: types.string,
    description: types.string,
    category: types.string,
    date: types.string,
  })), []),
}).actions(self => ({
  setOpen: open => self.open = open,
  increaseWeight: () => self.weight++,
  decreaseWeight: () => self.weight--,
  getFeedData: () => fetch(self.url).then(response => response.text())
    .then(text => new DOMParser().parseFromString(text, 'text/xml'))
    .then(xml => ({
      title: xml.querySelector('rss channel title').textContent,
      image: xml.querySelector('rss channel image url').textContent,
      link: xml.querySelector('rss channel link').textContent,
      description: xml.querySelector('rss channel description').textContent,
      date: xml.querySelector('rss channel pubDate').textContent,
      items: Array.from(xml.getElementsByTagName('item'))
        .map(item => ({
          link: item.querySelector('link').textContent,
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          category: item.querySelector('category').textContent,
          date: item.querySelector('pubDate').textContent,
        })),
    })),
  refresh: flow(function * () {
    self.loading = true;
    self.connected = true;

    try {
      const feedData = yield self.getFeedData();

      Object.keys(feedData).forEach(property => self[property] = feedData[property]);
    } catch (exception) {
      self.connected = false;
    }

    self.loading = false;

    return self.connected;
  }),
}));
