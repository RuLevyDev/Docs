---
title: Install Flutter
description: Install Flutter.
---
## Pasos de instalación en Mac
1. Descargar Flutter

Accede al sitio web oficial de Flutter y descarga la última versión estable para [macOS](https://docs.flutter.dev/get-started/install/macos).

2. Extraer el archivo

Una vez que se haya completado la descarga, extráelo en el directorio que prefieras. Por ejemplo, puedes utilizar la carpeta de tu usuario.

3. Configurar las variables de entorno

Agrega la ruta de Flutter al PATH de tu sistema. Puedes hacer esto mediante el Terminal. Abre una nueva ventana de Terminal y ejecuta los siguientes comandos:

Reemplaza [RUTA_A_FLUTTER_DIRECTORY] con la ruta real donde hayas extraído el archivo Flutter.
```bash
echo 'export PATH="$PATH:[RUTA_A_FLUTTER_DIRECTORY]/flutter/bin"' >> ~/.bash_profile
source ~/.bash_profile
```

4. Instalar Xcode

Si aún no tienes Xcode instalado, puedes hacerlo desde la Mac App Store o descargando el instalador desde el sitio web oficial de Apple.

5. Instalar Xcode Command Line Tools

Abre Terminal y ejecuta el siguiente comando para instalar las herramientas de línea de comandos de Xcode:

```bash
xcode-select --install
```
6. Ejecutar Flutter Doctor

En el Terminal, ejecuta el siguiente comando para verificar si Flutter ha sido instalado correctamente y si hay alguna dependencia que necesite ser instalada:

```bash
flutter doctor
```
Este comando te dará una lista de tareas pendientes para completar la instalación de Flutter. Puede que necesites instalar dependencias adicionales como CocoaPods.

7. Instalar dependencias adicionales indicadas por ```flutter doctor```

Si Flutter Doctor te indica que faltan dependencias, puedes instalarlas siguiendo las instrucciones proporcionadas. Por ejemplo, para instalar CocoaPods, puedes ejecutar:

```bash
sudo gem install cocoapods
```
8. Configurar el editor

Puedes utilizar cualquier editor de texto o IDE para desarrollar aplicaciones Flutter. Algunas opciones populares son Visual Studio Code, IntelliJ IDEA, y Android Studio. Instala las extensiones necesarias para el desarrollo de Flutter en tu editor preferido.

¡Listo! Ahora tienes Flutter instalado en tu sistema macOS y estás listo para comenzar a desarrollar aplicaciones multiplataforma.

 Puedes crear y ejecutar tus proyectos Flutter usando el comando flutter create para crear un nuevo proyecto y flutter run para ejecutarlo en un emulador o dispositivo conectado.

 ( -_•)▄︻デ══━一🧞
