export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    if (body.errors) {
        const error = body.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
            const details = error.extensions.exception.errors.join('\n');
            alert(`${error.message}:\n ${details}`);
        } else {
            alert(`${error.extensions.code}: ${error.message}`);
        }
    }
    return body.data;
  } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
  }

}