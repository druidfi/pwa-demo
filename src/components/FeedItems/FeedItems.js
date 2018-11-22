import React from 'react';
import { observer } from 'mobx-react';
import { Loader } from '../Loader/Loader';
import { branch, compose, renderComponent } from 'recompose';
import { TimeAgo } from '../TimeAgo';

export function FeedItems({ store }) {
  return (
    <div className="list-group list-group-flush">
      {store.openFeed && store.openFeed.items.map(article => {
        const { id, title, date } = article;

        return (
          <a
            key={id}
            href="#root"
            className="list-group-item list-group-item-action"
            onClick={event => {
              event.preventDefault();

              store.setOpenArticle(article);
            }}
          >
            {title}

            <small className="d-block"><TimeAgo>{date}</TimeAgo></small>
          </a>
        );
      })}
    </div>
  );
}

export const FeedItemsWithLoader = compose(
  observer,
  branch(({ store }) => !!(store.openFeed && store.openFeed.loading), renderComponent(Loader)),
)(FeedItems);
