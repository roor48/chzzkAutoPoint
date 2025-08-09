console.log('통나무 포인트 자동 클릭 스크립트가 실행되었습니다.');

setInterval(() => {
    const btn = document.querySelector('button[class*="live_chatting_popup_channel_power_button__"]');
    if (btn && !btn.disabled) {
        console.log('통나무 파워 클릭');
        btn.click();
    }
}, 5000);
