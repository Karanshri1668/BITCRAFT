const eventDate = new Date("August 20, 2026 08:00:00").getTime();
// 👆 Change this to your TechFest date

function updateCountdown(){

    const now = new Date().getTime();

    const distance = eventDate - now;

    if(distance < 0){

        document.querySelector(".countdown-container").innerHTML =
        "<h2>EVENT LIVE 🚀</h2>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent =
        String(days).padStart(2,"0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2,"0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2,"0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2,"0");

}

updateCountdown();

setInterval(updateCountdown,1000);


const cards=document.querySelectorAll(".event-card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.setProperty("--x",x+"px");

card.style.setProperty("--y",y+"px");

});

});

document.querySelectorAll(".event-card").forEach(card=>{

card.addEventListener("click",()=>{

const id=card.dataset.id;

window.location.href=`event.html?id=${id}`;

});

});


/*======================================
    BITCRAFT HERO INTERACTIONS
======================================*/

const hero = document.querySelector(".hero");
const glow = document.querySelector(".mouse-glow");
const pixels = document.querySelectorAll(".pixel");
const bgTitle = document.querySelector(".bg-title");

/*======================================
    MOUSE GLOW
======================================*/

hero.addEventListener("mousemove", (e) => {

    const rect = hero.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.left = x + "px";
    glow.style.top = y + "px";

});

/*======================================
    PIXEL PARALLAX
======================================*/

hero.addEventListener("mousemove", (e)=>{

    const rect = hero.getBoundingClientRect();

    const x = (e.clientX - rect.width/2) / rect.width;
    const y = (e.clientY - rect.height/2) / rect.height;

    pixels.forEach((pixel,index)=>{

        const speed = (index % 5 + 1) * 4;

        pixel.style.transform = `translate(${x*speed}px, ${y*speed}px)`;

    });

});

/*======================================
    HERO ENTRANCE
======================================*/

window.addEventListener("load",()=>{

    document.querySelectorAll(".hero-content > *").forEach((item,index)=>{

        item.animate([

            {
                opacity:0,
                transform:"translateY(40px)"
            },

            {
                opacity:1,
                transform:"translateY(0)"
            }

        ],{

            duration:700,

            delay:index*120,

            easing:"ease-out",

            fill:"forwards"

        });

    });

});

/*======================================
    WATERMARK FLOAT
======================================*/

let position = 0;
let direction = 1;

function animateTitle(){

    position += direction * 0.15;

    if(position > 15) direction = -1;
    if(position < -15) direction = 1;

    bgTitle.style.transform =
        `translate(-50%, -50%) translateX(${position}px)`;

    requestAnimationFrame(animateTitle);

}

animateTitle();

/*======================================
    BUTTON RIPPLE
======================================*/

// document.querySelectorAll(".primary,.secondary").forEach(button=>{

//     button.addEventListener("click",function(e){

//         const ripple = document.createElement("span");

//         const size = Math.max(this.clientWidth,this.clientHeight);

//         ripple.style.width = ripple.style.height = size+"px";

//         ripple.style.left =
//             e.offsetX - size/2 + "px";

//         ripple.style.top =
//             e.offsetY - size/2 + "px";

//         ripple.classList.add("ripple");

//         this.appendChild(ripple);

//         setTimeout(()=>{

//             ripple.remove();

//         },600);

//     });

// });





// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navRight = document.getElementById('navRight');
const navOverlay = document.getElementById('navOverlay');

function closeNav(){
    navToggle.classList.remove('active');
    navRight.classList.remove('open');
    navOverlay.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
}

navToggle.addEventListener('click', () => {
    const isOpen = navRight.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navOverlay.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navOverlay.addEventListener('click', closeNav);

document.querySelectorAll('.nav-right a, .nav-right button').forEach(el => {
    el.addEventListener('click', closeNav);
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
// window.addEventListener("scroll", () => {
//     console.log(window.scrollY);
// });
