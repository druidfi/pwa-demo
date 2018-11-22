import React from 'react';
import { compose, withState } from 'recompose';

export function FeedManager({ url, setUrl, store }) {
  const addHandler = event => {
    event.preventDefault();

    const feed = store.addFeed(url);

    feed.refresh().then(success => {
      if (!success) {
        store.setAlert('Failed to add feed.');
        store.removeOpenFeed();
      }
    });

    setUrl('');
  };

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
        onKeyDown={event => {
          if (event.keyCode === 13) {
            addHandler(event);
          }
        }}
      />

      <div className="input-group-append">
        <button
          className="btn btn-outline-primary rounded-0"
          onClick={addHandler}
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
