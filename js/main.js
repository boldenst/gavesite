var loginUnfold = document.querySelector('#auth-login-unfold');
var loginUnfolded = document.querySelector('.signup-container');

loginUnfold.addEventListener('click', function() {
    loginUnfolded.classList.add('unfolded');
})