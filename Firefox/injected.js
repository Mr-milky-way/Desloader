const maindiv = document.getElementById("main_bit")
const showdiv = document.getElementById("show_bit")
const UVmapCheckBox = document.getElementById("UVmapCheckBox")
const PosArrayCheckBox = document.getElementById("PosArrayCheckBox")
const ArrayName = document.getElementById("ArrayName")
const Array1Name = document.getElementById("Array1Name")
const ArrayCount = document.getElementById("ArrayCount")
const colorVar = document.getElementById("color")
const RotArrayCheckBox = document.getElementById("RotArrayCheckBox")
const XreflectionCheckBox = document.getElementById("XCheckBox")
const YreflectionCheckBox = document.getElementById("YCheckBox")
const ZreflectionCheckBox = document.getElementById("ZCheckBox")
const VertexName = document.getElementById("VertexName")
const FaceName = document.getElementById("FaceName")
const RemoveTriLimitCheckBox = document.getElementById("RemoveTriLimitCheckBox")


UVs = null;
UVmap = [];
rbgValues = [];
C = [];

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
        UVs = lines.filter(line => line.startsWith('vt '));
        for (let i = 0; i < Vertexes.length; i++) {
            Vlines = []
            Vline = Vertexes[i].substr(2)
            Vline = Vline.split(' ');
            Vlines.push("(" + Vline[0], Vline[1], Vline[2] + ")")
            Vertexes[i] = Vlines
        }
        for (let i = 0; i < UVs.length; i++) {
            Vlines = []
            Vline = UVs[i].substr(3)
            Vline = Vline.split(' ');
            Vlines.push(Vline[0], 1 - Vline[1])
            UVs[i] = Vlines
        }
        const Faces = lines.filter(line => line.startsWith('f'));
        Facess = [];
        Output = [];
        Loop = 0;
        if (Faces.length >= 10000) {
            if (UVmapCheckBox.checked == true) {
                for (let i = 0; Faces.length > i; i++) {
                    let Fnlines = []
                    let Flines = []
                    Fline = Faces[i].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    Flines.push("\\operatorname{triangle}(" + Vertexes[parseInt(Fline1[0]) - 1] + "," + Vertexes[parseInt(Fline2[0]) - 1] + "," + Vertexes[parseInt(Fline3[0]) - 1] + ")")
                    Fnlines.push(UVs[parseInt(Fline1[1]) - 1].map(Number), UVs[parseInt(Fline2[1]) - 1].map(Number), UVs[parseInt(Fline3[1]) - 1].map(Number))
                    Facess[i - Loop * 10000] = Flines
                    UVmap[i] = Fnlines
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
                    let Flines = []
                    Fline = Faces[i].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    Flines.push("\\operatorname{triangle}(" + Vertexes[parseInt(Fline1[0]) - 1] + "," + Vertexes[parseInt(Fline2[0]) - 1] + "," + Vertexes[parseInt(Fline3[0]) - 1] + ")")
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
            }
        } else {
            if (UVmapCheckBox.checked == true) {
                for (let i = 0; Faces.length > i; i++) {
                    let Fnlines = []
                    let Flines = []
                    Fline = Faces[i].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    Flines.push("\\operatorname{triangle}(" + Vertexes[parseInt(Fline1[0]) - 1] + "," + Vertexes[parseInt(Fline2[0]) - 1] + "," + Vertexes[parseInt(Fline3[0]) - 1] + ")")
                    Fnlines.push(UVs[parseInt(Fline1[1]) - 1].map(Number), UVs[parseInt(Fline2[1]) - 1].map(Number), UVs[parseInt(Fline3[1]) - 1].map(Number))
                    Faces[i] = Flines
                    Output[0] = Faces.join()
                    UVmap[i] = Fnlines
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
        }
        folderId = getRandomInt(1, 10000);
        const state = Calc.getState();
        state.expressions.list.push({
            type: "folder",
            id: folderId.toString(),
            collapsed: true
        })
        if (0 == Loop) {
            if (UVmapCheckBox.checked == true) {
                C[0] = getRandomInt(1, 10000);
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId.toString(),
                    color: "#c74440",
                    latex: Output[0],
                    colorLatex: "C_{" + C[0] + "}"
                });
            } else {
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId.toString(),
                    color: "#c74440",
                    latex: Output[0],
                    colorLatex: colorVar.value
                });
            }
        } else {
            if (UVmapCheckBox.checked == true) {
                for (let i = 0; i < Loop; i++) {
                    C[i] = getRandomInt(1, 10000);
                    state.expressions.list.push({
                        type: "expression",
                        id: getRandomInt(1, 10000).toString(),
                        folderId: folderId.toString(),
                        color: "#c74440",
                        latex: Output[i],
                        colorLatex: "C_{" + C[i] + "}"
                    });
                }
            } else {
                for (let i = 0; i < Loop; i++) {
                    C[i] = getRandomInt(1, 10000);
                    state.expressions.list.push({
                        type: "expression",
                        id: getRandomInt(1, 10000).toString(),
                        folderId: folderId.toString(),
                        color: "#c74440",
                        latex: Output[i],
                        colorLatex: colorVar.value
                    });
                }
            }
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
        UVs = lines.filter(line => line.startsWith('vt '));
        for (let i = 0; i < Vertexes.length; i++) {
            Vlines = []
            Vline = Vertexes[i].substr(2)
            Vline = Vline.split(' ');
            Vlines.push("(" + Vline[0], Vline[1], Vline[2] + ")")
            Vertexes[i] = Vlines
        }
        for (let i = 0; i < UVs.length; i++) {
            Vlines = []
            Vline = UVs[i].substr(3)
            Vline = Vline.split(' ');
            Vlines.push(Vline[0], 1 - Vline[1])
            UVs[i] = Vlines
        }
        const Faces = lines.filter(line => line.startsWith('f'));
        UVmap = []
        Output = [];
        Output[1] = Vertexes.join()
        Facess = [];
        vertex1 = []
        vertexOut = []
        if (RemoveTriLimitCheckBox.checked == true) {
            Loop = 0;
            if (UVmapCheckBox.checked == true) {
                for (let x = 0; Faces.length > x; x++) {
                    Fnlines = []
                    Flines = []
                    Fline = Faces[x].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    if (vertex1.length == 0) {
                        vertex1[0] = Vertexes[parseInt(Fline1[0]) - 1]
                    }
                    done = false
                    for (let i = 0; i < vertex1.length; i++) {
                        if (done == true) {
                            break;
                        } else {
                            if (vertex1[i] === Vertexes[parseInt(Fline1[0]) - 1]) {
                                done = true;
                                Fline1[0] = i + 1
                                break;
                            } else if (i == vertex1.length - 1 && done == false) {
                                vertex1[vertex1.length] = Vertexes[parseInt(Fline1[0]) - 1]
                                Fline1[0] = vertex1.length
                                done = true;
                                break;
                            }
                        }
                    }
                    done = false
                    for (let i = 0; i < vertex1.length; i++) {
                        if (done == true) {
                            break;
                        } else {
                            if (vertex1[i] === Vertexes[parseInt(Fline2[0]) - 1]) {
                                done = true;
                                Fline2[0] = i + 1
                                break;
                            } else if (i == vertex1.length - 1 && done == false) {
                                vertex1[vertex1.length] = Vertexes[parseInt(Fline2[0]) - 1]
                                done = true;
                                Fline2[0] = vertex1.length
                                break;
                            }
                        }
                    }
                    done = false
                    for (let i = 0; i < vertex1.length; i++) {
                        if (done == true) {
                            break;
                        } else {
                            if (vertex1[i] === Vertexes[parseInt(Fline3[0]) - 1]) {
                                done = true;
                                Fline3[0] = i + 1
                                break;
                            } else if (i == vertex1.length - 1 && done == false) {
                                vertex1[vertex1.length] = Vertexes[parseInt(Fline3[0]) - 1]
                                done = true;
                                Fline3[0] = vertex1.length
                                break;
                            }
                        }
                    }
                    Flines.push("(" + parseInt(Fline1[0]) + "," + parseInt(Fline2[0]) + "," + parseInt(Fline3[0]) + ")")
                    Fnlines.push(UVs[parseInt(Fline1[1]) - 1].map(Number), UVs[parseInt(Fline2[1]) - 1].map(Number), UVs[parseInt(Fline3[1]) - 1].map(Number))
                    Facess[x - Loop * 10000] = Flines
                    UVmap[x] = Fnlines
                    Facess[x - Loop * 10000] = Flines
                    if (x == 0 || x == 1 || vertex1.length == 0 || vertex1.length == 1) {
                    } else if ((x + 1) % 10000 == 0 || vertex1.length % 10000 == 0) {
                        Output[Loop] = Facess.join()
                        vertexOut[Loop] = vertex1.join()
                        Loop++;
                        Facess.length = 0;
                        vertex1.length = 0;
                    } else if (x + 1 == Faces.length) {
                        Output[Loop] = Facess.join()
                        vertexOut[Loop] = vertex1.join()
                        Loop++;
                        Facess.length = 0;
                        vertex1.length = 0;
                    }
                }
            } else {
                for (let x = 0; Faces.length > x; x++) {
                    Fnlines = []
                    Flines = []
                    Fline = Faces[x].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    if (vertex1.length == 0) {
                        vertex1[0] = Vertexes[parseInt(Fline1[0]) - 1]
                    }
                    done = false
                    for (let i = 0; i < vertex1.length; i++) {
                        if (done == true) {
                            break;
                        } else {
                            if (vertex1[i] === Vertexes[parseInt(Fline1[0]) - 1]) {
                                done = true;
                                Fline1[0] = i + 1
                                break;
                            } else if (i == vertex1.length - 1 && done == false) {
                                vertex1[vertex1.length] = Vertexes[parseInt(Fline1[0]) - 1]
                                Fline1[0] = vertex1.length
                                done = true;
                                break;
                            }
                        }
                    }
                    done = false
                    for (let i = 0; i < vertex1.length; i++) {
                        if (done == true) {
                            break;
                        } else {
                            if (vertex1[i] === Vertexes[parseInt(Fline2[0]) - 1]) {
                                done = true;
                                Fline2[0] = i + 1
                                break;
                            } else if (i == vertex1.length - 1 && done == false) {
                                vertex1[vertex1.length] = Vertexes[parseInt(Fline2[0]) - 1]
                                done = true;
                                Fline2[0] = vertex1.length
                                break;
                            }
                        }
                    }
                    done = false
                    for (let i = 0; i < vertex1.length; i++) {
                        if (done == true) {
                            break;
                        } else {
                            if (vertex1[i] === Vertexes[parseInt(Fline3[0]) - 1]) {
                                done = true;
                                Fline3[0] = i + 1
                                break;
                            } else if (i == vertex1.length - 1 && done == false) {
                                vertex1[vertex1.length] = Vertexes[parseInt(Fline3[0]) - 1]
                                done = true;
                                Fline3[0] = vertex1.length
                                break;
                            }
                        }
                    }
                    Flines.push("(" + parseInt(Fline1[0]) + "," + parseInt(Fline2[0]) + "," + parseInt(Fline3[0]) + ")")
                    Facess[x - Loop * 10000] = Flines
                    if (x == 0 || x == 1 || vertex1.length == 0 || vertex1.length == 1) {
                    } else if ((x + 1) % 10000 == 0 || vertex1.length % 10000 == 0) {
                        Output[Loop] = Facess.join()
                        vertexOut[Loop] = vertex1.join()
                        Loop++;
                        Facess.length = 0;
                        vertex1.length = 0;
                    } else if (x + 1 == Faces.length) {
                        Output[Loop] = Facess.join()
                        vertexOut[Loop] = vertex1.join()
                        Loop++;
                        Facess.length = 0;
                        vertex1.length = 0;
                    }
                }
            }
        } else if (Faces.length >= 10000 || Vertexes.length >= 10000) {
            alert("To much data")
            return;
        } else {
            if (UVmapCheckBox.checked == true) {
                for (let i = 0; Faces.length > i; i++) {
                    Fnlines = []
                    Flines = []
                    Fline = Faces[i].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    Flines.push("(" + parseInt(Fline1[0]) + "," + parseInt(Fline2[0]) + "," + parseInt(Fline3[0]) + ")")
                    Fnlines.push(UVs[parseInt(Fline1[1]) - 1].map(Number), UVs[parseInt(Fline2[1]) - 1].map(Number), UVs[parseInt(Fline3[1]) - 1].map(Number))
                    Faces[i] = Flines
                    UVmap[i] = Fnlines
                }
                Output[0] = Faces.join()
            } else {
                for (let i = 0; Faces.length > i; i++) {
                    Fnlines = []
                    Flines = []
                    Fline = Faces[i].substr(2)
                    Fline = Fline.split(' ');
                    Fline1 = Fline[0].split('/');
                    Fline2 = Fline[1].split('/');
                    Fline3 = Fline[2].split('/');
                    Flines.push("(" + parseInt(Fline1[0]) + "," + parseInt(Fline2[0]) + "," + parseInt(Fline3[0]) + ")")
                    Faces[i] = Flines
                }
                Output[0] = Faces.join()
            }
        }
        let f = []
        let v = []
        let folder1Id = getRandomInt(1, 10000);
        let folder2Id = getRandomInt(1, 10000);
        const state = Calc.getState();
        state.expressions.list.push({
            type: "folder",
            id: folder1Id.toString(),
            title: "Faces and Vertexes",
            collapsed: true
        });
        if (RemoveTriLimitCheckBox.checked == true) {
            for (let i = 0; i < Loop; i++) {
                f[i] = getRandomInt(1, 10000);
                v[i] = getRandomInt(1, 10000);
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folder1Id.toString(),
                    color: "#c74440",
                    latex: "V_{" + v[i] + "}=[" + Output[i] + "]",
                    hidden: true
                });
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folder1Id.toString(),
                    color: "#c74440",
                    latex: "F_{" + f[i] + "}=[" + vertexOut[i] + "]",
                    hidden: true
                });
            }
        } else {
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folder1Id.toString(),
                color: "#c74440",
                latex: VertexName.value + "=[" + Output[0] + "]",
                hidden: true
            });
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folder1Id.toString(),
                color: "#c74440",
                latex: FaceName.value + "=[" + Output[1] + "]",
                hidden: true
            });
        }
        state.expressions.list.push({
            type: "folder",
            id: folder2Id.toString(),
            title: "Main bit",
            collapsed: true
        });
        if (RemoveTriLimitCheckBox.checked == true) {
            for (let x = 0; x < Loop; x++) {
                C[x] = getRandomInt(1, 10000);
                if (PosArrayCheckBox.checked == true && RotArrayCheckBox.checked == true) {
                    if (UVmapCheckBox.checked == true) {
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[x] + "}"
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                        }
                    } else {
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                        }
                    }
                } else if (PosArrayCheckBox.checked == true) {
                    if (UVmapCheckBox.checked == true) {
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(F_{" + f[x] + "}[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "]" + ")",
                                colorLatex: "C_{" + C[x] + "}"
                            });
                        }
                    } else {
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(F_{" + f[x] + "}[V_{" + v[x] + "}.x]+" + ArrayName.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.y]+" + ArrayName.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.z]+" + ArrayName.value + "[" + (i + 1) + "]" + ")",
                                colorLatex: colorVar.value,
                            });
                        }
                    }
                } else if (RotArrayCheckBox.checked == true) {
                    if (UVmapCheckBox.checked == true) {
                        C[0] = getRandomInt(1, 10000);
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                colorLatex: "C_{" + C[x] + "}"
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                        }
                    } else {
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                colorLatex: colorVar.value,
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: colorVar.value,
                                });
                            }
                        }
                    }
                } else {
                    if (UVmapCheckBox.checked == true) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}((F_{" + f[x] + "}[V_{" + v[x] + "}.x]),F_{" + f[x] + "}[V_{" + v[x] + "}.y],F_{" + f[x] + "}[V_{" + v[x] + "}.z])",
                            colorLatex: "C_{" + C[x] + "}"
                        });
                    } else {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}((F_{" + f[x] + "}[V_{" + v[x] + "}.x]),F_{" + f[x] + "}[V_{" + v[x] + "}.y],F_{" + f[x] + "}[V_{" + v[x] + "}.z])",
                            colorLatex: colorVar.value,
                        });
                    }
                }
            }
        } else {
            if (PosArrayCheckBox.checked == true && RotArrayCheckBox.checked == true) {
                if (UVmapCheckBox.checked == true) {
                    C[0] = getRandomInt(1, 10000);
                    for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                            colorLatex: "C_{" + C[0] + "}"
                        });
                        if (YreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                        if (XreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                        if (ZreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                    }
                } else {
                    for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                            colorLatex: colorVar.value,
                        });
                        if (YreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                        }
                        if (XreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                        }
                        if (ZreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                        }
                    }
                }
            } else if (PosArrayCheckBox.checked == true) {
                if (UVmapCheckBox.checked == true) {
                    C[0] = getRandomInt(1, 10000);
                    for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}(" + FaceName.value + "[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "]" + ")",
                            colorLatex: "C_{" + C[0] + "}"
                        });
                    }
                } else {
                    for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}(" + FaceName.value + "[" + VertexName.value + ".x]+" + ArrayName.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".y]+" + ArrayName.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".z]+" + ArrayName.value + "[" + (i + 1) + "]" + ")",
                            colorLatex: colorVar.value,
                        });
                    }
                }
            } else if (RotArrayCheckBox.checked == true) {
                if (UVmapCheckBox.checked == true) {
                    C[0] = getRandomInt(1, 10000);
                    for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                            colorLatex: "C_{" + C[0] + "}"
                        });
                        if (YreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                        if (XreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                        if (ZreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                    }
                } else {
                    for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                        state.expressions.list.push({
                            type: "expression",
                            id: getRandomInt(1, 10000).toString(),
                            folderId: folder2Id.toString(),
                            color: "#c74440",
                            latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                            colorLatex: colorVar.value,
                        });
                        if (YreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: colorVar.value,
                            });
                        }
                        if (XreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: colorVar.value,
                            });
                        }
                        if (ZreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)-\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)+\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)+\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)\\sin(" + Array1Name.value + "[" + (i + 1) + "].z)-\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cos(" + Array1Name.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + Array1Name.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + Array1Name.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + Array1Name.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: colorVar.value,
                            });
                        }
                    }
                }
            } else {
                if (UVmapCheckBox.checked == true) {
                    C[0] = getRandomInt(1, 10000);
                    state.expressions.list.push({
                        type: "expression",
                        id: getRandomInt(1, 10000).toString(),
                        folderId: folder2Id.toString(),
                        color: "#c74440",
                        latex: "\\operatorname{triangle}((" + FaceName.value + "[" + VertexName.value + ".x])," + FaceName.value + "[" + VertexName.value + ".y]," + FaceName.value + "[" + VertexName.value + ".z])",
                        colorLatex: "C_{" + C[0] + "}"
                    });
                } else {
                    state.expressions.list.push({
                        type: "expression",
                        id: getRandomInt(1, 10000).toString(),
                        folderId: folder2Id.toString(),
                        color: "#c74440",
                        latex: "\\operatorname{triangle}((" + FaceName.value + "[" + VertexName.value + ".x])," + FaceName.value + "[" + VertexName.value + ".y]," + FaceName.value + "[" + VertexName.value + ".z])",
                        colorLatex: colorVar.value,
                    });
                }
            }
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
            latex: ArrayName.value + "=[" + Output + "]",
            hidden: true
        });
        Calc.setState(state)
    }
    reader.readAsText(Array);
});




function getAverageColorOfTriangle(ctx, triangle, imgWidth, imgHeight) {
    const [[nx1, ny1], [nx2, ny2], [nx3, ny3]] = triangle;

    const x1 = nx1 * imgWidth;
    const y1 = ny1 * imgHeight;
    const x2 = nx2 * imgWidth;
    const y2 = ny2 * imgHeight;
    const x3 = nx3 * imgWidth;
    const y3 = ny3 * imgHeight;

    const minX = Math.max(0, Math.floor(Math.min(x1, x2, x3)));
    const maxX = Math.min(imgWidth, Math.ceil(Math.max(x1, x2, x3)));
    const minY = Math.max(0, Math.floor(Math.min(y1, y2, y3)));
    const maxY = Math.min(imgHeight, Math.ceil(Math.max(y1, y2, y3)));

    const width = maxX - minX;
    const height = maxY - minY;

    if (width <= 0 || height <= 0) return [0, 0, 0];

    const imgData = ctx.getImageData(minX, minY, width, height);
    const data = imgData.data;

    let r = 0, g = 0, b = 0, count = 0;

    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            const px = minX + i;
            const py = minY + j;

            if (pointInTriangle(px, py, x1, y1, x2, y2, x3, y3)) {
                const idx = (j * width + i) * 4;
                r += data[idx];
                g += data[idx + 1];
                b += data[idx + 2];
                count++;
            }
        }
    }

    if (count === 0) {
        return sampleTriangleCentroid(ctx, x1, y1, x2, y2, x3, y3, imgWidth, imgHeight);
    }

    return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

function sampleTriangleCentroid(ctx, x1, y1, x2, y2, x3, y3, imgWidth, imgHeight) {
    const cx = Math.round((x1 + x2 + x3) / 3);
    const cy = Math.round((y1 + y2 + y3) / 3);

    if (cx >= 0 && cx < imgWidth && cy >= 0 && cy < imgHeight) {
        const data = ctx.getImageData(cx, cy, 1, 1).data;
        return [data[0], data[1], data[2]];
    }

    return [0, 0, 0];
}

function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
    const dX = px - x3;
    const dY = py - y3;
    const dX21 = x3 - x2;
    const dY12 = y2 - y3;
    const D = dY12 * (x1 - x3) + dX21 * (y1 - y3);
    const s = dY12 * dX + dX21 * dY;
    const t = (y3 - y1) * dX + (x1 - x3) * dY;

    if (D < 0) return s <= 0 && t <= 0 && s + t >= D;
    return s >= 0 && t >= 0 && s + t <= D;
}




document.getElementById('upload').addEventListener('change', async function (e) {
    const file = e.target.files[0];
    if (!file) return;


    rbgValues = []
    const img = new Image();
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        Output = null;
        if (UVmap.length > 10000) {
            for (let i = 0; i < UVmap.length; i++) {
                const triangle = UVmap[i];
                const avgColor = getAverageColorOfTriangle(ctx, triangle, img.width, img.height) + "";
                rbgValues[i] = avgColor
            }
            R = []
            G = []
            B = []
            for (let i = 0; i < rbgValues.length; i++) {
                R[i] = rbgValues[i].split(',')[0];
                G[i] = rbgValues[i].split(',')[1];
                B[i] = rbgValues[i].split(',')[2];
            }
            let r = []
            let g = []
            let b = []
            let folderId = getRandomInt(1, 10000);
            let folderId1 = getRandomInt(1, 10000);
            const state = Calc.getState();
            state.expressions.list.push({
                type: "folder",
                id: folderId.toString(),
                title: "RGB Values",
                collapsed: true
            });
            for (let i = 0; i < Loop; i++) {
                r[i] = getRandomInt(1, 10000).toString()
                g[i] = getRandomInt(1, 10000).toString()
                b[i] = getRandomInt(1, 10000).toString()
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId.toString(),
                    color: "#c74440",
                    latex: "R_{" + r[i] + "}=[" + R.slice(((i + 1) * 10000) - 10000, ((i + 1) * 10000)) + "]",
                    hidden: true
                });
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId.toString(),
                    color: "#c74440",
                    latex: "G_{" + g[i] + "}=[" + G.slice(((i + 1) * 10000) - 10000, ((i + 1) * 10000)) + "]",
                    hidden: true
                });
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId.toString(),
                    color: "#c74440",
                    latex: "B_{" + b[i] + "}=[" + B.slice(((i + 1) * 10000) - 10000, ((i + 1) * 10000)) + "]",
                    hidden: true
                });
            }
            state.expressions.list.push({
                type: "folder",
                id: folderId1.toString(),
                title: "Texture Bit",
                collapsed: true
            });
            for (let i = 0; i < Loop; i++) {
                state.expressions.list.push({
                    type: "expression",
                    id: getRandomInt(1, 10000).toString(),
                    folderId: folderId1.toString(),
                    color: "#c74440",
                    latex: "C_{" + C[i] + "}=\\operatorname{rgb}(R_{" + r[i] + "},G_{" + g[i] + "},B_{" + b[i] + "})",
                    hidden: true
                });
            }
            Calc.setState(state)
        } else {
            for (let i = 0; i < UVmap.length; i++) {
                const triangle = UVmap[i];
                const avgColor = getAverageColorOfTriangle(ctx, triangle, img.width, img.height) + "";
                rbgValues[i] = avgColor
            }
            R = []
            G = []
            B = []
            for (let i = 0; i < rbgValues.length; i++) {
                R[i] = rbgValues[i].split(',')[0];
                G[i] = rbgValues[i].split(',')[1];
                B[i] = rbgValues[i].split(',')[2];
            }
            let r = getRandomInt(1, 10000).toString()
            let g = getRandomInt(1, 10000).toString()
            let b = getRandomInt(1, 10000).toString()
            let c = getRandomInt(1, 10000).toString()
            let folderId = getRandomInt(1, 10000);
            let folderId1 = getRandomInt(1, 10000);
            const state = Calc.getState();
            state.expressions.list.push({
                type: "folder",
                id: folderId.toString(),
                title: "RGB Values",
                collapsed: true
            });
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folderId.toString(),
                color: "#c74440",
                latex: "R_{" + r + "}=[" + R.slice(0, 10000) + "]",
                hidden: true
            });
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folderId.toString(),
                color: "#c74440",
                latex: "G_{" + g + "}=[" + G.slice(0, 10000) + "]",
                hidden: true
            });
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folderId.toString(),
                color: "#c74440",
                latex: "B_{" + b + "}=[" + B.slice(0, 10000) + "]",
                hidden: true
            });
            state.expressions.list.push({
                type: "folder",
                id: folderId1.toString(),
                title: "Texture Bit",
                collapsed: true
            });
            state.expressions.list.push({
                type: "expression",
                id: getRandomInt(1, 10000).toString(),
                folderId: folderId1.toString(),
                color: "#c74440",
                latex: "C_{" + C[0] + "}=\\operatorname{rgb}(R_{" + r + "},G_{" + g + "},B_{" + b + "})",
                hidden: true
            });
            Calc.setState(state)
        }
    };
    img.src = URL.createObjectURL(file);
});