---
title: Install Flutter 
description: Install Flutter.
---
## Mac Installation Steps
1. Download Flutter

   Visit the official Flutter website and download the latest stable version for [macOS](https://docs.flutter.dev/get-started/install/macos).

2. Extract the File

   Once the download is complete, extract it to the directory of your choice. For example, you can use your user folder.

3. Configure Environment Variables

   Add the Flutter path to your system's PATH. You can do this using the Terminal. Open a new Terminal window and run the following commands:


   Replace [FLUTTER_DIRECTORY_PATH] with the actual path where you extracted the Flutter file.
```bash
   echo 'export PATH="$PATH:[FLUTTER_DIRECTORY_PATH]/flutter/bin"' >> ~/.bash_profile
   source ~/.bash_profile
```

4. Install Xcode

   If you don't have Xcode installed yet, you can do so from the Mac App Store or by downloading the installer from the official Apple website.

5. Install Xcode Command Line Tools

   Open Terminal and run the following command to install Xcode's command line tools:

```bash
   xcode-select --install
 ```

6. Run Flutter Doctor

   In Terminal, run the following command to verify if Flutter has been installed correctly and if there are any dependencies that need to be installed:

```bash
   flutter doctor
```

   This command will give you a list of pending tasks to complete the Flutter installation. You may need to install additional dependencies like CocoaPods.

7. Install Additional Dependencies as Indicated by `flutter doctor`

   If Flutter Doctor indicates missing dependencies, you can install them following the provided instructions. For example, to install CocoaPods, you can run:

 ```bash
   sudo gem install cocoapods
```

8. Configure the Editor

   You can use any text editor or IDE to develop Flutter applications. Some popular options include Visual Studio Code, IntelliJ IDEA, and Android Studio. Install the necessary extensions for Flutter development in your preferred editor.

   Done! Now you have Flutter installed on your macOS system and are ready to start developing cross-platform applications.

   You can create and run your Flutter projects using the `flutter create` command to create a new project and `flutter run` to run it on an emulator or connected device.

   ( -_•)▄︻デ══━一🧞