function fetchAsyncSignals(mode, key, customFunction) {
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
            eids = "Hello eids"; // Demo data

    }
    var dataKey = "eids" // Default key is eids
    if (key && key.length > 0) {
        dataKey = key; // Using custom key for data if passed  
    }
    signals = encryptSignals(JSON.stringify({
        dataKey: eids
    }))
    promise = Promise.resolve(signals);
    console.log("fetching Signals: " + signals);
    return promise;
};

function encryptSignals(signals) {
    return btoa(signals); // Test encryption. To be replaced with better algo
};
