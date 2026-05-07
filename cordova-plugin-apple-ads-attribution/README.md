# Cordova Plugin Apple Ads Attribution

Get Apple Ads Attribution token from AdServices framework (iOS 14.3+).

## Installation

```bash
cordova plugin add ./cordova-plugin-apple-ads-attribution
npx cap sync ios
```

## Usage

```javascript
if (window.AppleAdsAttribution) {
    AppleAdsAttribution.getAttributionToken(
        function(token) {
            console.log('Apple Ads Attribution Token:', token);
            // Send token to your SDK
            apptroveCordovaPlugin.updateAppleAdsToken(token);
        },
        function(error) {
            console.error('Error getting token:', error);
        }
    );
}
```

## Requirements

- iOS 14.3 or later
- AdServices framework

## License

MIT
