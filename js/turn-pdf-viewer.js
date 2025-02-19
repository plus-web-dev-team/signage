const url = "../pdf/menu.pdf"; // PDFファイルのパスを指定

const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
	"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

let pdfDoc = null; // PDFドキュメント

// PDFを読み込む
pdfjsLib
	.getDocument(url)
	.promise.then((pdf) => {
		pdfDoc = pdf; // PDFドキュメントを保存
		const flipbook = document.getElementById("flipbook");
		flipbook.innerHTML = ""; // 既存の内容をクリア

		// 各ページをTurn.jsに追加
		for (let i = 1; i <= pdfDoc.numPages; i++) {
			pdfDoc
				.getPage(i)
				.then((page) => {
					const scale = 1.5; // 拡大率
					const viewport = page.getViewport({ scale: scale });

					const canvas = document.createElement("canvas");
					canvas.className = "page";
					const context = canvas.getContext("2d");
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					const renderContext = {
						canvasContext: context,
						viewport: viewport,
					};
					page
						.render(renderContext)
						.promise.then(() => {
							flipbook.appendChild(canvas);
							// 最後のページが描画された後にTurn.jsを初期化
							if (i === pdfDoc.numPages) {
								$(flipbook).turn({
									width: 800,
									height: 600,
									autoCenter: true,
									pages: pdfDoc.numPages, // ページ数を指定
								});
							}
						})
						.catch((error) => {
							console.error(`Error rendering page ${i}:`, error);
						});
				})
				.catch((error) => {
					console.error(`Error loading page ${i}:`, error);
				});
		}
	})
	.catch((error) => {
		console.error("Error during PDF loading:", error);
	});
