const giftList = document.querySelector('.gifts');
const accountDetails = document.querySelector('.account-details');


function toDashboard() {
    window.location.href = "./dashboard.html";
    console.log('hello')
};


const settingsUI = (user) => {
    if (user) {
        // account info
        const html = `
        <div>Logged in as ${user.email}</div>
        `;
        accountDetails.innerHTML = html;
    } else {
        //Hide account details
        accountDetails.innerHTML = '';
    }
};

$(".bottom-add_btn").click(function(){
    $(".add-gift__popup").toggleClass("pop-up__show");
    $(".backdrop").toggleClass("pop-up__show")
});

$(".backdrop").click(function(){
    $(".add-gift__popup").toggleClass("pop-up__show");
    $(".backdrop").toggleClass("pop-up__show")
});

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js')
        // .then(reg => console.log('service worker registered'))
        // .catch(err => console.log('service worker not registered', err));
    }