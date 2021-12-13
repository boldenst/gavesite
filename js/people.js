let people = db.collection('people');

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
                location.reload();
                $('.pop-up__show').removeClass('pop-up__show');
            }).catch(err => {
                console.log(err.message)
            });
        });
    } else {
        window.location.href = "./index.html";
    }
});
