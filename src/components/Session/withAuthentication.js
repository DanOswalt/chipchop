import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        user: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => { 
        if (authUser) {
          this.props.firebase.doFetchUser(authUser.uid).then(doc => {
            if (doc.exists) {
              const user = doc.data();
              this.setState({ authUser, user });
            } else {
              console.log('authedUser, but not no account in app?')
            }
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.setState({ authUser: null, user: null });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.user}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;