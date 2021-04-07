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
        switch (mode) {
        case 1:
          var eids=""
          if(pbjs && pbjs.getUserIdsAsEids && typeof pbjs.getUserIdsAsEids === "function")){
            eids=pbjs.getUserIdsAsEids();
          }
          break;
        case 2:
          var eids=""
          if(owpbjs && owpbjs.getUserIdsAsEids && typeof owpbjs.getUserIdsAsEids === "function")){
            eids=owpbjs.getUserIdsAsEids();
          }
          let signals= new Signals(JSON.stringify(eids)) // Get IDs from PubMatic Identity Hub
          promise = Promise.resolve(signals); 
          break;
        default:
          let signals= new Signals("Hello eids") // Demo data
          promise = Promise.resolve(signals);         
      }
      return promise;
};
