auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "#";
        // account info
        const accountDetails = document.querySelector('.account-details');
        db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
        <div>Username: ${doc.data().username}</div>
        <div>Email: ${user.email}</div>
        `;
        accountDetails.innerHTML = html;    
        })

    } else {
        window.location.href = "./index.html";
    }
});



//Create new gift
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('gifts').add({
        title: createForm['title'].value,
        price: createForm['price'].value,
        content: createForm['content'].value
    }).then(() => {
        //Reset form
        createForm.reset();
        $('.pop-up__show').removeClass('pop-up__show')
    }).catch(err => {
        console.log(err.message)
    });
});

