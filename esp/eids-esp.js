function fetchAsyncSignals(mode) {
        class Signals {
           constructor(signal) {
            this.signal_string = signal;
           }
           encrypt() {
            return btoa(this.signal_string)
          }
        }
        var promise;
        let signals= new Signals("");
        switch (mode) {
        case 1:
          var eids=""
          if(pbjs && pbjs.getUserIdsAsEids && typeof pbjs.getUserIdsAsEids === "function"){
            eids=pbjs.getUserIdsAsEids(); // Get Identities from Prebid API in oRTB eids structure
          }
          break;
        case 2:
          var eids=""
          if(owpbjs && owpbjs.getUserIdsAsEids && typeof owpbjs.getUserIdsAsEids === "function"){
            eids=owpbjs.getUserIdsAsEids(); //Get Identities from Identity Hub  API in oRTB eids structure
          }
          break;
        default:
          eids="Hello eids"; // Demo data
         
      }
      signals= new Signals(JSON.stringify(eids)) 
      promise = Promise.resolve(signals);       
      return promise;
};
