/* ========================================
   BITCRAFT DEADLINE POPUP
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const popup =
        document.getElementById("deadlinePopup");

    const closeBtn =
        document.getElementById("deadlineClose");

    const exploreBtn =
        document.getElementById("deadlineExplore");

    const reminder =
        document.getElementById("deadlineReminder");


    /* Safety check */

    if (
        !popup ||
        !closeBtn ||
        !exploreBtn ||
        !reminder
    ) {

        console.error(
            "BITCRAFT: Deadline popup elements not found."
        );

        return;

    }


    /* ========================================
       SETTINGS
    ======================================== */

    const deadline =
        new Date("2026-08-15T23:59:59");


    const storageKey =
        "bitcraft_deadline_popup_closed";


    /* ========================================
       SHOW POPUP
    ======================================== */

    function showPopup() {

        popup.style.display = "flex";

    }


    /* ========================================
       HIDE POPUP
    ======================================== */

    function hidePopup() {

        popup.style.display = "none";

    }


    /* ========================================
       CLOSE + REMEMBER
    ======================================== */

    function closePopup() {

        hidePopup();

        localStorage.setItem(
            storageKey,
            "true"
        );

        reminder.style.display = "flex";

    }


    /* ========================================
       CHECK STATUS
    ======================================== */

    function checkDeadline() {

        const now = new Date();


        /* Deadline passed */

        if (now > deadline) {

            hidePopup();

            reminder.style.display = "none";

            return;

        }


        /* Already closed */

        const alreadyClosed =
            localStorage.getItem(storageKey);


        if (alreadyClosed === "true") {

            hidePopup();

            reminder.style.display = "flex";

        }

        else {

            showPopup();

            reminder.style.display = "none";

        }

    }


    /* ========================================
       EVENTS
    ======================================== */

    closeBtn.addEventListener(
        "click",
        closePopup
    );


    exploreBtn.addEventListener(
        "click",
        closePopup
    );


    reminder.addEventListener(
        "click",
        showPopup
    );


    /* Close by clicking outside */

    popup.addEventListener(
        "click",
        function (event) {

            if (event.target === popup) {

                closePopup();

            }

        }
    );


    /* ========================================
       START
    ======================================== */

    checkDeadline();

});

/* ========================================
   HOURGLASS ATTENTION ANIMATION
======================================== */

const hourglass =
    document.querySelector(
        "#deadlineReminder span"
    );


setInterval(() => {

    hourglass.classList.remove("rotate");

    /*
        Force browser to restart
        the animation every time.
    */

    void hourglass.offsetWidth;

    hourglass.classList.add("rotate");

}, 4000);
