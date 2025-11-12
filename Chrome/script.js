function run() {
    setTimeout(() => {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('injected.js');
        script.onload = () => script.remove();
        (document.head || document.documentElement).appendChild(script);
        const div = document.createElement('div');
        div.innerHTML = `
            <style>
                .button1 {
                    color: rgb(255, 255, 255);
                    background-color:rgb(46, 114, 220);
                    border: 0px;
                    border-radius: 5px;
                    padding: .6rem 1rem;
                }
                .main .button1 {
                    color: rgb(255, 255, 255);
                    background-color:rgb(46, 114, 220);
                    border: 0px;
                    border-radius: 5px;
                    padding: .2rem .4rem;
                    font-size: clamp(6px, 0.8vw, 19.2px);
                }
                .button1:hover {
                    background-color:rgb(37, 87, 168);
                }
                .show {
                    background: rgba(255,255,255,0.0);
                    color: rgb(255, 255, 255);
                }
                .main {
                    padding: 1rem;
                    border: 0px;
                    border-radius: 1vw;
                    background: rgb(42, 42, 42);
                    color: rgb(255,255,255);
                }
                h3 {
                    color: rgb(255,255,255);
                }
                h4 {
                    color: rgb(255, 255, 255);
                    font-size: clamp(8px, 0.9vw, 32px);
                }
                h4 .button1 {
                    color: rgb(0, 0, 0);
                }
                h5 {
                    color: rgb(255,255,255);
                    font-size: clamp(6px, 0.8vw, 18px);
                }
                .text1 {
                    margin: clamp(0px, 0.2vw, 4px);
                    text-align: center;
                    border-radius: 10px;
                    border: none;
                    width: 30%;
                    max-width: 600px;
                    color: rgb(255,255,255);
                    background-color: rgb(54, 54, 54);
                    font-size: clamp(6px, 0.8vw, 19.2px);
                }
                .text1 input {
                    font-size: clamp(6px, 0.4vw, 18px);
                    width: 30%;
                    max-width: 200px;
                    border-radius: 5px;
                    border: none;
                    background-color: #333;
                    color: rgb(255,255,255);
                    transition: transform 0.3s ease;
                }
                .text1::placeholder {
                    color: rgb(255,255,255);
                    opacity: .8;
                    font-size: clamp(6px, 0.7vw, 18px);
                }
                .file1 {
                    text-align: center;
                    border-radius: 10px;
                    border: none;
                    width: 30%;
                    max-width: 600px;
                    color: rgb(255,255,255);
                    background-color: rgb(54, 54, 54);
                }
                input::file-selector-button{
                    color: rgb(255, 255, 255);
                    background-color:rgb(46, 114, 220);
                    border: 0px;
                    border-radius: 5px;
                    padding: .2rem .4rem;
                }
            </style>
            <div class="main" id="main_bit">
                <button class="button1" onclick="hide()">Hide</button>
                <h3>Tools</h3>
                <h4><button class="button1" onclick="downloadState(Calc)">Save State</button></h4>
                <h4>Load State <input class="file1" type="file" id="loadState" accept=".des" /></h4>
                <div class="3d" id="main_3D">
                    <h4><button class="button1" onclick="To2d();">Go to Code</button></h4>
                    <h4>Load OBJ <input class="file1" type="file" id="loadOBJ" accept=".obj" /></h4>
                    <h4>Load OBJ Optimized <input class="file1" type="file" id="loadOBJ_faster" accept=".obj" /></h4>
                    <h4>Input Texture File (Only work on the most recent OBJ with UV map) <input class="file1" type="file" id="upload" accept="image/png, image/jpeg" /></h4>
                    <h4>Load Array from CSV (Use the Array Name input from Placement) <input class="file1" type="file" id="LoadArray" accept=".csv" /></h4>
                    <h4>Settings for Both OBJ Optimized and normal loading. Do all this before uploading file.</h4>
                    <h5>Load OBJ Optimized/Load OBJ with UV map?<input type="checkbox" id="UVmapCheckBox"></h5>
                    <h5>Color <input class="text1" type="text" id="color" placeholder="Color Variable Name"></h5>
                    <h4>Settings for Load OBJ Optimized</h4>
                    <h5>Load OBJ Optimized with over 10,000 Triangles? (Naming of the Face and Vertex Vars will be turned off)<input type="checkbox" id="RemoveTriLimitCheckBox"></h5>
                    <h5>Reflection on the X? <input type="checkbox" id="XCheckBox"></h5>
                    <h5>Reflection on the Y? <input type="checkbox" id="YCheckBox"></h5>
                    <h5>Reflection on the Z? <input type="checkbox" id="ZCheckBox"></h5>
                    <h5>Load OBJ Optimized with array for Placement?<input type="checkbox" id="PosArrayCheckBox"></h5>
                    <h5>Load OBJ Optimized with array for Rotations? (Only works in degrees)<input type="checkbox" id="RotArrayCheckBox"></h5>
                    <h5>Load OBJ Optimized with array for Scale? (Scales all Axises, Only works when the above 2 are checked)<input type="checkbox" id="ScaleArrayCheckBox"></h5>
                    <input class="text1" type="text" id="PosArray" placeholder="Array Name For Placement (3D)">
                    <input class="text1" type="text" id="RotArray" placeholder="Array Name For Rotations (3D)">
                    <input class="text1" type="text" id="ScaleArray" placeholder="Array Name For Scale (1D)">
                    <input class="text1" type="text" id="ArrayCount" placeholder="Array Count">
                    <input class="text1" type="text" id="VertexName" placeholder="Name of Vertex Var">
                    <input class="text1" type="text" id="FaceName" placeholder="Name of Face Var">
                </div>
                <div class="2d" id="main_2D">
                    <h4><button class="button1" onclick="To3d();">Go to 3D</button></h4>
                    <h4><button class="button1" onclick="AddTicker();">Add starter ticker</button></h4>
                    <h4>Load OBJ into table<input class="file1" type="file" id="loadOBJtale" accept=".obj" /></h4>
                    <h4>Import DesCode<input class="file1" type="file" id="loadDesCode" accept=".DesCode,.obj,.png" multiple/></h4>
                    <h5>Clear Graph when uploading code? <input type="checkbox" id="CodeClearCheckBox"></h5>
                </div>
            </div>
            <div class="show" id="show_bit">
                <button class="button1" onclick="show()">Show</button>
            </div>`;
        div.id = 'outside bit';
        div.style.width = '45%';
        div.style.position = 'absolute';
        div.style.top = '.3rem';
        div.style.left = '20rem';
        div.style.zIndex = 9999;
        div.style.padding = '1px';
        document.body.appendChild(div);
    }, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
} else {
    run();
}

