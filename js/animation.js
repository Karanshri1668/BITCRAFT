lucide.createIcons();

// const hero=document.querySelector(".hero");

// const orbit=document.querySelector(".orbit-wrapper");

// hero.addEventListener("mousemove",(e)=>{

//     const x=(e.clientX/window.innerWidth-.5)*30;

//     const y=(e.clientY/window.innerHeight-.5)*30;

//     orbit.style.transform=

//     `rotateX(${-y}deg)
//      rotateY(${x}deg)`;

// });

gsap.from(".bg-title",{

    opacity:0,

    scale:1.4,

    duration:1.5

});

gsap.from(".center-content h1",{

    y:80,

    opacity:0,

    duration:1,

    delay:.3

});

gsap.from(".center-content span",{

    opacity:0,

    y:40,

    delay:.6

});

gsap.from(".center-content p",{

    opacity:0,

    y:40,

    delay:.8

});

// gsap.from(".buttons button",{

//     opacity:0,

//     y:50,

//     stagger:.2,

//     delay:1

// });

gsap.from(".logo-box",{

    opacity:0,

    scale:.5,

    stagger:.2,

    delay:1.2

});