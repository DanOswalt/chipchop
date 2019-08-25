import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

const Templates = () => {
  const session = useContext(AuthUserContext);

  if (!session) {
    return <h3>Loading...</h3>
  }
  const { user } = session;
  const templateSummaries = user.templateSummaries.map(t => { 
    return <li key={t.name}><Link to={"/template/" + t.id}>{t.templateName}</Link></li>;
  })

  return ( user &&
    <div>
      <h1>Home | {user.username}</h1>
      <h3>Your Tournament Templates</h3>
      <button><Link to={"/create-template"}>Create New Template</Link></button>
      { templateSummaries.length > 0 && 
        <div>
          <ul>
            {templateSummaries}
          </ul>
      </div> }
    </div>)
}

export default Templates;