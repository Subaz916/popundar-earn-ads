const ctaButton = document.getElementById("cta-button");
const ctaCount = document.getElementById("cta-count");

let clicks = 0;

function renderClicks() {
    ctaCount.textContent = `Clicks: ${clicks}`;
}

ctaButton.addEventListener("click", () => {
    clicks += 1;
    renderClicks();
});

renderClicks();
