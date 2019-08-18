import React from 'react';
import { Link } from 'react-router-dom';

const MOCKTEMPLATES = [
  { name: "$5 turbo"},
  { name: "$10 slow"},
  { name: "$100 main event"}
]

const Home = () => (
  <div>
    <h1>Home</h1>
    <h3>QuickStart Templates</h3>
    <ul>
      {MOCKTEMPLATES.map(template => <li key={template.name}><Link to={"/home"}>{template.name}</Link></li>)}
    </ul>
    <button><Link to={"/home"}>Create New</Link></button>
  </div>
);

export default Home;