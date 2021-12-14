let people = db.collection('people');
const peopleList = document.querySelector('.people');
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
                    <li data-id="${doc.id}" class="people-added-container">
                    <div class="delete-person">
                        <div class="delete-person-bin"></div>
                    </div>    
                    <div class="people-added-content-container">    
                            <div class="people-added-img"></div>
                                <h2>${people.title}</h2>
                            </div>
                        <button class="people-added-add-info">+</button>
                    </li>
                `;
                html += li
            });
            peopleList.innerHTML = html;
        }

        const wishesInput = (data) => {
            let html = '';
            data.forEach(doc => {
                const people = doc.data();
                const li = `
                    <li data-id="${doc.id}" class="people-added-container">
                    <div class="delete-person">
                        <div class="delete-person-bin"></div>
                    </div>    
                    <div class="people-added-content-container">    
                            <div class="people-added-img"></div>
                                <h2>${wishes.title}</h2>
                            </div>
                        <button class="people-added-add-info">+</button>
                    </li>
                `;
                html += li
            });
            peopleList.innerHTML = html;
        }

        //Get data for "Gaver til andre"

        people.where('customid', '==', user.uid).orderBy('title').onSnapshot(snapshot => {
            peopleInput(snapshot.docs);
        });

        people.doc(doc.id).collection('wishes').orderBy('title').onSnapshot(snapshot => {
            wishesInput(snapshot.docs);
        });
        // people.where('customid', '==', user.uid).orderBy('title').onSnapshot((snapshot) => {
        //     snapshot.docs.forEach(doc => {
        //         peopleInput(doc);
        //     });
        // });
            //Deleting data
        
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
        })
    })

