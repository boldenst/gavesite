auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User logged in:', user)
    } else {
        console.log('User logged out!');
    }
});

// Sign up method
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    signupForm.reset();
    });
});

// Sign in method
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // console.log(cred.user);
        loginForm.reset();
        window.location.href = "./dashboard.html";
    });
});

// Logout method
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    // e.preventDefault();
    auth.signOut()
});