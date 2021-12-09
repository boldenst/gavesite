auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "#";
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
        content: createForm['content'].value
    }).then(() => {
        //Reset form
        createForm.reset();
        $('.pop-up__show').removeClass('pop-up__show')
    }).catch(err => {
        console.log(err.message)
    });
});