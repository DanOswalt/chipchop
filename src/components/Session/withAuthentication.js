import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        session: null
      };
    }

    updateCache(cache) {
      const { session } = this.state;
      session.cache = cache;
      this.setState(session);
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => { 
        if (authUser) {
          this.props.firebase.doFetchUser(authUser.uid).then(doc => {
            if (doc.exists) {
              const user = doc.data();
              this.setState({ authUser, session: { user, cache: null, updateCache: this.updateCache } });
            } else {
              console.log('authedUser, but not no account in app?');
            }
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.setState({ authUser: null, session: null });
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.session}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;