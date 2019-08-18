import React from 'react';

import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes'; 

const SignOutButton = ({ firebase, history }) => {
  const handleClick = () => {
    firebase
      .doSignOut()
      .then(() => {
        history.push(ROUTES.LANDING);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <button type="button" onClick={handleClick}>
      Sign Out
    </button>
  );
}

const SignOut = compose(
  withRouter,
  withFirebase,
)(SignOutButton);

export default withFirebase(SignOut);