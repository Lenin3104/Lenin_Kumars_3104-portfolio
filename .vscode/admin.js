
/* =====================================================
   LENIN PORTFOLIO ADMIN DASHBOARD
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       STORAGE
    ================================================= */

    function getStorage(key) {

        try {

            return JSON.parse(
                localStorage.getItem(key)
            ) || [];

        } catch (error) {

            console.error(
                "Storage Error:",
                error
            );

            return [];

        }

    }


    function getVisitors() {

        return getStorage(
            "portfolioVisitors"
        );

    }


    function getMessages() {

        return getStorage(
            "portfolioContacts"
        );

    }


    function getProjectClicks() {

        return getStorage(
            "portfolioProjectClicks"
        );

    }



    /* =================================================
       ELEMENTS
    ================================================= */

    const visitorCount =
        document.getElementById(
            "visitorCount"
        );


    const messageCount =
        document.getElementById(
            "messageCount"
        );


    const projectClickCount =
        document.getElementById(
            "projectClickCount"
        );


    const newMessageCount =
        document.getElementById(
            "newMessageCount"
        );



    /* =================================================
       STATISTICS
    ================================================= */

    function updateStats() {

        const visitors =
            getVisitors();


        const messages =
            getMessages();


        const projectClicks =
            getProjectClicks();


        visitorCount.textContent =
            visitors.length;


        messageCount.textContent =
            messages.length;


        projectClickCount.textContent =
            projectClicks.length;


        newMessageCount.textContent =
            messages.filter(
                message =>
                    message.status === "New"
            ).length;

    }



    /* =================================================
       RECENT VISITORS
    ================================================= */

    function renderRecentVisitors() {

        const container =
            document.getElementById(
                "recentVisitors"
            );


        const visitors =
            getVisitors().slice(0, 5);


        if (!visitors.length) {

            container.innerHTML = `
                <div class="empty">
                    No visitors yet.
                </div>
            `;

            return;

        }


        container.innerHTML =
            visitors.map(
                visitor => `

                    <div class="data-item">

                        <strong>
                            Portfolio Visitor
                        </strong>

                        <span>
                            ${escapeHTML(
                                visitor.date
                            )}
                        </span>

                    </div>

                `
            ).join("");

    }



    /* =================================================
       RECENT MESSAGES
    ================================================= */

    function renderRecentMessages() {

        const container =
            document.getElementById(
                "recentMessages"
            );


        const messages =
            getMessages().slice(0, 5);


        if (!messages.length) {

            container.innerHTML = `
                <div class="empty">
                    No messages yet.
                </div>
            `;

            return;

        }


        container.innerHTML =
            messages.map(
                message => `

                    <div class="data-item">

                        <strong>
                            ${escapeHTML(
                                message.name
                            )}
                        </strong>

                        <span>
                            ${escapeHTML(
                                message.subject
                            )}
                        </span>

                    </div>

                `
            ).join("");

    }



    /* =================================================
       VISITOR TABLE
    ================================================= */

    function renderVisitorTable() {

        const table =
            document.getElementById(
                "visitorTable"
            );


        const visitors =
            getVisitors();


        if (!visitors.length) {

            table.innerHTML = `
                <tr>

                    <td colspan="4">
                        No visitor data available.
                    </td>

                </tr>
            `;

            return;

        }


        table.innerHTML =
            visitors.map(
                (visitor, index) => `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${escapeHTML(
                                visitor.date
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                visitor.page
                            )}
                        </td>

                        <td>
                            ${getBrowser(
                                visitor.userAgent
                            )}
                        </td>

                    </tr>

                `
            ).join("");

    }



    /* =================================================
       MESSAGES
    ================================================= */

    function renderMessages() {

        const container =
            document.getElementById(
                "messageContainer"
            );


        const messages =
            getMessages();


        if (!messages.length) {

            container.innerHTML = `
                <div class="empty">
                    No contact requests yet.
                </div>
            `;

            return;

        }


        container.innerHTML =
            messages.map(
                message => `

                    <article
                        class="message-card">

                        <div
                            class="message-header">

                            <h3>
                                ${escapeHTML(
                                    message.name
                                )}
                            </h3>

                            <span
                                class="message-date">

                                ${escapeHTML(
                                    message.date
                                )}

                            </span>

                        </div>


                        <div
                            class="message-meta">

                            ${escapeHTML(
                                message.email
                            )}

                            <br>

                            ${escapeHTML(
                                message.subject
                            )}

                        </div>


                        <p
                            class="message-body">

                            ${escapeHTML(
                                message.message
                            )}

                        </p>


                        <span
                            class="message-status">

                            ${escapeHTML(
                                message.status
                            )}

                        </span>

                    </article>

                `
            ).join("");

    }



    /* =================================================
       PROJECT TABLE
    ================================================= */

    function renderProjectTable() {

        const table =
            document.getElementById(
                "projectTable"
            );


        const clicks =
            getProjectClicks();


        if (!clicks.length) {

            table.innerHTML = `
                <tr>

                    <td colspan="3">
                        No project clicks yet.
                    </td>

                </tr>
            `;

            return;

        }


        table.innerHTML =
            clicks.map(
                (click, index) => `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${escapeHTML(
                                click.project
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                click.date
                            )}
                        </td>

                    </tr>

                `
            ).join("");

    }



    /* =================================================
       BROWSER
    ================================================= */

    function getBrowser(userAgent) {

        if (!userAgent) {

            return "Unknown";

        }


        /* Edge FIRST */

        if (
            userAgent.includes("Edg")
        ) {

            return "Edge";

        }


        if (
            userAgent.includes("Chrome")
        ) {

            return "Chrome";

        }


        if (
            userAgent.includes("Firefox")
        ) {

            return "Firefox";

        }


        if (
            userAgent.includes("Safari")
        ) {

            return "Safari";

        }


        return "Other";

    }



    /* =================================================
       SECURITY
    ================================================= */

    function escapeHTML(value) {

        if (
            value === null ||
            value === undefined
        ) {

            return "";

        }


        return String(value)

            .replaceAll(
                "&",
                "&amp;"
            )

            .replaceAll(
                "<",
                "&lt;"
            )

            .replaceAll(
                ">",
                "&gt;"
            )

            .replaceAll(
                '"',
                "&quot;"
            )

            .replaceAll(
                "'",
                "&#039;"
            );

    }



    /* =================================================
       SIDEBAR
    ================================================= */

    const sideLinks =
        document.querySelectorAll(
            ".side-link"
        );


    const sections =
        document.querySelectorAll(
            ".admin-section"
        );


    function openSection(sectionId) {

        sections.forEach(
            section => {

                section.classList.toggle(
                    "active",
                    section.id === sectionId
                );

            }
        );


        sideLinks.forEach(
            link => {

                link.classList.toggle(
                    "active",
                    link.dataset.section ===
                    sectionId
                );

            }
        );

    }


    sideLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    openSection(
                        link.dataset.section
                    );

                }
            );

        }
    );



    /* =================================================
       VIEW ALL
    ================================================= */

    document.querySelectorAll(
        "[data-open]"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    openSection(
                        button.dataset.open
                    );

                }
            );

        }
    );



    /* =================================================
       CLEAR DATA
    ================================================= */

    const clearData =
        document.getElementById(
            "clearData"
        );


    if (clearData) {

        clearData.addEventListener(
            "click",
            () => {

                const confirmDelete =
                    confirm(
                        "Are you sure you want to delete all portfolio tracking data?"
                    );


                if (!confirmDelete) {

                    return;

                }


                localStorage.removeItem(
                    "portfolioVisitors"
                );


                localStorage.removeItem(
                    "portfolioContacts"
                );


                localStorage.removeItem(
                    "portfolioProjectClicks"
                );


                loadDashboard();

            }
        );

    }



    /* =================================================
       THEME
    ================================================= */

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const themeIcon =
        document.getElementById(
            "themeIcon"
        );


    function applyTheme(theme) {

        if (theme === "light") {

            document.body.classList.add(
                "light"
            );


            if (themeIcon) {

                themeIcon.textContent =
                    "☀";

            }

        } else {

            document.body.classList.remove(
                "light"
            );


            if (themeIcon) {

                themeIcon.textContent =
                    "☾";

            }

        }

    }


    const savedTheme =
        localStorage.getItem(
            "portfolioTheme"
        );


    applyTheme(
        savedTheme || "dark"
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isLight =
                    document.body.classList.contains(
                        "light"
                    );


                const newTheme =
                    isLight
                        ? "dark"
                        : "light";


                localStorage.setItem(
                    "portfolioTheme",
                    newTheme
                );


                applyTheme(
                    newTheme
                );

            }
        );

    }



    /* =================================================
       LIVE DATA UPDATE
    ================================================= */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                "portfolioContacts" ||

                event.key ===
                "portfolioVisitors" ||

                event.key ===
                "portfolioProjectClicks"
            ) {

                loadDashboard();

            }


            if (
                event.key ===
                "portfolioTheme"
            ) {

                applyTheme(
                    event.newValue || "dark"
                );

            }

        }
    );



    /* =================================================
       LOAD DASHBOARD
    ================================================= */

    function loadDashboard() {

        updateStats();

        renderRecentVisitors();

        renderRecentMessages();

        renderVisitorTable();

        renderMessages();

        renderProjectTable();

    }



    /* =================================================
       INITIAL LOAD
    ================================================= */

    loadDashboard();

});

