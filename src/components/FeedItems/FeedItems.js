import React from 'react';
import moment from 'moment/moment';
import { Observer, observer } from 'mobx-react';
import { Loader } from '../Loader/Loader';
import { branch, compose, renderComponent } from 'recompose';

export function FeedItems({ store }) {
  const render = () => (
    <div className="list-group list-group-flush">
      {store.getOpenFeed() && store.getOpenFeed().items.map(({ title, open, date, link }) => (
        <a key={title} href={link} className="list-group-item list-group-item-action">
          <div className="d-flex justify-content-between">
            <div>
              <div>
                {title}
              </div>

              <div>
                <small>{moment(date).fromNow()}</small>
              </div>
            </div>
          </div>
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
