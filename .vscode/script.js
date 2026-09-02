
/* =====================================================
   LENIN PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuBtn.textContent =
                navMenu.classList.contains("active")
                    ? "✕"
                    : "☰";

        });

    }


    /* =================================================
       CLOSE MOBILE MENU
    ================================================= */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }

        });

    });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =================================================
       REVEAL ANIMATION
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* =================================================
       THEME TOGGLE
    ================================================= */

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.getElementById("themeIcon");

    const savedTheme =
        localStorage.getItem("portfolioTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light");

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }

    } else {

        document.body.classList.remove("light");

        if (themeIcon) {
            themeIcon.textContent = "☾";
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle("light");

                const isLight =
                    document.body.classList.contains("light");

                localStorage.setItem(
                    "portfolioTheme",
                    isLight
                        ? "light"
                        : "dark"
                );

                if (themeIcon) {

                    themeIcon.textContent =
                        isLight
                            ? "☀"
                            : "☾";

                }

            }
        );

    }


    /* =================================================
       CONTACT FORM
    ================================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                /* Stop normal form submission */

                event.preventDefault();


                /* -----------------------------------------
                   GET FORM ELEMENTS
                ----------------------------------------- */

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const subjectInput =
                    document.getElementById("subject");

                const messageInput =
                    document.getElementById("message");


                /* -----------------------------------------
                   CHECK FORM ELEMENTS
                ----------------------------------------- */

                if (
                    !nameInput ||
                    !emailInput ||
                    !subjectInput ||
                    !messageInput
                ) {

                    console.error(
                        "Contact form fields are missing."
                    );

                    if (formStatus) {

                        formStatus.textContent =
                            "Form configuration error.";

                    }

                    return;
                }


                /* -----------------------------------------
                   GET VALUES
                ----------------------------------------- */

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const subject =
                    subjectInput.value.trim();

                const message =
                    messageInput.value.trim();


                /* -----------------------------------------
                   VALIDATION
                ----------------------------------------- */

                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please fill all fields.";

                    }

                    return;
                }


                /* -----------------------------------------
                   EMAIL VALIDATION
                ----------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Please enter a valid email address.";

                    }

                    return;
                }


                /* -----------------------------------------
                   CREATE REQUEST
                ----------------------------------------- */

                const request = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    subject: subject,

                    message: message,

                    date:
                        new Date().toLocaleString(),

                    status: "New"

                };


                /* -----------------------------------------
                   GET OLD REQUESTS
                ----------------------------------------- */

                let requests = [];

                try {

                    const storedRequests =
                        localStorage.getItem(
                            "portfolioContacts"
                        );

                    if (storedRequests) {

                        requests =
                            JSON.parse(
                                storedRequests
                            );

                    }

                    if (!Array.isArray(requests)) {

                        requests = [];

                    }

                } catch (error) {

                    console.error(
                        "Error reading contact data:",
                        error
                    );

                    requests = [];

                }


                /* -----------------------------------------
                   ADD NEW REQUEST
                ----------------------------------------- */

                requests.unshift(request);


                /* -----------------------------------------
                   KEEP ONLY LAST 100
                ----------------------------------------- */

                requests =
                    requests.slice(0, 100);


                /* -----------------------------------------
                   SAVE REQUEST
                ----------------------------------------- */

                try {

                    localStorage.setItem(
                        "portfolioContacts",
                        JSON.stringify(requests)
                    );

                    console.log(
                        "Message saved successfully:",
                        request
                    );

                } catch (error) {

                    console.error(
                        "Error saving contact request:",
                        error
                    );

                    if (formStatus) {

                        formStatus.textContent =
                            "Unable to save message.";

                    }

                    return;

                }


                /* -----------------------------------------
                   SUCCESS MESSAGE
                ----------------------------------------- */

                if (formStatus) {

                    formStatus.textContent =
                        "Message received successfully.";

                }


                /* -----------------------------------------
                   CLEAR FORM
                ----------------------------------------- */

                contactForm.reset();

            }
        );

    }


    /* =================================================
       VISITOR TRACKING
    ================================================= */

    const visitorData = {

        id: Date.now(),

        date:
            new Date().toLocaleString(),

        page:
            window.location.pathname,

        userAgent:
            navigator.userAgent

    };


    let visitors = [];

    try {

        const storedVisitors =
            localStorage.getItem(
                "portfolioVisitors"
            );

        if (storedVisitors) {

            visitors =
                JSON.parse(
                    storedVisitors
                );

        }

        if (!Array.isArray(visitors)) {
            visitors = [];
        }

    } catch (error) {

        console.error(
            "Error reading visitor data:",
            error
        );

        visitors = [];

    }


    visitors.unshift(visitorData);


    /* Keep latest 100 visitors */

    visitors =
        visitors.slice(0, 100);


    try {

        localStorage.setItem(
            "portfolioVisitors",
            JSON.stringify(visitors)
        );

    } catch (error) {

        console.error(
            "Error saving visitor data:",
            error
        );

    }


    /* =================================================
       PROJECT CLICK TRACKING
    ================================================= */

    document
        .querySelectorAll(".project-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const card =
                        link.closest(
                            ".project-card"
                        );

                    const projectName =
                        card?.dataset.project ||
                        "Unknown Project";


                    const clickData = {

                        project:
                            projectName,

                        date:
                            new Date().toLocaleString()

                    };


                    let projectClicks = [];

                    try {

                        const storedClicks =
                            localStorage.getItem(
                                "portfolioProjectClicks"
                            );

                        if (storedClicks) {

                            projectClicks =
                                JSON.parse(
                                    storedClicks
                                );

                        }

                        if (
                            !Array.isArray(
                                projectClicks
                            )
                        ) {

                            projectClicks = [];

                        }

                    } catch (error) {

                        console.error(
                            "Error reading project clicks:",
                            error
                        );

                        projectClicks = [];

                    }


                    projectClicks.unshift(
                        clickData
                    );


                    /* Keep latest 100 clicks */

                    projectClicks =
                        projectClicks.slice(
                            0,
                            100
                        );


                    try {

                        localStorage.setItem(
                            "portfolioProjectClicks",
                            JSON.stringify(
                                projectClicks
                            )
                        );

                    } catch (error) {

                        console.error(
                            "Error saving project click:",
                            error
                        );

                    }

                }
            );

        });


    /* =================================================
       SYNC THEME FROM OTHER TAB
    ================================================= */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                "portfolioTheme"
            ) {

                if (event.newValue === "light") {

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

        }
    );

});
