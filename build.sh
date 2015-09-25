cordova build --release android
cp platforms/android/ant-build/MainActivity-release-unsigned.apk .
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore MainActivity-release-unsigned.apk alias_name
rm MainActivity.apk
~/android-sdk/build-tools/21.1.1/zipalign -v 4 MainActivity-release-unsigned.apk MainActivity.apk
