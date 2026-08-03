/*====================================

BITCRAFT TECH QUIZ REGISTRATION

====================================*/

const form = document.getElementById("techQuizForm");

const submitBtn = document.getElementById("submitBtn");

const paymentCheckbox =
    document.getElementById("paymentConfirm");


/*====================================

COMMON UTILITIES

====================================*/

FormUtils.phone(
    "input[name='Contact Number']"
);

const checkUniqueID =
    FormUtils.uniqueIDs(
        "input[name='Unique ID']"
    );

FormUtils.utr("#utr");

FormUtils.copyUPI(
    "copyUPI",
    "upiID"
);

const checkUniqueIDs = FormUtils.uniqueIDs(
    "input[name*='Unique ID']"
);


/*====================================

TECH QUIZ VALIDATION

====================================*/

function validateTechQuiz(){

    const required =
        document.querySelectorAll(
            "#techQuizForm input[required]"
        );

    const allFilled =
        [...required].every(input=>{

            if(input.type === "checkbox")
                return true;

            return input.value.trim() !== "";

        });

    return (

        allFilled &&

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

    validator: validateTechQuiz

});


/*====================================

SUBMIT

====================================*/

FormUtils.submit({

    form,

    submitBtn,

    sessionKey: "techQuizSubmitted",

    validator: validateTechQuiz

});


/*====================================

SESSION

====================================*/

FormUtils.session({

    form,

    submitBtn,

    key: "techQuizSubmitted",

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