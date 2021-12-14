const presentInput = (data) => {
    let html = '';
    data.forEach(doc => {
        const gifts = doc.data();
        const li = `
            <li data-id="${doc.id}" class="people-added-container">
                <div> class="delete-item"</div>
                <h2 class="render-gift-title">${doc.data().title}</h2>
                <div class="render-gift-container">
                    <div class="render-gift-price-container-column">
                        <p>Pris</p>
                        <div class="render-gift-price-container">
                            <p>${doc.data().price}</p>
                            <p class="render-gift-price-currency">kr.</p>
                        </div>
                    </div>
                    <div class="render-gift-element-container">
                        <p>Note</p>
                        <p>${doc.data().content}</p>
                    </div>
                </div>
            </li>
        `;
        html += li
    });
    presentList.innerHTML = html;
}


////////////////////////////////////////////////////////////////////////////////////////////////7

let presents = db.collection('gifts');
const presentList = document.querySelector('.gifts');

auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "#";

        //Create new gift
        const presentForm = document.querySelector('#gift-form');
        presentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            presents.add({
                title: presentForm.title.value,
                customid: user.uid,
                price: presentForm.price.value,
                content: presentForm.content.value
            }).then(() => {
                //Reset form
                presentForm.reset();
                // location.reload();
                $('.pop-up__show').removeClass('pop-up__show');
            }).catch(err => {
                console.log(err.message)
            });
        });

        const presentInput = (data) => {
            let html = '';
            data.forEach(doc => {
                const presents = doc.data();
                const li = `
                <li data-id="${doc.id}" class="people-added-container">
                    <div> class="delete-item"</div>
                    <h2 class="render-gift-title">${presents.title}</h2>
                    <div class="render-gift-container">
                        <div class="render-gift-price-container-column">
                            <p>Pris</p>
                            <div class="render-gift-price-container">
                                <p>${presents.price}</p>
                                <p class="render-gift-price-currency">kr.</p>
                            </div>
                        </div>
                        <div class="render-gift-element-container">
                            <p>Note</p>
                            <p>${presents.content}</p>
                        </div>
                    </div>
                </li>
            `;
                html += li
            });
            presentList.innerHTML = html;
        }

        //Get data for "Gaver til andre"

        presents.where('customid', '==', user.uid).orderBy('title').onSnapshot(snapshot => {
            presentInput(snapshot.docs);
        });
    } else {
        window.location.href = "./index.html";
    }
});

    //Deleting data
    presentList.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('gifts').doc(id).delete().then(() => {
            // location.reload();
        })
    })

