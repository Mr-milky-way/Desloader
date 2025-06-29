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
                <button onclick="hide()">Hide</button>
                <h4>Save State</h4>
                <button onclick="downloadState(Calc)">Save State</button>
                <h4>Load State</h4>
                <input type="file" id="loadState" accept=".des" />
                <h4>Color</h4>
                <input type="text" id="color" placeholder="Color Variable Name">
                <h4>Load OBJ</h4>
                <input type="file" id="loadOBJ" accept=".obj" />
                <h4>Load OBJ Optimized</h4>
                <input type="file" id="loadOBJ_faster" accept=".obj" />
                <h5>Load OBJ Optimized with array for placement? Do all this before uploading file. <input type="checkbox" id="ArrayCheckBox"></h5>
                <input type="text" id="ArrayName" placeholder="Array Name">
                <input type="text" id="ArrayCount" placeholder="Array Count">
                <h4>Load Position Array from CSV<h5>Use the Array Name input from above</h5></h4>
                <input type="file" id="LoadArray" accept=".csv" />
            </div>
            <div id="show_bit">
                <button onclick="show()">Show</button>
            </div>`;
        div.id = 'outside bit';
        div.style.position = 'absolute';
        div.style.top = '10px';
        div.style.left = '17rem';
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

