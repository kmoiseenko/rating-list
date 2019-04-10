import React, { Component } from 'react';
import './LoginForm.css';

import { generateRandom, globalConst } from './../../Tools/tools';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    }
  }

  updateState = (e, type) => {
    switch (type) {
      case 'login':
        this.setState({ login: e.target.value });
        break;

      case 'password':
        this.setState({ password: e.target.value });
        break;

      default:
        //
        break;
    }
  }

  logIn = () => {
    this.props.logIn(this.state);
  }

  render() {
    return(
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter your login"
            value={ this.state.login }
            onChange={ (e) => this.updateState(e, 'login') }
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={ this.state.password }
            onChange={ (e) => this.updateState(e, 'password') }
          />
        </div>

        <button
          onClick={ this.logIn }>
          Log in
        </button>
      </div>
    );
  }
}

export default LoginForm;
