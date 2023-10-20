/**
 * Custome code for impress-logo.html goes here
 */




// Reference variables for impress api stuff.
var api;
var root;
var util;
var gc;

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




// Waits for impress to be initialized and removes the SVG lines if it is IOS.
document.addEventListener("impress:init", function (event) {
    api = event.detail.api;
    root = event.target;
    gc = event.detail.gc;
    util = api.lib.util;

    if (iOS()) {
        // console.log('Is iOS.');
        var logoLines = document.getElementById('logoLines');
        var logoPng = document.getElementById('logoPng');

        if (logoLines != null) {
            logoLines.remove();
            // logoLines.classList.add('d-none');
        }

        if (logoPng != null) {
            logoPng.classList.remove('d-none');
        }
    }

});

// This function shows or hides the content inside the circle and also the text next to the logo.
// It listens for a step enter or step leave to hide or unhide the contents.
(function (document, window) {
    "use strict";

    // This variable is used to reference the circle elem we are expecting to get to.
    var destinationElem = null;

    // Listens for user to enter a step.
    document.addEventListener("impress:stepenter", function (event) {
        var currentElem = event.target;
        var nextElem = root.querySelector(".active");

        // console.log("Element we got to: " + currentElem.id);

        // If the expected circle elem is not the element we got to, hide and show the text appropriatly.
        if (currentElem != destinationElem && destinationElem != null) {
            // console.log('Current element and destination element not equal.');
            // If the elem we never go to is not the overview, set the text back to default.
            if (destinationElem.id != "overview") {
                destinationElem.childNodes[1].childNodes[3].classList.remove("visible");
                destinationElem.childNodes[1].childNodes[3].classList.add("hidden");

                destinationElem.childNodes[1].childNodes[1].classList.remove("hidden");
                destinationElem.childNodes[1].childNodes[1].classList.add("visible");
            }

            // If the current elem is not the over view, show the text.
            if (currentElem.id != "overview") {
                currentElem.childNodes[1].childNodes[1].classList.remove("visible");
                currentElem.childNodes[1].childNodes[1].classList.add("hidden");

                currentElem.childNodes[1].childNodes[3].classList.remove("hidden");
                currentElem.childNodes[1].childNodes[3].classList.add("visible");
            }

            // If the current elem is the overview, show the text next to the logo.
            if (currentElem.id == "overview") {
                document.getElementById("title-cont").classList.remove("hidden");
                document.getElementById("title-cont").classList.add("visible");
            }

            // If the expected elem is the overview, but we do not get there, hide the text.
            if (destinationElem.id == "overview")
            {
                document.getElementById("title-cont").classList.add("hidden");
                document.getElementById("title-cont").classList.remove("visible");
            }

        }

        destinationElem = null;

    });

    // Listens when user leaves a step.
    document.addEventListener("impress:stepleave", function (event) {
        var currentElem = event.target;
        var nextElem = root.querySelector(".active");

        // Cache the circle elem we are expecting to get to.
        if (destinationElem == null) {
            destinationElem = nextElem;
            // console.log("Destentation element: " + destinationElem.id);
        }

        // console.log("Next Element: " + nextElem.id);

        // If we are leaving an element that is a circle, show the contents appropriatly.
        if (currentElem.id != "overview") {
            currentElem.childNodes[1].childNodes[3].classList.remove("visible");
            currentElem.childNodes[1].childNodes[3].classList.add("hidden");

            currentElem.childNodes[1].childNodes[1].classList.remove("hidden");
            currentElem.childNodes[1].childNodes[1].classList.add("visible");
        }

        // If we are going to an element that is a circle, show the contents appropreiatly.
        if (nextElem.id != "overview") {
            nextElem.childNodes[1].childNodes[1].classList.remove("visible");
            nextElem.childNodes[1].childNodes[1].classList.add("hidden");

            nextElem.childNodes[1].childNodes[3].classList.remove("hidden");
            nextElem.childNodes[1].childNodes[3].classList.add("visible");
        }

        // If we are leaving the overview, hide the title text next to it.
        if (currentElem.id == "overview") {
            document.getElementById("title-cont").classList.add("hidden");
            document.getElementById("title-cont").classList.remove("visible");
            return;
        }

        // If we are going to the overview, start showing the text next to it.
        if (nextElem.id == "overview") {
            document.getElementById("title-cont").classList.add("visible");
            document.getElementById("title-cont").classList.remove("hidden");
        }

    });

})(document, window);