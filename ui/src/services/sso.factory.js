export default function SSO(apiEndpoint) {
  this.apiEndpoint = apiEndpoint;

  this.loadData = async () => {
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
    });

    if ([400].includes(response.status)) console.log('errrr');
    // if cookie session backend sends response
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, fname, email } = result;
    this.signedIn = signedIn;
    this.name = fname;
    this.email = email;
  };
}
