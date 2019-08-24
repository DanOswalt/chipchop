import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import shortid from 'shortid';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  id: shortid.generate(),
  buyin: '',
  startingChips: '',
  minutesPerRound: '',
  blindStructure: '',
  payoutStructure: '',
  name: '',
  error: null,
};


class CreateTemplateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    event.preventDefault();
    const { 
        buyin, 
        startingChips,
        minutesPerRound,
        blindStructure,
        payoutStructure,
        templateName,
        id
    } = this.state;

    const { firebase, history } = this.props;

    firebase.doCreateNewTemplate({
        id,
        buyin, 
        startingChips,
        minutesPerRound,
        blindStructure,
        payoutStructure,
        templateName
    }).then(() => {
        //must attach description to user also
    }).then(() => {
        history.push("/template/" + id);
    }).catch(error => {
        this.setState({ error });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      buyin,
      startingChips,
      minutesPerRound,
      blindStructure,
      payoutStructure,
      templateName,
      error,
    } = this.state;

    const isInvalid =
      buyin <= 0 || isNaN(buyin) || 
      startingChips <= 0 || isNaN(startingChips) ||
      minutesPerRound <= 0 || isNaN(minutesPerRound)

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
            <input
            name="buyin"
            value={buyin}
            onChange={this.onChange}
            type="text"
            placeholder="Buyin"
            />
        </fieldset>
   
        <fieldset>
            <input
            name="startingChips"
            value={startingChips}
            onChange={this.onChange}
            type="text"
            placeholder="Starting Chips"
            />
        </fieldset>

        <fieldset>
            <input
            name="minutesPerRound"
            value={minutesPerRound}
            onChange={this.onChange}
            type="text"
            placeholder="Minutes Per Round"
            />
        </fieldset>

        <fieldset>
        <label htmlFor="blindStructure">Blind Structure</label>
        <select id="blindStructure">
            <option value=""></option>
            <option value="slow">Slow</option>
            <option value="gradual">Gradual</option>
            <option value="double">Double</option>
        </select>
        </fieldset>

        <fieldset>
        <label htmlFor="payStructure">Pay Structure</label>
        <select id="payStructure">
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
          onChange={this.onChange}
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
}

const CreateTemplate = compose(
  withRouter,
  withFirebase,
)(CreateTemplateForm);

export default CreateTemplate;