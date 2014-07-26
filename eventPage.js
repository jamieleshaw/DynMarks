chrome.tabs.onUpdated.addListener(function (id, changeInfo, tab) {

    if (typeof changeInfo.status != 'undefined') {
        if (changeInfo.status == 'complete') {
            var domain = purl(tab.url).attr('host');
            chrome.bookmarks.search(domain, function (results) {
                for (var i = 0; i < results.length; i++) {
                    var bookmark = results[i];
                    if (typeof bookmark.url != 'undefined') {
                        if (bookmark.title.indexOf("[Dyn]") > -1) {
                            var new_bookmark = {
                                'url': tab.url
                            };
                            chrome.bookmarks.update(bookmark.id, new_bookmark);
                        }
                    }
                }
            });
        }
    }
});
