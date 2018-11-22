import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { observer } from 'mobx-react';
import { FeedList } from '../FeedList/FeedList';
import { Alert } from '../Alert/Alert';
import { Navbar } from '../Navbar/Navbar';
import { FeedItems } from '../FeedItems';
import { FeedManager } from '../FeedManager';
import { requestNotificationPermissions } from '../../functions/requestNotificationPermissions';
import { startUpdateCycle } from '../../functions/startUpdateCycle';
import { SplashScreen } from '../SplashScreen';
import { Article } from '../Article/Article';

export function App({ store, loading }) {
  return (
    <SplashScreen loading={loading}>
      <Navbar />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4">
            <Alert store={store} />
          </div>
        </div>

        {!store.openArticle && (
          <div className="row">
            <div className="col-md-3 col-12 mt-3">
              <FeedManager store={store} />

              <FeedList store={store} />
            </div>

            <div className="col-md-9 col-12">
              <FeedItems store={store}/>
            </div>
          </div>
        )}

        {store.openArticle && (
          <div className="row justify-content-center">
            <div className="col-md-4 col-12">
              <Article store={store} />
            </div>
          </div>
        )}
      </div>
    </SplashScreen>
  );
}

export const StatefulApp = compose(
  withState('loading', 'setLoading', true),
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
    componentDidMount() {
      setTimeout(() => this.props.setLoading(false), 1000);
    },
    componentWillUnmount() {
      if (this.stopUpdateCycle) {
        this.stopUpdateCycle();
      }
    }
  }),
  observer,
)(App);
