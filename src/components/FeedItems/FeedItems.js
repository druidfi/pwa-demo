import React from 'react';
import { Observer, observer } from 'mobx-react';
import { Loader } from '../Loader/Loader';
import { branch, compose, renderComponent } from 'recompose';
import { TimeAgo } from '../TimeAgo';

export function FeedItems({ store }) {
  const render = () => (
    <div className="list-group list-group-flush">
      {store.getOpenFeed() && store.getOpenFeed().items.map(({ title, open, date, link }) => (
        <a key={title} href={link} className="list-group-item list-group-item-action" target="_blank" rel="noopener noreferrer">
          {title}

          <small className="d-block"><TimeAgo>{date}</TimeAgo></small>
        </a>
      ))}
    </div>
  );

  return <Observer render={render} />;
}

export const FeedItemsWithLoader = compose(
  observer,
  branch(({ store }) => !!(store.getOpenFeed() && store.getOpenFeed().loading), renderComponent(Loader)),
)(FeedItems);
