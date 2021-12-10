const giftList = document.querySelector('.gifts');
const accountDetails = document.querySelector('.account-details');


function toDashboard() {
    window.location.href = "./dashboard.html";
    console.log('hello')
};


// Setup gifts
const setupGifts = (data) => {
    let html = '';
    data.forEach(doc => {
        const gifts = doc.data();
        const li = `
            <li>
                <div class="gift-container">
                    <h2>${gifts.title}</h2>
                    <p>${gifts.content}</p>
                </div>
            </li>
        `;
        html += li
    });
    giftList.innerHTML = html;
}


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
});