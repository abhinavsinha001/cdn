function fetchAsyncSignals(mode, customFunction, customKey) {
    console.log("Going to fetch signals");
    var eids = "";
    switch (mode) {
        case 1:
            if (pbjs && pbjs.getUserIdsAsEids && typeof pbjs.getUserIdsAsEids === "function") {
                eids = pbjs.getUserIdsAsEids(); // Get Identities from Prebid API in oRTB eids structure
            }
            break;
        case 2:
            if (owpbjs && owpbjs.getUserIdsAsEids && typeof owpbjs.getUserIdsAsEids === "function") {
                eids = owpbjs.getUserIdsAsEids(); //Get Identities from Identity Hub  API in oRTB eids structure
            }
            break;
        case 3:
            if (typeof customFunction === "function") {
                eids = customFunction(); //Get Identities from Custom function provided
            }
            break;

        default:
            eids = JSON.parse('{"source":"pubmatic","uids":[{"id":"hello-eids","atype":1}]}'); // Demo data

    }
    /*var dataKey = "eids" // Default key is eids
    if (customKey && customKey.length > 0) {
        dataKey = customKey; // Using custom key for data if passed  
    }
    var rawSignal = {}
    rawSignal[dataKey] = eids;
    signals = encryptSignals(JSON.stringify(rawSignal))*/
    var eidsSignal = eids.map(function (eid) {
      signal={};
      signal[eid.source]=eid.uids[0].id
      return signal;
    });
    promise = Promise.resolve(eidsSignal);
    console.log("fetching Signals: " + signals);
    return promise;
};

function encryptSignals(signals) {
    return btoa(signals); // Test encryption. To be replaced with better algo
};
