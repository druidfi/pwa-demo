import React from 'react';
import { Observer } from 'mobx-react';
import './Alert.scss';

export function Alert({ store }) {
  return (
    <Observer
      render={() => {
        if (!store.alert) {
          return null;
        }

        const className = `alert alert-${store.alert.type} top-alert clickable text-center shadow-lg w-100`;

        return (
          <button onClick={() => store.removeAlert()} className={className}>
            {store.alert.message}
          </button>
        );
      }}
    />
  );
}
