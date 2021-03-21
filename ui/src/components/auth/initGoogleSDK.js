export default function initGoogleSdk() {
  const clientId = window.ENV.GOOGLE_CLIENT_ID;
  // Initialize google login API
  if (!clientId) return 'No client id. Unable to authenticate user.';
  window.gapi.load('auth2', () => {
    if (!window.gapi.auth2.getAuthInstance()) {
      window.gapi.auth2.init({ clientId: clientId })
    }
  })
}
