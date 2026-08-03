/*====================================

BITCRAFT BGMI REGISTRATION

====================================*/

const form = document.getElementById("bgmiForm");

const submitBtn = document.getElementById("submitBtn");

const paymentCheckbox =
document.getElementById("paymentConfirm");


/*====================================

COMMON UTILITIES

====================================*/

FormUtils.phone(
    "input[name='Leader Phone']"
);

FormUtils.email(
    "input[name='Leader Email']"
);

const checkUniqueIDs = FormUtils.uniqueIDs(
    "input[name*='Unique ID']"
);

FormUtils.utr("#utr");

FormUtils.copyUPI(
    "copyUPI",
    "upiID"
);


/*====================================

BGMI VALIDATION

====================================*/

function validateBGMI(){

    const squadName =
        document.querySelector(
            "input[name='Squad Name']"
        ).value.trim();


    const leader =
        document.querySelector(
            "input[name='Leader Name']"
        ).value.trim();


    const phone =
        document.querySelector(
            "input[name='Leader Phone']"
        ).value.trim();


    const email =
        document.querySelector(
            "input[name='Leader Email']"
        ).value.trim();


    const game =
        document.querySelector(
            "select[name='game']"
        ).value.trim();


    const requiredPlayers =
        document.querySelectorAll(
            "tbody tr:not(:last-child) input"
        );


    const playersValid =
        [...requiredPlayers].every(

            input => input.value.trim() !== ""

        );


    return (

        squadName &&

        leader &&

        phone.length === 10 &&

        email &&

        game &&

        playersValid &&

        FormUtils.validateUTR(

            document
            .getElementById("utr")
            .value

        ) &&

        paymentCheckbox.checked

    );

}


/*====================================

WATCH FORM

====================================*/

FormUtils.watchForm({

    form,

    submitBtn,

    validator:validateBGMI

});


/*====================================

SUBMIT

====================================*/

FormUtils.submit({

    form,

    submitBtn,

    sessionKey:"bgmiSubmitted",

    validator:validateBGMI

});


/*====================================

SESSION

====================================*/

FormUtils.session({

    form,

    submitBtn,

    key:"bgmiSubmitted",

    buttonText:"Register Squad"

});


/*======================================
    UNIQUE ID POPUP
======================================*/

const popup =
document.getElementById("popupOverlay");

const closePopup =
document.getElementById("closePopup");


window.addEventListener("load",()=>{

    popup.style.display="flex";

});


closePopup.addEventListener("click",()=>{

    popup.classList.add("hide");

    setTimeout(()=>{

        popup.style.display="none";

    },300);

});