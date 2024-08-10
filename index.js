// QRコードのスキャナを初期化
const html5QrCode = new Html5Qrcode("reader");

// スキャン時に呼び出されるコールバック
function onScanSuccess(decodedText, decodedResult) {
    console.log(`スキャンされたUPCコード: ${decodedText}`);
    // 通知の許可を求める
        Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            // 通知を送信
            new Notification("バーコードスキャン", {
                body: `スキャンされたバーコード${decodedText}`
            });
        }
    });
    // スキャンが成功したらスキャンを停止する
    html5QrCode.stop().then((ignore) => {
        console.log("スキャンを停止しました。");
    }).catch((err) => {
        console.error("スキャン停止エラー:", err);
    });
}

function onScanFailure(error) {
    // 失敗時にエラーメッセージを出力
    console.warn(`スキャン失敗: ${error}`);
}

// カメラを使ってスキャン開始
html5QrCode.start(
    { facingMode: "environment" }, // 環境カメラを使用
    {
        fps: 10,    // フレーム毎秒
        qrbox: { width: 250, height: 250 }  // スキャンボックスのサイズ
    },
    onScanSuccess,
    onScanFailure
).catch(err => {
    console.error("スキャン開始エラー:", err);
});
