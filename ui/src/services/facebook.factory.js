import SSO from './sso.factory.js';


export default function FacebookFactory(apiEndpoint, response) {
  this.response = response;
  SSO.call(this, apiEndpoint);

  this.signIn = async () => {
      try {
        
        const response = await fetch(`${apiEndpoint}/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ facebook_token: this.response.accessToken }),
        });
        console.log(response);
        if ([400].includes(response.status)) return JSON.parse(await response.text()).message;
        const body = await response.text();
        const result = JSON.parse(body);
        const { signedIn, fname, email } = result;
        this.signedIn = signedIn;
        this.name = fname;
        this.email = email;
      } catch (error) {
        return error;
      }      

  };

  this.deleteAcount = async (email) => {
    FB.api('/me/permissions', 'delete', null, () => FB.logout());

    try {
        const response = await fetch(`${apiEndpoint}/deleteaccount`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if ([400].includes(response.status)) return JSON.parse(await response.text()).message;
        const auth2 = window.gapi.auth2.getAuthInstance();
        const body = await response.text();
        await auth2.signOut();
        this.setState({ signedIn: false });
        console.log(this.state);
      } catch (error) {
        return error;
      }
    };

  this.signOut = async () => {
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
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

