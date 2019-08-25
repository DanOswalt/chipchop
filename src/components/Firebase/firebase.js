import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import NEWUSER from '../../constants/NewUser';

const config = {
  apiKey: "AIzaSyDLISkQELwK5qfQq8u-7ZlEE0OgZwgdNCk",
  authDomain: "chipchop-b74dd.firebaseapp.com",
  databaseURL: "https://chipchop-b74dd.firebaseio.com",
  projectId: "chipchop-b74dd",
  storageBucket: "",
  messagingSenderId: "338207394231",
  appId: "1:338207394231:web:9e8b9e3ead0cad37"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** firestore API ***
  doCreateNewUser = (authUser, username) => {
    const { uid, email } = authUser.user;
    const newUser = { uid, email, username, ...NEWUSER }
    return this.db.collection("users").doc(uid).set(newUser);
  }

  doFetchUser = uid => this.db.collection("users").doc(uid).get();

  doGetTemplateById = id => this.db.collection("templates").doc(id).get();

  doCreateNewTemplate = template => this.db.collection("templates").doc(template.id).set(template);

  doUserUpdate = user => this.db.collection("users").doc(user.uid).set(user)
}

export default Firebase;