window.addEventListener("load", () => {
	imageMapResize(); // 画像が読み込まれた後に呼び出す
	createBlinkAreas(); // その後にblinkエリアを作成
	updateBlinkPositions(); // 初期位置を設定
});

const originalImageWidth = 2160;
const originalCoordinates = [
	{ top: 1475 - 264, left: 1960 - 264, width: 2 * 264, height: 2 * 264 }, // 英語メニュー
	{ top: 1915 - 262, left: 1960 - 262, width: 2 * 262, height: 2 * 262 }, // 中国語メニュー
];

const blinkOverlay = document.querySelector(".blink-overlay");
const responsiveImage = document.getElementById("responsiveImage");

function createBlinkAreas() {
	originalCoordinates.forEach((coords, index) => {
		const blinkElement = document.createElement("div");
		blinkElement.classList.add("blink", `blink${index + 1}`);
		if (index === 0 || index === 1) {
			// 英語と中国語メニューを光らせる
			blinkElement.classList.add("highlight"); // 光るクラスを追加
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

window.addEventListener("resize", updateBlinkPositions);
