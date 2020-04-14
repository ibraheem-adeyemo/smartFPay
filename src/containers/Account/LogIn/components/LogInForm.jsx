import React, { PureComponent } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import { Link } from 'react-router-dom';

class LogInForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { showPassword } = this.state;

    return (
      <form className="form">
        <div className="form__form-group">
          <div className="form__form-group-field">
            <input
              name="name"
              type="text"
              placeholder="Name"
              style={{border: "1px solid"}}
            />
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              style={{border: "1px solid", borderRightStyle: "hidden"}}
            />
            <button
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
              type="button"
              style={{height: "auto"}}
            ><EyeIcon />
            </button>
          </div>
          <div className="account__forgot-password">
            <a href="/">Forgot a password?</a>
          </div>
        </div>
        <br />
        <Link className="btn btn-primary account__btn account__btn--small" to="/dashboard">Sign In</Link>
      </form>
    );
  }
}

export default LogInForm;
