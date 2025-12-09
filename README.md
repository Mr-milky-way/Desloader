
# Table of Contents
- [Demo](#demos)
- [Installation](#installation)
- [How to use](#how-to-use)
  - [3D Mode](#3d-mode)
    - [To code](#to-code)
    - [Hide](#hide)
    - [Save State](#save-state)
    - [Load State](#load-state)
    - [Load OBJ](#load-obj)
    - [Load OBJ Optimized](#load-obj-optimized)
    - [Input Texture File](#input-texture-file)
    - [Load Array from CSV](#load-array-from-csv)
    - [Settings for Both OBJ Optimized and normal loading](#settings-for-both-obj-optimized-and-normal-loading)
    - [Settings for OBJ Optimized loading](#settings-for-obj-optimized-loading)
  - [Coding Mode](#coding-mode)
    - [To 3D Mode](#to-3d-mode)
    - [Add ticker](#add-ticker)
    - [Load OBJ into table (very buggy would not recommend)](#load-obj-into-table-very-buggy-would-not-recommend)
    - [Import DesCode](#import-descode)
    - [Clear Graph when uploading code](#clear-graph-when-uploading-code)
- [Descode](#descode)
  - [Examples](#examples)
  - [Documentation](#documentation)
- [Tips](#tips)

# Demo(s)
## State loading demo
https://github.com/user-attachments/assets/57f4b150-efa5-4e28-8e5f-a6ba74c49dbb
## Rally Car Demo
[Here](https://www.desmos.com/3d/agwjdjeslf)

# Installation
## Preferred: Install from Webstore
You can install DesLoader from the [Firefox Web Store](https://addons.mozilla.org/en-US/firefox/addon/desloader-for-desmos/).
You can also install DesLoader from the [Chrome Web Store](https://chromewebstore.google.com/detail/desloader-for-desmos/pcpegebkojgbkaclajlbkbmhjcigedpm).

## Other: Install from ZIP
For the Most Resent release install the extension from a ZIP file.

- Head on over to [DesLoader releases](https://github.com/Mr-milky-way/Desloader/releases/tag/0.1.0) and get the newest release for your browser **Chrome.zip** for Chrome based browsers and **Firefox.zip** for Firefox.
- Navigate to `chrome://extensions` for Chrome based browsers and `about:debugging` for Firefox.

## Other: Using the bookmarklet
Just copy the bookmarklet.js and add it like any other bookmarklet.

## Chrome
- Unzip the downloaded zip file to a folder
- Enable "Developer mode" (top-right)
- Click "Load unpacked"
- Select the unzipped folder

## Firefox
- Choose "This Firefox" on the left
- Click "Temporary Extensions"
- Click "Load Temporary Add-on"
- Select the downloaded zip file (do not extract).

# How To use
DesLoader Adds all types of tools to load things into Desmos. DesLoader is to be used mainly with Desmos 3D.

Once you have installed DesLoader and DesModder you might see a button in the Top left of your screen that says "Show". This is how you will access the DesLoader menu. Once open you will see a large menu fill the screen That says tools.

## 3D Mode
This Bit will go in order of what is show in the menu from top down.

### To code
This takes you to the coding mode of DesLoader more on that in the [Coding Mode](#coding-mode) section.

### Hide
This allows you to hide the menu at any time.

### Save State
This allows you to save the current state of the calculator into a .des file for sharing files over the 5MB cap.

### Load State
This allows you to Load any valid .des file into the calculator.

### Load OBJ
This allows you to load any OBJ file into Desmos no matter the tri count.

### Load OBJ Optimized
This allows you to load OBJ files into Desmos. There is some Settings to this one as well.

### Input Texture File
This allows you to input a texture to be mapped onto the last OBJ you loaded, ONLY IF "Load OBJ Optimized/Load OBJ with UV map" IS ON.

### Load Array from CSV
This allows you to load a position or rotation array from a CSV file.

### Settings for Both OBJ Optimized and normal loading

"Load OBJ Optimized/Load OBJ with UV map" allows you to up load a texture to that model using [the texture file input](#input-texture-file).
"Color" allows you to select the color you want you imported 3D file to be by letting you tell it what color variable to use.

### Settings for OBJ Optimized loading
"Load OBJ Optimized with over 10,000 Triangles" allows you to import OBJ's over the data limit and will disable naming of the face and vertex variables.
"Reflection on the X/Y/Z" will add a reflected model if rotations are turned on.
"Load OBJ Optimized with array for Placement" allows you to input an array name into the "Array Name For Placement" text box and the length of the array into the "Array Count" text box to make a large number of the model at the offset location's with high performance.
"Load OBJ Optimized with array for Rotations" does the same thing as "Load OBJ Optimized with array for Placement" but for rotating the objects and not offsetting them.

## Coding Mode

### To 3D Mode
This takes you back to the 3D mode of DesLoader.

### Add ticker
This button adds a ticker to desmos with a default timer

### Load OBJ into table (very buggy would not recommend)
This button allows you to load an OBJ into a table. This is very buggy and would not recommend using it even if you need to.

### Import DesCode
This allows you to import DesCode files (.descode) into Desmos more on how to use descode [here](#descode).

### Clear Graph when uploading code
This checkbox allows you to clear the graph when uploading code from descode. It's recommended to keep this on unless you know what you are doing.

# Descode
## Examples
Full examples can be found in the [Descode-tests](Descode-tests) folder in the GitHub repo and may need to be worked on to be compatible with the most recent version of DesLoader.

## Documentation
Full documentation of Descode can be found [Here](Documentation/DescodeDocs.md)

# Tips

- You can use both "Load OBJ Optimized with array for Placement" and "Load OBJ Optimized with array for Rotations" at the same time.
- When inputting a variable name for color or arrays make sure it is a valid variable name in Desmos. Ex: tesing would be T_{esting} in Desmos.
- There will be examples and a training graph to mess around with at some point.


**This is not affiliated with Desmos.**

**This is up to date for version 0.1.3**