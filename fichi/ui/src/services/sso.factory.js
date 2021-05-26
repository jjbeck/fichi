export default function SSO(apiEndpoint) {
  this.apiEndpoint = apiEndpoint;
  

try {
  this.loadData = async () => {
    const headers = { 'Content-Type': 'application/json' };
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
     
      credentials: 'include',
      headers,

    });

    if ([400].includes(response.status)) return JSON.parse(await response.text()).message;
    // if cookie session backend sends response
    const body = await response.text();
   
    const result = await JSON.parse(body);
   
    const { signedIn, fname, email } = result;
    this.signedIn = signedIn;
    this.name = fname;
    this.email = email;  
    }
} catch (error) {
  return error;

}
}
