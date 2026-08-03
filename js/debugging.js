/*====================================

BITCRAFT DEBUGGING REGISTRATION

====================================*/

const form = document.getElementById("debuggingForm");

const submitBtn = document.getElementById("submitBtn");

const paymentCheckbox =
    document.getElementById("paymentConfirm");


/*====================================

COMMON UTILITIES

====================================*/

FormUtils.phone(
    "input[name='Participant Contact']"
);

const checkUniqueID =
    FormUtils.uniqueIDs(
        "input[name='Participant Unique ID']"
    );

FormUtils.utr("#utr");

FormUtils.copyUPI(
    "copyUPI",
    "upiID"
);


/*====================================

DEBUGGING VALIDATION

====================================*/

function validateDebugging(){

    const name =
        document.querySelector(
            "input[name='Participant Name']"
        ).value.trim();

    const className =
        document.querySelector(
            "input[name='Participant Class']"
        ).value.trim();

    return (

        name &&

        className &&

        checkUniqueID() &&

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

    validator: validateDebugging

});


/*====================================

SUBMIT

====================================*/

FormUtils.submit({

    form,

    submitBtn,

    sessionKey: "debuggingSubmitted",

    validator: validateDebugging

});


/*====================================

SESSION

====================================*/

FormUtils.session({

    form,

    submitBtn,

    key: "debuggingSubmitted",

    buttonText: "Register"

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