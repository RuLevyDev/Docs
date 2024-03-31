---
title: Mac Setup
description: Mac Terminal Setup.
---
# Configuración del Terminal de Mac

### Instalar Homebrew
Abre una ventana de terminal y instala Homebrew con el siguiente comando:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
### Agregar Homebrew al PATH
:::tip[Posiblemente no es  necesario]
Con el siguiente comando podras comprobar si es necesario.
```bash
brew --version
```
si la respuesta es `Homebrew 4.2.15`,puedes saltarte este paso.
:::

Después de instalarlo, agrégalo al PATH (reemplaza "[nombredeusuario]" con tu nombre de usuario real):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/[nombredeusuario]/.zprofile

eval "$(/opt/homebrew/bin/brew shellenv)"
```
### Instalar iTerm2
Para instalar, ejecuta:

```zsh
brew install --cask iterm2

```

Cambia a iTerm2 para el resto de este tutorial.

### Instalar Git
Si no lo tienes instalado, instala Git también:
```zsh
brew install git
```
### Instalar Oh My Zsh
Ejecuta esto para instalar Oh My Zsh:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
#### Instalar el tema PowerLevel10K para Oh My Zsh
Ejecuta esto para instalar PowerLevel10K:
```bash
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```
 
1. Ahora que está instalado, abre el archivo "~/.zshrc" 
```bash
nano ~/.zshrc
```
2. y cambia el valor de "ZSH_THEME" como se muestra a continuación:
```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```
Para reflejar este cambio en tu terminal, reiníciala o ejecuta este comando:
```bash
 source ~/.zshrc 
 ```

#### Configurar PowerLevel10K

Reinicia **iTerm2.** Ahora deberías ver el proceso de configuración de PowerLevel10K. Si no es así, presiona ***command*** + ***,*** o ejecuta lo siguiente   :

```bash
p10k configure
```
Sigue las instrucciones para la configuración de PowerLevel10K para que tu terminal se vea como desees.

Aumentar el tamaño de la fuente del terminal

- Abre las preferencias de iTerm2
- Ve a Perfiles > Texto
- Aumenta el tamaño de la fuente a aproximadamente 14-px

Puedes encontrar otros temas aquí: [Esquemas de color de iTerm2](https://iterm2colorschemes.com)

### Instalar plugins de ZSH
Instala zsh-autosuggestions:

```zsh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
### Instala zsh-syntax-highlighting:

```zsh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
Abre el archivo ***"~/.zshrc"*** en tu editor deseado y modifica la línea de plugins como se muestra a continuación:
1. abre el archivo ***"~/.zshrc"***
```zsh
nano ~/.zshrc
```

```zsh
plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)
```
Carga estos nuevos plugins ejecutando:
```zsh
source ~/.zshrc
```
:::tip
 ## Actualizar la fuente del terminal de VSCode (opcional)
#### Instalar Meslo Nerd Font
Abre settings.json y agrega esta línea:
```json
"terminal.integrated.fontFamily": "MesloLGS NF"
```
:::
¡Has terminado!
Con eso, ¡has terminado y deberías tener una experiencia de terminal mucho mejor!

 😒c—⟪=====>😛
