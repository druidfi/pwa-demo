const body = url => ({
  method: 'post',
  body: JSON.stringify({ url }),
  headers: { 'Content-Type': 'application/json' },
});

export const fetchFeed = url => fetch(process.env.REACT_APP_PROXY_URL, body(url))
  .then(response => response.text())
  .then(text => new DOMParser().parseFromString(text, 'text/xml'))
  .then(xml => ({
    title: xml.querySelector('rss channel title').textContent,
    date: xml.querySelector('rss channel pubDate').textContent,
    items: Array.from(xml.getElementsByTagName('item'))
      .map(item => {
        const enclosure = item.querySelector('enclosure');

        return {
          id: item.querySelector('guid').textContent,
          link: item.querySelector('link').textContent,
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          date: item.querySelector('pubDate').textContent,
          image: enclosure ? enclosure.getAttribute('url') : undefined,
        };
      }),
  }));
