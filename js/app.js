auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "#";
    } else {
        window.location.href = "./index.html";
    }
});