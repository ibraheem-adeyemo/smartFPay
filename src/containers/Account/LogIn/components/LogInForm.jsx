import React, { Component } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import { Alert, Button, Spinner } from "reactstrap";
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { API_URLS } from "../../../../constants/apiUrls";
import {postLogin} from '../../actions/account.actions';
import {accountService} from '../../services/account.service';
import { show } from '../../../Notifications/actions/alert.actions';
class LogInForm extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: false,
      showError: false,
      errorMessage: '',
      email: '',
      password: '',
      response: null,
      loading: false
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  validateMail = (email) => {
    if (!email) {
      this.setState({
        errorMessage : "Email field shouldn’t be empty"
      })
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      this.setState({errorMessage : "Invalid email address"})
      return false;
    } else{
      this.setState({errorMessage: ''})
      return true;
    }
  }

  postLogin = async (params, history) => {
    console.log(params)
    fetch(API_URLS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then(data => {
      if(data.token){
        window.localStorage.setItem('pc-token', data.token)
        history.push('/dashboard')
      }
      console.log('Success:', data);
      if(data.responseMessage) {
        this.setState({showError:true});
      }
      this.setState({response: data, loading: false});
    })
    .catch(err => {
      this.setState({loading: false, showError: true})
      console.error('Error:', err.message)
    })
  }

  handleLogin = (e) => {
    const {dispatch, error, history} = this.props;
    let {email, password} = this.state;
    e.preventDefault();
    //this.setState({loading: true});
    dispatch(postLogin({email, password}, history));
    //this.postLogin({email, password}, history);
    //this.setState({loading: false});
    //window.localStorage.setItem('pc-token', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbHV3YXNldW4uYXdvdHVuZHVuQGludGVyc3dpdGNobmcuY29tIiwicGVybWlzc2lvbnMiOlsiU1VQRVJfQURNSU4iXSwiaWF0IjoxNTk4MzUyMDIwLCJleHAiOjE2MDE5NTIwMjB9.fYTcg9GdXvhXSf0pvAzpYWtAUTGUd5jwfxD6RY65xxY");
    //history.push('/dashboard')
  }

  handleChange = (e) => {
    const {name, value} = e.currentTarget;
    const {error, errorTitle} = this.props;

    this.setState({name: value})
    if(name === "email" && this.validateMail(value)) {
      this.setState({email: value})
    } else if(name === 'password' ){
      this.setState({password: value});
    } else {
      this.setState({errorMessage : "Enter your email address and password"})
    }
    if (error && errorTitle)
      this.props.dispatch(show())
  }

  componentDidMount() {
    localStorage.setItem('pc-token', '');
    this.props.dispatch(show())
  }

  render() {
    const { showPassword, email, password } = this.state;
    const {error, errorTitle, loading} = this.props;

    return (
      <>
          <div>
            {error && errorTitle && (
                <Alert color="danger">
                    {errorTitle}
                </Alert>
            )}
          </div>
      <form className="form" onSubmit={this.handleLogin}>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <input
              name="email"
              type="email"
              placeholder="Name"
              style={{border: "1px solid"}}
              onChange={this.handleChange}
              value={email}
              required
            />
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={this.handleChange}
              style={{border: "1px solid", borderRightStyle: "hidden"}}
              value={password}
              required
            />
            <button
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
              type="button"
              style={{height: "auto"}}
            ><EyeIcon />
            </button>
          </div>
          {/* <div className="account__forgot-password">
            <a href="/">Forgot a password?</a>
          </div> */}
        </div>
        <br />
        {/* <Link className="btn btn-primary account__btn account__btn--small" to="/dashboard">Sign In</Link> */}
        <Button
          color="primary"
          id="submit-btn"
          type="submit"
          disabled={loading}
          className="btn btn-primary account__btn account__btn--small"
        >
          {loading ? (
            <span>
              <Spinner size="sm" color="default" />{" "}
            </span>
          ) : null}
          Sign In
        </Button>
      </form>
      </>
    );
  }
}

// export default LogInForm;

// const selector = formValueSelector("login_form");

export default reduxForm({
  form: "login_form",
})(
  connect(state => ({
    postlogin: state.postlogin,
    error: state.postlogin.error,
    errorTitle: state.notification.title,
    loading:state.postlogin.loading
  }))(withRouter(LogInForm))
);
