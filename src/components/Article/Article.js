import React from 'react';
import { Observer } from 'mobx-react';
import { TimeAgo } from '../TimeAgo/TimeAgo';

export function Article({ store }) {
  const article = store.openArticle;
  const render = () => (
    <div className="card rounded-0 mt-3">
      {article.image && <img className="card-img-top" src={article.image} alt="" />}

      <div className="card-body">
        <a href={article.link} target="_blank" rel="noreferrer noopener">
          <h5 className="card-title">{article.title}</h5>
        </a>

        <p className="card-text">{article.description}</p>

        <p className="card-text">
          <small className="text-muted">Last updated <TimeAgo>{article.date}</TimeAgo></small>
        </p>

        <div className="d-flex justify-content-between">
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-white">Read full article</a>

          <button onClick={() => store.removeOpenArticle()} className="btn btn-outline-primary">Close</button>
        </div>
      </div>
    </div>
  );

  return <Observer render={render} />;
}
