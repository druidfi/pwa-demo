import React from 'react';
import classes from 'classnames';
import { Observer } from 'mobx-react';
import { TimeAgo } from '../TimeAgo';

export function FeedList({ store }) {
  const render = () => (
    <div className="list-group list-group-flush">
      {store.feeds.map((feed, index) => {
        const { id, title, date, connected } = feed;
        const open = feed === store.openFeed;

        return (
          <a
            href="#root"
            key={id}
            onClick={event => {
              event.preventDefault();

              if (open) {
                store.removeOpenFeed();

                return;
              }

              feed.refresh().then(success => {
                if (!success) {
                  store.showDangerAlert('Failed to refresh feed.');
                }

                store.setOpenFeed(feed);
              });
            }}
            className={classes('list-group-item list-group-item-action clickable', { active: open, 'border-top-0': index === 0 })}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-between">
                <div className="mr-2 align-self-center">
                  <button
                    onClick={event => {
                      event.stopPropagation();

                      store.removeFeed(feed);
                    }}
                    className={classes('btn btn-sm oi oi-x', { 'btn-outline-light': open, 'btn-outline-dark': !open })}
                  />
                </div>

                <div>
                    {title}

                  <small className="d-block"><TimeAgo>{date}</TimeAgo></small>
                </div>
              </div>

              <span className={classes('align-self-center oi', { 'oi-link-intact': connected, 'oi-link-broken': !connected })} />
            </div>
          </a>
        );
      })}
    </div>
  );

  return <Observer render={render} />;
}
