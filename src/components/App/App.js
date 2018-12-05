import React from 'react';
import firebase from 'firebase/app';
import { compose, lifecycle, withState } from 'recompose';
import { observer } from 'mobx-react';
import { FeedList } from '../FeedList/FeedList';
import { Alert } from '../Alert/Alert';
import { Navbar } from '../Navbar';
import { FeedItems } from '../FeedItems';
import { FeedManager } from '../FeedManager';
import { requestNotificationPermissions } from '../../functions/requestNotificationPermissions';
import { SplashScreen } from '../SplashScreen';
import { Article } from '../Article/Article';

export function App({ store, loading }) {
  return (
    <SplashScreen loading={loading}>
      <Navbar store={store} />

      <div className="container overflow-x-hide">
        <div className="row justify-content-center">
          <div className="col-md-6 col-12">
            <Alert store={store} />
          </div>
        </div>

        {!store.openArticle && (
          <div className="row animated animation-breakpoint-md faster slideInRight">
            <div className="col-md col-12 mt-3">
              <FeedManager store={store} />

              <FeedList store={store} />
            </div>

            <div className="col-md col-12">
              <FeedItems store={store}/>
            </div>
          </div>
        )}

        {store.openArticle && (
          <div className="row animated animation-breakpoint-md faster slideInLeft">
            <div className="col-12">
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
        () => firebase.messaging().onMessage(({ notification }) => {
          new Notification(notification.title);
        }),
        // This can update an open article out of the store, which breaks references, so it's commented for now.
        // () => this.stopUpdateCycle = startUpdateCycle(600, () => {
        //   this.props.store.refreshFeeds();
        //
        //   new Notification('Feeds updated!');
        // }),
        // () => this.stopUpdateCycle = startUpdateCycle(600, () => this.props.store.refreshFeeds())
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
