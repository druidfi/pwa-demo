import React from 'react';
import classnames from 'classnames';
import { compose, withState } from 'recompose';
import logo from './logo.svg';

export function Navbar({ open, setOpen }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="navbar-brand">
        <img src={logo} height="30" alt="" className="d-inline-block align-top" />
      </div>

      <button className="navbar-toggler" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className={classnames('collapse navbar-collapse justify-content-end', { show: open })}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="/">Reader</a>
          </li>

          <li className="nav-item">
            <a className="nav-link disabled" href="/profile">Profile & Settings</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="https://www.druid.fi/en/contact" target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export const StatefulNavbar = compose(
  withState('open', 'setOpen', false),
)(Navbar);
