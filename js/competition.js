/* ============================================================
   BITCRAFT / ORBIT
   COMPETITION STANDINGS
   competition.js
============================================================ */


/* ============================================================
   ELEMENTS
============================================================ */

const competitionEvents =
    document.getElementById("competitionEvents");

const eventTabs =
    document.querySelectorAll(".event-tab");


/* ============================================================
   DATA
============================================================ */

let competitionData = null;


/* ============================================================
   LOAD JSON
============================================================ */

async function loadCompetitionData() {

    try {

        const response =
            await fetch("js/participant.json");

        if (!response.ok) {

            throw new Error(
                "Unable to load competition.json"
            );

        }

        competitionData =
            await response.json();


        renderCompetition();


    }

    catch (error) {

        console.error(
            "Competition data error:",
            error
        );


        competitionEvents.innerHTML = `

            <div class="competition-empty">

                Unable to load competition data.

                Please try again later.

            </div>

        `;

    }

}


/* ============================================================
   RENDER COMPETITION
============================================================ */

function renderCompetition(
    selectedEvent = "all"
) {

    if (!competitionData) return;


    competitionEvents.innerHTML = "";


    const events =
        competitionData.events;


    Object.entries(events).forEach(
        ([eventId, event]) => {

            if (
                selectedEvent !== "all" &&
                selectedEvent !== eventId
            ) {

                return;

            }


            const card =
                createEventCard(
                    eventId,
                    event
                );


            competitionEvents.appendChild(card);

        }
    );

}


/* ============================================================
   CREATE EVENT CARD
============================================================ */

function createEventCard(
    eventId,
    event
) {

    const card =
        document.createElement("article");


    card.className =
        "competition-event-card";


    /* ----------------------------------------
       EVENT COUNT
    ---------------------------------------- */

    const count =
        event.registeredCount ?? 0;


    const countLabel =
        getCountLabel(event);


    /* ----------------------------------------
       CARD HEADER
    ---------------------------------------- */

    card.innerHTML = `

        <div class="event-card-header">

            <div class="event-card-title">

                <h3>
                    ${escapeHTML(event.name)}
                </h3>

                <p>
                    ${getEventTypeLabel(event)}
                </p>

            </div>


            <div class="event-count">

                <strong>
                    ${count}
                </strong>

                <span>
                    ${countLabel}
                </span>

            </div>

        </div>


        <div class="event-stage">

            ${getStageLabel()}

        </div>


        <div class="competition-content">

        </div>

    `;


    const content =
        card.querySelector(
            ".competition-content"
        );


    /* ----------------------------------------
       GAMING
    ---------------------------------------- */

    if (
        eventId === "gaming" &&
        event.games
    ) {

        renderGaming(
            content,
            event
        );

    }


    /* ----------------------------------------
       INDIVIDUAL EVENT
    ---------------------------------------- */

    else if (
        event.type === "individual"
    ) {

        renderParticipants(
            content,
            event
        );

    }


    /* ----------------------------------------
       TEAM EVENT
    ---------------------------------------- */

    else if (
        event.teams
    ) {

        renderTeams(
            content,
            event
        );

    }


    return card;

}


/* ============================================================
   EVENT TYPE LABEL
============================================================ */

function getEventTypeLabel(event) {

    if (
        event.type === "individual"
    ) {

        return "Individual Event";

    }


    return "Team Event";

}


/* ============================================================
   COUNT LABEL
============================================================ */

function getCountLabel(event) {

    if (
        event.type === "individual"
    ) {

        return "Participants";

    }


    return "Teams";

}


/* ============================================================
   CURRENT STAGE
============================================================ */

function getStageLabel() {

    const stage =
        competitionData?.techfest?.currentStage
        || "elimination";


    const stages = {

        registration:
            "Registration",

        elimination:
            "Elimination Round",

        semifinal:
            "Semi Final",

        final:
            "Final",

        completed:
            "Completed"

    };


    return (
        stages[stage]
        || stage
    );

}


/* ============================================================
   RENDER TEAM EVENT
============================================================ */

function renderTeams(
    container,
    event
) {

    const teams =
        event.teams || [];


    if (!teams.length) {

        showEmptyMessage(
            container,
            "Team information will be announced soon."
        );

        return;

    }


    const list =
        document.createElement("div");


    list.className =
        "competition-list";


    teams.forEach(
        (team, index) => {

            const teamCard =
                createTeamCard(
                    team,
                    index,
                    event
                );


            list.appendChild(teamCard);

        }
    );


    container.appendChild(list);

}


/* ============================================================
   CREATE TEAM CARD
============================================================ */

function createTeamCard(
    team,
    index,
    event
) {

    const element =
        document.createElement("div");


    element.className =
        "competition-team";


    const teamName =
        team.teamName?.trim()
            ? team.teamName
            : `Team ${index + 1}`;


    const status =
        team.status || "registered";


    if (
        status === "winner"
    ) {

        element.classList.add(
            "is-winner"
        );

    }


    const members =
        Array.isArray(team.members)
            ? team.members.filter(
                member =>
                    member &&
                    member.trim()
            )
            : [];


    let membersHTML = "";


    /*
        Only show members when
        displayMembers is true.
    */

    if (
        event.displayMembers &&
        members.length
    ) {

        membersHTML = `

            <div class="team-members">

                ${members.map(
                    member => `

                        <span class="team-member">

                            ${escapeHTML(member)}

                        </span>

                    `
                ).join("")}

            </div>

        `;

    }


    element.innerHTML = `

        <span class="team-number">

            ${String(index + 1).padStart(2, "0")}

        </span>


        <span class="team-name">

            ${escapeHTML(teamName)}

        </span>


        ${membersHTML}


        <span class="team-status ${status}">

            ${formatStatus(status)}

        </span>

    `;


    return element;

}


/* ============================================================
   RENDER INDIVIDUAL PARTICIPANTS
============================================================ */

function renderParticipants(
    container,
    event
) {

    const participants =
        event.participants || [];


    if (!participants.length) {

        showEmptyMessage(
            container,
            "Participant information will be announced soon."
        );

        return;

    }


    const list =
        document.createElement("div");


    list.className =
        "competition-list";


    participants.forEach(
        (participant, index) => {

            const element =
                document.createElement("div");


            element.className =
                "competition-team";


            const status =
                participant.status
                || "registered";


            if (
                status === "winner"
            ) {

                element.classList.add(
                    "is-winner"
                );

            }


            const participantName =
                participant.name?.trim()
                    ? participant.name
                    : `Participant ${index + 1}`;


            element.innerHTML = `

                <span class="team-number">

                    ${String(index + 1).padStart(2, "0")}

                </span>


                <span class="team-name">

                    ${escapeHTML(
                        participantName
                    )}

                </span>


                <span class="team-status ${status}">

                    ${formatStatus(status)}

                </span>

            `;


            list.appendChild(element);

        }
    );


    container.appendChild(list);

}


/* ============================================================
   RENDER GAMING
============================================================ */

function renderGaming(
    container,
    event
) {

    const games =
        event.games || {};


    Object.entries(games).forEach(
        ([gameName, gameData]) => {

            const category =
                document.createElement("div");


            category.className =
                "game-category";


            const title =
                document.createElement("div");


            title.className =
                "game-category-title";


            title.innerHTML = `

                <span>
                    ${escapeHTML(gameName)}
                </span>

            `;


            category.appendChild(title);


            const teams =
                gameData.teams || [];


            if (!teams.length) {

                const empty =
                    document.createElement("div");


                empty.className =
                    "competition-empty";


                empty.textContent =
                    "Teams will be announced soon.";


                category.appendChild(
                    empty
                );


                container.appendChild(
                    category
                );


                return;

            }


            const list =
                document.createElement("div");


            list.className =
                "competition-list";


            teams.forEach(
                (team, index) => {

                    const element =
                        createGamingTeamCard(
                            team,
                            index
                        );


                    list.appendChild(
                        element
                    );

                }
            );


            category.appendChild(
                list
            );


            container.appendChild(
                category
            );

        }
    );

}


/* ============================================================
   GAMING TEAM CARD
============================================================ */

function createGamingTeamCard(
    team,
    index
) {

    const element =
        document.createElement("div");


    element.className =
        "competition-team";


    const teamName =
        team.teamName?.trim()
            ? team.teamName
            : `Team ${index + 1}`;


    const status =
        team.status || "registered";


    if (
        status === "winner"
    ) {

        element.classList.add(
            "is-winner"
        );

    }


    element.innerHTML = `

        <span class="team-number">

            ${String(index + 1).padStart(2, "0")}

        </span>


        <span class="team-name">

            ${escapeHTML(teamName)}

        </span>


        <span class="team-status ${status}">

            ${formatStatus(status)}

        </span>

    `;


    return element;

}


/* ============================================================
   STATUS FORMAT
============================================================ */

function formatStatus(status) {

    const labels = {

        registered:
            "Registered",

        eliminated:
            "Eliminated",

        semifinal:
            "Semi Final",

        "semi-final":
            "Semi Final",

        final:
            "Final",

        winner:
            "Winner"

    };


    return (
        labels[status]
        || status
    );

}


/* ============================================================
   EMPTY MESSAGE
============================================================ */

function showEmptyMessage(
    container,
    message
) {

    const empty =
        document.createElement("div");


    empty.className =
        "competition-empty";


    empty.textContent =
        message;


    container.appendChild(
        empty
    );

}


/* ============================================================
   TAB FILTER
============================================================ */

eventTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            eventTabs.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            tab.classList.add(
                "active"
            );


            const selectedEvent =
                tab.dataset.event;


            renderCompetition(
                selectedEvent
            );

        }
    );

});


/* ============================================================
   ESCAPE HTML
============================================================ */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   START
============================================================ */

loadCompetitionData();