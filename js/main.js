const giftList = document.querySelector('.gifts');
const accountDetails = document.querySelector('.account-details');



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

$(".bottom-add-gift_btn").click(function(){
    $(".add-gift__popup").toggleClass("pop-up__show--gifts");
    $(".backdrop").toggleClass("pop-up__show")
});

$(".bottom-add-people_btn").click(function(){
    $(".add-people__popup").toggleClass("pop-up__show--people");
    $(".backdrop").toggleClass("pop-up__show")
});

$(".backdrop").click(function(){
    $(".add-gift__popup").removeClass("pop-up__show--gifts");
    $(".add-people__popup").removeClass("pop-up__show--people");
    $(".backdrop").toggleClass("pop-up__show")
});


$(".bottom-link__wishlist").click(function(){
    $(".people").addClass("people-out");
});

$(".bottom-link__wishlist").click(function(){
    $(".people").addClass("people-out");
    $(".bottom-link__wishlist").addClass("wishlist-icon-active");
    $(".bottom-link__people").removeClass("people-icon-active");
    setTimeout (
        function() {
            $(".people").addClass("people-out");
            $(".bottom-add-gift_btn").removeClass("content-hide");
            $(".people-added-container").addClass("content-hide");
            $(".bottom-add-people_btn").addClass("content-hide");
            $(".gifts-added-container").removeClass("content-hide");
            $(".wishlist-heading").removeClass("content-hide");
            $(".people-heading").addClass("content-hide");
            $(".people").removeClass("people-out");
        }, 500
    );
});

$(".bottom-link__people").click(function(){
    $(".gifts").addClass("gifts-out");
    $(".bottom-link__people").addClass("people-icon-active");
    $(".bottom-link__wishlist").removeClass("wishlist-icon-active");
    setTimeout (
        function() {
            $(".bottom-add-people_btn").removeClass("content-hide");
            $(".bottom-add-gift_btn").addClass("content-hide");
            $(".people-added-container").removeClass("content-hide");
            $(".gifts-added-container").addClass("content-hide");
            $(".people-heading").removeClass("content-hide");
            $(".wishlist-heading").addClass("content-hide");
            $(".gifts").removeClass("gifts-out");
        }, 500
    );
});

$(".side-link__wishes").click(function(){
    $(".side-link__wishes").addClass("side-link__wishes--active");
    $(".side-link__people").removeClass("side-link__people--active");
    $(".side-link__settings").removeClass("side-link__settings--active");
    $(".bottom-add-people_btn").addClass("content-hide");
    $(".bottom-add-gift_btn").removeClass("content-hide");

    $(".people-added-container").addClass("content-hide");
    $(".gifts-added-container").removeClass("content-hide");
    $(".wishlist-heading").removeClass("content-hide");
    $(".people-heading").addClass("content-hide");
    $(".settings-heading").addClass("content-hide");
    $(".settings-container").removeClass("settings-container-open");

});

$(".side-link__people").click(function(){
    $(".side-link__people").addClass("side-link__people--active");
    $(".side-link__wishes").removeClass("side-link__wishes--active");
    $(".side-link__settings").removeClass("side-link__settings--active");
    $(".bottom-add-people_btn").removeClass("content-hide");
    $(".bottom-add-gift_btn").addClass("content-hide");

    $(".gifts-added-container").addClass("content-hide");
    $(".people-added-container").removeClass("content-hide");
    $(".wishlist-heading").addClass("content-hide");
    $(".people-heading").removeClass("content-hide");
    $(".settings-heading").addClass("content-hide");
    $(".settings-container").removeClass("settings-container-open");

});

$(".side-link__settings").click(function(){
    $(".side-link__people").removeClass("side-link__people--active");
    $(".side-link__wishes").removeClass("side-link__wishes--active");
    $(".side-link__settings").addClass("side-link__settings--active");
    $(".bottom-add-people_btn").addClass("content-hide");
    $(".bottom-add-gift_btn").addClass("content-hide");


    $(".gifts-added-container").addClass("content-hide");
    $(".people-added-container").addClass("content-hide");
    $(".wishlist-heading").addClass("content-hide");
    $(".people-heading").addClass("content-hide");
    $(".settings-heading").removeClass("content-hide");
    $(".settings-container").addClass("settings-container-open");
});

$(".test-pop").click(function(){
    $(".coming-soon").toggleClass("coming-soon--show");
});

$(".settings-open").click(function(){
    $(".settings-container").addClass("settings-container-open");
});

$(".settings-close").click(function(){
    $(".settings-container").removeClass("settings-container-open");
});


if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js')
        // .then(reg => console.log('service worker registered'))
        // .catch(err => console.log('service worker not registered', err));
    }