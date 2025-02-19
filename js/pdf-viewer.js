const url = "../pdf/menu.pdf"; // PDFファイルのパスを指定

const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
	"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

let currentPage = 1; // 現在のページ
let pdfDoc = null; // PDFドキュメント

function renderPage(pageNum) {
	pdfDoc.getPage(pageNum).then((page) => {
		const scale = 1.5; // 拡大率
		const viewport = page.getViewport({ scale: scale });

		const canvas = document.getElementById("pdf-canvas");
		const context = canvas.getContext("2d");
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		const renderContext = {
			canvasContext: context,
			viewport: viewport,
		};
		page.render(renderContext).promise.then(() => {
			console.log(`Page ${pageNum} rendered`);
			document.getElementById("page-indicator").textContent =
				`ページ: ${pageNum} / ${pdfDoc.numPages}`; // ページインジケーターを更新
		});
	});
}

pdfjsLib.getDocument(url).promise.then((pdf) => {
	pdfDoc = pdf; // PDFドキュメントを保存
	renderPage(currentPage); // 最初のページを表示
	document.getElementById("total-pages").textContent = pdfDoc.numPages; // 全ページ数を表示

	// タッチイベントのリスナーを追加
	let touchStartX = 0; // タッチ開始位置
	let touchEndX = 0; // タッチ終了位置

	function handleTouchStart(event) {
		touchStartX = event.touches[0].clientX; // タッチ開始位置を取得
	}

	function handleTouchEnd(event) {
		touchEndX = event.changedTouches[0].clientX; // タッチ終了位置を取得
		handleSwipe(); // スワイプ処理を呼び出す
	}

	function handleSwipe() {
		if (touchEndX < touchStartX) {
			// 左にスワイプ（次のページ）
			if (currentPage < pdfDoc.numPages) {
				currentPage++;
				renderPage(currentPage);
			}
		} else if (touchEndX > touchStartX) {
			// 右にスワイプ（前のページ）
			if (currentPage > 1) {
				currentPage--;
				renderPage(currentPage);
			}
		}
	}

	// タッチイベントのリスナーを追加
	document
		.getElementById("pdf-canvas")
		.addEventListener("touchstart", handleTouchStart);
	document
		.getElementById("pdf-canvas")
		.addEventListener("touchend", handleTouchEnd);
});

// ボタンのイベントリスナー
document.getElementById("prev").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		renderPage(currentPage);
	}
});

document.getElementById("next").addEventListener("click", () => {
	if (currentPage < pdfDoc.numPages) {
		currentPage++;
		renderPage(currentPage);
	}
});
