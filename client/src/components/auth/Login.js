import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
  connect
} from 'react-redux';
import * as actions from '../../store/actions/auth';
export class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    let username = e.target['username'].value
    let password = e.target['password'].value
    // console.log(e.target['username'].value);
    console.log(username,password);
    this.props.onAuthLogin(username,password)
    this.props.history.push('/movies')
    
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="text" className="form-control" id="email" placeholder="Enter username" name="username"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" className="form-control" id="password" placeholder="Password" name="password"/>
          </div>
          <div className="form-group">
            < button type = "submit" className = "btn btn-primary" > Login </button>
            <Link to='/register'>Signup</Link>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuthLogin: (username, password) => dispatch(actions.loginAuth(username, password))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)