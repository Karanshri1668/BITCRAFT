/*==========================================================

    BITCRAFT FORM UTILITIES
    Version 1.0

==========================================================*/

class FormUtils {

    /*======================================
        CREATE MESSAGE ELEMENT
    ======================================*/

    static getMessageElement(input){

        let message =
            input.parentElement.querySelector(".field-message");

        if(!message){

            message =
                document.createElement("small");

            message.className =
                "field-message";

            input.parentElement.appendChild(message);

        }

        return message;

    }


    /*======================================
        SHOW ERROR
    ======================================*/

    static showError(input,text){

        input.classList.remove("success");

        input.classList.add("error");

        const message =
            FormUtils.getMessageElement(input);

        message.className =
            "field-message error-message";

        message.innerText =
            text;

    }


    /*======================================
        SHOW SUCCESS
    ======================================*/

    static showSuccess(

        input,

        text = "Looks good ✓"

    ){

        input.classList.remove("error");

        input.classList.add("success");

        const message =
            FormUtils.getMessageElement(input);

        message.className =
            "field-message success-message";

        message.innerText =
            text;

    }


    /*======================================
        CLEAR MESSAGE
    ======================================*/

    static clearMessage(input){

        input.classList.remove("error");

        input.classList.remove("success");

        const message =
            FormUtils.getMessageElement(input);

        message.className =
            "field-message";

        message.innerText = "";

    }


    /*======================================
        PHONE VALIDATION

        Only Numbers

        Exactly 10 Digits

    ======================================*/

    static phone(selector){

        const inputs =
            document.querySelectorAll(selector);

        inputs.forEach(input=>{

            input.addEventListener("input",()=>{

                /* Numbers Only */

                input.value =
                    input.value.replace(/\D/g,"");

                /* Maximum 10 Digits */

                input.value =
                    input.value.slice(0,10);


                if(input.value.length === 0){

                    FormUtils.clearMessage(input);

                    return;

                }


                if(input.value.length < 10){

                    FormUtils.showError(

                        input,

                        "Phone number must contain exactly 10 digits."

                    );

                }

                else{

                    FormUtils.showSuccess(

                        input,

                        "Valid phone number."

                    );

                }

            });

        });

    }

        /*======================================
        EMAIL VALIDATION
    ======================================*/

    static email(selector){

        const inputs =
            document.querySelectorAll(selector);

        inputs.forEach(input=>{

            input.addEventListener("input",()=>{

                const value =
                    input.value.trim();

                if(value === ""){

                    FormUtils.clearMessage(input);

                    return;

                }

                const regex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!regex.test(value)){

                    FormUtils.showError(

                        input,

                        "Please enter a valid email address."

                    );

                }

                else{

                    FormUtils.showSuccess(

                        input,

                        "Valid email address."

                    );

                }

            });

        });

    }


    /*======================================
        UNIQUE ID VALIDATION

        No Duplicate IDs

    ======================================*/

    static uniqueIDs(selector){

        const inputs =
            document.querySelectorAll(selector);

        function validate(){

            let valid = true;

            inputs.forEach(input=>{

                input.setCustomValidity("");

                FormUtils.clearMessage(input);

            });


            inputs.forEach((current,index)=>{

                const value =
                    current.value.trim().toLowerCase();

                if(value === "") return;

                for(let i=0;i<inputs.length;i++){

                    if(

                        i !== index &&

                        inputs[i]
                        .value
                        .trim()
                        .toLowerCase() === value

                    ){

                        valid = false;

                        current.setCustomValidity(
                            "Duplicate Unique ID"
                        );

                        FormUtils.showError(

                            current,

                            "This Unique ID is already used."

                        );

                        break;

                    }

                }

            });


            inputs.forEach(input=>{

                if(

                    input.value.trim() !== "" &&

                    input.checkValidity()

                ){

                    FormUtils.showSuccess(

                        input,

                        "Unique ID available."

                    );

                }

            });

            return valid;

        }


        inputs.forEach(input=>{

            input.addEventListener(

                "input",

                validate

            );

        });

        return validate;

    }


    /*======================================
        UTR VALIDATION

        Exactly 12 Digits

    ======================================*/

    static utr(selector){

        const input =
            document.querySelector(selector);

        if(!input) return;


        input.addEventListener("input",()=>{

            input.value =
                input.value
                .replace(/\D/g,"")
                .slice(0,12);


            if(input.value.length === 0){

                FormUtils.clearMessage(input);

                return;

            }


            if(input.value.length !== 12){

                FormUtils.showError(

                    input,

                    "UTR must contain exactly 12 digits."

                );

            }

            else{

                FormUtils.showSuccess(

                    input,

                    "Valid UTR."

                );

            }

        });

    }


    /*======================================
        CHECK VALID UTR

    ======================================*/

    static validateUTR(value){

        return /^\d{12}$/.test(value);

    }


    /*======================================
        COPY UPI

    ======================================*/

    static copyUPI(

        buttonID,

        inputID

    ){

        const button =
            document.getElementById(buttonID);

        const input =
            document.getElementById(inputID);

        if(!button || !input) return;


        button.addEventListener("click",async()=>{

            try{

                await navigator.clipboard.writeText(

                    input.value

                );

                const original =
                    button.innerText;

                button.innerText =
                    "Copied ✓";

                setTimeout(()=>{

                    button.innerText =
                        original;

                },2000);

            }

            catch{

                FormUtils.showError(

                    input,

                    "Unable to copy UPI ID."

                );

            }

        });

    }

        /*======================================
        WATCH FORM

        Automatically Enable /
        Disable Submit Button

    ======================================*/

    static watchForm({

        form,

        submitBtn,

        validator = null

    }){

        const fields =
            form.querySelectorAll(

                "input, select, textarea"

            );

        const update = ()=>{

            let valid =
                form.checkValidity();

            if(validator){

                valid =
                    valid &&
                    validator();

            }

            submitBtn.disabled =
                !valid;

        };

        fields.forEach(field=>{

            field.addEventListener(

                "input",

                update

            );

            field.addEventListener(

                "change",

                update

            );

        });

        update();

    }


    /*======================================
        SAVE SUBMISSION SESSION

    ======================================*/

    static saveSubmission(key){

        sessionStorage.setItem(

            key,

            "true"

        );

    }


    /*======================================
        SESSION HANDLER

        After Returning From
        FormBold

    ======================================*/

    static session({

        form,

        submitBtn,

        key,

        buttonText = "Register"

    }){

        window.addEventListener(

            "pageshow",

            ()=>{

                if(

                    sessionStorage.getItem(key)

                    !==

                    "true"

                ) return;


                form.reset();

                submitBtn.disabled = true;

                submitBtn.textContent =
                    "Submitted ✓";


                sessionStorage.removeItem(

                    key

                );


                setTimeout(()=>{

                    submitBtn.textContent =
                        buttonText;

                    submitBtn.disabled =
                        true;

                },3000);

            }

        );

    }


    /*======================================
        COMMON SUBMIT HANDLER

    ======================================*/

    static submit({

        form,

        submitBtn,

        sessionKey,

        validator = null

    }){

        form.addEventListener(

            "submit",

            e=>{

                if(

                    validator &&

                    !validator()

                ){

                    e.preventDefault();

                    form.reportValidity();

                    return;

                }


                if(

                    !form.checkValidity()

                ){

                    e.preventDefault();

                    form.reportValidity();

                    return;

                }


                FormUtils.saveSubmission(

                    sessionKey

                );

                submitBtn.disabled = true;

            }

        );

    }


    /*======================================
        RESET FORM

    ======================================*/

    static reset(form){

        form.reset();

    }


    /*======================================
        ENABLE BUTTON

    ======================================*/

    static enable(button){

        button.disabled = false;

    }


    /*======================================
        DISABLE BUTTON

    ======================================*/

    static disable(button){

        button.disabled = true;

    }

}