
function toDashboard() {
    window.location.href = "./dashboard.html";
    console.log('hello')
};

const giftList = document.querySelector('.gifts');

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

$(".bottom-add_btn").click(function(){
    $(".add-gift__popup").toggleClass("pop-up__show");
  });