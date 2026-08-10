/* ========================================
   BITCRAFT REGISTRATION DEADLINE POPUP
======================================== */

const deadlinePopup =
    document.getElementById("deadlinePopup");

const deadlineClose =
    document.getElementById("deadlineClose");

const deadlineBtn =
    document.querySelector(".deadline-btn");


/* ========================================
   SETTINGS
======================================== */

const registrationDeadline =
    new Date("August 15, 2026 23:59:59");

const popupStorageKey =
    "bitcraftDeadlinePopupClosed";


/* ========================================
   CHECK DEADLINE
======================================== */

function checkRegistrationDeadline(){

    const now = new Date();

    /*
        Deadline has passed
    */

    if(now >= registrationDeadline){

        deadlinePopup.style.display = "none";

        return;

    }


    /*
        User has already closed
        the popup previously
    */

    const popupClosed =
        localStorage.getItem(
            popupStorageKey
        );


    if(popupClosed === "true"){

        deadlinePopup.style.display = "none";

        return;

    }


    /*
        Show popup
    */

    deadlinePopup.style.display = "flex";

}


/* ========================================
   CLOSE POPUP
======================================== */

function closeDeadlinePopup(){

    deadlinePopup.style.display = "none";


    /*
        Remember that the user
        has already seen/dismissed it.
    */

    localStorage.setItem(
        popupStorageKey,
        "true"
    );

}


/* ========================================
   CLOSE BUTTON
======================================== */

deadlineClose.addEventListener(
    "click",
    closeDeadlinePopup
);


/* ========================================
   EXPLORE EVENTS BUTTON
======================================== */

deadlineBtn.addEventListener(
    "click",
    closeDeadlinePopup
);


/* ========================================
   CLICK OUTSIDE POPUP
======================================== */

deadlinePopup.addEventListener(
    "click",
    (event) => {

        if(event.target === deadlinePopup){

            closeDeadlinePopup();

        }

    }
);


/* ========================================
   INITIAL CHECK
======================================== */

window.addEventListener(
    "load",
    checkRegistrationDeadline
);
