const AD_KEY = "057f1123458244cc5b4492a584f32396";
const AD_WIDTH = 300;
const AD_HEIGHT = 100;

function buildAdFrame() {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:#ffffff;overflow:hidden;}</style>
</head>
<body>
<script>
atOptions = {
    'key' : '${AD_KEY}',
    'format' : 'iframe',
    'height' : ${AD_HEIGHT},
    'width' : ${AD_WIDTH},
    'params' : {}
};
</script>
<script src="https://www.highrevenueformat.com/${AD_KEY}/invoke.js"></script>
</body>
</html>`;

    const frame = document.createElement("iframe");
    frame.width = AD_WIDTH;
    frame.height = AD_HEIGHT;
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("title", "ad");
    frame.style.border = "0";
    frame.style.display = "block";
    frame.srcdoc = html;
    return frame;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".banner-slot").forEach((slot) => {
        slot.appendChild(buildAdFrame());
    });

    console.log("Blank Popunder page loaded.");
});
