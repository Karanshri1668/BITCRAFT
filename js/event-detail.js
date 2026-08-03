// ==========================================
// ELEMENTS
// ==========================================

const page = document.getElementById("event-page");
const loader = document.getElementById("loader");
const scrollBtn = document.getElementById("scrollTop");

// ==========================================
// SCROLL BUTTON
// ==========================================

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// ==========================================
// GET EVENT ID
// ==========================================

const params = new URLSearchParams(window.location.search);

const eventId = params.get("id");

// ==========================================
// LOAD EVENT
// ==========================================

async function loadEvent() {

    try {

        const response = await fetch("js/event.json");

        if (!response.ok) {

            throw new Error("Unable to load event data.");

        }

        const data = await response.json();
        console.log("JSON Loaded:", data);
        console.log(data.eventDetails);
        console.log(data.eventDetails.days);

        let selectedEvent = null;

        let selectedDay = null;

        // Search every day

        for (const day of data.eventDetails.days) {

            const found = day.events.find(event => event.id === eventId);

            if (found) {

                selectedEvent = found;

                selectedDay = day;

                break;

            }

        }

        if (!selectedEvent) {

            showError();

            return;

        }

        renderEvent(selectedEvent, selectedDay);

    }

    catch (error) {

        console.error(error);

        showError();

    }

}

// ==========================================
// ERROR PAGE
// ==========================================

function showError() {

    page.innerHTML = `

        <div class="error-box fade-up">

            <i class="fa-solid fa-circle-exclamation"></i>

            <h2>Event Not Found</h2>

            <p>

                The event you're looking for doesn't exist
                or the link is invalid.

            </p>

            <a href="index.html#events">

                Back to Events

            </a>

        </div>

    `;

    loader.style.display = "none";

}

// ==========================================
// START
// ==========================================

loadEvent();


// ==========================================
// HERO SECTION
// ==========================================

function createHero(event, day) {

    return `

<section class="event-hero fade-up">

    <div class="event-image">

        <img src="${event.banner}"
             alt="${event.eventName}">

    </div>

    <div class="event-content">

        <div class="day-badge">

            <i class="fa-solid fa-calendar-days"></i>

            ${day.dayName || day.day}

        </div>

        <h1>${event.eventName}</h1>

        <p class="event-tagline">

            ${event.eventTagline || ""}

        </p>


        <div class="hero-info">

            <div class="hero-chip">

                <i class="fa-solid fa-calendar"></i>

                <div>

                    <small>Date</small>

                    <span>${event.date}</span>

                </div>

            </div>

            <div class="hero-chip">

                <i class="fa-solid fa-clock"></i>

                <div>

                    <small>Time</small>

                    <span>${event.time}</span>

                </div>

            </div>

            <div class="hero-chip">

                <i class="fa-solid fa-location-dot"></i>

                <div>

                    <small>Venue</small>

                    <span>${event.venue}</span>

                </div>

            </div>

            <div class="hero-chip">

                <i class="fa-solid fa-users"></i>

                <div>

                    <small>Team Size</small>

                    <span>${event.participantsPerTeam}</span>

                </div>

            </div>

        </div>
    </div>

</section>

`;

}

// ==========================================
// ABOUT SECTION
// ==========================================

function createAbout(event) {

    return `

<section class="event-section fade-up">

    <div class="card">

        <h2>

            About the Event

        </h2>

        <p>

            ${event.description}

        </p>

    </div>

</section>

`;

}

// ==========================================
// EVENT INFORMATION
// ==========================================

function createInfoCards(event) {

    return `

<section class="event-info fade-up">

    <div class="info-card">

        <i class="fa-solid fa-calendar-days"></i>

        <small>Date</small>

        <h3>${event.date}</h3>

    </div>

    <div class="info-card">

        <i class="fa-solid fa-clock"></i>

        <small>Time</small>

        <h3>${event.time}</h3>

    </div>

    <div class="info-card">

        <i class="fa-solid fa-location-dot"></i>

        <small>Venue</small>

        <h3>${event.venue}</h3>

    </div>

    <div class="info-card">

        <i class="fa-solid fa-users"></i>

        <small>Participants</small>

        <h3>${event.participantsPerTeam}</h3>

    </div>

    <div class="info-card">

        <i class="fa-solid fa-indian-rupee-sign"></i>

        <small>Registration Fee</small>

        <h3>${event.registrationFees || "Free"}</h3>

    </div>

    <div class="info-card">

        <i class="fa-solid fa-trophy"></i>

        <small>Prize</small>

        <h3>${event.prizePool || "Exciting Rewards"}</h3>

    </div>

</section>

`;

}


// ==========================================
// STAGES / TIMELINE
// ==========================================

function createStages(event) {

    if (!event.stages || event.stages.length === 0) {

        return "";

    }

    const stagesHTML = event.stages.map((stage, index) => `

        <div class="timeline-item">

            <div class="timeline-dot"></div>

            <h3>

                Stage ${index + 1} : ${stage.title}

            </h3>

            <p>

                ${stage.description}

            </p>

        </div>

    `).join("");

    return `

    <section class="event-section fade-up">

        <div class="card">

            <h2>

                Competition Stages

            </h2>

            <div class="timeline">

                ${stagesHTML}

            </div>

        </div>

    </section>

    `;

}


// ==========================================
// RELAY CHALLENGES
// ==========================================

function createRelayChallenges(event) {

    if (!event.relayChallenges || event.relayChallenges.length === 0) {

        return "";

    }

    const challengesHTML = event.relayChallenges.map((challenge, index) => `

        <div class="challenge-card">

            <div class="challenge-number">

                ${index + 1}

            </div>

            <div>

                <h4>

                    ${challenge.title}

                </h4>

                <p>

                    ${challenge.description}

                </p>

            </div>

        </div>

    `).join("");

    return `

    <section class="event-section fade-up">

        <h2 class="section-title">

            Relay Challenges

        </h2>

        <div class="challenge-grid">

            ${challengesHTML}

        </div>

    </section>

    `;

}


// ==========================================
// GAMING EVENT
// ==========================================

function createGameSection(event) {

    if (!event.game) {

        return "";

    }

    return `

    <section class="event-section fade-up">

        <div class="game-card">

            <div class="game-content">

                <h2>

                    ${event.game}

                </h2>

                <p>

                    ${event.formatAnnouncement}

                </p>

            </div> 

            <div class="game-prize">

                <h3>

                    Prize Pool

                </h3>

                <h1>

                    ${event.prizePool || "TBA"}

                </h1>

            </div>

        </div>
        &nbsp;
        <div class="game-card">

            <div class="game-content">

                <h2>

                    ${event.game2}

                </h2>

                <p>

                    ${event.formatAnnouncement || "Tournament format will be announced before the event."}

                </p>

            </div>

            <div class="game-prize">

                <h3>

                    Prize Pool

                </h3>

                <h1>

                    ${event.prizePool || "TBA"}

                </h1>

            </div>

        </div>

    </section>

    `;

}


// ==========================================
// PRIZES
// ==========================================

function createPrizes(event) {

    if (!event.prizes) {

        return "";

    }

    const medals = {
        "1st": "fa-solid fa-trophy",
        "2nd": "fa-solid fa-medal",
        "3rd": "fa-solid fa-award"
    };

    const prizesHTML = Object.entries(event.prizes).map(([position, prizeData]) => {

        return `

        <div class="prize-card">

            <div class="prize-rank">

                <i class="${medals[position] || "fa-solid fa-gift"}"></i>

            </div>

            <h3>${position} Prize</h3>

            <h2>${prizeData.cashPrize}</h2>

            <p>${prizeData.prize}</p>

        </div>

        `;

    }).join("");

    return `

    <section class="event-section fade-up">

        <h2 class="section-title">

            Prizes & Rewards

        </h2>

        <div class="prize-grid">

            ${prizesHTML}

        </div>

    </section>

    `;

}


// ==========================================
// RULES
// ==========================================

function createRules(event) {

    if (!event.rules || event.rules.length === 0) {

        return "";

    }

    const rulesHTML = event.rules.map(rule => `

        <li>

            <i class="fa-solid fa-check"></i>

            <span>${rule}</span>

        </li>

    `).join("");

    return `

    <section class="event-section fade-up">

        <div class="card">

            <h2>

                Rules & Guidelines

            </h2>

            <ul class="list">

                ${rulesHTML}

            </ul>

        </div>
<br>
         <a href="${event.registrationlink}"
           class="register-btn">

            Register Now

            <i class="fa-solid fa-arrow-right"></i>

        </a>
    </section>
    `;

}


// ==========================================
// EVENT HEADS
// ==========================================

function createEventHeads(event) {

    if (!event.eventHeads || event.eventHeads.length === 0) {

        return "";

    }

    const headsHTML = event.eventHeads.map(head => {

        const initials = head.name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();

        return `

        <div class="head-card">

            <div class="avatar">

                ${initials}

            </div>

            <h3>

                ${head.name}

            </h3>

            <p>

                Event Coordinator

            </p>

            <p>${head.contact}</p>
            <a href="tel:${head.contact}"

               class="contact-btn">

                <i class="fa-solid fa-phone"></i>

                Contact

            </a>

        </div>

        `;

    }).join("");

    return `

    <section class="event-section fade-up">

        <h2 class="section-title">

            Event Coordinators

        </h2>

        <div class="heads-grid">

            ${headsHTML}

        </div>

    </section>

    `;

}


// ==========================================
// RENDER PAGE
// ==========================================

function renderEvent(event, day) {

    page.innerHTML = `

        ${createHero(event, day)}

        ${createAbout(event)}

        ${createInfoCards(event)}

        ${createStages(event)}

        ${createRelayChallenges(event)}

        ${createGameSection(event)}

        ${createPrizes(event)}

        ${createRules(event)}

        ${createEventHeads(event)}

    `;

    // Hide Loader

    loader.style.display = "none";
    observeSections();

}


// ==========================================
// OPTIONAL FADE ANIMATION
// ==========================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {

    threshold: 0.2

});


function observeSections() {

    document.querySelectorAll(".event-section").forEach(section => {

        observer.observe(section);

    });

}