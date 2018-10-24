import React from 'react';
import './Loader.scss';

export function Loader() {
  return (
    <div className="sk-three-bounce">
      <div className="sk-child sk-bounce1" />
      <div className="sk-child sk-bounce2" />
      <div className="sk-child sk-bounce3" />
    </div>
  )
}
