---
title: Mac Setup
description: Mac Terminal Setup.
---
# Configuración del Terminal de Mac

## Mac Terminal Setup

### Install Homebrew
Open a terminal window and install Homebrew with the following command:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
### Add Homebrew to PATH
:::tip[It might not be necessary]
You can check if it's necessary with the following command:
```bash
brew --version
```
if the response is `Homebrew 4.2.15`, you can skip this step.
:::

After installing, add it to the PATH (replace "[username]" with your actual username):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/[username]/.zprofile

eval "$(/opt/homebrew/bin/brew shellenv)"
```
### Install iTerm2
To install, run:

```zsh
brew install --cask iterm2
```

Switch to iTerm2 for the rest of this tutorial.

### Install Git
If you don't have it installed, install Git as well:
```zsh
brew install git
```
### Install Oh My Zsh
Run this to install Oh My Zsh:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
#### Install PowerLevel10K theme for Oh My Zsh
Run this to install PowerLevel10K:
```bash
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```
 
1. Now that it's installed, open the file "~/.zshrc" 
```bash
nano ~/.zshrc
```
2. and change the value of "ZSH_THEME" as shown below:
```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```
To reflect this change in your terminal, either restart it or run this command:
```bash
source ~/.zshrc 
 ```

#### Configure PowerLevel10K

Restart **iTerm2.** You should now see the PowerLevel10K configuration process. If not, press ***command*** + ***,*** or run the following:

```bash
p10k configure
```
Follow the instructions for PowerLevel10K configuration to make your terminal look as you desire.

Increase the terminal font size

- Open iTerm2 preferences
- Go to Profiles > Text
- Increase the font size to around 14-px

You can find other themes here: [iTerm2 Color Schemes](https://iterm2colorschemes.com)

### Install ZSH plugins
Install zsh-autosuggestions:

```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
### Install zsh-syntax-highlighting:

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
Open the ***"~/.zshrc"*** file in your desired editor and modify the plugins line as shown below:
1. open the ***"~/.zshrc"*** file
```zsh
nano ~/.zshrc
```

```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)
```
Load these new plugins by running:
```zsh
source ~/.zshrc
```
:::tip
## Update VSCode Terminal Font (Optional)
#### Install Meslo Nerd Font
Open settings.json and add this line:
```json
"terminal.integrated.fontFamily": "MesloLGS NF"
```
:::
You're done!
With that, you're finished and should have a much better terminal experience!

 😒c—⟪=====>😛