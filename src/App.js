import React, { Component } from 'react';
import socketConnect from './socket/socketConnect';

import ListElement from './Components/ListElement/ListElement';
import NewListElement from './Components/NewListElement/NewListElement';
import LoginForm from './Components/LoginForm/LoginForm';
import './App.css';

import { globalConst, sortList } from './helpers/tools.js';
import fetcher from './helpers/fetcher.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      addElement: false,
      isAdmin: false,
      loginForm: false,
      background: null
    };
  }

  generateList = () => {
    if (this.state.players.length) {
      return this.state.players.map((item) => {
        return (
          <ListElement
            key={ item.id }
            data={ item }
            isAdmin={ this.state.isAdmin }
            globalConst={ globalConst }
            handleListElementUpdate={ this.handleListElementUpdate }
          />
        );
      });
    } else {
      return (<h1>No players</h1>);
    }
  }

  manageVisabilityOfNewListElement = () => {
    if (this.state.addElement) {
      return (
        <NewListElement
          handleConfirmAddElement={ this.handleConfirmAddElement }
          manageAddElementState={ this.manageAddElementState }
        />
      );
    }
  }

  manageVisabilityOfAddListElementBtn = () => {
    if (!this.state.addElement) {
      return (
        <button
          className="app-btn-add"
          onClick={ this.manageAddElementState }>
          Add player
        </button>
      );
    }
  }

  handleConfirmAddElement = (item) => {
    const { players } = this.state;

    players.push(item);
    if (this.state.isAdmin === false) { sortList(players) }
    this.props.client.emit('UPDATE_PLAYERS_LIST', players);
    this.setState({ players });
  }

  manageAddElementState = () => {
    this.setState(prevState => ({ addElement: !prevState.addElement }));
  }

  handleListElementUpdate = (e, elementId, type) => {
    const { players } = this.state;
    const playerIndex = players.findIndex(item => item.id === elementId);

    if (playerIndex === -1) return false;
    switch (type) {
      case globalConst.INCREASE_PLAYER_SCORES:
        players[playerIndex].score++;
        break;

      case globalConst.DECREASE_PLAYER_SCORES:
        if (players[playerIndex].score > 0) {
          players[playerIndex].score--;
        }
        break;

      case globalConst.DELETE_PLAYER_FROM_LIST:
        players.splice(playerIndex, 1);
        break;

      default:
        //
        break;
    }

    if (this.state.isAdmin === false) { sortList(players) }
    this.props.client.emit('UPDATE_PLAYERS_LIST', players);
    this.setState({ players });
  }

  checkForAdmin = () => {
    if (this.state.isAdmin) {
      return(
        <div className="app-new-container">
          { this.manageVisabilityOfNewListElement() }
          { this.manageVisabilityOfAddListElementBtn() }
        </div>
      );
    }
  }

  loginForm = () => {
    return (
      <LoginForm
        logIn={ this.logIn }
        manageLoginFormVisability={ this.manageLoginFormVisability }
      />
    );
  }

  manageLoginFormVisability = () => {
    this.setState(prevState => ({ loginForm: !prevState.loginForm }));
  }

  logIn = (data) => {
    fetcher
      .post('login', JSON.stringify(data))
      .then(res => {
        if (!res.error) {
          this.setState(prevState => ({ isAdmin: !prevState.isAdmin}));
          sessionStorage.setItem('adminId', data.id);
          this.manageLoginFormVisability();
        } else {
          alert(res.error);
        }
      });
  }

  logInIcon = () => {
    return (
      <div className="app-system-controls__item" onClick={ this.manageLoginFormVisability }>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56"><path d="M25.293 39.293a.999.999 0 1 0 1.414 1.414l11.999-11.999a1.001 1.001 0 0 0 0-1.417L26.707 15.293a.999.999 0 1 0-1.414 1.414L35.586 27H5a1 1 0 1 0 0 2h30.586L25.293 39.293z"/><path d="M51 0H14a1 1 0 0 0-1 1v21a1 1 0 1 0 2 0V2h35v52H15V34a1 1 0 1 0-2 0v21a1 1 0 0 0 1 1h37a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"/></svg>
      </div>
    );
  }

  settingsIcon = () => {
    return (
      <div className="app-system-controls__item">
        <input
          className="app-system-controls__file-upload-input"
          type="file"
          name="background"
          onChange={ this.uploadFile }
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 478.703 478.703">
          <path d="M454.2 189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8 7.1-27.9-3.2-38.1l-29.8-29.8c-5.6-5.6-13-8.7-20.9-8.7-6.2 0-12.1 1.9-17.1 5.5l-27.8 19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2a29.54 29.54 0 0 0-29.2-24.7h-42.1c-14.5 0-26.8 10.4-29.2 24.7l-5.8 34c-11.2 3.5-22.1 8.1-32.5 13.7l-27.5-19.8c-5-3.6-11-5.5-17.2-5.5-7.9 0-15.4 3.1-20.9 8.7l-29.9 29.8c-10.2 10.2-11.6 26.3-3.2 38.1l20 28.1c-5.5 10.5-9.9 21.4-13.3 32.7l-33.2 5.6a29.54 29.54 0 0 0-24.7 29.2v42.1c0 14.5 10.4 26.8 24.7 29.2l34 5.8c3.5 11.2 8.1 22.1 13.7 32.5l-19.7 27.4c-8.4 11.8-7.1 27.9 3.2 38.1l29.8 29.8c5.6 5.6 13 8.7 20.9 8.7 6.2 0 12.1-1.9 17.1-5.5l28.1-20c10.1 5.3 20.7 9.6 31.6 13l5.6 33.6a29.54 29.54 0 0 0 29.2 24.7h42.2c14.5 0 26.8-10.4 29.2-24.7l5.7-33.6c11.3-3.5 22.2-8 32.6-13.5l27.7 19.8c5 3.6 11 5.5 17.2 5.5 7.9 0 15.3-3.1 20.9-8.7l29.8-29.8c10.2-10.2 11.6-26.3 3.2-38.1l-19.8-27.8c5.5-10.5 10.1-21.4 13.5-32.6l33.6-5.6a29.54 29.54 0 0 0 24.7-29.2v-42.1c.2-14.5-10.2-26.8-24.5-29.2zm-2.3 71.3c0 1.3-.9 2.4-2.2 2.6l-42 7c-5.3.9-9.5 4.8-10.8 9.9-3.8 14.7-9.6 28.8-17.4 41.9-2.7 4.6-2.5 10.3.6 14.7l24.7 34.8c.7 1 .6 2.5-.3 3.4l-29.8 29.8c-.7.7-1.4.8-1.9.8-.6 0-1.1-.2-1.5-.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-.6-13.1 7.8-27.2 13.6-41.9 17.4-5.2 1.3-9.1 5.6-9.9 10.8l-7.1 42c-.2 1.3-1.3 2.2-2.6 2.2h-42.1c-1.3 0-2.4-.9-2.6-2.2l-7-42c-.9-5.3-4.8-9.5-9.9-10.8-14.3-3.7-28.1-9.4-41-16.8-2.1-1.2-4.5-1.8-6.8-1.8-2.7 0-5.5.8-7.8 2.5l-35 24.9c-.5.3-1 .5-1.5.5-.4 0-1.2-.1-1.9-.8l-29.8-29.8c-.9-.9-1-2.3-.3-3.4l24.6-34.5c3.1-4.4 3.3-10.2.6-14.8-7.8-13-13.8-27.1-17.6-41.8-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2c-1.3-.2-2.2-1.3-2.2-2.6v-42.1c0-1.3.9-2.4 2.2-2.6l41.7-7c5.3-.9 9.6-4.8 10.9-10 3.7-14.7 9.4-28.9 17.1-42 2.7-4.6 2.4-10.3-.7-14.6l-24.9-35c-.7-1-.6-2.5.3-3.4l29.8-29.8c.7-.7 1.4-.8 1.9-.8.6 0 1.1.2 1.5.5l34.5 24.6c4.4 3.1 10.2 3.3 14.8.6 13-7.8 27.1-13.8 41.8-17.6 5.1-1.4 9-5.6 9.9-10.8l7.2-42.3c.2-1.3 1.3-2.2 2.6-2.2h42.1c1.3 0 2.4.9 2.6 2.2l7 41.7c.9 5.3 4.8 9.6 10 10.9 15.1 3.8 29.5 9.7 42.9 17.6 4.6 2.7 10.3 2.5 14.7-.6l34.5-24.8c.5-.3 1-.5 1.5-.5.4 0 1.2.1 1.9.8l29.8 29.8c.9.9 1 2.3.3 3.4l-24.7 34.7c-3.1 4.3-3.3 10.1-.6 14.7 7.8 13.1 13.6 27.2 17.4 41.9 1.3 5.2 5.6 9.1 10.8 9.9l42 7.1c1.3.2 2.2 1.3 2.2 2.6v42.1h-.1z"/><path d="M239.4 136.001c-57 0-103.3 46.3-103.3 103.3s46.3 103.3 103.3 103.3 103.3-46.3 103.3-103.3-46.3-103.3-103.3-103.3zm0 179.6c-42.1 0-76.3-34.2-76.3-76.3s34.2-76.3 76.3-76.3 76.3 34.2 76.3 76.3-34.2 76.3-76.3 76.3z"/>
        </svg>
      </div>
    );
  }

  uploadFile = (e) => {
    const formData = new FormData();

    formData.append('background', e.target.files[0], e.target.files[0].name);
    fetcher
      .post('background', formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(res => {
        this.setState({ background: res.src });
        this.props.client.emit('UPDATE_BACKGROUND', res.src);
      });
  }

  render() {
    return (
      <div className="full-height" style={{ background: `url(./assets/${this.state.background})` }}>
        { this.state.loginForm ? this.loginForm() : null }

        <header>
          <div className="app-system-controls">
            { this.state.isAdmin ? null: this.logInIcon() }
            { this.state.isAdmin ? this.settingsIcon(): null }
          </div>
        </header>

        <div className="container">
          { this.checkForAdmin() }

          <ul className="app-list">{ this.generateList() }</ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetcher
      .get('players')
      .then(res => {
        if (res.length && this.state.isAdmin === false) { sortList(res) }
        this.setState({ players: res });
      });

    fetcher
      .get('background')
      .then(res => {
        this.setState({ background: res.src });
      });

    if (sessionStorage.adminId) {
      this.setState(prevState => ({ isAdmin: !prevState.isAdmin }));
    }

    this.props.client.on('UPDATE_PLAYERS_LIST', players => {
      if (this.state.isAdmin === false) { sortList(players) }
      this.setState({ players });
    });

    this.props.client.on(
      'UPDATE_BACKGROUND',
      background => this.setState({ background: background })
    );
  }
}

export default socketConnect(App);
