import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const ViewTemplate = ({ firebase, match }) => {
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=> {
    if (!template) {
      firebase.doGetTemplateById(match.params.id).then(doc => {
        if (doc.exists) {
          const template = doc.data();
          setTemplate(template);
        }
      }).catch(error => {
        console.log(error);
        setError(error);
      })
    }
  })

  return (
    <div>
      <AuthUserContext.Consumer>
        {user => {
          if (error) {
            return <h3>{error}</h3>
          }

          if (!user || !template) {
            return <h3>Loading...</h3>
          }

          return (
            <div>
              <h1>Template | {template.templateName}</h1>
              <ul>
                <li>Buyin: ${template.buyin}</li>
                <li>Starting Stack: {template.startingChips} chips</li>
                <li>Minutes Per Round: {template.minutesPerRound}</li>
                <li>Blind Structure: { "Gradual" }</li>
                <li>Payout Structure: { "Winner-Takes-All"}</li>
              </ul>
              <button>Looks good, let's open the tournament</button>
              <button>Make new template based on these settings</button>
              <button>Make new template from scratch</button>
            </div>
          )
        }}
      </AuthUserContext.Consumer>
    </div>
  );
}

export default withFirebase(ViewTemplate);