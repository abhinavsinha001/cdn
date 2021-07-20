var esp = (function() {
    var self = {};
    self.fetchAsyncSignals = function(mode, source, enc, customFunction, customKey) {
        console.log("Going to fetch signals for mode: " + mode + " & source: " + source);
        var eids = "";
        switch (mode) {
            case 1:
                if (typeof pbjs !== "undefined" && typeof pbjs.getUserIdsAsEids === "function") {
                    eids = pbjs.getUserIdsAsEids(); // Get Identities from Prebid API in oRTB eids structure.
                }
                break;
            case 2:
                if (typeof owpbjs !== "undefined" && typeof owpbjs.getUserIdsAsEids === "function") {
                    eids = owpbjs.getUserIdsAsEids(); //Get Identities from Identity Hub  API in oRTB eids structure.
                }
                break;
            case 3:
                if (typeof customFunction === "function") {
                    eids = customFunction(source); //Get Identities from Custom function provided in oRTB eids structure.
                }
                break;
            case 4:
                if (typeof customFunction === "function") {
                    eids = customFunction(source); //Get Identities from Custom function provided in any format.
                }
                break;

            default:
                eids = JSON.parse('{"source":"pubmatic","uids":[{"id":"hello-eids","atype":1}]}'); // Demo data

        }

        var eidsSignals = {};
        if (mode == 4) {
            eidsSignals[source] = "1||" + encryptSignals(eids);
        } else {
            eids.forEach(function(eid) {
                if (true === enc) {
                    eidsSignals[eid.source] = "1||" + encryptSignals(eid); // If encryption is enabled append version (1|| and encrypt entire object
                } else {
                    eidsSignals[eid.source] = eid.uids[0].id;
                }

            });
        }
        var promise = Promise.resolve(eidsSignals[source]);
        console.log("fetching Signal: " + eidsSignals[source]);
        return promise;
    }

    var encryptSignals = function(signals) {
        return btoa(JSON.stringify(signals)); // Test encryption. To be replaced with better algo
    }

    self.registerSignalSources = function(gtag, signalSources, mode, enc, customFunction, customKey) {

        gtag.encryptedSignalProviders = gtag.encryptedSignalProviders || [];
        signalSources.forEach(function(source) {
            console.log("Registering signal provider: " + source);
            var updatedSrc = source;
            if (true === enc) {
                updatedSrc = source + "/enc"; // Update source value and append /enc to indicate encrypted signal. 

            }
            if (4 === mode) {
                updatedSrc = source + "/" + customKey + "/enc"
            }

            gtag.encryptedSignalProviders.push({
                id: updatedSrc,
                collectorFunction: function() {
                    return esp.fetchAsyncSignals(mode, source, enc, customFunction, customKey);
                }
            });
        });
    }
    self.check3pCookieEnabled = function() {
        var cookieName = "Test3pCookie";
        document.cookie = "Test3pCookieName=Test3pCookie;samesite=None; Secure;domain=cdn.jsdelivr.net";
        var cookieFlag = 0;
        if (document.cookie.indexOf('Test3pCookieName') == -1) {
            console.log("3p Cookies are disabled");
        }
        if (document.cookie.indexOf('Test3pCookieName') != -1) {
            console.log("3p Cookies are enabled");
            cookieFlag = 1;
        }
        return cookieFlag;
    }
    return self;
}());
