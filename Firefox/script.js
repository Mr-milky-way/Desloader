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
            <div id="main_bit">
                <h3>Tools</h3>
                <button onclick="hide()">Hide</button>
                <h4>Save State <button onclick="downloadState(Calc)">Save State</button></h4>
                <h4>Load State <input type="file" id="loadState" accept=".des" /></h4>
                <h4>Color <input type="text" id="color" placeholder="Color Variable Name"></h4>
                <h4>Load OBJ <input type="file" id="loadOBJ" accept=".obj" /></h4>
                <h4>Load OBJ Optimized <input type="file" id="loadOBJ_faster" accept=".obj" /></h4>
                <h5>Load OBJ Optimized with array for Placement? Do all this before uploading file. <input type="checkbox" id="PosArrayCheckBox"></h5>
                <h5>Load OBJ Optimized with array for Rotations? (Only works in degrees) Do all this before uploading file. <input type="checkbox" id="RotArrayCheckBox"></h5>
                <input type="text" id="ArrayName" placeholder="Array Name For Placement">
                <input type="text" id="Array1Name" placeholder="Array Name For Rotations">
                <input type="text" id="ArrayCount" placeholder="Array Count">
                <h4>Load Array from CSV (Use the Array Name input from Placement) <input type="file" id="LoadArray" accept=".csv" /></h4>
            </div>
            <div id="show_bit">
                <button onclick="show()">Show</button>
            </div>`;
        div.id = 'outside bit';
        div.style.position = 'absolute';
        div.style.top = '10px';
        div.style.left = '20rem';
        div.style.zIndex = 9999;
        div.style.background = 'white';
        div.style.padding = '1px';
        document.body.appendChild(div);
    }, 1000);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
} else {
    run();
}

