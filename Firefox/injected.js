const maindiv = document.getElementById("main_bit")
const showdiv = document.getElementById("show_bit")
const PosArrayCheckBox = document.getElementById("PosArrayCheckBox")
const ArrayName = document.getElementById("ArrayName")
const Array1Name = document.getElementById("Array1Name")
const ArrayCount = document.getElementById("ArrayCount")
const colorVar = document.getElementById("color")
const RotArrayCheckBox = document.getElementById("RotArrayCheckBox")

maindiv.style.display = 'none';
showdiv.style.display = null;

function hide() {
    maindiv.style.display = 'none';
    showdiv.style.display = null;
}

function show() {
    maindiv.style.display = null;
    showdiv.style.display = 'none';
}

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
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const state = JSON.parse(reader.result);
            Calc.setState(state, { allowUndo: true });
            alert("State loaded.");
        } catch (err) {
            console.error(err);
            alert("Invalid state file");
        }
    };
    reader.readAsText(f);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("loadOBJ").addEventListener("change", e => {
    const OBJ = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (OBJ) => {
        const text = OBJ.target.result;
        const lines = text.split('\n');
        const Vertexes = lines.filter(line => line.startsWith('v '));
        for (let i = 0; i < Vertexes.length; i++) {
            Vlines = []
            Vline = Vertexes[i].substr(2)
            Vline = Vline.split(' ');
            Vlines.push("(" + Vline[0], Vline[1], Vline[2] + ")")
            Vertexes[i] = Vlines
        }
        const Faces = lines.filter(line => line.startsWith('f'));
        Facess = [];
        Output = [];
        Loop = 0;
        if (Faces.length >= 10000) {
            for (let i = 0; Faces.length > i; i++) {
                let Flines = []
                Fline = Faces[i].substr(2)
                Fline = Fline.split(' ');
                Fline1 = Fline[0].split('//');
                Fline2 = Fline[1].split('//');
                Fline3 = Fline[2].split('//');
                Flines.push("\\operatorname{triangle}(" + Vertexes[parseInt(Fline1) - 1] + "," + Vertexes[parseInt(Fline2) - 1] + "," + Vertexes[parseInt(Fline3) - 1] + ")")
                Facess[i - Loop * 10000] = Flines
                if (i == 0 || i == 1) {
                } else if ((i + 1) % 10000 == 0) {
                    Output[Loop] = Facess.join()
                    Loop++;
                    Facess.length = 0;
                } else if (i + 1 == Faces.length) {
                    Output[Loop] = Facess.join()
                    Loop++;
                    Facess.length = 0;
                }
            }
        } else {
            for (let i = 0; Faces.length > i; i++) {
                Flines = []
                Fline = Faces[i].substr(2)
                Fline = Fline.split(' ');
                Fline1 = Fline[0].split('//');
                Fline2 = Fline[1].split('//');
                Fline3 = Fline[2].split('//');
                Flines.push("\\operatorname{triangle}(" + Vertexes[parseInt(Fline1) - 1] + "," + Vertexes[parseInt(Fline2) - 1] + "," + Vertexes[parseInt(Fline3) - 1] + ")")
                Faces[i] = Flines
                Output[0] = Faces.join()
            }
        }
        console.log(Loop);
        console.log(Output[0]);
        folderId = getRandomInt(1, 10000);
        const state = Calc.getState();
        state.expressions.list.push({
            type: "folder",
            id: folderId.toString(),
            collapsed: true
        })
        if (0 == Loop) {
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folderId.toString(),
                color: "#c74440",
                latex: Output[0],
            });
        } else {
            for (let i = 0; i < Loop; i++)
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId.toString(),
                    color: "#c74440",
                    latex: Output[i],
                });
        }
        Calc.setState(state)
    }
    reader.readAsText(OBJ);
});



document.getElementById("loadOBJ_faster").addEventListener("change", e => {
    const OBJ = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (OBJ) => {
        const text = OBJ.target.result;
        const lines = text.split('\n');
        const Vertexes = lines.filter(line => line.startsWith('v '));
        for (let i = 0; i < Vertexes.length; i++) {
            Vlines = []
            Vline = Vertexes[i].substr(2)
            Vline = Vline.split(' ');
            Vlines.push("(" + Vline[0], Vline[1], Vline[2] + ")")
            Vertexes[i] = Vlines
        }
        const Faces = lines.filter(line => line.startsWith('f'));
        Facess = [];
        Output = [];
        Output[1] = Vertexes.join()
        if (Faces.length >= 10000 || Vertexes.length >= 10000) {
            alert("To much data")
        } else {
            for (let i = 0; Faces.length > i; i++) {
                Flines = []
                Fline = Faces[i].substr(2)
                Fline = Fline.split(' ');
                Fline1 = Fline[0].split('//');
                Fline2 = Fline[1].split('//');
                Fline3 = Fline[2].split('//');
                Flines.push("(" + parseInt(Fline1) + "," + parseInt(Fline2) + "," + parseInt(Fline3) + ")")
                Faces[i] = Flines
            }
        }
        Output[0] = Faces.join()
        let f = getRandomInt(1, 10000).toString()
        let v = getRandomInt(1, 10000).toString()
        let folder1Id = getRandomInt(1, 10000);
        let folder2Id = getRandomInt(1, 10000);
        const state = Calc.getState();
        state.expressions.list.push({
            type: "folder",
            id: folder1Id.toString(),
            title: "Faces and Vertexes",
            collapsed: true
        });
        state.expressions.list.push({
            type: "expression",
            id: getRandomInt(1, 10000).toString(),
            folderId: folder1Id.toString(),
            color: "#c74440",
            latex: "V_{" + v + "}=[" + Output[0] + "]",
            hidden: true
        });
        state.expressions.list.push({
            type: "expression",
            id: getRandomInt(1, 10000).toString(),
            folderId: folder1Id.toString(),
            color: "#c74440",
            latex: "F_{" + f + "}=[" + Output[1] + "]",
            hidden: true
        });
        state.expressions.list.push({
            type: "folder",
            id: folder2Id.toString(),
            title: "Main bit",
            collapsed: true
        });
        if(PosArrayCheckBox.checked == true && RotArrayCheckBox.checked == true)
        {
            for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folder2Id.toString(),
                    color: "#c74440",
                    latex: "\\operatorname{triangle}((((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)-\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))),(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)-\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)))),((-(F_{" + f + "}.x)\\cdot\\sin(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.y\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.z\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y))))[V_{" + v + "}.x]+" + ArrayName.value + "["+ (i+1) + "],(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)-\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))),(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)-\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)))),((-(F_{" + f + "}.x)\\cdot\\sin(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.y\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.z\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y))))[V_{" + v + "}.y]+" + ArrayName.value + "["+ (i+1) + "],(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)-\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))),(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)-\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)))),((-(F_{" + f + "}.x)\\cdot\\sin(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.y\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.z\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y))))[V_{" + v + "}.z]+" + ArrayName.value + "["+ (i+1) + "])",
                    colorLatex: colorVar.value,
                });
            }

        } else if (PosArrayCheckBox.checked == true) {
            for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folder2Id.toString(),
                    color: "#c74440",
                    latex: "\\operatorname{triangle}(F_{" + f + "}[V_{" + v + "}.x]+" + ArrayName.value + "["+ (i+1) + "]" + ",F_{" + f + "}[V_{" + v + "}.y]+" + ArrayName.value + "["+ (i+1) + "]" + ",F_{" + f + "}[V_{" + v + "}.z]+" + ArrayName.value + "["+ (i+1) + "]" + ")",
                    colorLatex: colorVar.value,
                });
            }
        } else if (RotArrayCheckBox.checked == true){
            for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folder2Id.toString(),
                    color: "#c74440",
                    latex: "\\operatorname{triangle}((((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)-\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))),(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)-\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)))),((-(F_{" + f + "}.x)\\cdot\\sin(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.y\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.z\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y))))[V_{" + v + "}.x],(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)-\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))),(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)-\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)))),((-(F_{" + f + "}.x)\\cdot\\sin(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.y\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.z\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y))))[V_{" + v + "}.y],(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)-\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)+\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].z))),(((F_{" + f + "}.x)\\cos(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+F_{" + f + "}.y(\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)+\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z))+F_{" + f + "}.z(\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\sin(" + Array1Name.value + "["+ (i+1) + "].y)\\sin(" + Array1Name.value + "["+ (i+1) + "].z)-\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cos(" + Array1Name.value + "["+ (i+1) + "].z)))),((-(F_{" + f + "}.x)\\cdot\\sin(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.y\\cos(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y)+F_{" + f + "}.z\\sin(" + Array1Name.value + "["+ (i+1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "["+ (i+1) + "].y))))[V_{" + v + "}.z])",
                    colorLatex: colorVar.value,
                });
            }
        }   else {
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folder2Id.toString(),
                color: "#c74440",
                latex: "\\operatorname{triangle}((F_{" + f + "}[V_{" + v + "}.x]),F_{" + f + "}[V_{" + v + "}.y],F_{" + f + "}[V_{" + v + "}.z])",
            });
        }
        Calc.setState(state)
    }
    reader.readAsText(OBJ);
});



document.getElementById("LoadArray").addEventListener("change", e => {
    const Array = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (Array) => {
        const text = Array.target.result;
        const lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            Vlines = []
            Vline = lines[i].split(',');
            console.log(Vline);
            Vlines.push("(" + Vline[0], Vline[1], Vline[2] + ")")
            lines[i] = Vlines
        }

        Output = lines.join()
        let folderId = getRandomInt(1, 10000);
        const state = Calc.getState();
        state.expressions.list.push({
            type: "folder",
            id: folderId.toString(),
            title: ArrayName.value,
            collapsed: true
        });
        state.expressions.list.push({
            type: "expression",
            id: getRandomInt(1, 10000).toString(),
            folderId: folderId.toString(),
            color: "#c74440",
            latex: ArrayName.value +"=[" + Output + "]",
            hidden: true
        });
        Calc.setState(state)
    }
    reader.readAsText(Array);
});