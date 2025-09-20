// Menu UI bit
const maindiv = document.getElementById("main_bit")
const showdiv = document.getElementById("show_bit")
const ThreeDiv = document.getElementById("main_3D")
const TwoDiv = document.getElementById("main_2D")

// Checkboxes
const UVmapCheckBox = document.getElementById("UVmapCheckBox")
const PosArrayCheckBox = document.getElementById("PosArrayCheckBox")
const RotArrayCheckBox = document.getElementById("RotArrayCheckBox")
const XreflectionCheckBox = document.getElementById("XCheckBox")
const YreflectionCheckBox = document.getElementById("YCheckBox")
const ZreflectionCheckBox = document.getElementById("ZCheckBox")
const RemoveTriLimitCheckBox = document.getElementById("RemoveTriLimitCheckBox")
const ScaleArrayCheckBox = document.getElementById("ScaleArrayCheckBox")
const CodeClearCheckBox = document.getElementById("CodeClearCheckBox")

// Naming and color input
const colorVar = document.getElementById("color")
const VertexName = document.getElementById("VertexName")
const FaceName = document.getElementById("FaceName")

// Naming and 2d inputs
const BoxName = document.getElementById("BoxName")
const BoxSizeX = document.getElementById("BoxSizeX")
const BoxSizeY = document.getElementById("BoxSizeY")
const BoxX = document.getElementById("BoxX")
const BoxY = document.getElementById("BoxY")
const BoxColor = document.getElementById("BoxColor")
const BoxOpacity = document.getElementById("BoxOpacity")


// Array vars input
const PosArray = document.getElementById("PosArray")
const RotArray = document.getElementById("RotArray")
const ArrayCount = document.getElementById("ArrayCount")
const ScaleArray = document.getElementById("ScaleArray")

//Random Vars
UVs = null;
UVmap = [];
rbgValues = [];
C = [];

// Get Random Int (used in 3d but not in there because I might use it in 2d)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
███╗   ███╗███████╗███╗   ██╗██╗   ██╗    ███████╗████████╗██╗   ██╗███████╗███████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗
████╗ ████║██╔════╝████╗  ██║██║   ██║    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║    ███████╗   ██║   ██║   ██║█████╗  █████╗      ███████╗   ██║   ███████║██████╔╝   ██║
██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝      ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝    ███████║   ██║   ╚██████╔╝██║     ██║         ███████║   ██║   ██║  ██║██║  ██║   ██║
╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝         ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*/

maindiv.style.display = 'none';
TwoDiv.style.display = 'none';
showdiv.style.display = null;

function hide() {
    maindiv.style.display = 'none';
    showdiv.style.display = null;
}


function To3d() {
    TwoDiv.style.display = 'none';
    ThreeDiv.style.display = null;
}

function To2d() {
    TwoDiv.style.display = null;
    ThreeDiv.style.display = 'none';
}

function show() {
    maindiv.style.display = null;
    showdiv.style.display = 'none';
}

/*
███╗   ███╗███████╗███╗   ██╗██╗   ██╗    ███████╗████████╗██╗   ██╗███████╗███████╗    ███████╗███╗   ██╗██████╗
████╗ ████║██╔════╝████╗  ██║██║   ██║    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝    ██╔════╝████╗  ██║██╔══██╗
██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║    ███████╗   ██║   ██║   ██║█████╗  █████╗      █████╗  ██╔██╗ ██║██║  ██║
██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝      ██╔══╝  ██║╚██╗██║██║  ██║
██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝    ███████║   ██║   ╚██████╔╝██║     ██║         ███████╗██║ ╚████║██████╔╝
╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝         ╚══════╝╚═╝  ╚═══╝╚═════╝
*/

// Save state to .des file (really just a renamed .json)
function downloadState(calc3d, filename = "Graph.des") {
    const state = calc3d.getState();
    const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

// Loads state with a .des file
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
        e.target.value = "";
    };
    reader.readAsText(f);
});



/*
██████╗ ██████╗     ███████╗████████╗██╗   ██╗███████╗███████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗
╚════██╗██╔══██╗    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
 █████╔╝██║  ██║    ███████╗   ██║   ██║   ██║█████╗  █████╗      ███████╗   ██║   ███████║██████╔╝   ██║
 ╚═══██╗██║  ██║    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝      ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
██████╔╝██████╔╝    ███████║   ██║   ╚██████╔╝██║     ██║         ███████║   ██║   ██║  ██║██║  ██║   ██║
╚═════╝ ╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝         ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*/


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
        e.target.value = "";
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
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[x] + "}"
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
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
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "])",
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
                                latex: "\\operatorname{triangle}(F_{" + f[x] + "}[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "]" + ")",
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
                                latex: "\\operatorname{triangle}(F_{" + f[x] + "}[V_{" + v[x] + "}.x]+" + PosArray.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.y]+" + PosArray.value + "[" + (i + 1) + "]" + ",F_{" + f[x] + "}[V_{" + v[x] + "}.z]+" + PosArray.value + "[" + (i + 1) + "]" + ")",
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
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                colorLatex: "C_{" + C[x] + "}"
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: "C_{" + C[x] + "}"
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
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
                                latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                colorLatex: colorVar.value,
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(F_{" + f[x] + "}.y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+F_{" + f[x] + "}.z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.x],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.y],(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((F_{" + f[x] + "}.x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+F_{" + f[x] + "}.y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(F_{" + f[x] + "}.z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(F_{" + f[x] + "}.x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+F_{" + f[x] + "}.y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(F_{" + f[x] + "}.z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[V_{" + v[x] + "}.z])",
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
                if (ScaleArrayCheckBox.checked == true) {
                    if (UVmapCheckBox.checked == true) {
                        C[0] = getRandomInt(1, 10000);
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[0] + "}"
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[0] + "}"
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
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
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cdot(" + ScaleArray.value + "[" + (i + 1) + "])\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z\\cdot(" + ScaleArray.value + "[" + (i + 1) + "]))\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                        }
                    }
                } else {
                    if (UVmapCheckBox.checked == true) {
                        C[0] = getRandomInt(1, 10000);
                        for (let i = 0; i < parseInt(ArrayCount.value); i++) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[0] + "}"
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: "C_{" + C[0] + "}"
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
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
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                colorLatex: colorVar.value,
                            });
                            if (YreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (XreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
                            if (ZreflectionCheckBox.checked == true) {
                                state.expressions.list.push({
                                    type: "expression",
                                    id: getRandomInt(1, 10000).toString(),
                                    folderId: folder2Id.toString(),
                                    color: "#c74440",
                                    latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "])",
                                    colorLatex: colorVar.value,
                                });
                            }
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
                            latex: "\\operatorname{triangle}(" + FaceName.value + "[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "]" + ")",
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
                            latex: "\\operatorname{triangle}(" + FaceName.value + "[" + VertexName.value + ".x]+" + PosArray.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".y]+" + PosArray.value + "[" + (i + 1) + "]" + "," + FaceName.value + "[" + VertexName.value + ".z]+" + PosArray.value + "[" + (i + 1) + "]" + ")",
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
                            latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                            colorLatex: "C_{" + C[0] + "}"
                        });
                        if (YreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                        if (XreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: "C_{" + C[0] + "}"
                            });
                        }
                        if (ZreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
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
                            latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                            colorLatex: colorVar.value,
                        });
                        if (YreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}(((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),((-(" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((--(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: colorVar.value,
                            });
                        }
                        if (XreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+-(" + FaceName.value + ".y)(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+" + FaceName.value + ".z(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".y)\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".z\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
                                colorLatex: colorVar.value,
                            });
                        }
                        if (ZreflectionCheckBox.checked == true) {
                            state.expressions.list.push({
                                type: "expression",
                                id: getRandomInt(1, 10000).toString(),
                                folderId: folder2Id.toString(),
                                color: "#c74440",
                                latex: "\\operatorname{triangle}((((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".x],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".y],(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)-\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)+\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].z))),(((" + FaceName.value + ".x)\\cos(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+" + FaceName.value + ".y(\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)+\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z))+-(" + FaceName.value + ".z)(\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\sin(" + RotArray.value + "[" + (i + 1) + "].y)\\sin(" + RotArray.value + "[" + (i + 1) + "].z)-\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cos(" + RotArray.value + "[" + (i + 1) + "].z)))),((-(" + FaceName.value + ".x)\\cdot\\sin(" + RotArray.value + "[" + (i + 1) + "].y)+" + FaceName.value + ".y\\cos(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y)+-(" + FaceName.value + ".z)\\sin(" + RotArray.value + "[" + (i + 1) + "].x+90)\\cdot\\cos(" + RotArray.value + "[" + (i + 1) + "].y))))[" + VertexName.value + ".z])",
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
        e.target.value = "";
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
            title: PosArray.value,
            collapsed: true
        });
        state.expressions.list.push({
            type: "expression",
            id: getRandomInt(1, 10000).toString(),
            folderId: folderId.toString(),
            color: "#c74440",
            latex: PosArray.value + "=[" + Output + "]",
            hidden: true
        });
        Calc.setState(state)
        e.target.value = "";
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
        e.target.value = "";
    };
    img.src = URL.createObjectURL(file);
});

/*
██████╗ ██████╗     ███████╗████████╗██╗   ██╗███████╗███████╗    ███████╗███╗   ██╗██████╗
╚════██╗██╔══██╗    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝    ██╔════╝████╗  ██║██╔══██╗
 █████╔╝██║  ██║    ███████╗   ██║   ██║   ██║█████╗  █████╗      █████╗  ██╔██╗ ██║██║  ██║
 ╚═══██╗██║  ██║    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝      ██╔══╝  ██║╚██╗██║██║  ██║
██████╔╝██████╔╝    ███████║   ██║   ╚██████╔╝██║     ██║         ███████╗██║ ╚████║██████╔╝
╚═════╝ ╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝         ╚══════╝╚═╝  ╚═══╝╚═════╝
*/





/*
██████╗ ██████╗     ███████╗████████╗██╗   ██╗███████╗███████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗
╚════██╗██╔══██╗    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
 █████╔╝██║  ██║    ███████╗   ██║   ██║   ██║█████╗  █████╗      ███████╗   ██║   ███████║██████╔╝   ██║
██╔═══╝ ██║  ██║    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝      ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
███████╗██████╔╝    ███████║   ██║   ╚██████╔╝██║     ██║         ███████║   ██║   ██║  ██║██║  ██║   ██║
╚══════╝╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝         ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*/


function AddTicker() {
    const state = Calc.getState();
    state.expressions.list.push({
        type: "expression",
        id: 1,
        latex: "U_{pdate}\\left(x\\right)=T_{ime}\\to T_{ime}+x"
    });
    state.expressions.list.push({
        type: "expression",
        id: 1,
        latex: "T_{ime}=0"
    });
    state.expressions.ticker = {
        handlerLatex: "U_{pdate}\\left(\\operatorname{dt}\\right)",
        minStepLatex: "0",
        open: true
    };
    Calc.setState(state)
}

function AddBox() {
    const state = Calc.getState();
    state.expressions.list.push({
        type: "expression",
        id: 1,
        latex: BoxName.value + "(x,y)=\\min\\left(\\max\\left(\\left|\\frac{x+" + (parseFloat(BoxX.value)) * -1 + "}{" + BoxSizeX.value + "}\\right|^{200}+\\left|\\frac{y+" + (parseFloat(BoxY.value)) * -1 + "}{" + BoxSizeY.value + "}\\right|^{200}-1\\right)\\right)"
    });
    state.expressions.list.push({
        type: "expression",
        id: 1,
        colorLatex: BoxColor.value,
        latex: "0\\ge " + BoxName.value + "\\left(x,y\\right)",
        fillOpacity: BoxOpacity.value
    });
    Calc.setState(state)
}


document.getElementById("loadOBJtale").addEventListener("change", e => {
    const OBJ = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (OBJ) => {
        const state = Calc.getState();
        const text = OBJ.target.result;
        const lines = text.split('\n');
        const Vertexes = lines.filter(line => line.startsWith('v '));
        const Faces = lines.filter(line => line.startsWith('f'));
        const N = []
        const X = []
        const Y = []
        const Z = []
        const NN = []
        const XX = []
        const YY = []
        const ZZ = []
        if (Faces.length >= 10000 || Vertexes.length >= 10000) {
            alert("To much data")
            return;
        }
        else {
            for (let i = 0; i < Vertexes.length; i++) {
                Vlines = []
                Vline = Vertexes[i].substr(2)
                Vline = Vline.split(' ');
                Vlines.push("(" + Vline[0], Vline[1], Vline[2] + ")")
                N[i] = ""
                X[i] = Vline[0]
                Y[i] = Vline[1]
                Z[i] = Vline[2]
                Vertexes[i] = Vlines
            }
            Facess = [];
            Output = [];
            Loop = 0;
            for (let i = 0; Faces.length > i; i++) {
                Flines = []
                Fline = Faces[i].substr(2)
                Fline = Fline.split(' ');
                Fline1 = Fline[0].split('//');
                Fline2 = Fline[1].split('//');
                Fline3 = Fline[2].split('//');
                Flines.push("\\operatorname{triangle}(" + Vertexes[parseInt(Fline1) - 1] + "," + Vertexes[parseInt(Fline2) - 1] + "," + Vertexes[parseInt(Fline3) - 1] + ")")
                NN.push("")
                NN.push("")
                NN.push("")
                XX.push(X[parseInt(Fline1) - 1])
                YY.push(Y[parseInt(Fline1) - 1])
                ZZ.push(Z[parseInt(Fline1) - 1])
                XX.push(X[parseInt(Fline2) - 1])
                YY.push(Y[parseInt(Fline2) - 1])
                ZZ.push(Z[parseInt(Fline2) - 1])
                XX.push(X[parseInt(Fline3) - 1])
                YY.push(Y[parseInt(Fline3) - 1])
                ZZ.push(Z[parseInt(Fline3) - 1])
                Faces[i] = Flines
                Output[0] = Faces.join()
            }
            folderId = getRandomInt(1, 10000);
            state.expressions.list.push({
                type: "folder",
                id: folderId.toString(),
                collapsed: true
            })
            state.expressions.list.push({
                type: "table",
                id: getRandomInt(1, 10000).toString(),
                folderId: folderId.toString(),
                columns: [
                    {
                        id: "col0",
                        latex: "",
                        values: NN.map(String),   // convert to ["1","2","3","4","5"]
                        color: "#2d70b3"
                    },
                    {
                        id: "col1",
                        latex: "C_{x}",
                        values: XX.map(String),   // convert to ["1","2","3","4","5"]
                        color: "#2d70b3"
                    },
                    {
                        id: "col2",
                        latex: "C_{y}",
                        values: YY.map(String),   // convert to ["10","20","30","40","50"]
                        color: "#388c46"
                    },
                    {
                        id: "col3",
                        latex: "C_{z}",
                        values: ZZ.map(String),   // convert to ["10","20","30","40","50"]
                        color: "#388c46"
                    }
                ]
            });
            Calc.setState(state)
        }
        e.target.value = "";
    }
    reader.readAsText(OBJ);
});


/*
██████╗ ██████╗     ███████╗████████╗██╗   ██╗███████╗███████╗    ███████╗███╗   ██╗██████╗
╚════██╗██╔══██╗    ██╔════╝╚══██╔══╝██║   ██║██╔════╝██╔════╝    ██╔════╝████╗  ██║██╔══██╗
 █████╔╝██║  ██║    ███████╗   ██║   ██║   ██║█████╗  █████╗      █████╗  ██╔██╗ ██║██║  ██║
██╔═══╝ ██║  ██║    ╚════██║   ██║   ██║   ██║██╔══╝  ██╔══╝      ██╔══╝  ██║╚██╗██║██║  ██║
███████╗██████╔╝    ███████║   ██║   ╚██████╔╝██║     ██║         ███████╗██║ ╚████║██████╔╝
╚══════╝╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝         ╚══════╝╚═╝  ╚═══╝╚═════╝
*/



/*
██████╗ ███████╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗     ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗██╗     ███████╗██████╗     ███████╗████████╗ █████╗ ██████╗ ████████╗
██╔══██╗██╔════╝██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║██║     ██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
██║  ██║█████╗  ███████╗██║     ██║   ██║██║  ██║█████╗      ██║     ██║   ██║██╔████╔██║██████╔╝██║██║     █████╗  ██████╔╝    ███████╗   ██║   ███████║██████╔╝   ██║
██║  ██║██╔══╝  ╚════██║██║     ██║   ██║██║  ██║██╔══╝      ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║██║     ██╔══╝  ██╔══██╗    ╚════██║   ██║   ██╔══██║██╔══██╗   ██║
██████╔╝███████╗███████║╚██████╗╚██████╔╝██████╔╝███████╗    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ██║███████╗███████╗██║  ██║    ███████║   ██║   ██║  ██║██║  ██║   ██║
╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
*/

document.getElementById("loadDesCode").addEventListener("change", e => {
    const Code = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (Code) => {
        if (CodeClearCheckBox.checked) {
            Calc.setBlank();
        }
        const state = Calc.getState();
        const text = Code.target.result;
        const tokens = tokenizer(text);
        const AST = tokentoAST(tokens)
        ASTToDesmos(AST, state)
        e.target.value = "";
    }
    reader.readAsText(Code);
});

function tokenizer(input) {
    const tokens = [];
    const regex = /\s*([A-Za-z_]\w*|\d+|".*?"|[-+*/=^<>(){},.;\[\]])\s*/g;
    let match;

    while ((match = regex.exec(input)) !== null) {
        const value = match[1];
        let type;

        if (/^\d+$/.test(value)) {
            type = "NUMBER";
        } else if (["+", "-", "*", "/", "=", "^", "<", ">", ""].includes(value)) {
            type = "OPERATOR";
        } else if (["(", ")", "{", "}", ";", "[", "]", ",", "."].includes(value)) {
            type = "PUNCTUATION";
        } else if (["if", "var", "function", "else", "ticker", "random", "round", "sign", "polygon", "max", "min", "mod", "with", "sin", "cos", "tan", "csc", "sec", "cot", "mean", "meadian", "quartile", "shuffle", "midpoint", "floor", "ceil", "distance", "count", "total", "mad", "stats", "estimate"].includes(value)) {
            type = "KEYWORD";
        } else if (["number", "array", "vector"].includes(value)) {
            type = "VARABLE IDENTIFIER";
        } else {
            type = "IDENTIFIER";
        }

        tokens.push({ type, value });
    }

    return tokens;
}

function tokentoAST(input) {
    const AST = []
    for (let i = 0; i < input.length; i++) {
        if (input[i].type == "KEYWORD" && input[i].value == "var") {
            if (input[i + 1].value == "number") {
                if (input[i + 2].value.length > 1) {
                    identifer = input[i + 2].value.slice(0, 1) + "_{" + input[i + 2].value.slice(1) + "}"
                } else {
                    identifer = input[i + 2].value
                }
                if (input[i + 4].value.length > 1 && input[i + 4].type == "IDENTIFIER") {
                    value = input[i + 4].value.slice(0, 1) + "_{" + input[i + 4].value.slice(1) + "}"
                } else {
                    value = input[i + 4].value
                }
                data = {
                    type: "VariableDeclarator",
                    varabletype: "NUMBER",
                    identifer: identifer,
                    valuetype: input[i + 4].type,
                    value: value
                };
                AST.push(data)
                i += 4
            }
            if (input[i + 1].value == "array") {
                values = []
                for (e = i + 5; e < input.length; e++) {
                    if (input[e].value == "]") {
                        break
                    } else if (input[e].type == "IDENTIFIER" && input[e].value.length > 1) {
                        values.push(input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}")
                    } else {
                        values.push(input[e].value)
                    }
                }
                if (input[i+2].value.length > 1) {
                    identifer = input[i+2].value.slice(0, 1) + "_{" + input[i+2].value.slice(1) + "}"
                } else {
                    identifer = input[i+2].value
                }
                data = {
                    type: "VariableDeclarator",
                    varabletype: "ARRAY",
                    identifer: identifer,
                    value: values
                };
                AST.push(data)
            }
            if (input[i + 1].value == "vector") {
                values = []
                for (e = i + 5; e < input.length; e++) {
                    if (input[e].value == ")") {
                        break
                    } else if (input[e].type == "IDENTIFIER" && input[e].value.length > 1) {
                        values.push(input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}")
                    } else {
                        values.push(input[e].value)
                    }
                }
                if (input[i+2].value.length > 1) {
                    identifer = input[i+2].value.slice(0, 1) + "_{" + input[i+2].value.slice(1) + "}"
                } else {
                    identifer = input[i+2].value
                }
                data = {
                    type: "VariableDeclarator",
                    varabletype: "VECTOR",
                    identifer: identifer,
                    value: values
                };
                AST.push(data)
            }
        }
        if (input[i].type == "KEYWORD" && input[i].value == "function") {
            args = []
            data = {
                type: "FunctionDeclaration",
                FuncName: input[i + 1].value,
                arguments: "",
                body: []
            };
            for (e = i + 3; e < input.length; e++) {
                if (input[e].value == ")") {
                    i = e
                    break
                } else {
                    if (input[e].value !== ",") {
                        if (input[e].value.length > 1) {
                            arg = input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}"
                        } else {
                            arg = input[e].value
                        }
                        args.push(arg)
                    }
                }
            }
            data.arguments = args
            for (e = i; e < input.length; e++) {
                if (input[e].value == "}") {
                    break
                } else if (input[e].type == "IDENTIFIER" && input[e + 1].value == "=") {
                    if (input[e].value.length > 1) {
                        identifer = input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}"
                    } else {
                        identifer = input[e].value
                    }
                    dat = {
                        type: "ExpressionStatement",
                        Expression: {
                            type: "AssignmentExpression",
                            identifier: identifer,
                            body: []
                        }
                    }
                    Expression = []
                    for (W = e + 2; W < input.length; W++) {
                        if (input[W].value == ";") {
                            e = W
                            break
                        } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                            if (input[W].value.length > 1) {
                                identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                            } else {
                                identifer = input[W].value
                            }
                            Expression.push(identifer)
                        } else {
                            Expression.push(input[W].value)
                        }
                    }
                    dat.Expression.body.push(Expression)
                    data.body.push(dat)
                } else if (input[e].type == "IDENTIFIER" && input[e + 1].value == "(") {
                    if (input[e].value.length > 1) {
                        identifer = input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}"
                    } else {
                        identifer = input[e].value
                    }
                    args = []
                    for (W = e+2; W < input.length; W++) {
                        if (input[W].value == ")") {
                            break
                        } else if (input[W].value == "(") {
                        } else {
                            if (input[W].value !== ",") {
                                if (input[W].value.length > 1) {
                                    arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                } else {
                                    arg = input[W].value
                                }
                                args.push(arg)
                            }
                        }
                    }
                    dat = {
                        type: "ExpressionStatement",
                        Expression: {
                            type: "CallExpression",
                            identifier: identifer,
                            args: args
                        }
                    }
                    data.body.push(dat)
                } else if (input[e].type == "KEYWORD" && input[e].value == "if") {
                    args = []
                    for (W = e + 2; W < input.length; W++) {
                        if (input[W].value == ")") {
                            i = W
                            break
                        } else {
                            if (input[W].value !== ",") {
                                if (input[W].value.length > 1 && input[W].type !== "NUMBER") {
                                    arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                } else {
                                    arg = input[W].value
                                }
                                args.push(arg)
                            }
                        }
                    }
                    dato = {
                        type: "IfStatement",
                        Expression: {
                            type: "IfStatement",
                            test: args,
                            body: []
                        }
                    }
                    for (E = i; E < input.length; E++) {
                        if (input[E].value == "}") {
                            break
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "=") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "AssignmentExpression",
                                    identifier: identifer,
                                    body: []
                                }
                            }
                            Expression = []
                            for (W = E + 2; W < input.length; W++) {
                                if (input[W].value == ";") {
                                    break
                                } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                                    if (input[W].value.length > 1) {
                                        identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                    } else {
                                        identifer = input[W].value
                                    }
                                    Expression.push(identifer)
                                } else {
                                    Expression.push(input[W].value)
                                }
                            }
                            dat.Expression.body.push(Expression)
                            dato.Expression.body.push(dat)
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "(") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            args = []
                            for (W = E + 2; W < input.length; W++) {
                                if (input[W].value == ")") {
                                    break
                                } else {
                                    if (input[W].value !== ",") {
                                        if (input[W].value.length > 1) {
                                            arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                        } else {
                                            arg = input[W].value
                                        }
                                        args.push(arg)
                                    }
                                }
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "CallExpression",
                                    identifier: identifer,
                                    args: args
                                }
                            }
                            dato.Expression.body.push(dat)
                        }
                    }
                    data.body.push(dato)
                    e = E
                } else if (input[e].type == "KEYWORD" && input[e].value == "else" && input[e + 1].value == "if") {
                    args = []
                    for (W = e + 3; W < input.length; W++) {
                        if (input[W].value == ")") {
                            i = W
                            break
                        } else {
                            if (input[W].value !== ",") {
                                if (input[W].value.length > 1 && input[W].type !== "NUMBER") {
                                    arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                } else {
                                    arg = input[W].value
                                }
                                args.push(arg)
                            }
                        }
                    }
                    dato = {
                        type: "ElseIfStatement",
                        Expression: {
                            type: "IfStatement",
                            test: args,
                            body: []
                        }
                    }
                    for (E = i; E < input.length; E++) {
                        if (input[E].value == "}") {
                            break
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "=") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "AssignmentExpression",
                                    identifier: identifer,
                                    body: []
                                }
                            }
                            Expression = []
                            for (W = E + 2; W < input.length; W++) {
                                if (input[W].value == ";") {
                                    break
                                } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                                    if (input[W].value.length > 1) {
                                        identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                    } else {
                                        identifer = input[W].value
                                    }
                                    Expression.push(identifer)
                                } else {
                                    Expression.push(input[W].value)
                                }
                            }
                            dat.Expression.body.push(Expression)
                            dato.Expression.body.push(dat)
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "(") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            args = []
                            for (W = i + 4; W < input.length; W++) {
                                if (input[W].value == ")") {
                                    break
                                } else {
                                    if (input[W].value !== ",") {
                                        if (input[W].value.length > 1) {
                                            arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                        } else {
                                            arg = input[W].value
                                        }
                                        args.push(arg)
                                    }
                                }
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "CallExpression",
                                    identifier: identifer,
                                    args: args
                                }
                            }
                            dato.Expression.body.push(dat)
                        }
                    }
                    data.body.push(dato)
                    e = E
                } else if (input[e].type == "KEYWORD" && input[e].value == "else" && input[e + 1].value !== "if") {
                    args = []
                    dato = {
                        type: "ElseStatement",
                        Expression: {
                            type: "IfStatement",
                            test: args,
                            body: []
                        }
                    }
                    for (A = e; A < input.length; A++) {
                        if (input[A].value == "}") {
                            break
                        } else if (input[A].type == "IDENTIFIER" && input[A + 1].value == "=") {
                            if (input[A].value.length > 1) {
                                identifer = input[A].value.slice(0, 1) + "_{" + input[A].value.slice(1) + "}"
                            } else {
                                identifer = input[A].value
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "AssignmentExpression",
                                    identifier: identifer,
                                    body: []
                                }
                            }
                            Expression = []
                            for (W = A + 2; W < input.length; W++) {
                                if (input[W].value == ";") {
                                    break
                                } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                                    if (input[W].value.length > 1) {
                                        identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                    } else {
                                        identifer = input[W].value
                                    }
                                    Expression.push(identifer)
                                } else {
                                    Expression.push(input[W].value)
                                }
                            }
                            dat.Expression.body.push(Expression)
                            dato.Expression.body.push(dat)
                        } else if (input[A].type == "IDENTIFIER" && input[A + 1].value == "(") {
                            if (input[A].value.length > 1) {
                                identifer = input[A].value.slice(0, 1) + "_{" + input[A].value.slice(1) + "}"
                            } else {
                                identifer = input[A].value
                            }
                            args = []
                            for (W = i + 4; W < input.length; W++) {
                                if (input[W].value == ")") {
                                    break
                                } else {
                                    if (input[W].value !== ",") {
                                        if (input[W].value.length > 1) {
                                            arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                        } else {
                                            arg = input[W].value
                                        }
                                        args.push(arg)
                                    }
                                }
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "CallExpression",
                                    identifier: identifer,
                                    args: args
                                }
                            }
                            dato.Expression.body.push(dat)
                        }
                    }
                    data.body.push(dato)
                    e = A
                    i = A
                    console.log(A)
                    console.log(input[A].value)
                    console.log(input[A + 1].value)
                }
            }
            AST.push(data)
        }
        // TICKER STUFF--------------------------------------------------------------------------------
        if (input[i].type == "KEYWORD" && input[i].value == "ticker") {
            args = []
            data = {
                type: "Ticker",
                time: "",
                body: []
            };
            for (e = i + 2; e < input.length; e++) {
                if (input[e].value == ")") {
                    i = e
                    break
                } else {
                    if (input[e].value !== ",") {
                        if (input[e].value.length > 1 && input[e].type !== "NUMBER") {
                            arg = input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}"
                        } else {
                            arg = input[e].value
                        }
                        args.push(arg)
                    }
                }
            }
            data.time = args
            for (e = i; e < input.length; e++) {
                if (input[e].value == "}") {
                    break
                } else if (input[e].type == "IDENTIFIER" && input[e + 1].value == "=") {
                    if (input[e].value.length > 1) {
                        identifer = input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}"
                    } else {
                        identifer = input[e].value
                    }
                    dat = {
                        type: "ExpressionStatement",
                        Expression: {
                            type: "AssignmentExpression",
                            identifier: identifer,
                            body: []
                        }
                    }
                    Expression = []
                    for (W = e + 2; W < input.length; W++) {
                        if (input[W].value == ";") {
                            e = W
                            break
                        } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                            if (input[W].value.length > 1 && input[W].value !== "dt") {
                                identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                            } else {
                                identifer = input[W].value
                            }
                            Expression.push(identifer)
                        } else {
                            Expression.push(input[W].value)
                        }
                    }
                    dat.Expression.body.push(Expression)
                    data.body.push(dat)
                } else if (input[e].type == "IDENTIFIER" && input[e + 1].value == "(") {
                    if (input[e].value.length > 1) {
                        identifer = input[e].value.slice(0, 1) + "_{" + input[e].value.slice(1) + "}"
                    } else {
                        identifer = input[e].value
                    }
                    args = []
                    for (W = i + 3; W < input.length; W++) {
                        if (input[W].value == ")") {
                            break
                        } else if (input[W].value == "(") {
                        } else {
                            if (input[W].value !== ",") {
                                if (input[W].value.length > 1 && input[W].value !== "dt") {
                                    arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                } else {
                                    arg = input[W].value
                                }
                                args.push(arg)
                            }
                        }
                    }
                    dat = {
                        type: "ExpressionStatement",
                        Expression: {
                            type: "CallExpression",
                            identifier: identifer,
                            args: args
                        }
                    }
                    data.body.push(dat)
                } else if (input[e].type == "KEYWORD" && input[e].value == "if") {
                    args = []
                    for (W = e + 2; W < input.length; W++) {
                        if (input[W].value == ")") {
                            i = W
                            break
                        } else {
                            if (input[W].value !== ",") {
                                if (input[W].value.length > 1 && input[W].type !== "NUMBER") {
                                    arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                } else {
                                    arg = input[W].value
                                }
                                args.push(arg)
                            }
                        }
                    }
                    dato = {
                        type: "IfStatement",
                        Expression: {
                            type: "IfStatement",
                            test: args,
                            body: []
                        }
                    }
                    for (E = i; E < input.length; E++) {
                        if (input[E].value == "}") {
                            break
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "=") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "AssignmentExpression",
                                    identifier: identifer,
                                    body: []
                                }
                            }
                            Expression = []
                            for (W = E + 2; W < input.length; W++) {
                                if (input[W].value == ";") {
                                    break
                                } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                                    if (input[W].value.length > 1 && input[W].value !== "dt") {
                                        identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                    } else {
                                        identifer = input[W].value
                                    }
                                    Expression.push(identifer)
                                } else {
                                    Expression.push(input[W].value)
                                }
                            }
                            dat.Expression.body.push(Expression)
                            dato.Expression.body.push(dat)
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "(") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            args = []
                            for (W = i + 4; W < input.length; W++) {
                                if (input[W].value == ")") {
                                    break
                                } else {
                                    if (input[W].value !== ",") {
                                        if (input[W].value.length > 1 && input[W].value !== "dt") {
                                            arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                        } else {
                                            arg = input[W].value
                                        }
                                        args.push(arg)
                                    }
                                }
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "CallExpression",
                                    identifier: identifer,
                                    args: args
                                }
                            }
                            dato.Expression.body.push(dat)
                        }
                    }
                    data.body.push(dato)
                    e = E
                } else if (input[e].type == "KEYWORD" && input[e].value == "else" && input[e + 1].value == "if") {
                    args = []
                    for (W = e + 3; W < input.length; W++) {
                        if (input[W].value == ")") {
                            i = W
                            break
                        } else {
                            if (input[W].value !== ",") {
                                if (input[W].value.length > 1 && input[W].type !== "NUMBER") {
                                    arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                } else {
                                    arg = input[W].value
                                }
                                args.push(arg)
                            }
                        }
                    }
                    dato = {
                        type: "ElseIfStatement",
                        Expression: {
                            type: "IfStatement",
                            test: args,
                            body: []
                        }
                    }
                    for (E = i; E < input.length; E++) {
                        if (input[E].value == "}") {
                            break
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "=") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "AssignmentExpression",
                                    identifier: identifer,
                                    body: []
                                }
                            }
                            Expression = []
                            for (W = E + 2; W < input.length; W++) {
                                if (input[W].value == ";") {
                                    break
                                } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                                    if (input[W].value.length > 1 && input[W].value !== "dt") {
                                        identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                    } else {
                                        identifer = input[W].value
                                    }
                                    Expression.push(identifer)
                                } else {
                                    Expression.push(input[W].value)
                                }
                            }
                            dat.Expression.body.push(Expression)
                            dato.Expression.body.push(dat)
                        } else if (input[E].type == "IDENTIFIER" && input[E + 1].value == "(") {
                            if (input[E].value.length > 1) {
                                identifer = input[E].value.slice(0, 1) + "_{" + input[E].value.slice(1) + "}"
                            } else {
                                identifer = input[E].value
                            }
                            args = []
                            for (W = i + 4; W < input.length; W++) {
                                if (input[W].value == ")") {
                                    break
                                } else {
                                    if (input[W].value !== ",") {
                                        if (input[W].value.length > 1 && input[W].value !== "dt") {
                                            arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                        } else {
                                            arg = input[W].value
                                        }
                                        args.push(arg)
                                    }
                                }
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "CallExpression",
                                    identifier: identifer,
                                    args: args
                                }
                            }
                            dato.Expression.body.push(dat)
                        }
                    }
                    data.body.push(dato)
                    e = E
                } else if (input[e].type == "KEYWORD" && input[e].value == "else" && input[e + 1].value !== "if") {
                    args = []
                    dato = {
                        type: "ElseStatement",
                        Expression: {
                            type: "IfStatement",
                            test: args,
                            body: []
                        }
                    }
                    for (A = e; A < input.length; A++) {
                        if (input[A].value == "}") {
                            break
                        } else if (input[A].type == "IDENTIFIER" && input[A + 1].value == "=") {
                            if (input[A].value.length > 1) {
                                identifer = input[A].value.slice(0, 1) + "_{" + input[A].value.slice(1) + "}"
                            } else {
                                identifer = input[A].value
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "AssignmentExpression",
                                    identifier: identifer,
                                    body: []
                                }
                            }
                            Expression = []
                            for (W = A + 2; W < input.length; W++) {
                                if (input[W].value == ";") {
                                    break
                                } else if (input[W].type == "IDENTIFIER" || input[W].value == ".") {
                                    if (input[W].value.length > 1 && input[W].value !== "dt") {
                                        identifer = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                    } else {
                                        identifer = input[W].value
                                    }
                                    Expression.push(identifer)
                                } else {
                                    Expression.push(input[W].value)
                                }
                            }
                            dat.Expression.body.push(Expression)
                            dato.Expression.body.push(dat)
                        } else if (input[A].type == "IDENTIFIER" && input[A + 1].value == "(") {
                            if (input[A].value.length > 1) {
                                identifer = input[A].value.slice(0, 1) + "_{" + input[A].value.slice(1) + "}"
                            } else {
                                identifer = input[A].value
                            }
                            args = []
                            for (W = i + 4; W < input.length; W++) {
                                if (input[W].value == ")") {
                                    break
                                } else {
                                    if (input[W].value !== ",") {
                                        if (input[W].value.length > 1 && input[W].value !== "dt") {
                                            arg = input[W].value.slice(0, 1) + "_{" + input[W].value.slice(1) + "}"
                                        } else {
                                            arg = input[W].value
                                        }
                                        args.push(arg)
                                    }
                                }
                            }
                            dat = {
                                type: "ExpressionStatement",
                                Expression: {
                                    type: "CallExpression",
                                    identifier: identifer,
                                    args: args
                                }
                            }
                            dato.Expression.body.push(dat)
                        }
                    }
                    data.body.push(dato)
                    e = A
                    i = A
                    console.log(A)
                    console.log(input[A].value)
                    console.log(input[A + 1].value)
                }
            }
            AST.push(data)
        }
    }
    // Dev Stuff
    /*
    const blob = new Blob([JSON.stringify(AST)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Testdescode.json";
    a.click();
    URL.revokeObjectURL(a.href);
    */
    return AST
}

function ASTToDesmos(AST, calcstate) {
    for (let i = 0; i < AST.length; i++) {
        if (AST[i].type == "VariableDeclarator" && AST[i].varabletype == "NUMBER") {
            calcstate.expressions.list.push({
                type: "expression",
                id: 1,
                latex: AST[i].identifer + "=" + AST[i].value
            });
        }
        if (AST[i].type == "VariableDeclarator" && AST[i].varabletype == "ARRAY") {
            calcstate.expressions.list.push({
                type: "expression",
                id: 1,
                latex: AST[i].identifer + "=[" + AST[i].value.join("") + "]"
            });
        }
        if (AST[i].type == "VariableDeclarator" && AST[i].varabletype == "VECTOR") {
            calcstate.expressions.list.push({
                type: "expression",
                id: 1,
                latex: AST[i].identifer + "=(" + AST[i].value.join("") + ")"
            });
        }
        if (AST[i].type == "FunctionDeclaration") {
            if (AST[i].FuncName.length > 1) {
                FunctionName = AST[i].FuncName.slice(0, 1) + "_{" + AST[i].FuncName.slice(1) + "}"
            } else {
                FunctionName = AST[i].FuncName
            }
            body = ""
            for (let e = 0; e < AST[i].body.length; e++) {
                if (AST[i].body[e].Expression.type == "AssignmentExpression") {
                    if (e == 0) {
                        body = AST[i].body[e].Expression.identifier + "\\to "
                    } else {
                        body += "," + AST[i].body[e].Expression.identifier + "\\to "
                    }
                    for (let W = 0; W < AST[i].body[e].Expression.body[0].length; W++) {
                        body += AST[i].body[e].Expression.body[0][W]
                    }
                }
                if (AST[i].body[e].Expression.type == "CallExpression") {
                    if (e == 0) {
                        body = AST[i].body[e].Expression.identifier + "(" + AST[i].body[e].Expression.args + ")"
                    } else {
                        body += "," + AST[i].body[e].Expression.identifier + "(" + AST[i].body[e].Expression.args + ")"
                    }
                }
                if (AST[i].body[e].Expression.type == "IfStatement" && AST[i].body[e].type == "IfStatement") {
                    args = ""
                    for (let E = 0; E < AST[i].body[e].Expression.body.length; E++) {
                        if (AST[i].body[e].Expression.body[E].Expression.type == "AssignmentExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            }
                            for (let W = 0; W < AST[i].body[e].Expression.body[E].Expression.body[0].length; W++) {
                                args += AST[i].body[e].Expression.body[E].Expression.body[0][W]
                            }
                        }
                        if (AST[i].body[e].Expression.type == "CallExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            }
                        }
                    }
                    if (e == 0 && AST[i].body[e + 1].type !== "ElseIfStatement" && AST[i].body[e + 1].type !== "ElseStatement") {
                        body = "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                    } else if (AST[i].body[e + 1].type !== "ElseIfStatement" && AST[i].body[e + 1].type !== "ElseStatement") {
                        body += "," + "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                    } else if (e == 0) {
                        body = "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")"
                    } else {
                        body += "," + "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")"
                    }
                }
                if (AST[i].body[e].Expression.type == "IfStatement" && AST[i].body[e].type == "ElseIfStatement") {
                    args = ""
                    for (let E = 0; E < AST[i].body[e].Expression.body.length; E++) {
                        if (AST[i].body[e].Expression.body[E].Expression.type == "AssignmentExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            }
                            for (let W = 0; W < AST[i].body[e].Expression.body[E].Expression.body[0].length; W++) {
                                args += AST[i].body[e].Expression.body[E].Expression.body[0][W]
                            }
                        }
                        if (AST[i].body[e].Expression.type == "CallExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            }
                        }
                    }
                    if (AST[i].body.length > e + 1) {
                        if (AST[i].body[e + 1].type !== "ElseIfStatement" && AST[i].body[e + 1].type !== "ElseStatement") {
                            body += "," + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                        } else {
                            body += "," + AST[i].body[e].Expression.test.join("") + ":(" + args + ")"
                        }
                    } else {
                        body += "," + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                    }
                }
                if (AST[i].body[e].Expression.type == "IfStatement" && AST[i].body[e].type == "ElseStatement") {
                    args = ""
                    for (let E = 0; E < AST[i].body[e].Expression.body.length; E++) {
                        if (AST[i].body[e].Expression.body[E].Expression.type == "AssignmentExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            }
                            for (let W = 0; W < AST[i].body[e].Expression.body[E].Expression.body[0].length; W++) {
                                args += AST[i].body[e].Expression.body[E].Expression.body[0][W]
                            }
                        }
                        if (AST[i].body[e].Expression.type == "CallExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            }
                        }
                    }
                    body += "," + args + "\\right\\}"
                }
            }
            calcstate.expressions.list.push({
                type: "expression",
                id: 1,
                latex: FunctionName + "(" + AST[i].arguments + ")" + "=" + body
            });
        }
        // TICKER STUFF--------------------------------------------------------------------------------
        if (AST[i].type == "Ticker") {
            body = ""
            for (let e = 0; e < AST[i].body.length; e++) {
                if (AST[i].body[e].Expression.type == "AssignmentExpression") {
                    if (e == 0) {
                        body = AST[i].body[e].Expression.identifier + "\\to "
                    } else {
                        body += "," + AST[i].body[e].Expression.identifier + "\\to "
                    }
                    for (let W = 0; W < AST[i].body[e].Expression.body[0].length; W++) {
                        body += AST[i].body[e].Expression.body[0][W]
                    }
                }
                if (AST[i].body[e].Expression.type == "CallExpression") {
                    if (e == 0) {
                        body = AST[i].body[e].Expression.identifier + "(" + AST[i].body[e].Expression.args + ")"
                    } else {
                        body += "," + AST[i].body[e].Expression.identifier + "(" + AST[i].body[e].Expression.args + ")"
                    }
                }
                if (AST[i].body[e].Expression.type == "IfStatement" && AST[i].body[e].type == "IfStatement") {
                    args = ""
                    for (let E = 0; E < AST[i].body[e].Expression.body.length; E++) {
                        if (AST[i].body[e].Expression.body[E].Expression.type == "AssignmentExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            }
                            for (let W = 0; W < AST[i].body[e].Expression.body[E].Expression.body[0].length; W++) {
                                args += AST[i].body[e].Expression.body[E].Expression.body[0][W]
                            }
                        }
                        if (AST[i].body[e].Expression.type == "CallExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            }
                        }
                    }
                    if (e == 0 && AST[i].body[e + 1].type !== "ElseIfStatement" && AST[i].body[e + 1].type !== "ElseStatement") {
                        body = "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                    } else if (AST[i].body[e + 1].type !== "ElseIfStatement" && AST[i].body[e + 1].type !== "ElseStatement") {
                        body += "," + "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                    } else if (e == 0) {
                        body = "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")"
                    } else {
                        body += "," + "\\left\\{" + AST[i].body[e].Expression.test.join("") + ":(" + args + ")"
                    }
                }
                if (AST[i].body[e].Expression.type == "IfStatement" && AST[i].body[e].type == "ElseIfStatement") {
                    args = ""
                    for (let E = 0; E < AST[i].body[e].Expression.body.length; E++) {
                        if (AST[i].body[e].Expression.body[E].Expression.type == "AssignmentExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            }
                            for (let W = 0; W < AST[i].body[e].Expression.body[E].Expression.body[0].length; W++) {
                                args += AST[i].body[e].Expression.body[E].Expression.body[0][W]
                            }
                        }
                        if (AST[i].body[e].Expression.type == "CallExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            }
                        }
                    }
                    if (AST[i].body.length > e + 1) {
                        if (AST[i].body[e + 1].type !== "ElseIfStatement" && AST[i].body[e + 1].type !== "ElseStatement") {
                            body += "," + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                        } else {
                            body += "," + AST[i].body[e].Expression.test.join("") + ":(" + args + ")"
                        }
                    } else {
                        body += "," + AST[i].body[e].Expression.test.join("") + ":(" + args + ")\\right\\}"
                    }
                }
                if (AST[i].body[e].Expression.type == "IfStatement" && AST[i].body[e].type == "ElseStatement") {
                    args = ""
                    for (let E = 0; E < AST[i].body[e].Expression.body.length; E++) {
                        if (AST[i].body[e].Expression.body[E].Expression.type == "AssignmentExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "\\to "
                            }
                            for (let W = 0; W < AST[i].body[e].Expression.body[E].Expression.body[0].length; W++) {
                                args += AST[i].body[e].Expression.body[E].Expression.body[0][W]
                            }
                        }
                        if (AST[i].body[e].Expression.type == "CallExpression") {
                            if (E == 0) {
                                args += AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            } else {
                                args += "," + AST[i].body[e].Expression.body[E].Expression.identifier + "(" + AST[i].body[e].Expression.body[E].Expression.args + ")"
                            }
                        }
                    }
                    body += "," + args + "\\right\\}"
                }
            }
            calcstate.expressions.ticker = {
                handlerLatex: body,
                minStepLatex: AST[i].time.join(""),
                open: true
            };
        }
        Calc.setState(calcstate)
    }
}


/*
██████╗ ███████╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗     ██████╗ ██████╗ ███╗   ███╗██████╗ ██╗██╗     ███████╗██████╗     ███████╗███╗   ██╗██████╗
██╔══██╗██╔════╝██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██║██║     ██╔════╝██╔══██╗    ██╔════╝████╗  ██║██╔══██╗
██║  ██║█████╗  ███████╗██║     ██║   ██║██║  ██║█████╗      ██║     ██║   ██║██╔████╔██║██████╔╝██║██║     █████╗  ██████╔╝    █████╗  ██╔██╗ ██║██║  ██║
██║  ██║██╔══╝  ╚════██║██║     ██║   ██║██║  ██║██╔══╝      ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║██║     ██╔══╝  ██╔══██╗    ██╔══╝  ██║╚██╗██║██║  ██║
██████╔╝███████╗███████║╚██████╗╚██████╔╝██████╔╝███████╗    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ██║███████╗███████╗██║  ██║    ███████╗██║ ╚████║██████╔╝
╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝  ╚═══╝╚═════╝
*/