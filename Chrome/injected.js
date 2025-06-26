function downloadState(calc3d, filename = "Graph.des") {
    const state = calc3d.getState();
    const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

document.getElementById("loadState").addEventListener("change", e => {
    const f = e.target.files[0];
    const r = new FileReader();
    r.onload = () => {
        try {
            const state = JSON.parse(r.result);
            Calc.setState(state, { allowUndo: true });
            alert("State loaded.");
        } catch (err) {
            console.error(err);
            alert("Invalid state file");
        }
    };
    r.readAsText(f);
});