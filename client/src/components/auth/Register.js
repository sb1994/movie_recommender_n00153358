import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import {
  connect
} from 'react-redux';
import { registerAuth } from "../../store/actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: {},
      avatarURL: "",
      progress: 0,
      email:'',
      password:'',
      username:'',
      bio:'',
      fav_quote:'',
      name:''

    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFileChange = e => {
    if (e.target.files[0]) {
      const avatar = e.target.files[0];
      this.setState({ avatar });
    }
  };
  handleInputChange=e=>{
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit =e => {
    e.preventDefault()
    
    let {username,email,password,avatar,bio,fav_quote,name} = this.state

    const registerData = {
      username,
      password,
      avatar,
      email,
      bio,
      fav_quote,
      name
    }
    // console.log(registerData);
    
    // console.log(registerData)
    // this.props.onAuthRegister( username,
    //   password,
    //   avatar,
    //   email,
    //   bio,
    //   fav_quote,
    //   name)

    // const { image } = this.state;
    const uploadTask = storage.ref(`avatar/${registerData.avatar.name}`).put(avatar);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress function
      },
      error => {
        console.log(error);
      },
      () => {
        //what happens whent the avatar has finished uploading
        storage
          .ref("avatar")
          .child(avatar.name)
          .getDownloadURL()
          .then(url => {
              let avatar = url
              // console.log(avatar);
              console.log(avatar);
              
             this.props.registerAuth( registerData.username,
              registerData.password,
              avatar,
              registerData.email,
              registerData.bio,
              registerData.fav_quote,
              registerData.name)
            // this.props.onAuthRegister({

            // })
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  };
  render() {
    return (
      <div>

        <form>
          <div className="form-group">
            <label htmlFor="usernameInput">Username</label>
            <input type="" className="form-control" id="usernameInput" placeholder="Enter username"  onChange={this.handleInputChange} name="username" value={this.state.username}/>
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={this.handleInputChange} name="email" value={this.state.email}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handleInputChange} name="password" value={this.state.password}/>
          </div>
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input type="text" className="form-control" id="nameInput" placeholder="Name" onChange={this.handleInputChange} name="name" value={this.state.name}/>
          </div>
          <div className="form-group">
            <label htmlFor="bio">Biography</label>
            <textarea type="textarea" className="form-control" id="bioInput" placeholder="Biography" onChange={this.handleInputChange} name="bio" value={this.state.bio}/>
          </div>
          <div className="form-group">
            <label htmlFor="favQuoteInput">Favorite Film quote</label>
            <input type="text" className="form-control" id="favQuoteInput" placeholder="Favorite Film quote" onChange={this.handleInputChange} name="fav_quote" value={this.state.fav_quote}/>
          </div>
          <div className="form-group">
            <input
              className="form-control-file"
              type="file"
              name="avatar"
              id="avatar"
              onChange={this.handleFileChange}
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Register
          </button>
        </form>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  }
}

export default connect(mapStateToProps,{registerAuth})(Register)