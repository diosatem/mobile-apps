//Auth class which provides basic JWT based authentication for our app.
// Requires: access to the makeRequest  functions
import { makeRequest, Errors } from './authHelper.js';

export default class Auth {
  constructor(errors) {
    this.jwtToken = '';
    this.user = {};
    this.errors = errors;
  }

  async login(callback) {
    // replace the ids below with whatever you used in your form.
    const password = document.getElementById('password');
    const username = document.getElementById('email');
    const postData = {
      email: username.value,
      password: password.value,
    };
    try {
      // 1. use the makeRequest function to pass our credentials to the server
      this.errors.clear();
      const response = await makeRequest('login', 'POST', null, postData);
      // 2. if we get a successful response...we have a token!  Store it since we will need to send it with every request to the API.
      this.jwtToken = response.accessToken;
      console.log('Token ' + this.jwtToken);
      // let's get the user details as well and store them locally in the class
      // you can pass a query to the API by appending it on the end of the url like this: 'users?email=' + email
      this.user = await this.getCurrentUser(username.value);
      // hide the login form.
      document.getElementById('login').classList.add('hidden');
      // clear the password
      password.value = '';

      // since we have a token let's go grab some data from the API by executing the callback if one was passed in
      if (callback) {
        callback();
      }
    } catch (error) {
      this.errors.showError(error);
      // if there were any errors display them
      console.log(error);
    }
  }
  // uses the email of the currently logged in user to pull up the full user details for that user from the database
  async getCurrentUser(email) {
    // 3. add the code here to make a request for the user identified by email...don't forget to send the token!
    try {
      return await makeRequest(
        'users?email=' + email,
        'GET',
        this.token
      );

    } catch (error) {
      // if there were any errors display them
      console.log(error);
    }
  }

  set token(value) {
    // we need this for the getter to work...but we don't want to allow setting the token through this.
  }
  get token() {
    return this.jwtToken;
  }
} // end auth class