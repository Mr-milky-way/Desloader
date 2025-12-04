# Table of contents
- [Descode Overview](#descode-overview)
- [Variables](#variables)
- [Functions](#functions)
- [If Statements](#if-statements)
- [Tickers](#tickers)
- [Accessing Vectors and array elements](#accessing-vectors-and-array-elements)
- [Notes](#notes)
- [Examples](#examples)

# Descode Overview
Descode is a simple coding language designed for Desmos the graphing calculator. It allows you to create variables, functions and If statements to create games and other content on Desmos with ease. There is no abblity to create comments in descode as of version 0.1.3.

# Variables
There are 3 variable types in Descode:
- Numbers: These are used to store numerical values. Example: `x = 5.23`, `score = 10`
- Vectors: These are used to store 2D or 3D coordinates. Example: `position = (3, 4)`, `velocity = (1, 0, -1)`
- Arrays: These are used to store lists of values. Example: `positions = [1, 2, 3, 4]`

To create a variable, you can't be in a function. You simply type the keyword `var`, followed by the variable type and then name and value. All variables need to be terminated with a semicolon `;`. 
Example:
```Descode
var number x = 0;
```

# Functions
Functions are the lifeline of descode. They let you create functions in desmos that can be called from other functions or tickers. They also support parameters. To create a function, you type the keyword `function`, followed by the function name and parameters in parentheses. The function body is enclosed in curly braces `{}`.
Example:
```Descode
function addToX(amount) {
    x = x + amount;
}
```
You can also call functions in the ticker or other functions by simply typing the function name followed by parentheses and any arguments.
Example:
```Descode
addToX(5);
```

When setting/changing variables in functions, you do not need to use the `var` keyword but still need to terminate with a semicolon `;`.

# If Statements
If statements allow you to execute code based on conditions. The syntax is similar to other programming languages. You type the keyword `if`, followed by the condition in parentheses and the code block in curly braces `{}`. You can also use `else if` and `else` for additional conditions. They only work inside functions as of version 0.1.3. You can nest if statements as well but you cannot nest if statements in else statements as of version 0.1.3.

Example:
```Descode
if (x > 10) {
    x = 10;
} else if (x < 0) {
    x = 0;
} else {
    x = x;
}
```

# Tickers
The ticker is a special function that allows you to run code from the built in ticker in desmos. To create a ticker it is like a function but you put in only the keyword `ticker` then the time you want to ticker to run in mills IE: `ticker(0)` (runs as fast as it can) or `ticker(1000)` (runs once per second), followed by the code block in curly braces `{}`. There is also support for delta time in tickers. You can use the variable `dt` to get the time in milliseconds since the last ticker call. This is useful for making time based movements and other time based actions.
Example:
```Descode
ticker(0) {
    addToX(dt)
}
```


# Accessing Vectors and array elements
To access elements of a vector you can use the dot notation. For example, to access the x and y components of a 2D vector named `position`, you would use `position.x` and `position.y`. For a 3D vector, you can access the z component using `position.z`.
Example:
```Descode
var vector position = (3, 4, 5);
var number x = position.x;
var number y = position.y;
var number z = position.z;
```
You can't access array elements as of version 0.1.3.

# Notes
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


# Examples
Here is a simple example of a descode program that runs a timer in seconds and milliseconds:

```Descode
var number seconds = 0;
var number milliseconds = 0;

function updateTimer(x) {
    milliseconds = milliseconds + x;
    seconds = milliseconds/1000;
}

ticker(0) {
    updateTimer(dt)
}
```

Here is the fibonacci sequence implemented in descode, it takes advantage of the fact that all code in a ticker runs at the same time:

```Descode
var number a = 0;
var number b = 1;
ticker(1000) {
    a = b;
    b = a + b;
}
```

Here is a little car game made for desmos 3d:
```Descode
var number DeltaTime = 0;
var number Timer = 0;

var number Error = 0;
var number Derivative = 0;
var number PastError = 0;
var number Integral = 0;

var number P = 0;
var number I = 0;
var number D = 0;

var number Speed = 0;
var number AccelRate = 1.01;

var number GroundResetPoint = 0;

var number MaxMovement = 3;

var vector InputRight = (4,-4);
var vector InputLeft = (-4,-4);

var vector Groundpos = (0,0,0)
var array GroundposA = [(Groundpos.x,Groundpos.y,Groundpos.z)];

var array Roadblocks = [(0,0,100),(0,0,100)];

var vector CarPos = (0,0,0);
var vector TargetCarPos = (0,0,0);

function Update() {
    Timer = Timer+DeltaTime;
    UpdateCarPos()
    moveGround()
    GetInput(0)
    SpeedUp()
    RoadBlocks()
}

function UpdateCarPos() {
    PastError = Error;
    Error = TargetCarPos.x-CarPos.x;
    Integral = Integral + Error * DeltaTime/1000;
    Derivative = (Error - PastError)/DeltaTime/1000;
    CarPos = (CarPos.x+(Error*P) + (Integral*I) + (Derivative*D),0,0);
}

function moveGround() {
    if (Groundpos.y <= GroundResetPoint) {
        Groundpos = (0,-GroundResetPoint,0);
    } else {
        Groundpos = (0,Groundpos.y-1*Speed,0);
    }
}

function GetInput(input) {
    if (TargetCarPos.x >= MaxMovement) {
        TargetCarPos = (MaxMovement-1,0,0);
    } else if (TargetCarPos.x <= -MaxMovement) {
        TargetCarPos = (-MaxMovement+1,0,0);
    } else {
        TargetCarPos = (TargetCarPos.x+input,0,0);
    }
}

function RoadBlocks() {
    if (Groundpos.y <= GroundResetPoint) {
        Roadblocks = (round(random(2)*6)-3,Groundpos.y+2,1);
    } else {
        Roadblocks = (Roadblocks.x,Groundpos.y,Roadblocks.z);
    }
}

function SpeedUp() {
    Speed = Speed * AccelRate;
}


ticker(0) {
    Update()
    DeltaTime = dt;
}
```

More tests and examples can be found [here](/Descode-tests)



**This is up to date for version 0.1.3**