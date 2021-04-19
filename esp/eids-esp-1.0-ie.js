function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function fetchAsyncSignals(mode) {
  var Signals = /*#__PURE__*/function () {
    "use strict";

    function Signals(signal) {
      _classCallCheck(this, Signals);

      this.signal_string = signal;
    }

    _createClass(Signals, [{
      key: "encrypt",
      value: function encrypt() {
        return btoa(this.signal_string);
      }
    }]);

    return Signals;
  }();

  var promise;
  var signals = new Signals("");

  switch (mode) {
    case 1:
      var eids = "";

      if (pbjs && pbjs.getUserIdsAsEids && typeof pbjs.getUserIdsAsEids === "function") {
        eids = pbjs.getUserIdsAsEids(); // Get Identities from Prebid API in oRTB eids structure
      }

      break;

    case 2:
      var eids = "";

      if (owpbjs && owpbjs.getUserIdsAsEids && typeof owpbjs.getUserIdsAsEids === "function") {
        eids = owpbjs.getUserIdsAsEids(); //Get Identities from Identity Hub  API in oRTB eids structure
      }

      break;

    default:
      eids = "Hello eids";
    // Demo data
  }

  signals = new Signals(JSON.stringify(eids));
  promise = Promise.resolve(signals);
  return promise;
};
