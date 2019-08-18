import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const Home = () => {
  return (
    <AuthUserContext.Consumer>
      {user => {
        if (!user) {
          return <h3>Loading...</h3>
        }
        const populateTournamentListings = tournamentArray => tournamentArray.map(t => { 
          return <li key={t.name}><Link to={"/home"}>{t.name}</Link></li>;
        })

        const open = populateTournamentListings(user.tournaments.filter(t => t.status === "open"));
        const inprogress = populateTournamentListings(user.tournaments.filter(t => t.status === "inprogress"));
        const completed = populateTournamentListings(user.tournaments.filter(t => t.status === "complete"));
        const closed = populateTournamentListings(user.tournaments.filter(t => t.status === "closed"));

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
      }
    </AuthUserContext.Consumer>
  );
}

export default Home;