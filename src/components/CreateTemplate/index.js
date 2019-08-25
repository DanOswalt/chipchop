import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import shortid from 'shortid';

import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const CreateTemplateForm = ({ firebase, history }) => {
  const session = useContext(AuthUserContext);
  const { user } = session;
  const [ buyin, setBuyin ] = useState('');
  const [ startingChips, setStartingChips ] = useState('');
  const [ minutesPerRound, setMinutesPerRound ] = useState('');
  const [ blindStructure, setBlindStructure ] = useState('');
  const [ payoutStructure, setPayoutStructure ] = useState('');
  const [ templateName, setTemplateName ] = useState('');
  const [ error, setError ] = useState(null);

  const isInvalid =
    buyin <= 0 || isNaN(buyin) || 
    startingChips <= 0 || isNaN(startingChips) ||
    minutesPerRound <= 0 || isNaN(minutesPerRound)

  const onSubmit = event => {
    event.preventDefault();

    const template = {
      id: shortid.generate(),
      buyin, 
      startingChips,
      minutesPerRound,
      blindStructure,
      payoutStructure,
      templateName
    }

    const templateSummary = { 
      id: template.id, 
      templateName 
    };

    firebase.doCreateNewTemplate(template).then(() => {
      user.templateSummaries.push(templateSummary);
      return firebase.doUserUpdate(user);
    }).then(() => {
      history.push("/template/" + template.id);
    }).catch(error => {
      setError(error);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
          <input
          name="buyin"
          value={buyin}
          onChange={ (e) => {setBuyin(e.target.value)} }
          type="text"
          placeholder="Buyin"
          />
      </fieldset>
  
      <fieldset>
          <input
          name="startingChips"
          value={startingChips}
          onChange={(e) => {setStartingChips(e.target.value)}}
          type="text"
          placeholder="Starting Chips"
          />
      </fieldset>

      <fieldset>
          <input
          name="minutesPerRound"
          value={minutesPerRound}
          onChange={(e) => {setMinutesPerRound(e.target.value)}}
          type="text"
          placeholder="Minutes Per Round"
          />
      </fieldset>

      <fieldset>
      <label htmlFor="blindStructure">Blind Structure</label>
      <select id="blindStructure" onChange={(e) => {setBlindStructure(e.target.value)}}>
          <option value=""></option>
          <option value="slow">Slow</option>
          <option value="gradual">Gradual</option>
          <option value="double">Double</option>
      </select>
      </fieldset>

      <fieldset>
      <label htmlFor="payStructure">Pay Structure</label>
      <select id="payStructure" onChange={(e) => {setPayoutStructure(e.target.value)}}>
          <option value=""></option>
          <option value="all">Winner-Takes-All</option>
          <option value="top-three">Top 3</option>
          <option value="ten-percent">Top Ten Percent</option>
      </select>
      </fieldset>

      <fieldset>
      <input
        name="templateName"
        value={templateName}
        onChange={(e) => {setTemplateName(e.target.value)}}
        type="text"
        placeholder="Template Name"
      />
      </fieldset>

      <button disabled={isInvalid} type="submit">
        Submit
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const CreateTemplate = compose(
  withRouter,
  withFirebase,
)(CreateTemplateForm);

export default CreateTemplate;