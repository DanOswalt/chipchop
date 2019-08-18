import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withAuthentication } from '../Session';
import { withFirebase } from '../Session';

const MOCKTEMPLATES = [
  { name: "$5 turbo"},
  { name: "$10 slow"},
  { name: "$100 main event"}
]

const Home = (props) => {
  useEffect(() => {
    
  })

  const { user, firebase } = props;

  return (
    <div>
      <h1>Home | {user && user.username}</h1>
      <h3>QuickStart Templates</h3>
      <ul>
        {MOCKTEMPLATES.map(template => <li key={template.name}><Link to={"/home"}>{template.name}</Link></li>)}
      </ul>
      <button><Link to={"/home"}>Create New</Link></button>
    </div>
  );
}

export default withAuthentication(Home);