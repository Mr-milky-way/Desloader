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
        console.log('DOM is ready!');
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('injected.js');
        script.onload = () => script.remove(); // optional cleanup
        (document.head || document.documentElement).appendChild(script);
        const div = document.createElement('div');
        div.innerHTML = `
            <button onclick="downloadState(Calc)">Save State</button>
            <input type="file" id="loadState" accept=".des" />
            <input type="file" id="loadOBJ" accept=".obj" />
            <input type="file" id="loadOBJ_faster" accept=".obj" />`;
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
    run(); // DOM already ready
}

