---
title: Quick Deployment
description: Quick deployment options
---
You can create and deploy your Astro project on various platforms quickly using the user interface (UI) on its website or the command-line interface (CLI).

## Web UI
A quick way to deploy your website is to connect a remote Git repository to your Astro project (e.g., GitHub, GitLab, Bitbucket) to a hosting service and take advantage of continuous integration with Git.

These hosting platforms automatically detect changes in the source repository of your Astro project, build your project, and deploy it to a customized URL or your personal domain. Setting up deployment on these platforms often involves steps such as:

1. Add your repository to a remote Git repository (e.g., on GitHub, GitLab, Bitbucket).
2. Choose a host that supports continuous integration (e.g., Netlify or Vercel) and import your Git repository as a new site/project.

Many common hosts will recognize your project as an Astro site and choose the appropriate configuration settings to build and deploy your project as shown below.
(Otherwise, these settings can be changed).

:::note[Deployment Configuration]
Build Command: `astro build` or `npm run build`
Publish Directory: `dist`
:::

3. Click on "Deploy," and your new website will be created at a unique URL for that host (e.g., `new-astro-site.netlify.app`).

The host will be automatically configured to watch the main branch of the Git repository for changes, to rebuild and redeploy your project on each push. These settings can typically be configured in the UI of your hosting provider's control panel.

## CLI Deployment
Some hosts will have their own command-line interface (CLI) that you can install globally on your machine using npm. Using a CLI for deployment often looks like the following:

1. Install the host's CLI globally, for example:

```pnpm
pnpm add --global netlify-cli
```

2. Run the CLI and follow authorization, configuration, etc., instructions.

3. Create your project and deploy it on the host.

Many hosting providers will build and deploy your project for you. They will usually recognize your project as an Astro site and choose the appropriate configuration settings to build and deploy as shown below.
(Otherwise, these settings can be changed).

:::note[Deployment Configuration]
Build Command: `astro build` or `npm run build`
Publish Directory: `dist`
:::

Other hosting providers may require you to build your site locally and deploy it using the command line.

## Building Your Project Locally
Many hosts like Netlify and Vercel will build your project for you and publish it on the web automatically. However, some hosts will require you to build your project locally and then run the deployment command or upload the build result.
You may also want to build your project locally for preview or to detect potential errors and warnings in the environment.
Run the command `pnpm run build` to build your Astro project.

```pnpm
pnpm run build
```

By default, the build output will be placed in `dist/`. This location can be changed using the outDir configuration option.

## Adding an SSR Adapter
:::note
Before deploying your Astro project with SSR (server-side rendering) enabled, make sure you have:
- Installed the appropriate adapter in your dependencies (either manually, or using the `astro add` command, e.g., `npx astro add netlify`).
- Added the adapter to your import and default export in your `astro.config.mjs` file when installed manually. (The `astro add` command will take care of this step for you!)
