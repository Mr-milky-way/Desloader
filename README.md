
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
  - [Basics](#basics)
  - [Important notes](#important-notes)
  - [Full examples](#full-examples)
  - [Full Documentation](#full-documentation)
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

## Basics
Descode is a coding language made for desmos to make coding things into desmos easier. Descode files have the file extension .descode. You can import descode files into Desmos using the [Import DesCode](#import-descode) button in the coding mode of DesLoader. The syntax is very simple and easy to learn. Here are some basic examples of descode.
Variable Declaration
```descode
var number X = 1.01;
var array Y = [(0,0,100),(0,0,100)]
var vector Z1 = (0,0,0)
var vector Z2 = (-4,-4)
```
Function Declaration
```descode
function addNumbers(a, b) {
  x = a + b;
}
```
Calling Functions
```descode
Function Update() {
  addNumbers(5, 10)
}
```
Ticker Declaration
```descode
ticker(0) {
  Update()
}
```
You can also get delta time using the variable `dt` in tickers. IE
```descode
ticker(0) {
  DeltaTime = dt;
  Update(dt)
}
```
If Statements
```descode
function checkNumber(dt) {
  if (x <= 10) {
    x = 0;
  } else if (x > 0) {
    x = 0;
  } else {
    x = dt;
  }
}
```
Now see if you can figure out what this code does:
```descode
var number X = 0;
var number Y = 0;
var vector Z = (0,0)

function Update(dt) {
  X = X + dt;
  Y = X/1000;
  if (Y <= 10) {
    Z = (Z.x,Z.y + 1);
  }
}

ticker(0) {
  Update(dt)
}
```

<details>
      <summary>Answer</summary>
      This makes a timer in mills (x) and in seconds (y), every 10 seconds it will increase the y value of vector Z by 1.
    </details>

## Important notes
- When declaring variables you must start with `var` followed by the type of variable you want to declare (number, array, vector).
- You can only nest if statments into if and if else if statments.
- Every thing in a function runs/changes at the same time meaning if you change a variable in the start of a function and then use that same variable later in the function it will use the previously value. 
- The time on tickers is in milliseconds and can be changed my changing the X value in `ticker(X) { }`.
- Descode is case sensitive meaning `Function` and `function` are two different things.
- When setting a variable that is a number or changeing any variable in a function you need to end the line with a semicolon `;`
- Arrays work with numbers and vectors.
- You can input varable names into vectors.
- You can only have one ticker per descode file.
- Functions don't need to be declared or called in any specific order. They will work no matter where they are in the file.
- There is no commenting system in descode at the moment.
- You should not name variables the same thing as functions, use spaces or special characters in variable names.
- Descode will not tell you if there is an error in your code, so make sure to double check everything if something is not working.
- This documentation may sometimes be out of date with the most recent version of Descode. 
- If something is not working as expected and you think it should please open an issue on the GitHub repo.
- Feel free to suggest new features or changes to Descode by opening an issue on the GitHub repo.
- Descode is still in early development and may have bugs or missing features.
- You may need to make additional changes to the desmos graph to get the descode to work as intended IE: In the ticker it might add the variable `dt` as `d_{t}` in desmos so you would need to change that manually to `dt`.


## Full examples
Full examples can be found in the Descode-tests folder in the GitHub repo and may need to be worked on to be compatible with the most recent version of DesLoader.

## Full Documentation
Full documentation of Descode can be found in the [Here](Documentation/descode.md)

# Tips

- You can use both "Load OBJ Optimized with array for Placement" and "Load OBJ Optimized with array for Rotations" at the same time.
- When inputting a variable name for color or arrays make sure it is a valid variable name in Desmos. Ex: tesing would be T_{esting} in Desmos.
  - When input varable names in descode use only letters and numbers no special characters. (you should not input varable names as the in the you would in the 3d model section)
- If you you have problems with descode make sure to read through the [important notes](#important-notes) section.
- There will be examples and a training graph to mess around with at some point.


**This is not affiliated with Desmos.**

**Little code has been made with AI.**
