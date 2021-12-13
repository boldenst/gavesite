let gifts = db.collection('gifts');

// Creating elements
function renderGifts(doc) {
    let li = document.createElement('li');
    let container = document.createElement('div');
    container.classList.add('render-gift-container');
    let title = document.createElement('h2');
    title.classList.add('render-gift-title');
    let elementContainer = document.createElement('div');
    elementContainer.classList.add('render-gift-element-container');
    let priceContainer = document.createElement('div');
    priceContainer.classList.add('render-gift-price-container');
    let priceContainerColumn = document.createElement('div');
    priceContainerColumn.classList.add('render-gift-price-container-column')
    let priceTitle = document.createElement('p');
    let price = document.createElement('p');
    let priceCurrency = document.createElement('p');
    priceCurrency.classList.add('render-gift-price-currency')
    let contentTitle = document.createElement('p');
    let content = document.createElement('p');
    let deleteItem = document.createElement('div');
    deleteItem.classList.add('delete-item')

    li.setAttribute('data-id', doc.id);
    title.textContent = doc.data().title;
    priceTitle.textContent = 'Pris:';
    price.textContent = doc.data().price;
    priceCurrency.textContent = 'kr.';
    contentTitle.textContent = 'Note:';
    content.textContent = doc.data().content;

    li.appendChild(deleteItem);
    li.appendChild(title);
    li.appendChild(container);
    container.appendChild(priceContainerColumn);
    container.appendChild(elementContainer);
    priceContainerColumn.appendChild(priceTitle)
    priceContainerColumn.appendChild(priceContainer);
    priceContainer.appendChild(price);
    priceContainer.appendChild(priceCurrency);
    elementContainer.appendChild(contentTitle);
    elementContainer.appendChild(content);

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
        <div>
            <p>Navn:</p>
            <p> ${doc.data().username}</p>
        </div>
        <div>
            <p>Email:</p>
            <div>
                <p> ${user.email}</p>
                <div class="change-email"></div>
            </div>    
        </div>
        `;
        accountDetails.innerHTML = html;    
        });
//Get data
        gifts.where('customid', '==', user.uid).orderBy('title').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderGifts(doc);
            });
            settingsUI(user);
        });
        //Create new gift
const createForm = document.querySelector('#create-form');

    createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    gifts.add({
        title: createForm.title.value,
        price: createForm.price.value,
        content: createForm.content.value,
        customid: user.uid
    }).then(() => {
        //Reset form
        createForm.reset();
        $('.pop-up__show').removeClass('pop-up__show')
    }).catch(err => {
        console.log(err.message)
    });
})
    } else {
        window.location.href = "./index.html";
    }
});
