function downloadState(calc3d, filename = "Graph.des") {
    const state = calc3d.getState();
    const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}


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
                    padding: .6rem 1rem;
                }
                .button1:hover {
                    background-color:rgb(37, 87, 168);
                }
                .show {
                    background: rgba(255,255,255,0.0);
                    color: rgb(255, 255, 255);
                }
                .main {
                    background: rgb(42, 42, 42);
                    color: rgb(255,255,255);
                }
                h3 {
                    color: rgb(255,255,255);
                }
                h4 {
                    color: rgb(255, 255, 255);
                }
                h4 .button1 {
                    color: rgb(0, 0, 0);
                }
                h5 {
                    color: rgb(255,255,255);
                }
                .text1 {
                    text-align: center;
                    border-radius: 10px;
                    border: none;
                    width: 30%;
                    max-width: 600px;
                    color: rgb(255,255,255);
                    background-color: rgb(54, 54, 54);
                }
                .text1 input {
                    padding: 1rem;
                    font-size: 1.2rem;
                    width: 30%;
                    max-width: 400px;
                    border-radius: 5px;
                    border: none;
                    background-color: #333;
                    color: rgb(255,255,255);
                    transition: transform 0.3s ease;
                }
                .text1::placeholder {
                    color: rgb(255,255,255);
                    opacity: .8;
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
                    padding: .6rem 1rem;
                }
            </style>
            <div class="main" id="main_bit">
                <h3>Tools</h3>
                <button class="button1" onclick="hide()">Hide</button>
                <h4>Save State <button class="button1" onclick="downloadState(Calc)">Save State</button></h4>
                <h4>Load State <input class="file1" type="file" id="loadState" accept=".des" /></h4>
                <h4>Color <input class="text1" type="text" id="color" placeholder="Color Variable Name"></h4>
                <h4>Load OBJ <input class="file1" type="file" id="loadOBJ" accept=".obj" /></h4>
                <h5>Load OBJ Optimized/Load OBJ with UV map? Do all this before uploading file. <input type="checkbox" id="UVmapCheckBox"></h5>
                <h4>Load OBJ Optimized <input class="file1" type="file" id="loadOBJ_faster" accept=".obj" /></h4>
                <h5>Reflection on the X? <input type="checkbox" id="XCheckBox"></h5>
                <h5>Reflection on the Y? <input type="checkbox" id="YCheckBox"></h5>
                <h5>Reflection on the Z? <input type="checkbox" id="ZCheckBox"></h5>
                <h5>Load OBJ Optimized with array for Placement? Do all this before uploading file. <input type="checkbox" id="PosArrayCheckBox"></h5>
                <h5>Load OBJ Optimized with array for Rotations? (Only works in degrees) Do all this before uploading file. <input type="checkbox" id="RotArrayCheckBox"></h5>
                <input class="text1" type="text" id="ArrayName" placeholder="Array Name For Placement">
                <input class="text1" type="text" id="Array1Name" placeholder="Array Name For Rotations">
                <input class="text1" type="text" id="ArrayCount" placeholder="Array Count">
                <h4>Input Texture File (Only work on the most recent OBJ with UV map) <input class="file1" type="file" id="upload" accept="image/png, image/jpeg" /></h4>
                <h4>Load Array from CSV (Use the Array Name input from Placement) <input class="file1" type="file" id="LoadArray" accept=".csv" /></h4>
            </div>
            <div class="show" id="show_bit">
                <button class="button1" onclick="show()">Show</button>
            </div>`;
        div.id = 'outside bit';
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

