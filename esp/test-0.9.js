var esp={
function fetchAsyncSignals(mode,source, customFunction, customKey) {
    console.log("Going to fetch signals for mode: "+mode+" & source: "+source);
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

    var eidsSignals ={} ;
    eids.forEach(function (eid) {
      eidsSignals[eid.source] = eid.uids[0].id;
    });
    promise = Promise.resolve(eidsSignals[source]);
    console.log("fetching Signal: " + eidsSignals[source]);
    return promise;
};

function encryptSignals(signals) {
    return btoa(signals); // Test encryption. To be replaced with better algo
};

function registerSignalSources(gtag,signalSources,mode){
    gtag.encryptedSignalProviders=gtag.encryptedSignalProviders || [];
    signalSources.forEach(function(source){ 
                        console.log("Registering signal provider: "+source);
                        gtag.encryptedSignalProviders.push({
                            id: source,
                            collectorFunction: function(){ return fetchAsyncSignals(mode,source); }
                        });
    });
   }
};
