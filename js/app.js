// Creating elements
function renderGifts(doc) {
    let li = document.createElement('li');
    let container = document.createElement('div');
    let title = document.createElement('h2');
    let priceTitle = document.createElement('p');
    let price = document.createElement('p');
    let contentTitle = document.createElement('p');
    let content = document.createElement('p');
    let deleteItem = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    priceTitle.textContent = 'Pris:';
    price.textContent = doc.data().price;
    contentTitle.textContent = 'Indhold:';
    content.textContent = doc.data().content;
    deleteItem.textContent = 'X';

    li.appendChild(container);
    li.appendChild(deleteItem);
    container.appendChild(title);
    container.appendChild(priceTitle);
    container.appendChild(price);
    container.appendChild(contentTitle);
    container.appendChild(content);

    giftList.appendChild(li);

    //Deleting data
    deleteItem.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('gifts').doc(id).delete();
    })
}


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
        });
        //Get data
        db.collection('gifts').orderBy('title').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderGifts(doc);
            });
            settingsUI(user);
        });


    } else {
        window.location.href = "./index.html";
    }
});


//Create new gift
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('gifts').add({
        title: createForm.title.value,
        price: createForm.price.value,
        content: createForm.content.value
    }).then(() => {
        //Reset form
        createForm.reset();
        $('.pop-up__show').removeClass('pop-up__show')
    }).catch(err => {
        console.log(err.message)
    });
})

//real time listener

db.collection('gifts').orderBy('title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderGifts(change.doc);
        } else if (change.type == 'removed') {
            let li = giftList.querySelector('[data-id=' + change.doc.id + ']');
            giftList.removeChild(li);
        }
    })
})