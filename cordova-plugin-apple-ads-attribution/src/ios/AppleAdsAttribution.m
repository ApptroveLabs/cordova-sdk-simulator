#import "AppleAdsAttribution.h"
#import <AdServices/AdServices.h>

@implementation AppleAdsAttribution

- (void)getAttributionToken:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    
    // Check if AdServices framework is available (iOS 14.3+)
    if (@available(iOS 14.3, *)) {
        NSError *error = nil;
        NSString *token = [AAAttribution attributionTokenWithError:&error];
        
        if (token && !error) {
            NSLog(@"Apple Ads Attribution Token retrieved: %@", token);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:token];
        } else {
            NSString *errorMessage = error ? error.localizedDescription : @"No token available";
            NSLog(@"Error getting Apple Ads Attribution Token: %@", errorMessage);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:errorMessage];
        }
    } else {
        NSLog(@"Apple Ads Attribution requires iOS 14.3 or later");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"iOS 14.3+ required"];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
