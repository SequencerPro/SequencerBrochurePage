/**
 * Custome code for index.html goes here
 */

window.addEventListener('load',
    function () {
        if (iOS()) {
            // NOT NEEDED. OLD FUNCTIONALITY
            // Was used to change content if it was an IOS device. Now, we use bootstrap to change the content based off the screen size.
            // On small screens we show cards, on larger screens we show impress.
            // displayIOSSection();
        }
    });

// Returns true if device is IOS.
function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

// Returns true if element is in the viewport.
var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function displayIOSSection() {
    // console.log("In function");
    iosSection = document.getElementById('iosSection');
    impressIframe = document.getElementById('impressIFrame');

    // console.log(iosSection);


    if (impressIframe != null) {
        // console.log("Hiding iframe.");
        impressIframe.remove();

    }
    if (iosSection != null) {
        // console.log("Showing ios section");
        iosSection.classList.remove("d-none");

    }
}

