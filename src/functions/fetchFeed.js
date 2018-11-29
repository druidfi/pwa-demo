const proxyUrl = `${window.location.protocol}//${window.location.hostname}:3001/rss`;

export const fetchFeed = url => fetch(proxyUrl, { method: 'post', body: JSON.stringify({ url }), headers: { 'Content-Type': 'application/json' } })
  .then(response => response.text())
  .then(text => new DOMParser().parseFromString(text, 'text/xml'))
  .then(xml => ({
    title: xml.querySelector('rss channel title').textContent,
    image: xml.querySelector('rss channel image url').textContent,
    link: xml.querySelector('rss channel link').textContent,
    description: xml.querySelector('rss channel description').textContent,
    date: xml.querySelector('rss channel pubDate').textContent,
    items: Array.from(xml.getElementsByTagName('item'))
      .map(item => {
        const enclosure = item.querySelector('enclosure');

        return {
          id: item.querySelector('guid').textContent,
          link: item.querySelector('link').textContent,
          title: item.querySelector('title').textContent,
          description: item.querySelector('description').textContent,
          category: item.querySelector('category').textContent,
          date: item.querySelector('pubDate').textContent,
          image: enclosure ? enclosure.getAttribute('url') : undefined,
        };
      }),
  }));
