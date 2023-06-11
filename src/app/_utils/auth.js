// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    if (typeof window !== 'undefined')
      return localStorage.getItem('id_token');

    return null;
  }

  login(idToken) {
    // Saves user token to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('id_token', idToken);

      console.log('Serverside rendered page, was not able to set token on localStorage.')
    }

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('id_token');

      console.log('Serverside rendered page, was not able to remove token from localStorage.')
    }
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
