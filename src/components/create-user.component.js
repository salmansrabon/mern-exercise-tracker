import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      username: '',
      error: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username
    };

    // Check if username is empty before submitting
    if (!user.username) {
      this.setState({ error: 'Please enter a username' });
      return; // prevent further execution
    }

    axios.post('http://localhost:5000/users/add', user)
      .then(res => {
        console.log(res.data);
        // If submission is successful, clear error and reset username
        this.setState({ error: '', username: '' });
      })
      .catch(error => {
        // Handle specific errors from the server if needed
        if (error.response && error.response.status === 409) {
          this.setState({ error: 'User already exists' });
        } else {
          this.setState({ error: 'An error occurred' });
        }
      });

    this.setState({
      username: ''
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
          </div>
        </form>
        {this.state.error && (
          <div className='error-label'>
            <label style={{ color: 'red' }}>{this.state.error}</label>
          </div>
        )}
      </div>
    );
  }
}
