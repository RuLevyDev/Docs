---
title: Imagekit.io .NET implementation guide
description: Imagekit.io .NET implementation guide

---

:::danger[Suerte te hara falta!]
suerte amigo te la deseo.
:::


El SDK de ImageKit DotNET te permite utilizar [redimensionamiento de imágenes](https://docs.imagekit.io/features/image-transformations), [optimización](https://docs.imagekit.io/features/image-optimization), [carga de archivos](https://docs.imagekit.io/api-reference/upload-file-api) y otras [APIs de ImageKit](https://docs.imagekit.io/api-reference/api-introduction) desde aplicaciones escritas en C# del lado del servidor.

## **Instalación**

Gestor de paquetes

```bash
Install-Package Imagekit
```

PackageReference

```xml
<PackageReference Include="Imagekit" Version="4.0.1">
</PackageReference>
```

.NET CLI

```bash
dotnet add package Imagekit --version 4.0.1
```

Abre tu proyecto, navega hasta la consola del administrador de paquetes NuGet y agrega el paquete Imagekit. Además, puedes buscar [Imagekit](https://www.nuget.org/packages/Imagekit) en la interfaz gráfica de NuGet.

## **Inicialización**

Añade esta referencia donde desees utilizar los servicios de imagekit.io:

```csharp
using Imagekit;
ImageKitClient imagekit = new ImageKitClient(publicKey, privateKey, urlEndPoint);
```

Nota: Puedes obtener la apiKey, apiSecret e ImagekitId desde tu [panel de control de Imagekit.io](https://imagekit.io/dashboard).

## **Aplicación de demostración**

La forma más rápida de empezar es ejecutar la aplicación de demostración en la carpeta [ImageKitSample](https://github.com/imagekit-developer/imagekit-dotnet/blob/master/ImageKitSample).

## **Uso**

Puedes utilizar este SDK de DotNET para tres funciones diferentes: generación de URL, carga de archivos y gestión de archivos. El uso del SDK se ha explicado a continuación.

### **Generación de URL**

1. Usando la ruta de la imagen y el nombre de host o punto final de la imagen

Este método te permite crear una URL utilizando la ruta donde existe la imagen y el punto final de URL (urlEndpoint) que deseas utilizar para acceder a la imagen. Puedes consultar la documentación [aquí](https://docs.imagekit.io/integration/url-endpoints) para leer más sobre los puntos finales de URL en ImageKit y la sección sobre [orígenes de imágenes](https://docs.imagekit.io/integration/configure-origin) para entender las rutas con diferentes tipos de orígenes.
```csharp
string path = "/default_image.jpg";
Transformation trans = new Transformation()
.Width(400)
.Height(300)
.AspectRatio("4-3")
.Quality(40)
.Crop("force")
.CropMode("extract")
.Focus("left")
.Format("jpeg")
.Raw("h-200,w-300,l-image,i-logo.png,l-end");
string imageURL = imagekit.Url(trans).Path(path).TransformationPosition("query").Generate();
```
Esto resulta en una URL como

[https://ik.imagekit.io/default_image.jpg?tr=w-400%2Ch-300%2Car-4-3%2Cq_40%2Cc-force%2Ccm-extract%2Cfo-left%2Cf-jpeg%2Ch-200%2Cw-300%2Cl-image%2Ci-logo.png%2Cl-end](https://ik.imagekit.io/default_image.jpg?tr=w-400%2Ch-300%2Car-4-3%2Cq_40%2Cc-force%2Ccm-extract%2Cfo-left%2Cf-jpeg%2Ch-200%2Cw-300%2Cl-image%2Ci-logo.png%2Cl-end)

2. Usando la URL completa de la imagen

Este método te permite agregar parámetros de transformación a una URL completa existente que ya está mapeada a ImageKit usando el parámetro src. Este método debe usarse si tienes la URL completa mapeada a ImageKit almacenada en tu base de datos.
```csharp
string imageURL = imagekit.Url(new Transformation().Width(400).Height(300))
.Src("https://ik.imagekit.io/your_imagekit_id/endpoint/default_image.jpg")
.Generate();
```
Esto resulta en una URL como

[https://ik.imagekit.io/your_imagekit_id/endpoint/default_image.jpg?tr=h-300,w-400](https://ik.imagekit.io/your_imagekit_id/endpoint/default_image.jpg?tr=h-300,w-400)

El método .Url() acepta los siguientes parámetros.

| **Opción** | **Descripción** |
| --- | --- |
| urlEndpoint | Opcional. La URL base que se debe agregar antes de la ruta de la imagen. Si no se especifica, se utiliza el punto final de URL especificado en el momento de la inicialización del SDK. Por ejemplo, [https://ik.imagekit.io/your_imagekit_id/endpoint/](https://ik.imagekit.io/your_imagekit_id/endpoint/) |
| path | Condicional. Esta es la ruta en la que existe la imagen. Por ejemplo, /ruta/a/imagen.jpg. Se debe especificar el parámetro de ruta o src para la generación de URL. |
| src | Condicional. Esta es la URL completa de una imagen ya mapeada a ImageKit. Por ejemplo, [https://ik.imagekit.io/your_imagekit_id/endpoint/ruta/a/imagen.jpg](https://ik.imagekit.io/your_imagekit_id/endpoint/ruta/a/imagen.jpg). Se debe especificar el parámetro de ruta o src para la generación de URL. |
| transformation | Opcional. Una matriz de objetos que especifica la transformación que se aplicará en la URL. El nombre de la transformación y el valor deben especificarse como un par de clave-valor en el objeto. Se pueden especificar diferentes pasos de una [transformación encadenada](https://docs.imagekit.io/features/image-transformations/chained-transformations) como los diferentes objetos de la matriz. La lista completa de transformaciones compatibles en el SDK y algunos ejemplos de cómo usarlas se encuentran más adelante. Si utilizas un nombre de transformación que no está especificado en el SDK, se aplica tal cual en la URL. |
| transformationPosition | Opcional. El valor predeterminado es path que coloca la cadena de transformación como un parámetro de ruta de URL. También se puede especificar como query, lo que agrega la cadena de transformación como el parámetro de consulta de la URL tr. Si utilizas el parámetro src para crear la URL, entonces la cadena de transformación siempre se agrega como un parámetro de consulta. |
| queryParameters | Opcional. Estos son los otros parámetros de consulta que deseas agregar a la URL final. Estos pueden ser cualquier parámetro de consulta y no necesariamente relacionados con ImageKit. Especialmente útil si deseas agregar algunos parámetros de versionamiento a tus URLs. |
| signed | O

pcional. Booleano. El valor predeterminado es false. Si se establece en false, el SDK genera una URL de imagen firmada agregando la firma de la imagen a la URL de la imagen. Esto solo se puede usar si creas la URL con los parámetros urlEndpoint y path, no con el parámetro src. |
| expireSeconds | Opcional. Entero. Está destinado a utilizarse junto con el parámetro signed para especificar el tiempo en segundos a partir de ahora cuando la URL debe expirar. Si se especifica, la URL contiene la marca de tiempo de caducidad en la URL y la firma de la imagen se modifica en consecuencia. |

#### **Ejemplos de generación de URLs**

1. Transformaciones encadenadas como parámetro de consulta
```csharp
Transformation transformation = new Transformation()
.Width(400).Height(300)
.Chain()
.Rotation(90);
string imageURL = imagekit.Url(transformation)
.Path("/default_image.jpg")
.UrlEndpoint("https://ik.imagekit.io/your_imagekit_id/endpoint")
.TransformationPosition("query")
.Generate();
```
[https://ik.imagekit.io/your_imagekit_id/endpoint/default_image.jpg?tr=h-300,w-400:rt-90](https://ik.imagekit.io/your_imagekit_id/endpoint/default_image.jpg?tr=h-300,w-400:rt-90)

2. Transformaciones de nitidez y contraste y una imagen JPG progresiva

Hay algunas transformaciones como [Sharpening](https://docs.imagekit.io/features/image-transformations/image-enhancement-and-color-manipulation) que se pueden agregar a la URL con o sin ningún otro valor.
```csharp
string src = "https://ik.imagekit.io/your_imagekit_id/endpoint/default-image.jpg";
Transformation trans = new Transformation()
.Format("jpg")
.Progressive(false)
.EffectSharpen()
.EffectContrast(1);
string imageURL = imagekit.Url(trans)
.Src(src)
.Generate();
```
Nota: Debido a que se usó el parámetro src, la cadena de transformación se agrega como un parámetro de consulta tr.

[https://ik.imagekit.io/your_imagekit_id/endpoint/default-image.jpg?tr=f-jpg,pr-false,e-sharpen,e-contrast-1](https://ik.imagekit.io/your_imagekit_id/endpoint/default-image.jpg?tr=f-jpg,pr-false,e-sharpen,e-contrast-1)

3. URL firmada que expira en 600 segundos con el punto final de URL predeterminado y otros parámetros de consulta
```c#
Transformation trans = new Transformation()

.Height(300).Width(400);

string[] queryParams = { "v = 123" };

string imageURL = imagekit.Url(trans)

.Path("/default-image.jpg")

.QueryParameters(queryParams)

.Signed(false).ExpireSeconds(600)

.Generate();
```
[https://ik.imagekit.io/your_imagekit_id/tr:h-300,w-400/default-image.jpg?v=123&ik-t=1567358667&ik-s=f2c7cdacbe7707b71a83d49cf1c6110e3d701054](https://ik.imagekit.io/your_imagekit_id/tr:h-300,w-400/default-image.jpg?v=123&ik-t=1567358667&ik-s=f2c7cdacbe7707b71a83d49cf1c6110e3d701054)

#### **Lista de transformaciones compatibles**

La lista completa de transformaciones compatibles y su uso en ImageKit se puede encontrar [aquí](https://docs.imagekit.io/features/image-transformations). El SDK asigna un nombre a cada parámetro de transformación, lo que hace que el código sea más simple y legible. Si una transformación es compatible en ImageKit, pero no se puede encontrar un nombre para ella en la tabla a continuación, entonces usa el código de transformación de la documentación de ImageKit como nombre al utilizar la función url.

| **Nombre de Transformación Compatible** | **Traducción a parámetros** |
| --- | --- |
| Altura | h   |
| Anchura | w   |
| Relación de aspecto | ar  |
| Calidad | q   |
| Recorte | c   |
| Modo de recorte | cm  |
| X   | x   |
| Y   | y   |
| Enfoque | fo  |
| Formato | f   |
| Radio | r   |
| Fondo | bg  |
| Borde | b   |
| Rotación | rt  |
| Desenfoque | bl  |
| Nombrado | n   |
| Superposición X | ox  |
| Superposición Y | oy  |
| Enfoque de superposición | ofo |
| Altura de superposición | oh  |
| Anchura de superposición | ow  |
| Imagen de superposición | oi  |
| Recorte de imagen de superposición | oit |
| Relación de aspecto de imagen de superposición | oiar |
| Fondo de imagen de superposición | oibg |
| Borde de imagen de superposición | oib |
| DPR de imagen de superposición | oidpr |
| Calidad de imagen de superposición | oiq |
| Recorte de imagen de superposición | oic |
| Recorte de imagen de superposición | oit |
| Texto de superposición | ot  |
| Tamaño de fuente del texto de superposición | ots |
| Familia de fuentes del texto de superposición | otf |
| Color del texto de superposición | otc |
| Transparencia del texto de superposición | oa  |
| Alfa de superposición | oa  |
| Tipografía del texto de superposición | ott |
| Fondo de superposición | obg |
| Texto de superposición codificado | ote |
| Ancho de texto de superposición | otw |
| Fondo de texto de superposición | otbg |
| Relleno de texto de superposición | otp |
| Alineación interna del texto de superposición | otia |
| Radio de superposición | or  |
| Progresivo | pr  |
| Sin pérdida | lo  |
| Recorte | t   |
| Metadatos | md  |
| Perfil de color | cp  |
| Imagen predeterminada | di  |
| Dpr | dpr |
| Efecto de nitidez | e-sharpen |
| Efecto USM | e-usm |
| Efecto de contraste | e-contrast |
| Efecto gris | e-grayscale |
| Original | orig |
| Crudo | reemplazado por el valor del parámetro |

### **Carga de archivos**

El SDK proporciona una interfaz sencilla utilizando el método .upload() para cargar archivos en la Biblioteca de Medios de ImageKit. Acepta todos los parámetros compatibles con la [API de carga de

 archivos de ImageKit](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload).

El método upload() requiere al menos los parámetros de archivo y fileName para cargar un archivo. Puedes pasar otros parámetros compatibles con la API de carga de ImageKit utilizando el mismo nombre de parámetro que se especifica en la documentación de la API de carga. Por ejemplo, para especificar etiquetas para un archivo en el momento de la carga, utiliza el parámetro tags como se especifica en la [documentación aquí](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload).

Uso de muestra
```csharp
// Carga por URI
FileCreateRequest request = new FileCreateRequest
{
file = "http://www.google.com/images/logos/ps_logo2.png",
fileName = "file_name.jpg",
};
Result resp1 = imagekit.Upload(request);
// Carga por bytes
byte[] bytes = System.IO.File.ReadAllBytes(@"image file path");
FileCreateRequest ob = new FileCreateRequest
{
file = bytes,
fileName = Guid.NewGuid().ToString()
};
List<string> tags = new List<string>
{
"Software",
"Developer",
"Engineer"
};
ob.tags = tags;
string customCoordinates = "10,10,20,20";
ob.customCoordinates = customCoordinates;
List<string> responseFields = new List<string>
{
"isPrivateFile",
"tags",
"customCoordinates"
};
ob.responseFields = responseFields;
List<Extension> ext = new List<Extension>();
BackGroundImage bck1 = new BackGroundImage
{
name = "remove-bg",
options = new options()
{ add_shadow = true, semitransparency = false, bg_image_url = "http://www.google.com/images/logos/ps_logo2.png" }
};
AutoTags autoTags = new AutoTags
{
name = "google-auto-tagging",
maxTags = 5,
minConfidence = 95
};
ext.Add(bck1);
ext.Add(autoTags);
ob.extensions = ext;
ob.webhookUrl = "https://webhook.site/c78d617f_33bc_40d9_9e61_608999721e2e";
ob.useUniqueFileName = true;
ob.folder = "dummy_folder";
ob.isPrivateFile = false;
ob.overwriteFile = true;
ob.overwriteAITags = true;
ob.overwriteTags = true;
ob.overwriteCustomMetadata = true;
Result resp2 = imagekit.Upload(ob);
// Obtener Base64
byte[] imageArray = System.IO.File.ReadAllBytes(@"image file path");
string base64ImageRepresentation = Convert.ToBase64String(imageArray);
// Carga por Base64
FileCreateRequest ob2 = new FileCreateRequest
{
file=base64ImageRepresentation,
fileName = Guid.NewGuid().ToString()
};
Result resp = imagekit.Upload(ob2);
```

## **Gestión de archivos**

El SDK proporciona una interfaz sencilla para todas las [API de medios mencionadas aquí](https://docs.imagekit.io/api-reference/media-afile-uploadpi) para gestionar tus archivos.

1. Listar y buscar archivos

Acepta un objeto que especifica los parámetros a utilizar para listar y buscar archivos. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/list-and-search-files) se pueden pasar tal cual con los valores correctos para obtener los resultados.
```csharp
GetFileListRequest model = new GetFileListRequest
{
Name = "file_name.jpg",
Type = "file",
Limit = 10,
Skip = 0,
Sort = "ASC_CREATED",
SearchQuery = "createdAt >= \"7d\"",
FileType = "image",
Tags = new string[] { "tag1", "tag2" }
};
ResultList resp = await imagekit.GetFileDetail(model);
```
2. Obtener detalles del archivo
Acepta el ID del archivo y recupera los detalles según la [documentación de la API aquí](https://docs.imagekit.io/api-reference/media-api/get-file-details).
Result resp = await imagekit.GetFileDetail(file_Id);
3. Actualizar archivo
Acepta un objeto de la clase FileUpdateRequest que especifica los parámetros a utilizar para actualizar los detalles del archivo. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/update-file-details) se pueden pasar a través de sus funciones setter para obtener los resultados.
```csharp
FileUpdateRequest updateob = new FileUpdateRequest
{
fileId = "fileId",
};
List<string> updatetags = new List<string>
{
"Software",
"Developer",
"Engineer"
};
updateob.tags = updatetags;
string updatecustomCoordinates = "10,10,20,20";
updateob.customCoordinates = updatecustomCoordinates;
List<string> updateresponseFields = new List<string>
{
"isPrivateFile",
"tags",
"customCoordinates"
};
List<Extension> extModel = new List<Extension>();
BackGroundImage bck = new BackGroundImage
{
name = "remove-bg",
options = new options() { add_shadow = true, semitransparency = false, bg

_image_url = "http://www.google.com/images/logos/ps_logo2.png" }
};
AutoTags autoTagsModel = new AutoTags
{
name = "google-auto-tagging",
maxTags = 5,
minConfidence = 95
};
extModel.Add(bck);
extModel.Add(autoTagsModel);
updateob.extensions = extModel;
updateob.webhookUrl = "https://webhook.site/c78d617f_33bc_40d9_9e61_608999721e2e";
updateob.isPrivateFile = false;
updateob.folder = "dummy_folder";
updateob.overwriteFile = true;
updateob.overwriteAITags = true;
updateob.overwriteTags = true;
updateob.overwriteCustomMetadata = true;
Result resp3 = await imagekit.UpdateFileDetail(updateob);
```
4. Eliminar archivo
Acepta el ID del archivo que se eliminará y lo elimina según la [documentación de la API aquí](https://docs.imagekit.io/api-reference/media-api/delete-file).
```csharp
String fileId = "file_Id";
Result resp4 = await imagekit.DeleteFile(fileId);
```

5. Eliminar archivos (masivamente)

Acepta los IDs de archivo para eliminar archivos según la [documentación de la API aquí](https://docs.imagekit.io/api-reference/media-api/delete-files-bulk).
```c#
List<string> ob3 = new List<string>();
ob3.Add("fileId_1");
ob3.Add("fileId_2");
ResultFileDelete resultFileDelete = imagekit.BulkDeleteFiles(ob3);
```

6. Copiar archivo

Acepta un objeto de la clase CopyFileRequest especificando los parámetros que se utilizarán para copiar un archivo. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/copy-file) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
CopyFileRequest cpyRequest = new CopyFileRequest
{
sourceFilePath = "path_1",
destinationPath = "path_2",
includeFileVersions = true
};
ResultNoContent resultNoContent = imagekit.CopyFile(cpyRequest);
```

7. Mover archivo

Acepta un objeto de la clase MoveFileRequest especificando los parámetros que se utilizarán para mover un archivo. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/move-file) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
MoveFileRequest moveFile = new MoveFileRequest
{
sourceFilePath = "path_1",
destinationPath = "path_2"
};
ResultNoContent resultNoContentMoveFile = imagekit.MoveFile(moveFile);
```

8. Renombrar archivo

Acepta un objeto de la clase RenameFileRequest especificando los parámetros que se utilizarán para renombrar un archivo. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/rename-file) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
RenameFileRequest renameFileRequest = new RenameFileRequest
{
filePath = "path_1",
newFileName = "file_name",
purgeCache = false
};
ResultRenameFile resultRenameFile = imagekit.RenameFile(renameFileRequest);
```

### **Gestión de etiquetas**

El SDK proporciona una interfaz simple para administrar tus etiquetas.

9. Agregar etiquetas

Acepta un objeto de la clase TagsRequest especificando los parámetros que se utilizarán para agregar etiquetas. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/add-tags-bulk) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
TagsRequest tagsRequest = new TagsRequest
{
tags = new List<string>
{
"tag_1",
"tag_2"
},
fileIds = new List<string>
{
"fileId_1",
},
};
ResultTags resultTags = imagekit.AddTags(tagsRequest);
```

10. Eliminar etiquetas

Acepta un objeto de la clase TagsRequest especificando los parámetros que se utilizarán para eliminar etiquetas. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/remove-tags-bulk) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
TagsRequest removeTagsRequest = new TagsRequest
{
tags = new List<string>
{
"tag_1",
"tag_2"
},
fileIds = new List<string>
{
"fileId_1",
},
};
ResultTags removeTags = imagekit.RemoveTags(removeTagsRequest);
```

11. Eliminar etiquetas de IA

Acepta un objeto de la clase AITagsRequest especificando los parámetros que se utilizarán para eliminar etiquetas de IA. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/remove-aitags-bulk) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
AITagsRequest removeAITagsRequest = new AITagsRequest
{
AITags = new List<string>
{
"tag_1",
"tag_2"
},
fileIds = new List<string>
{
"fileId_1",
}
};
ResultTags removeAITags = imagekit.RemoveAITags(removeAITagsRequest);
```

12. Obtener versiones de archivo

Acepta el ID de archivo y obtiene los detalles según la [documentación de la API aquí](https://docs.imagekit.io/api-reference/media-api/get-file-versions).
```c#
String fileId = "file_id_1";
ResultFileVersions resultFileVersions = imageKit.getFileVersions(fileId);
```

13. Obtener detalles de la versión de archivo

Acepta el ID de archivo y el ID de versión y obtiene los detalles según la [documentación de la API aquí](https://docs.imagekit.io/api-reference/media-api/get-file-version-details).
```c#
String fileId = "file_Id";
String versionId = "version_Id";
ResultFileVersionDetails resultFileVersionDetails = imageKit.getFileVersionDetails(fileId, versionId);
```

14. Eliminar versión de archivo

Acepta un objeto de la clase DeleteFileVersionRequest especificando los parámetros que se utilizarán para eliminar la versión del archivo. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/delete-file-version) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
DeleteFileVersionRequest delRequest = new DeleteFileVersionRequest
{
fileId = "file_Id",
versionId = "version_Id"
};
ResultNoContent resultNoContent1 = imagekit.DeleteFileVersion(delRequest);
```

15. Restaurar versión de archivo

Acepta el fileId y versionId para restaurar la versión del archivo según la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/restore-file-version).
```c#
Result result = imagekit.RestoreFileVersion("file_Id", "version_Id");
```

### **Gestión de carpetas**

16. Crear carpeta

Acepta un objeto de la clase CreateFolderRequest especificando los parámetros que se utilizarán para crear una carpeta. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/create-folder) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
CreateFolderRequest createFolderRequest = new CreateFolderRequest
{
folderName = "folder_name",
parentFolderPath = "source/folder/path"
};
ResultEmptyBlock resultEmptyBlock = imagekit.CreateFolder(createFolderRequest);
```

17. Copiar carpeta

Acepta un objeto de la clase CopyFolderRequest especificando los parámetros que se utilizarán para copiar una carpeta. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/copy-folder) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
CopyFolderRequest cpyFolderRequest = new CopyFolderRequest
{
sourceFolderPath = "path_1

",
destinationPath = "path_2",
includeFileVersions = true
};
ResultOfFolderActions resultOfFolderActions = imagekit.CopyFolder(cpyFolderRequest);
```

18. Mover carpeta

Acepta un objeto de la clase MoveFolderRequest especificando los parámetros que se utilizarán para mover una carpeta. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/move-folder) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
MoveFolderRequest moveFolderRequest = new MoveFolderRequest
{
sourceFolderPath="path_1",
destinationPath="path_2"
};
ResultOfFolderActions resultOfFolderActions1 = imagekit.MoveFolder(moveFolderRequest);
```

19. Eliminar carpeta

Acepta un objeto de la clase DeleteFolderRequest especificando los parámetros que se utilizarán para eliminar una carpeta. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/delete-folder) pueden ser pasados a través de sus funciones setter para obtener los resultados.
```c#
DeleteFolderRequest deleteFolderRequest = new DeleteFolderRequest
{
folderPath="source/folder/path/folder_name",
};
ResultNoContent resultNoContent2 = imagekit.DeleteFolder(deleteFolderRequest);
```

### **Gestión de trabajos**

20. Obtener estado de trabajo masivo

Acepta el jobId para obtener el estado del trabajo masivo según la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/copy-move-folder-status).
```c#
String jobId = "job_Id";
ResultBulkJobStatus resultBulkJobStatus = imageKit.getBulkJobStatus(jobId);
```

## **Purga**

21. Limpiar caché

Acepta la URL completa del archivo para el cual se debe limpiar la caché según la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/purge-cache).
```c#
ResultCache result = imageKit.purgeCache("<https://ik.imageKit.io/imagekit-id/default-image.jpg>");
```

22. Estado de limpieza de caché

Acepta un ID de solicitud y obtiene el estado de limpieza de la caché según la [documentación aquí](https://docs.imagekit.io/api-reference/media-api/purge-cache-status)
```c#
String requestId = "cache_request_Id";
ResultCacheStatus result = imageKit.getPurgeCacheStatus(requestId);
```

### **Metadatos**

Acepta el ID de archivo y obtiene los metadatos según la [documentación aquí](https://docs.imagekit.io/api-reference/metadata-api/get-image-metadata-for-uploaded-media-files)

23. Obtener metadatos de archivo
```c#
String fileId = "file_id";
ResultMetaData result = imageKit.getFileMetadata(fileId);
```
Otra forma de obtener metadatos desde una URL de archivo remoto según la [documentación aquí](https://docs.imagekit.io/api-reference/metadata-api/get-image-metadata-from-remote-url). Este archivo debe ser accesible a través del punto final de URL de imageKit.io.
```c#
String url = "URL del archivo remoto";
ResultMetaData result = imageKit.getRemoteFileMetadata(url);
```

24. Crear campos de metadatos personalizados

Acepta un objeto de la clase CustomMetaDataFieldCreateRequest especificando los parámetros que se utilizarán para crear campos de metadatos personalizados. Todos los parámetros especificados en la [documentación aquí](https://docs.imagekit.io/api-reference/custom-metadata-fields-api/create-custom-metadata-field) pueden ser pasados con los valores correctos para obtener los resultados.

Verifique los [Valores Permitidos En El Objeto De Esquema](https://docs.imagekit.io/api-reference/custom-metadata-fields-api/create-custom-metadata-field#allowed-values-in-the-schema-object).

#### **Ejemplos:**
```c#
CustomMetaDataFieldCreateRequest requestModel = new CustomMetaDataFieldCreateRequest
{
name = "custom-meta-1",
label = "Testmeta"
};
CustomMetaDataFieldSchemaObject schema = new CustomMetaDataFieldSchemaObject
{
type = "Number",
minValue = 2000,
maxValue = 3000,
isValueRequired = true,
defaultValue = "2500"
};
requestModel.schema = schema;
ResultCustomMetaDataField resultCustomMetaDataField1 = imagekit.CreateCustomMetaDataFields(requestModel);
- Ejemplo de tipo de fecha:
CustomMetaDataFieldCreateRequest requestModelDate = new CustomMetaDataFieldCreateRequest
{
name = "custom_meta_Date",
label = "TestmetaDate"
};
CustomMetaDataFieldSchemaObject schemaDate = new CustomMetaDataFieldSchemaObject
{
type = "Date",
minValue = "2022-11-30T10:11:10+00:00",
maxValue = "2022-12-30T10:11:10+00:00"
};
requestModelDate.schema = schemaDate;
ResultCustomMetaDataField resultCustomMetaDataFieldDate = imagekit.CreateCustomMetaDataFields(requestModelDate);
```

25. Obtener campos de metadatos personalizados

Acepta el booleano includeDeleted y obtiene los metadatos según la [documentación aquí](https://docs.imagekit.io/api-reference/custom-metadata-fields-api/get-custom-metadata-field)
```c#
bool includeDeleted = true;
ResultCustomMetaDataFieldList resultCustomMetaDataFieldList = imageKit.getCustomMetaDataFields(includeDeleted);
```

26. Editar campos de metadatos personalizados

Acepta un ID de campo de metadatos personalizados y un objeto de la clase CustomMetaDataFieldUpdateRequest especificando los parámetros que se utilizarán para editar campos de metadatos personalizados según la [documentación aquí](https://docs.imagekit.io/api-reference/custom-metadata-fields-api/update-custom-metadata-field).
```c#
CustomMetaDataFieldUpdateRequest requestUpdateModel = new CustomMetaDataFieldUpdateRequest
{
Id = "field_id",
};
CustomMetaDataFieldSchemaObject updateschema = new CustomMetaDataFieldSchemaObject
{
type = "Number",
minValue = 8000,
maxValue = 3000
};
requestUpdateModel.schema = updateschema;
ResultCustomMetaDataField resultCustomMetaDataFieldUpdate = imagekit.UpdateCustomMetaDataFields(requestUpdateModel);
```

27. Eliminar campos de metadatos personalizados

Aquí está la traducción del código y las secciones de comentarios:

```c#
// Acepta el ID para eliminar los customMetaDataFields según la [documentación de la API aquí](https://docs.imagekit.io/api-reference/custom-metadata-fields-api/delete-custom-metadata-field).
ResultNoContent resultNoContent = imageKit.DeleteCustomMetaDataField("field_id");
```
## **Funciones de utilidad**

Hemos incluido las siguientes funciones de utilidad comúnmente utilizadas en esta biblioteca.

### **Generación de parámetros de autenticación**

Si estás buscando implementar la carga de archivos en el lado del cliente, necesitarás un token, una marca de tiempo de vencimiento y una firma válida para esa carga. El SDK proporciona un método simple que puedes usar en tu código para generar estos parámetros de autenticación por ti.
:::note
_Nota: La clave de API privada nunca debe ser expuesta en ningún código del lado del cliente. Siempre debes generar estos parámetros de autenticación en el lado del servidor_
:::
```c#
AuthParamResponse resp = imageKit.GetAuthenticationParameters();
````
Devuelve
```json
{
"token" : "token_único",
"expire" : "marca_de_tiempo_de_vencimiento_válida",
"signature" : "firma_generada"
}
```
Tanto los parámetros token como expire son opcionales. Si no se especifican, el SDK utiliza el paquete [uuid](https://www.npmjs.com/package/uuid) para generar un token aleatorio y también genera una marca de tiempo de vencimiento válida internamente. El valor del token y expire utilizado para generar la firma siempre se devuelve en la respuesta, sin importar si se proporcionan como entrada a este método o no.

### **Cálculo de la distancia entre dos valores pHash**

El hash perceptual te permite construir un valor de hash que identifica de manera única una imagen de entrada basada en el contenido de una imagen. La [API de metadatos de imageKit.io](https://docs.imagekit.io/api-reference/metadata-api) devuelve el valor pHash de una imagen en la respuesta. Puedes usar este valor para [encontrar una imagen duplicada (o similar)](https://docs.imagekit.io/api-reference/metadata-api#using-phash-to-find-similar-or-duplicate-images) calculando la distancia entre el valor pHash de las dos imágenes.
Este SDK expone la función PHashDistance para calcular la distancia entre dos valores pHash. Acepta dos cadenas hexadecimales pHash y devuelve un valor numérico indicativo del nivel de diferencia entre las dos imágenes.
```c#
public static int CalculateDistance() {
// obtener de manera asíncrona los metadatos de dos archivos de imagen cargados
// ...
// Extraer cadenas pHash de ambos: digamos 'firstHash' y 'secondHash'
// ...
// Calcular la distancia entre ellos:
int distance = imageKit.PHashDistance(firstHash, secondHash);
return distance;
} 
```
#### **Ejemplos de cálculo de distancia**
```c#
imageKit.PHashDistance('firstHash', 'secondHash');
// salida: 0 (misma imagen)
imageKit.PHashDistance('firstHash', 'secondHash');
// salida: 17 (imágenes similares)
imageKit.PHashDistance('firstHash', 'secondHash');
// salida: 37 (imágenes diferentes)
```
## **Manejo de errores**

Captura y responde a datos no válidos, problemas internos y más.

El SDK de Imagekit .Net genera excepciones por muchas razones, como no encontrarse, parámetros no válidos, errores de autenticación y errores internos del servidor. Recomendamos escribir código que maneje adecuadamente todas las posibles excepciones de la API.

#### **Ejemplo:**
```c#
try
{
// Usa el SDK de ImageKit para hacer solicitudes...
}
catch (InvalidOperationException ex)
{
Console.Write("Operación no válida. Por favor, inténtalo de nuevo.");
}
catch (FormatException ex)
{
Console.Write("No es un formato válido. Por favor, inténtalo de nuevo.");
}
catch (WebServiceException webEx)
```
{

/\*

webEx.StatusCode = 400

webEx.StatusDescription = ArgumentNullException

webEx.ErrorCode = ArgumentNullException

webEx.ErrorMessage = El valor no puede ser nulo. Nombre del parámetro: Name

webEx.StackTrace = (tu StackTrace de Excepción del Servidor - en Modo de Depuración)

webEx.ResponseDto = (tu DTO de Respuesta poblado)

webEx.ResponseStatus = (tu DTO de Estado de Respuesta poblado)

webEx.GetFieldErrors() = (errores individuales para cada campo si los hay)

\*/

}

## **Acceso a request-id, otros encabezados de respuesta y código de estado HTTP**

Puedes acceder al objeto de éxito o error para acceder al código de estado HTTP y a los encabezados de respuesta.

// Éxito
```c#
var response = await imagekit.PurgeStatus(requestId);
console.Write(response.statusCode); // 200
// {'content-type': 'application/json', 'x-request-id': 'ee560df4-d44f-455e-a48e-29dfda49aec5'}
console.Write(response.Raw);
try
{
await imagekit.PurgeStatus(requestId);
}
catch (Exception ex)
{
console.Write(ex.Message);
// {'content-type': 'application/json', 'x-request-id': 'ee560df4-d44f-455e-a48e-29dfda49aec5'}
}
```