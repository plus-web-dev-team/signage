// 各時間帯に応じたURLを設定
const urls = {
	morning: "../morning.html", // 10時～12時前
	lunch: "../lunch.html", // 12時～16時前
	dinner: "../dinner.html", // 16時～20時前
	drinks: "../drinks.html", // 20時～10時
};

// 現在の時刻を取得
const now = new Date();
const hour = now.getHours();

// 遷移先のURLを決定
let redirectUrl = "";

if (hour >= 10 && hour < 12) {
	redirectUrl = urls.morning;
	document.getElementById("message").textContent =
		"モーニングメニューに切り替わります...";
} else if (hour >= 12 && hour < 16) {
	redirectUrl = urls.lunch;
	document.getElementById("message").textContent =
		"ランチメニューに切り替わります...";
} else if (hour >= 16 && hour < 20) {
	redirectUrl = urls.dinner;
	document.getElementById("message").textContent =
		"ディナーメニューに切り替わります...";
} else {
	redirectUrl = urls.drinks;
	document.getElementById("message").textContent =
		"お酒のメニューに切り替わります...";
}

// 一定時間後にリダイレクト
setTimeout(() => {
	window.location.href = redirectUrl;
}, 3000); // 3秒後に切り替え
