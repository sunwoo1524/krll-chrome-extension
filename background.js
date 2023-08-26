const url_shortener_menu = "krll_url_shortener"; // context menu id

// context menu items
let contextMenuItem = {
    "id": url_shortener_menu,
    "title": "Short This URL",
    "contexts": ["link"],
}

// shorten loooong URL with krll API
async function getShortURL(url) {
    const response = await fetch("https://krll.me/api/urls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "url": url,
        }),
    });

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    return "https://krll.me/" + data.key;
}

// create context menu
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(contextMenuItem);
});

// on click context menu:
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === url_shortener_menu) {
        // get short URL
        const short_url = await getShortURL(info.linkUrl);

        // check there is no error
        if (short_url === null) {
            // error in API
            await chrome.tabs.sendMessage(tab.id, { success: false });
        } else {
            // send short URL to content script
            await chrome.tabs.sendMessage(tab.id, { success: true, url: short_url });
        }
    }
});