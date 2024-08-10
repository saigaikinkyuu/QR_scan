// HTMLのvideo要素を取得
const video = document.getElementById('video');

// QuaggaJSの初期設定
Quagga.init({
    inputStream: {
        type: "LiveStream",
        target: video
    },
    decoder: {
        readers: ["UPC"] // 読み取るバーコードの種類を指定
    }
}, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    // カメラアクセス許可を求める
    Quagga.start();

    // バーコードが読み取られたときの処理
    Quagga.onDetected(function(result) {
        console.log("検出されたバーコード:", result.codeResult.code);
        // 通知の許可を求める
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              // 通知を送信
              new Notification("バーコードスキャン", {
                body: "result.codeResult.code"
              });
            }
          });
    });
});
