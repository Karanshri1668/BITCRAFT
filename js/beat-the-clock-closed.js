/* ============================================================
   BITCRAFT
   BEAT-THE-CLOCK — ENTRY CLOSED
============================================================ */

window.addEventListener("load", () => {

    const elements = [

        document.querySelector(".festival-badge"),

        document.querySelector(".clock-icon"),

        document.querySelector(".status"),

        document.querySelector(".content h1"),

        document.querySelector(".message"),

        document.querySelector(".notice"),

        document.querySelector(".bottom-message"),

        document.querySelector(".buttons")

    ];


    elements.forEach((element, index) => {

        if (!element) return;

        element.animate(

            [
                {
                    opacity: 0,

                    transform:
                        "translateY(25px)"

                },

                {
                    opacity: 1,

                    transform:
                        "translateY(0)"

                }

            ],

            {
                duration: 650,

                delay: index * 100,

                easing:
                    "cubic-bezier(.2,.8,.2,1)",

                fill: "forwards"

            }

        );

    });


    /* Clock hands movement */

    const minute =
        document.querySelector(".clock-hand.minute");

    const hour =
        document.querySelector(".clock-hand.hour");


    let minuteRotation = 125;

    let hourRotation = 35;


    setInterval(() => {

        minuteRotation += 6;

        hourRotation += .5;


        minute.style.transform =
            `translateX(-50%) rotate(${minuteRotation}deg)`;


        hour.style.transform =
            `translateX(-50%) rotate(${hourRotation}deg)`;


    }, 1000);

});