var oktaConfig = {
  issuer: "https://dev-81242508.okta.com/oauth2/default",  // Ensure you use the correct issuer
  redirectUri: 'https://www.testingsite.me/index.html',  // Correct URL for your redirection
  clientId: "0oajhtgg4xuXjf6Ja5d7"
};

const oktaSignIn = new OktaSignIn(oktaConfig);

oktaSignIn.authClient.token.getUserInfo().then(function(user) {
}, function(error) {
  oktaSignIn.showSignInToGetTokens({
    el: '#okta-login-container'
  }).then(function(tokens) {

  // After successful login on index.html
  oktaSignIn.authClient.tokenManager.setTokens(tokens);
  localStorage.setItem('accessToken', tokens.accessToken.accessToken); // Save access token
  localStorage.setItem('idToken', tokens.idToken.idToken); // Save ID token

    // Redirect to new page after successful login
    window.location.replace('home.html');
    
  }).catch(function(err) {
    console.error(err);
  });
});

function logout() {
  oktaSignIn.authClient.signOut();
  location.reload();
}