import SSO from './sso.factory.js';

export default function GoogleFactory(apiEndpoint) {
  SSO.call(this, apiEndpoint);

  this.getToken = async () => {
    let googleToken;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
      this.googleToken = googleToken;
    } catch (error) {
      console.log(error);
    }
  };

  this.signIn = async () => {

    let googleToken;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
      this.googleToken = googleToken;
    } catch (error) {
      console.log(error);
      }
    

    try {
      const response = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_token: this.googleToken }),
      });

      if ([400, 403].includes(response.status)) console.log('errrr');
      const body = await response.text();
      const result = JSON.parse(body);
      const { signedIn, fname, email } = result;
      this.signedIn = signedIn;
      this.name = fname;
      this.email = email;
    } catch (error) {
      console.log(error);
      // To do: handle error to logout of everything if goes wrong
    }
  };

  this.deleteAccount = async (email) => {
    try {
      const response = await fetch(`${apiEndpoint}/deleteaccount`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if ([400].includes(response.status)) console.log('errrr');
      const auth2 = window.gapi.auth2.getAuthInstance();
      const body = await response.text();
      await auth2.signOut();
      this.signedIn = false;
    } catch (error) {
      console.log(error);
    }
  };

  this.signOut = async () => {
    try {
      const response = await fetch(`${apiEndpoint}/signout`, {
        method: 'POST',
      });
      const auth2 = window.gapi.auth2.getAuthInstance();
      const body = await response.text();
      const result = JSON.parse(body);
      await auth2.signOut();
      this.signedIn = false;
    } catch (error) {
      console.log(error);
    }
  }
}
