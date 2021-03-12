const FB_URL = "https://graph.facebook.com/v8.0/me";

async function fbToken() {
    axios.get(`${FB_URL}?fields=id%2cfirst_name%2clast_name%2cemail&access_token=${facebookToken}`).then(
    
    response => {
        const { data } = response;
        const { first_name: fname, last_name: lname, email: retEmail } = data;
        const credentials = {
            signedIn: true, fname, lname, email: retEmail,
        };
    
        credentials.facebookAuth = true;

        const token = jwt.sign(credentials, JWT_SECRET);
        res.cookie('jwt_facebook', token, { httpOnly: true });
        res.json(credentials);

        User.count({ email: retEmail }, (err, count) => {
            if (err) 
                res.status().send({ message: err });
            if (count > 0) {
                console.log('email exists signing in');
            } else {
                User.create(credentials);
            }
        });
    },
    error => {
        res.status(400).send({ code: 400, message: error });
    });
}

module.exports = {
    fbToken
}