const tableElement = document.getElementById("grid");
const questionElement = document.getElementById("question");
let grid = [];
let roadmap = [];
const allRange = [0, 1, 2, 3, 4, 5, 6, 7, 8];
function generateTable() {
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        let tr = document.createElement("tr");
        tableElement.appendChild(tr);
        for (let j = 0; j < 9; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            grid[i].push({ el: td });
            // td.innerText = (`${i} ${j}`);
            roadmap.push({ i: i, j: j, el: td });
        }

    }
    // roadmap = shuffleArray(roadmap);
}

const shuffleArray = (e) => e
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

generateTable();

const getSegment = (e) => [Math.floor(e / 3) * 3, Math.floor(e / 3) * 3 + 1, Math.floor(e / 3) * 3 + 2];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const getPotential = (i, j, snapshotref) => {
    let snapshot = snapshotref.slice();
    let occupied = {};
    let potential = [];
    let row = getSegment(i);
    let col = getSegment(j);


    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            occupied[snapshot[row[r]][col[c]]] = true;
        }
    }

    // occupied[snapshot[row[0]][col[0]]] = true;
    // occupied[snapshot[row[0]][col[1]]] = true;
    // occupied[snapshot[row[1]][col[0]]] = true;
    // occupied[snapshot[row[1]][col[1]]] = true;

    // allRange.forEach(ar => {
    //     occupied[snapshot[i][ar]] = true;
    //     occupied[snapshot[ar][j]] = true;
    // })

    for (let ar = 0; ar < 9; ar++) {
        occupied[snapshot[i][ar]] = true;
        occupied[snapshot[ar][j]] = true;
    }

    // allRange.forEach(ar => {
    //     if (!occupied[ar]) potential.push(ar);
    // })

    for (let ar = 0; ar < 9; ar++) {
        if (!occupied[ar]) potential.push(ar);
    }

    
    // for (let ar = 0; ar < 9; ar++) {
    //     if (!occupied[ar]) potential.splice(getRandomInt(potential.length),0, ar);
    // }

    // occupied = null;
    // row = null;
    // col = null;

    return shuffleArray(potential);
}


let halt = false;
let stack = 0;
// const dbg = document.getElementById("Debug");

function displaySnapshot(snapshot) {
    let out = "";

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            out += `${snapshot[i][j] || "-"} `;
        }
        out += "\n"
    }
    console.log(out);
    console.log(snapshot);
}

function fillEmptySpot(depth = 0, snapshot = Array(9).fill(Array(9).fill(null)), currentseq = "") {
    // console.clear();
    // if (stack++ % 5000 == 0) {
    //     console.log(depth, currentseq, Math.floor((window.performance.memory.usedJSHeapSize / window.performance.memory.totalJSHeapSize) / 100));
    //     displaySnapshot(snapshot);
    //     // setTimeout(function () { dbg.innerHTML = depth }, 0)
    //     requestAnimationFrame(() => {
    //         // dbg.innerHTML = depth;
    //     })
    //     // console.clear();
    // }
    // if (stack % 6000 == 0) {
    //     console.clear();
    // }
    // dbg.innerHTML = depth;
    if (halt) return;
    let coord = roadmap[depth];
    if (coord) {
        let p;
        let potential = getPotential(coord.i, coord.j, snapshot);
        // let result;
        for (let i = 0; i < potential.length; i++) {
            p = potential[i];
            let nextSnap = snapshot.map(e => e.slice());
            nextSnap[coord.i][coord.j] = p;

            let result = fillEmptySpot(depth + 1, nextSnap, currentseq + p.toString());
            // console.log(result, i, potential.length);
            if (result) {
                // console.log("e");
                return result;
            }
            nextSnap = null;
            result = null;
        }
        potential = null;
    } else {
        console.log("END!");
        return snapshot;
    }
    return false;
}

// function getPotentialStack(stack, coord){
//     let snapshot = {};
//     let
// }


// function fillEmptySpot(stack = []){
//     if(stack.length >= 81) return stack;
//     let coord = roadmap[stack.length];
// }




// shuffleArray(grid.flat()).forEach((e,i) => {
//     e.el.innerText = i;
// });

/*

node -> find potential -> potentials as child -> go to child
cutoff when the depth reaches 80

*/

// A 9*9 sudouku
class Sudouku {
    constructor() {
        this.roadmap = shuffleArray([...Array(81).keys()]);
        this.stack = [];
    }

    add(v) {
        this.stack.push(v);

    }
    remove() {
        this.stack.pop();
    }

    get isComplete() {
        return this.stack.length >= 81;
    }


    getAtCoord(r, c) {
        return this.stack[this.roadmap[r * 9 + c]];
    }

    // getNextCoord

    getNextPotential() {
        let occupied = {};
        let potential = [];
        let i = Math.floor(this.stack.length / 9);
        let j = this.stack.length % 9;
        let row = getSegment(i);
        let col = getSegment(j);

        row.forEach(r => {
            col.forEach(c => {
                occupied[this.getAtCoord(r, c)] = true;
            })
        })

        allRange.forEach(ar => {
            occupied[this.getAtCoord(i, ar)] = true;
            occupied[this.getAtCoord(ar, j)] = true;
        })

        allRange.forEach(ar => {
            if (!occupied[ar]) potential.push(ar);
        })
        return shuffleArray(potential);
    }

    generate() {
        while (!this.isComplete) {
            // let 
        }
    }
}


document.getElementById("Generate").onclick = ()=>{
    let result = fillEmptySpot();
    roadmap.forEach(e=>{
        e.el.innerText = result[e.i][e.j] + 1
    })

    questionElement.innerHTML = null;

    for(let i=0;i<9;i++){
        let tr=document.createElement("tr");
        for(let j=0;j<9;j++){
            let td=document.createElement("td");
            td.innerText = result[i][j] + 1;
            tr.appendChild(td);
        }
        questionElement.appendChild(tr);
    }
}