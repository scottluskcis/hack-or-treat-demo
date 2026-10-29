# Hack or Treat

Explore a fictional Halloween campus schedule and build on it during the workshop. The events are made up, and saving an event is only a personal bookmark—not registration.

## Before the workshop

- Create a [GitHub account](https://github.com/signup).
- Enable [GitHub Copilot](https://github.com/features/copilot) on that account. Copilot Free is enough to get started, subject to usage limits.
- Install [Visual Studio Code](https://code.visualstudio.com/).

## 1. Create your own copy

[![Use this template](https://img.shields.io/badge/Use_this_template-Create_your_repository-2ea44f?logo=github)](https://github.com/scottluskcis/hack-or-treat/generate)

Click the button above (or **Use this template → Create a new repository**), choose your GitHub account, name your repository `hack-or-treat`, and click **Create repository**.

## 2. Run in GitHub Codespaces (recommended)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new)

Click the button above, select **your new repository**, and click **Create codespace**. Codespaces uses the included devcontainer to install everything—no local Git, Node.js, or Docker needed.

Once setup finishes, open **Terminal → New Terminal** and run:

```sh
pnpm dev
```

Click **Open in Browser** when prompted to view the app. Sign in to Copilot with your GitHub account. You can work in the browser's VS Code editor or choose **Open in VS Code** to use the installed app.

Stop your Codespace when finished. [Codespaces usage limits apply](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces).

## Prefer to run locally?

Only this option needs [Git](https://git-scm.com/downloads) and [Node.js v24.15.0 or newer](https://nodejs.org/en/download/).

In **your new repository**, select **Code → Local → HTTPS** and copy its URL. Open a terminal and run the following, replacing `YOUR-REPOSITORY-URL` with that URL:

```sh
git clone YOUR-REPOSITORY-URL
cd hack-or-treat
npm install --global pnpm@12.15.0
pnpm install
pnpm dev
```

Open the cloned folder in VS Code, install **GitHub Copilot** from Extensions, and sign in. View the app at [http://localhost:3000](http://localhost:3000). Press `Ctrl+C` in the terminal to stop it.

## During the workshop

The app already shows the sample events. We'll use Copilot to help add the ability to save events.
