import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const Home = () => {
  const session = useContext(AuthUserContext);
  console.log(session)

  if (!session) {
    return <h3>Loading...</h3>
  }
  const populateTournamentSummaries = tournamentArray => tournamentArray.map(t => { 
    return <li key={t.name}><Link to={"/home"}>{t.name}</Link></li>;
  })

  const { user } = session;
  const open = populateTournamentSummaries(user.tournamentSummaries.filter(t => t.status === "open"));
  const inprogress = populateTournamentSummaries(user.tournamentSummaries.filter(t => t.status === "inprogress"));
  const completed = populateTournamentSummaries(user.tournamentSummaries.filter(t => t.status === "complete"));
  const closed = populateTournamentSummaries(user.tournamentSummaries.filter(t => t.status === "closed"));

  return ( user &&
    <div>
      <h1>Home | {user.username}</h1>
      <h3>Your Tournaments</h3>
      <button><Link to={"/templates"}>Create New</Link></button>
      { open.length > 0 && 
        <div>
          <h3>Open</h3>
          <ul>
            {open}
          </ul>
      </div> }
      { inprogress.length > 0 && 
        <div>
          <h3>InProgress</h3>
          <ul>
            {inprogress}
          </ul>
      </div> }
      { completed.length > 0 && 
        <div>
          <h3>Completed</h3>
          <ul>
            {completed}
          </ul>
      </div> }
      { closed.length > 0 && 
        <div>
          <h3>Closed</h3>
          <ul>
            {closed}
          </ul>
      </div> }
      
    </div>)
  }

export default Home;