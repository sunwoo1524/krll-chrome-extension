chrome.runtime.onMessage.addListener(
    (request) => {
        if (request.success) {
            navigator.clipboard.writeText(request.url).then(() => {
                alert("단축된 링크를 클립보드에 복사했습니다.\n" + request.url);
            },
            () => {
                alert("브라우저가 구형 인 것 같습니다. 최신 브라우저를 이용해주세요.");
            });
        }
    }
)