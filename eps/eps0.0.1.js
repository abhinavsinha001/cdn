function fetchAsyncSignals() {
        class Signals {
           constructor(signal) {
            this.signal_string = signal;
           }
           encrypt() {
            return btoa(this.signal_string)
          }
        }
        //let signals= new Signals(JSON.stringify(owpbjs.getUserIdsAsEids()))
        let signals= new Signals("Hello eids")
        var promise = Promise.resolve(signals); 
        //var promise = Promise.resolve(btoa("Hello eids")); 
        return promise;
      };
