import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const ViewTemplate = ({ firebase, match }) => {
  const [template, setTemplate] = useState(null);

  useEffect(()=> {
    if (!template) {
      firebase.doGetTemplateById(match.params.id).then(doc => {
        console.log(doc)
        if (doc.exists) {
          const template = doc.data();
          setTemplate(template);
        }
      })
    }
  })

  return (
    <div>
      <AuthUserContext.Consumer>
        {user => {
          if (!user || !template) {
            return <h3>Loading...</h3>
          }

          return (
            <div>
              <h1>Template</h1>
              <h3>{template.name}</h3>
              <ul>
                <li>Buyin: ${template.buyin}</li>
                <li>Starting Stack: {template.startingChips} chips</li>
                <li>Minutes Per Round: {template.minutesPerRound}</li>
                <li>Blind Structure: { "Gradual" }</li>
                <li>Payout Strucutre: { "Winner-Takes-All"}</li>
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