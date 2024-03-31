---
title: Deploy Astro on Azure
description: Deploy Astro on Azure
---
## Deploy your Astro project on Microsoft Azure

This guide will walk you through deploying your Astro site stored on GitHub using Visual Studio Code.
Refer to Microsoft guides to use an [Azure Pipelines Task](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/azure-static-web-app-v0?view=azure-pipelines) for other configurations.
## Prerequisites
To follow this guide, you'll need:
- An Azure account and subscription key. You can create a free Azure account [here](https://azure.microsoft.com).
- Your project code uploaded to GitHub.
- The SWA Extension in Visual Studio Code.
## How to deploy
1. Open your project in VS Code.

2. Open the Static Web Apps extension, sign in to Azure, and click the + button to create a new Static Web App.
You will be prompted to designate the subscription key to use.

3. Follow the wizard initiated by the extension to give your app a name, select a pre-set framework, and designate your app's root (usually /) and the location of the generated files /dist. Astro is not listed in Azure's built-in templates, so you'll need to choose custom. The wizard will create and run a GitHub Action in your repository within the .github directory.

The GitHub Action will deploy your application (you can see the progress in the Actions tab on GitHub). When successfully completed, you can view your application at the address shown in the SWA Extension progress window by clicking the Browse Website button (this will appear after the GitHub Action has run).
## Known Issues
The automatically created GitHub yaml action assumes the use of node 14. This means that Astro compilation will fail. To resolve this, update your project's package.json with this snippet.
```yaml
  "engines": {
    "node": ">=18.0.0"
  },
  ```
