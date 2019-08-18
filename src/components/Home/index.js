import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const MOCKTEMPLATES = [
  { name: "$5 turbo"},
  { name: "$10 slow"},
  { name: "$100 main event"}
]

const Home = (props) => {
  const { user } = props;
  useEffect(() => {
    
  })

  const templates = MOCKTEMPLATES.map(template => { 
    return <li key={template.name}><Link to={"/home"}>{template.name}</Link></li>;
  });

  return (
    <AuthUserContext.Consumer>
      {user => user &&
        (<div>
          <h1>Home | {user && user.username}</h1>
          <h3>QuickStart Templates</h3>
          <ul>
            {templates}
          </ul>
          <button><Link to={"/home"}>Create New</Link></button>
        </div>)
      }
    </AuthUserContext.Consumer>
  );
}

export default Home;