
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    body.classList.remove("intro-finished");

    const introUrl = `url("./images/intro.gif?reload=${Date.now()}")`;
    body.style.setProperty("--intro-background", introUrl);

    const loopImage = new Image();
    loopImage.src = "./images/loop.gif";

    setTimeout(function () {
        const switchToLoop = function () {
            body.classList.add("intro-finished");
        };

        if (loopImage.complete && loopImage.naturalWidth > 0) {
            if (typeof loopImage.decode === "function") {
                loopImage.decode()
                    .catch(() => {})
                    .finally(switchToLoop);
            } else {
                switchToLoop();
            }
        } else {
            loopImage.onload = switchToLoop;
            loopImage.onerror = switchToLoop;
        }
    }, 1600);

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });
    }

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                history.pushState(null, "", targetId);
            }

            if (navLinks && menuToggle) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    });

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
