import React from 'react';
import { compose, lifecycle } from 'recompose';
import { FeedSummary } from '../FeedSummary/FeedSummary';
import { Alert } from '../Alert/Alert';
import { FeedItems } from '../FeedItems';
import { FeedManager } from '../FeedManager';
import { requestNotificationPermissions } from '../../functions/requestNotificationPermissions';
import { startUpdateCycle } from '../../functions/startUpdateCycle';

export function App({ store }) {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-4">
          <Alert store={store} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 col-12">
          <FeedManager store={store} />

          <FeedSummary store={store} />
        </div>

        <div className="col-md-9 col-12">
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

      requestNotificationPermissions().then(
        () => this.stopUpdateCycle = startUpdateCycle(600, () => {
          this.props.store.refreshFeeds();

          new Notification('Feeds updated!');
        }),
        () => this.stopUpdateCycle = startUpdateCycle(600, () => this.props.store.refreshFeeds())
      );
    },
    componentWillUnmount() {
      if (this.stopUpdateCycle) {
        this.stopUpdateCycle();
      }
    }
  }),
)(App);
