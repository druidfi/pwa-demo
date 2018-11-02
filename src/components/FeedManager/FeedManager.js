import React from 'react';
import { compose, withState } from 'recompose';

export function FeedManager({ url, setUrl, store }) {
  return (
    <div className="input-group">
      <label htmlFor="url" className="sr-only">URL</label>
      <input
        type="text"
        name="url"
        id="url"
        className="form-control rounded-0"
        placeholder="URL"
        value={url}
        onChange={event => setUrl(event.target.value)}
      />

      <div className="input-group-append">
        <button
          className="btn btn-outline-primary rounded-0"
          onClick={event => {
            event.preventDefault();

            const feed = store.addFeed(url);

            feed.refresh().then(success => {
              if (!success) {
                store.showDangerAlert('Failed to add feed.');
                store.removeFeed(feed);
              }
            });

            setUrl('');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
export const StatefulFeedManager = compose(
  withState('url', 'setUrl', ''),
)(FeedManager);
