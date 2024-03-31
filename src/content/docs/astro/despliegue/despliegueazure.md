---
title: Despliegue Astro en Azure
description: Despliegue Astro en Azure
---
## Despliega tu proyecto de Astro en Microsoft Azure

Esta guía te llevará a través del despliegue de tu sitio de Astro almacenado en GitHub usando Visual Studio Code. 
Consulta las guías de Microsoft para usar una [Tarea de Azure Pipelines](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/azure-static-web-app-v0?view=azure-pipelines) para otras configuraciones.
## Prerrequisitos
Para seguir esta guía necesitarás:
- Una cuenta de Azure y una clave de subscripción. Puedes crear una cuenta gratuita de Azure aquí.
- Subir el código de tu proyecto a GitHub.
- La Extensión de SWA en Visual Studio Code.
## Cómo desplegar
1. Abre tu proyecto en VS Code.

2. Abre la extensión de Aplicaciones Web Estáticas, inicia sesión en Azure, y haz clic en el botón de + para crear una nueva Aplicación Web Estática. 
Se te pedirá que designes la clave de subscripción a usar.

3. Sigue el asistente iniciado por la extensión para darle a tu aplicación un nombre, seleccionar un framework preestablecido y designar la raíz de tu aplicación (usualmente /) y la ubicación de los archivos generados /dist. Astro no está enlistado en las plantillas integradas de Azure por lo que necesitarás elegir custom. El asistente creará y ejecutará una GitHub Action en tu repositorio dentro del directorio .github.

La GitHub Action desplegará tu aplicación (puedes ver el progreso en la pestaña de Actions en GitHub). Cuando se complete con éxito, puedes ver tu aplicación en la dirección mostrada en la ventana de progreso de la Extensión de SWA haciendo clic en el botón de Browse Website (esto aparecerá después de que la GitHub Action se haya ejecutado).
## Problemas Conocidos
La acción yaml de GitHub que es creada automáticamente asume el uso de node 14. Esto significa que la compilación de Astro fallará. Para resolver esto actualiza el package.json de tus proyectos con este snippet.
```ymal
  "engines": {
    "node": ">=18.0.0"
  },
  ```

