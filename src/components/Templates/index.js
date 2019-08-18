import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const Templates = () => {
  return (
    <AuthUserContext.Consumer>
      {user => {
        if (!user) {
          return <h3>Loading...</h3>
        }
        const templates = user.templates.map(t => { 
          return <li key={t.name}><Link to={"/template/" + t.id}>{t.name}</Link></li>;
        })

        return ( user &&
          <div>
            <h1>Home | {user.username}</h1>
            <h3>Your Tournament Templates</h3>
            <button><Link to={"/home"}>Create New Template</Link></button>
            { templates.length > 0 && 
              <div>
                <ul>
                  {templates}
                </ul>
            </div> }
          </div>)
        }
      }
    </AuthUserContext.Consumer>
  );
}

export default Templates;