const CTA_URL = "https://www.profitableratecpmnetwork.com/k2yg1uyzz?key=4e2ad53406394eb3b746c358a90e6c6f";
const COOLDOWN = 1500;

let lastPop = 0;

function popUnder() {
    const now = Date.now();
    if (now - lastPop < COOLDOWN) return;
    lastPop = now;

    const pop = window.open(CTA_URL, "_blank");
    if (pop) {
        setTimeout(() => {
            try {
                pop.close();
            } catch {}
        }, 100);
        return;
    }

    const fallback = document.createElement("a");
    fallback.href = CTA_URL;
    fallback.target = "_blank";
    fallback.rel = "noopener nofollow";
    fallback.click();
}

document.addEventListener("DOMContentLoaded", () => {
    const cta = document.querySelector(".cta-button");

    if (cta) {
        cta.addEventListener("mousedown", (event) => {
            event.preventDefault();
            popUnder();
        });

        cta.addEventListener("click", (event) => {
            event.preventDefault();
            popUnder();
        });
    }
});
