//package io.ionic.starter;
//
//import android.content.Intent;
//import android.net.Uri;
//import android.os.Bundle;
//import com.getcapacitor.BridgeActivity;
//
//public class MainActivity extends BridgeActivity {
//  private static final String CHANNEL = "deep_link_channel";
//
//  @Override
//  protected void onCreate(Bundle savedInstanceState) {
//    super.onCreate(savedInstanceState);
//    handleIncomingIntent(getIntent()); // Handle the intent when the app is created
//  }
//
//  @Override
//  public void onNewIntent(Intent intent) {
//    super.onNewIntent(intent);
//    handleIncomingIntent(intent); // Handle the new intent if the app is already running
//  }
//
//  private void handleIncomingIntent(Intent intent) {
//    if (intent != null && intent.getAction() != null && intent.getAction().equals(Intent.ACTION_VIEW)) {
//      Uri uri = intent.getData();
//      if (uri != null) {
//        // Send the deep link URL to the JavaScript side via a Capacitor event
//        getBridge().getWebView().post(() -> {
//          // Notify JavaScript side about the deep link
//          getBridge().notifyListeners("deepLinkReceived", uri.toString(), true);
//        });
//      }
//    }
//  }
//}
//
//
package io.ionic.starter;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // This is where you might want to add extra logic for deep links
    handleDeepLink(getIntent());
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);  // Set the new intent if the activity is re-launched
    handleDeepLink(intent);  // Handle the new deep link intent
  }

  // Custom method to handle incoming deep links
  private void handleDeepLink(Intent intent) {
    if (intent != null && Intent.ACTION_VIEW.equals(intent.getAction())) {
      String deepLinkUrl = intent.getDataString();
      if (deepLinkUrl != null) {
        // Log the deep link URL for debugging
        // Notify Ionic app via Capacitor
        this.bridge.getWebView().post(() -> {
          this.bridge.triggerWindowJSEvent("appUrlOpen", "{ url: '" + deepLinkUrl + "' }");
        });
        // Here, you can pass the deep link to your web view or handle it accordingly
        // For example, calling a method to notify the Ionic app via Capacitor Bridge
      }
    }
  }
}


