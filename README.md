# Phaser React Cordova Typescript

### Installation
* Clone/ Download this Code.
* `npm install` to install the dependencies.
* This project requires **Cordova** to run Cordova commands.
* `npm install -g cordova` to install it globally.

## Adding Cordova Platforms
* `cordova platform add browser` for browser platform.
* `cordova platform add ios` for ios platform.

## Production Build
* `npm run build` creates production build for react app.
* `npm run build:cordova` creates `www` folder using react production build, which will be used for cordova builds.
* `cordova build browser` cordova creates browser build in `platforms/browser/`
* `cordova build ios` cordova creates ios build in `platforms/ios/`


## Running App
* `npm start` starts the dev server for react app.
* `cordova run browser` will run in browser. *Note: Use this only after `npm run build:cordova`*
* `cordova run ios` will run in emulator. *Note: Use this only after `npm run build:cordova`*

## Debugging for Android
* Follow this [Guide](http://geeklearning.io/apache-cordova-and-remote-debugging-on-android/)

### Firebase OAuth Authentication

To authenticate using OAuth Providers follow these instructions: https://firebase.google.com/docs/auth/web/cordova

Because the cordova-universal-links-plugin is outdated you should instead install this fork:
```
cordova plugin add https://github.com/walteram/cordova-universal-links-plugin.git --save
```

### Firebase Analytics and Push Notifications

Due to various issues that haven't beeen resolved in the latest npm package of cordova-plugin-firebase I recommend getting the version of the plugin directly from git
```
cordova plugin add https://github.com/arnesson/cordova-plugin-firebase.git --save
```

## Android Deployment

First, sign up for a Google Play Developer account. Next, run `yarn build` followed by `cordova build android --release` which will result in an apk that needs to be signed. Then run: 
```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore android.keystore app-release-unsigned.apk alias-name
```
where `android.keystore` is the location of the keystore and `alias-name` is the alias for your key. Make sure you have Android Studio installed because it will also come with the zipalign tool. For Mac OS you can find it in `~/Library/Android/sdk/build-tools/{version}/zipalign`. Then run:
```
~/Library/Android/sdk/build-tools/{version}/zipalign -v 4 app-release-unsigned.apk release.apk
```
followed by uploading the build to the Google Play Console.

## iOS Deployment

First, sign up for a paid Apple Developer Account. In Xcode, open your project from `/platforms/ios` and go to your Preferences > Accounts. Add the Apple ID that was used for the developer account. Select your Agent Role and click on `Manage Certificates..` and click on the `+` icon to generate a signing certificate. 

Next, go to `https://developer.apple.com/account/ios/profile` and add a new provisioning profile. Select your development or distribution option and on the next page fill your App ID Description (for example, My Cordova App) and your bundle ID that can be found in config.xml.

Next, in Xcode go to your project navigator and select your project. In a drop down list make sure your project is selected as a target. Then, under Signing, select your Team and generate your signing certificate.

To prepare for distribution on the Apple App Store, you need to create an archive. In Xcode make sure the app is properly provisioned and signed for distribution. Next run `yarn build` followed by `cordova prepare` to copy any assets and plugins. Then in Xcode, ensure the version and build numbers are properly set and choose a generic device target from the Scheme toolbar menu. Then choose Product > Archive. There is an issue uploading to the App Store from the Archives window. Instead export the archive and upload it via Application Loader. After uploading the build to iTunes Connect, if the build is still in the "Processing" phase after an hour, attempt to upload another build because more than likely there's probably an issue with Apple's servers.
