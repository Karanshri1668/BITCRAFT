/*====================================

BITCRAFT AI PROMPT BATTLE

====================================*/

const form = document.getElementById("promptBattleForm");

const submitBtn = document.getElementById("submitBtn");

const paymentCheckbox =
document.getElementById("paymentConfirm");


/*====================================

COMMON UTILITIES

====================================*/

FormUtils.phone(
    "input[type='tel']"
);

FormUtils.email(
    "input[type='email']"
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

AI PROMPT VALIDATION

====================================*/

function validatePromptBattle(){

    const requiredInputs =
        document.querySelectorAll(

            "#promptBattleForm input[required]"

        );


    const allFilled =
        [...requiredInputs].every(input=>{

            if(input.type === "checkbox")
                return true;

            return input.value.trim() !== "";

        });


    return (

    allFilled &&

    checkUniqueIDs() &&

    FormUtils.validateUTR(
        document.getElementById("utr").value
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

    validator:validatePromptBattle

});


/*====================================

SUBMIT

====================================*/

FormUtils.submit({

    form,

    submitBtn,

    sessionKey:"aiPromptSubmitted",

    validator:validatePromptBattle

});


/*====================================

SESSION

====================================*/

FormUtils.session({

    form,

    submitBtn,

    key:"aiPromptSubmitted",

    buttonText:"Register Team"

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