let people = db.collection('people');
const peopleList = document.querySelector('.people')
let cross = document.querySelector('.delete-person')

auth.onAuthStateChanged(user => {
    if (user) {
        window.location.href = "#";

        //Create new gift
        const peopleForm = document.querySelector('#people-form');
        peopleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            people.add({
                title: peopleForm.title.value,
                customid: user.uid
            }).then(() => {
                //Reset form
                peopleForm.reset();
                // location.reload();
                $('.pop-up__show--people').removeClass('pop-up__show--people');
                $('.pop-up__show').removeClass('pop-up__show');
            }).catch(err => {
                console.log(err.message)
            });
        });

        const peopleInput = (data) => {
            let html = '';
            data.forEach(doc => {
                const people = doc.data();
                const li = `
                    <li class="people-added-container">
                        <div data-id="${doc.id}" class="delete-person">
                            <div class="delete-person-icon"></div>
                        </div>    
                        <div class="people-added-content-container">    
                            <div class="people-added-img"></div>
                            <h2>${people.title}</h2>
                        </div>
                        <details>
                        <summary class="people-added-add-info"></summary>
                        <p>Coming soon</p>
                        </details>
                        
                        </details>
                    </li>
                `;
                html += li
            });
            peopleList.innerHTML = html;
        };

        //Get data for "Gaver til andre"

        people.where('customid', '==', user.uid).orderBy('title').onSnapshot(snapshot => {
            peopleInput(snapshot.docs);
        });
        
    } else {
        window.location.href = "./index.html";
    }
});

//Deleting data
peopleList.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('people').doc(id).delete().then(() => {
        // location.reload();
    });
});
