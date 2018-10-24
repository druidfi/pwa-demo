import React from 'react';
import classes from 'classnames';
import moment from 'moment';
import { Observer } from 'mobx-react';

export function FeedSummary({ store }) {
  const render = () => (
    <div className="list-group list-group-flush">
      {store.feeds.map((feed, index) => {
        const { title, open, date, connected } = feed;

        return (
          <a
            href="#root"
            key={title}
            onClick={() => {
              if (feed.open) {
                store.openFeed(null);

                return;
              }

              feed.refresh().then(success => {
                if (!success) {
                  store.showDangerAlert('Failed to refresh feed.');
                }

                store.openFeed(feed);
              });
            }}
            className={classes(
              'list-group-item list-group-item-action',
              { active: open, 'border-bottom-0': index === store.feeds.length - 1 },
            )}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-between">
                <div className="mr-2 align-self-center">
                  <button
                    onClick={event => {
                      event.stopPropagation();

                      store.removeFeed(feed);
                    }}
                    className={classes(
                      'btn btn-sm oi oi-x',
                      { 'btn-outline-light': open, 'btn-outline-dark': !open },
                    )}
                  />
                </div>

                <div>
                    {title}

                    <small className="d-block">{moment(date).fromNow()}</small>
                </div>
              </div>

              <span className={classes('oi', { 'oi-link-intact': connected, 'oi-link-broken': !connected })} />
            </div>
          </a>
        );
      })}
    </div>
  );

  return <Observer render={render} />;
}
