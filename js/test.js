let people = db.collection('people');

auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        console.log(user.uid);
        
        const peopleForm = document.querySelector('#people-form');

        peopleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        people.add({
            title: peopleForm.title.value,
            customid: 'yello'
        }).then(() => {
            //Reset form
            peopleForm.reset();
            location.reload();
            $('.pop-up__show').removeClass('pop-up__show')
        }).catch(err => {
            console.log('nope')
        });
    });
    }else {
            console.log('User logged out!');
        }
});

// //Get data for "Gaver til andre"
// people.where('customid', '==', user.uid).onSnapshot((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         const html = `
//         <div class="people-added-container">
//             <div class="people-added-img"></div>
//             <div class="people-added-content-container">    
//                 <h2>Tilføj person</h2>
//                 <div class="people-added-content-edit"></div>
//             </div>
//             <button class="people-added-add-info">+</button>
//         </div>
//         `;
//     });
// });




    // const peopleForm = document.querySelector('#people-form');

    // peopleForm.addEventListener('submit', (e) => {
    // e.preventDefault();
    // people.add({
    //     name: peopleForm.name.value,
    //     customid: 'user.uid'
    // }).then(() => {
    //     //Reset form
    //     peopleForm.reset();
    //     location.reload();
    //     $('.pop-up__show').removeClass('pop-up__show')
    // }).catch(err => {
    //     console.log(err.message)
    // });