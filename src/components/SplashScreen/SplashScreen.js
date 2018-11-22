import React, { Fragment } from 'react';
import classnames from 'classnames';
import { compose, withState, lifecycle } from 'recompose';
import logo from './logo.png';
import './SplashScreen.scss';

export function SplashScreen({ loading, showContent, children }) {
  return (
    <Fragment>
      {!showContent && (
        <div className={classnames('splash-screen d-flex justify-content-center align-items-center', { 'animated fadeOut delay-1s': !loading })}>
          <img src={logo} alt="" className={classnames({ 'animated rubberBand': !loading })} />
        </div>
      )}
      {!loading && children}
    </Fragment>
  );
}

export const StatefulSplashScreen = compose(
  withState('showContent', 'setShowContent', false),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (this.props.loading && !nextProps.loading) {
        setTimeout(() => nextProps.setShowContent(true), 2000);
      }
    },
  }),
)(SplashScreen);
