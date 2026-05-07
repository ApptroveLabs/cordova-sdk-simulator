var exec = require('cordova/exec');

var AppleAdsAttribution = {
    getAttributionToken: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'AppleAdsAttribution', 'getAttributionToken', []);
    }
};

module.exports = AppleAdsAttribution;
