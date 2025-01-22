imageMapResize();

const originalImageWidth = 2160;
const originalCoordinates = [
	{ top: 83, left: 665, width: 422, height: 131 },
	{ top: 83, left: 1158, width: 422, height: 131 },
	{ top: 83, left: 1651, width: 422, height: 131 },
	{ top: 1233, left: 399, width: 272, height: 59 },
	{ top: 1662, left: 1605, width: 272, height: 57 },
	{ top: 3452, left: 1788, width: 346, height: 346 },
];

const blinkOverlay = document.querySelector(".blink-overlay");
const responsiveImage = document.getElementById("responsiveImage");

function createBlinkAreas() {
	originalCoordinates.forEach((coords, index) => {
		const blinkElement = document.createElement("div");
		blinkElement.classList.add("blink", `blink${index + 1}`);
		if (index === 5) {
			blinkElement.classList.add("blink6");
		}
		blinkOverlay.appendChild(blinkElement);
	});
}

function updateBlinkPositions() {
	const scaleFactor = responsiveImage.clientWidth / originalImageWidth;

	const blinkElements = document.querySelectorAll(".blink");
	blinkElements.forEach((blink, index) => {
		const coords = originalCoordinates[index];
		blink.style.top = `${coords.top * scaleFactor}px`;
		blink.style.left = `${coords.left * scaleFactor}px`;
		blink.style.width = `${coords.width * scaleFactor}px`;
		blink.style.height = `${coords.height * scaleFactor}px`;
	});
}

createBlinkAreas();
window.addEventListener("resize", updateBlinkPositions);
window.addEventListener("load", updateBlinkPositions);
