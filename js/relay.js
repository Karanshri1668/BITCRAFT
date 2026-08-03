/*====================================

BITCRAFT RELAY REGISTRATION

====================================*/

const form = document.getElementById("relayForm");

const submitBtn = document.getElementById("submitBtn");


/*====================================

COMMON UTILITIES

====================================*/

FormUtils.phone(
    "input[name*='Contact']"
);

const checkUniqueIDs =
    FormUtils.uniqueIDs(
        "input[name*='Unique ID']"
    );


/*====================================

RELAY VALIDATION

====================================*/

function validateRelay(){

    const requiredInputs =
        document.querySelectorAll(
            "#relayForm input[required]"
        );

    const allFilled =
        [...requiredInputs].every(input =>

            input.value.trim() !== ""

        );

    return (

        allFilled &&

        checkUniqueIDs()

    );

}


/*====================================

WATCH FORM

====================================*/

FormUtils.watchForm({

    form,

    submitBtn,

    validator: validateRelay

});


/*====================================

SUBMIT

====================================*/

FormUtils.submit({

    form,

    submitBtn,

    sessionKey: "relaySubmitted",

    validator: validateRelay

});


/*====================================

SESSION

====================================*/

FormUtils.session({

    form,

    submitBtn,

    key: "relaySubmitted",

    buttonText: "Register Team"

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