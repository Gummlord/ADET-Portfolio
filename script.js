
document.addEventListener("DOMContentLoaded", function () {
    
    const body = document.body; 
    body.classList.remove("intro-finished");

    const introUrl = `url("./images/intro.gif?reload=${Date.now()}")`;
    body.style.setProperty("--intro-background", introUrl);

    const loopImage = new Image();
    loopImage.src = "./images/loop.gif";

    
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    const links = document.querySelectorAll('a[href^="#"]');

    const animationPreview = document.getElementById("animation-preview");
    const replayButton = document.getElementById("replay-animation");


    const yearElement = document.getElementById("year");
    
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


    if (animationPreview && replayButton) {
        let animationTimer;
        let animationRun = 0;

        // Preload the looping GIF.
        const loopPreload = new Image();
        loopPreload.src = "./images/loop.gif";

        function playAnimation() {
            // Cancel the previous sequence.
            clearTimeout(animationTimer);

            // Ignore timers from older animation runs.
            const currentRun = ++animationRun;

            // Restart the intro GIF from its beginning.
            animationPreview.src =
                `./images/intro.gif?restart=${Date.now()}`;

            // Switch to the looping GIF after 1.6 seconds.
            animationTimer = setTimeout(function () {
                if (currentRun !== animationRun) return;

                animationPreview.src =
                    `./images/loop.gif?restart=${Date.now()}`;
            }, 1600);
        }

        replayButton.addEventListener("click", playAnimation);

        // Play automatically when the page loads.
        playAnimation();
    }


    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
