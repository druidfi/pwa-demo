import React, { Fragment } from 'react';
import moment from 'moment/moment';
import { compose, lifecycle } from 'recompose';
import { startUpdateCycle } from '../../functions/startUpdateCycle';

export function TimeAgo({ children }) {
  return <Fragment>{moment(children).fromNow()}</Fragment>;
}

export const StatefulTimeAgo = compose(
  lifecycle({
    componentWillMount() {
      this.stopUpdateCycle = startUpdateCycle(60, () => this.forceUpdate());
    },
    componentWillUnmount() {
      this.stopUpdateCycle();
    }
  }),
)(TimeAgo);
