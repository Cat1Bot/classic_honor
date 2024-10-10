let _xhrOriginalOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function(_, url) {
    if (url === "/lol-honor-v2/v1/config") {
        let originalSend = this.send;

        this.send = function(body) {
            let originalOnReadyStateChanged = this.onreadystatechange;
            this.onreadystatechange = function(ev) {
                if (this.readyState === 4) {
                    const content = JSON.stringify({
                        Enabled: true,
			HonorSuggestionsEnabled: true,
			HonorVisibilityEnabled: false,
			SecondsToVote: 90,
			ceremonyV3Enabled: false,
			honorEndpointsV2Enabled: false
                    });

                    Object.defineProperty(this, 'responseText', {
                        writable: true,
                        value: content
                    });

                    return originalOnReadyStateChanged.apply(this, [ev]);
                }

                return originalOnReadyStateChanged.apply(this, arguments);
            };

            originalSend.apply(this, [body]);
        };
    }

    _xhrOriginalOpen.apply(this, arguments);
};
