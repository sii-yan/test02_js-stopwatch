
// HTML要素の取得
const $nowTime = document.getElementById("nowTime");
const $start = document.getElementById("onClickStart");
const $stop = document.getElementById("onClickStop");
const $reset = document.getElementById("onClickReset");

// 状態を管理する変数
let startTime;// 開始時間
let stopTime = 0;// 停止時間
let timeoutID;// ストップウォッチを動かすときに用いるsetIntervalの返り値

// 時間を更新して表示する関数
function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours() - 9).padStart(2, "0");
  const m = String(currentTime.getMinutes()).padStart(2, "0");
  const s = String(currentTime.getSeconds()).padStart(2, "0");
  const ms = String(currentTime.getMilliseconds()).padStart(3, "0");
  $nowTime.textContent = `${h}:${m}:${s}:${ms}`;
  timeoutID = setTimeout(displayTime, 100);
}

  // スタートボタンがクリックされたら時間を進める
  $start.addEventListener("click", () => {
    $start.disabled = true;
    $stop.disabled = false;
    $reset.disabled = true;
    startTime = Date.now();
    displayTime();
  });

  // ストップボタンがクリックされたら時間を止める
  $stop.addEventListener("click", () => {
    $start.disabled = false;
    $stop.disabled = true;
    $reset.disabled = false;
    clearTimeout(timeoutID);
    stopTime += (Date.now() - startTime);
  });

  // リセットボタンがクリックされたら時間を0に戻す
  $reset.addEventListener("click", () => {
    $start.disabled = false;
    $stop.disabled = true;
    $reset.disabled = true;
    $nowTime.textContent = "00:00:00:00";
    stopTime = 0;
  });