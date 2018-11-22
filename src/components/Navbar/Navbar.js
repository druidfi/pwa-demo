import React from 'react';
import logo from './logo.svg';

export function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="navbar-brand">
        <img src={logo} height="30" alt="" className="d-inline-block align-top" />
      </div>

      <ul className="nav nav-pills justify-content-end">
        <li className="nav-item">
          <a className="nav-link active" href="https://www.druid.fi/en/contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
}
