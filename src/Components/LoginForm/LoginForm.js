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

  closeForm = () => {
    this.props.manageFormVisability();
  }

  render() {
    return(
      <div className="app-login-form__back">
        <div className="app-login-form">
          <div className="app-login-form__container">
            <div className="app-login-form__close" onClick={ this.closeForm }>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.663 0 26s11.664 26 26 26 26-11.663 26-26S40.336 0 26 0zm0 50C12.767 50 2 39.233 2 26S12.767 2 26 2s24 10.767 24 24-10.767 24-24 24z"></path><path d="M35.707 16.293a.999.999 0 0 0-1.414 0L26 24.586l-8.293-8.293a.999.999 0 1 0-1.414 1.414L24.586 26l-8.293 8.293a.999.999 0 1 0 1.414 1.414L26 27.414l8.293 8.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L27.414 26l8.293-8.293a.999.999 0 0 0 0-1.414z"></path></svg>
            </div>

            <div className="app-login-form__input-list">
              <input
                type="text"
                className="app-login-form__input"
                placeholder="Enter your login"
                value={ this.state.login }
                onChange={ (e) => this.updateState(e, 'login') }
              />

              <input
                type="password"
                className="app-login-form__input"
                placeholder="Enter your password"
                value={ this.state.password }
                onChange={ (e) => this.updateState(e, 'password') }
              />
            </div>

            <button
              type="button"
              className="app-login-form__btn"
              onClick={ this.logIn }>
              Log in
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
