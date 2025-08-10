function clickButton() {
    const btn = document.querySelector('button[class*="live_chatting_popup_channel_power_button__"]');
    if (btn && !btn.disabled) {
        console.log('통나무 파워 클릭');
        btn.click();
        
        remain_time = 3600; // 클릭 후 남은 시간 초기화
    }
}

function updateTimer() {
    if (remain_time <= 0) {
        clickButton();
        remain_time = 3600; // 초기화
        return;
    }
    
    const brotherDiv = document.querySelector('div[class*="live_chatting_input_tools__"] div');
    if (!brotherDiv) {
        remain_time = 3600;
        return;
    }
    
    remainSpan = Array.from(brotherDiv.parentElement.children).find(el => el.className === "point_remain_time");

    if (!remainSpan) {
        remainSpan = document.createElement("span");
        remainSpan.className = "point_remain_time";
        brotherDiv.after(remainSpan);
    }
    
    remain_time--;
    
    const minutes = Math.floor(remain_time / 60);
    const seconds = remain_time % 60;
    remainSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function fixedRate(callback, interval) {
    let nextTime = Date.now();
    
    function tick() {
        const now = Date.now();
        // 다음 실행 시간 예약
        nextTime += interval;
        
        // 콜백 실행
        callback();
        
        // 보정된 다음 실행 시간까지 대기
        setTimeout(tick, Math.max(0, nextTime - Date.now()));
    }
    
    // 첫 실행 예약
    nextTime += interval;
    setTimeout(tick, interval);
}

let remain_time = 3600; // 60분
let remainSpan = null;

setInterval(clickButton, 5000);
fixedRate(updateTimer, 1000);

console.log('통나무 포인트 자동 클릭 스크립트가 실행되었습니다.');
