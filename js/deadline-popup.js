/* ========================================
   BITCRAFT REGISTRATION DEADLINE POPUP
========================================= */

const deadlinePopup =
    document.getElementById("deadlinePopup");

const deadlineClose =
    document.getElementById("deadlineClose");

const deadlineBtn =
    document.querySelector(".deadline-btn");


/*
    Registration deadline:

    15 August 2026

    Change the time here if required.
*/

const registrationDeadline =
    new Date("August 15, 2026 23:59:59");


/* ========================================
   CHECK DEADLINE
========================================= */

function checkRegistrationDeadline(){

    const now = new Date();

    /*
        If deadline has passed,
        don't show the popup.
    */

    if(now >= registrationDeadline){

        deadlinePopup.style.display = "none";

        return;

    }


    /* Show popup */

    deadlinePopup.style.display = "flex";

}


/* ========================================
   CLOSE POPUP
========================================= */

deadlineClose.addEventListener("click",()=>{

    deadlinePopup.style.display = "none";

});


/* ========================================
   EXPLORE EVENTS
========================================= */

deadlineBtn.addEventListener("click",()=>{

    deadlinePopup.style.display = "none";

});


/* ========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

deadlinePopup.addEventListener("click",(event)=>{

    if(event.target === deadlinePopup){

        deadlinePopup.style.display = "none";

    }

});


/* ========================================
   INITIAL CHECK
========================================= */

window.addEventListener("load",()=>{

    checkRegistrationDeadline();

});