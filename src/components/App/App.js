import React from 'react';
import { compose, lifecycle } from 'recompose';
import { FeedSummary } from '../FeedSummary/FeedSummary';
import { Alert } from '../Alert/Alert';
import { FeedItems } from '../FeedItems';
import { FeedManager } from '../FeedManager';

export function App({ store }) {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4">
          <Alert store={store} />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <FeedSummary store={store} />

          <FeedManager store={store} />
        </div>

        <div className="col-9">
          <FeedItems store={store}/>
        </div>
      </div>
    </div>
  );
}

export const StatefulApp = compose(
  lifecycle({
    componentWillMount() {
      this.props.store.refreshFeeds();

      window.setTimeout(() => {
        this.props.store.refreshFeeds();

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .getRegistration()
            .then(registration => registration.showNotification('Feeds refreshed!'));
        }
      }, 1000 * 60 * 10);
    }
  }),
)(App);
