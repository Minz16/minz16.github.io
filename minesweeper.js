/*
this.field = [
0, 0, 0, 2, true
0, 1, true, 2, 1
]
Number as Indicator,
false as empty field,
true as mine
*/

class Minesweeper {
    constructor(width, height, mines) {
        this.height = height
        this.width = width
        this.mines = mines
        this.fieldSize = height * width
        this.field = new Array(height * width)
        this.playerMap = new Array(height * width)
        this.minesArray = new Array(mines)
        this.flags = 0
    }
    createMap() {
        //Empty the field
        this.field.fill(0)
        this.playerMap.fill(false)
        this.createMinesArray()

        //Fill the numbers
        for (let x of this.minesArray) {
            for (let i of this.fillNumber(x)) {
                this.field[x + i]++
            }
        }
        
        //Fill in the mines
        for (let x of this.minesArray) {
            this.field[x] = true
        }
        return this.field
    }
    fillNumber(n) {
        //Left Top
        if (n === 0) {
            return [1, this.width, this.width + 1]
        }
        //Right Top
        if (n === this.width - 1) {
            return [-1, this.width - 1, this.width]
        }
        //Left Bottom
        if (n === this.width * (this.height - 1)) {
            return [-this.width, 1 - this.width, 1]
        }
        //Right Bottom
        if (n === this.width * this.height - 1) {
            return [-1 - this.width, -this.width, -1]
        }
        //Top
        if (n < this.width) {
            return [-1, 1, this.width - 1, this.width, this.width + 1]
        }
        //Right
        if ((n + 1) % this.width === 0) {
            return [-this.width - 1, -this.width, -1, this.width - 1, this.width]
        }
        //Bottom
        if (n < this.fieldSize && n > this.width * (this.height - 1)) {
            return [-this.width - 1, -this.width, 1 - this.width, -1, 1]
        }
        //Left
        if (n % this.width === 0) {
            return [-this.width, 1 - this.width, 1, this.width, this.width + 1]
        }
        //Center
        else {
            return [-1 - this.width, -this.width, 1 - this.width, -1, 1, this.width - 1, this.width, this.width + 1]
        }
    }
    createMinesArray() {
        let dummy = new Array
        let fill = (n) => {
            if (n == 0) return
            dummy.push(n-1)
            fill(n-1)
        }
        fill(this.fieldSize)
        dummy = this.shuffle(dummy)
        //console.log("Shuffled list " + dummy)

        this.minesArray = dummy.slice(0, this.mines)
        return this.minesArray
    }
    shuffle(arr) {
        for (let i = 0; i < this.fieldSize; i++) {
            let v = arr[i]
            let j = this.getRandomInt(this.fieldSize)
            arr[i] = arr[j]
            arr[j] = v
        }
        return arr
    }
    getMinesArray() {
        return this.minesArray
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    getField() {
        return this.field
    }
    getFieldMap() {
        let string = ""
        for (let x = 0; x < this.fieldSize; x++) {
            if (this.field[x] === true) {
                string += "M" + ", "
            } else {
                string += this.field[x] + ", "

            }
            if ((x + 1) % this.width == 0) {
                //console.log("dick")
                //console.log(string)
                string = ""
            }
        }
    }
    getFieldValue(i) {
        return this.field[i]
    }
    getWidth() {
        return this.width
    }
    getHeight() {
        return this.height
    }
    getFieldSize() {
        return this.fieldSize
    }
    getPlayerMap() {
        return this.playerMap
    }
    getPlayerMapValue(i) {
        return this.playerMap[i]
    }
    setPlayerMapValue(i, value) {
        this.playerMap[i] = value
    }
    increaseFlags() {
        this.flags++
    }
    decreaseFlags() {
        this.flags--
    }
    getFlags() {
        return this.flags
    }
    getMines() {
        return this.mines
    }
}

/*
let mouseInterval
let mouseTime
let flagSetTime = 2
function mousedown() {
    console.log("down")
    mouseTime = 0
    //Every 0.1 sec
    mouseInterval = setInterval(() => {
        mouseTime++

        if (mouseTime === flagSetTime) {
            setFlag(hoveredIndex)
        }
    }, 100)
}
function mouseup() {
    clearInterval(mouseInterval)
    if (mouseTime < flagSetTime) {
        fieldClick(hoveredIndex)
    }
    console.log("up")
    //document.removeEventListener("mousedown", mousedown())
}
*/
let mobile = true
function toggleMobile() {
    const toggleButton = document.getElementById("toggleButton")
    if (mobile) {
        document.getElementById("gameField").addEventListener("mousedown", mousedown);
        document.getElementById("gameField").addEventListener("mouseup", (event) => mouseup());
        toggleButton.innerHTML = "📱"
    } else {
        document.getElementById("gameField").removeEventListener("mousedown", mousedown)
        toggleButton.innerHTML = "💻"
    }
    console.log(mobile)
    mobile = !mobile
}


var k = new Minesweeper(16,16,40)
k.createMap()
k.getFieldMap()
var flagMode = false
var flagCounter = "minecounter"


function UI() {
    const gameField = document.getElementById("gameField")
    const table = document.createElement("table")
    table.setAttribute("id", "minesweeper")

    let tr = document.createElement("tr")
    for (let i = 0; i < k.getFieldSize(); i++) {
        let td = document.createElement("td")
        td.setAttribute("id", `field${i}`)
        td.setAttribute("onclick", `fieldClick(${i})`)
        td.setAttribute("onmouseover", `hoveredElement(${i})`)

        td.innerHTML = "◼"
        addRightClick(td, i)
        tr.appendChild(td)

        if ((i + 1) % k.getWidth() == 0) {
            table.appendChild(tr)
            tr = document.createElement("tr")
        }

    }
    flagCounter = document.getElementById("minecounter")
    flagCounter.innerHTML = `${k.getMines() - k.getFlags()}`
    gameField.appendChild(table)
    //console.log(document.querySelectorAll("#minesweeper td") )
}

function deletus() {
    //document.getElementById("gameField").removeChild(document.getElementById("minesweeper"))

}
/*
let hoveredIndex
function hoveredElement(i) {
    console.log(i)
    hoveredIndex = i
    let x = document.getElementById(`field${i}`)
    x.style.backgroundColor = "azure"
}
*/
function addRightClick(element, i) {
    element.addEventListener("contextmenu", function(event) {
        event.preventDefault(); // Prevents the default context menu from showing
        setFlag(i)
    }
    )
}

function setMode(status) {
    flagMode = status
}

function setFlag(i) {
    if (k.getPlayerMapValue(i) === true) {
        // If revealed, do nothing
        return
    }
    
    if (k.getPlayerMapValue(i) === "f") {
        // remove flag, if flag inside
        k.setPlayerMapValue(i, false)
        const field = document.getElementById(`field${i}`)
        k.decreaseFlags()
        setFieldClass(field, "◼")
    } else {
        // add flag, when empty
        k.setPlayerMapValue(i, "f")
        const field = document.getElementById(`field${i}`)
        k.increaseFlags()
        setFieldClass(field, "flag")
    }

    // Update flag in UI
    flagCounter.innerHTML = `${k.getMines() - k.getFlags()}`
}

function fieldClick(i) {
    if (flagMode === true) {
        // Handle like flag
        setFlag(i)
        return
    }

    if (k.getPlayerMapValue(i) === true) {
        // If revealed, then reveal surroundings
        let radius = k.fillNumber(i)
        let flagCounter = 0
        for (let j of radius) {
            // Check if there is right amount of flags
            if (k.getPlayerMapValue(i + j) === "f") {
                flagCounter++
            }
        }
        if (flagCounter !== k.getFieldValue(i)) {
            return
        }


        for (let j of radius) {
            reveal(j + i)
        }
        return
    }
    reveal(i)
}

function reveal(i) {
    if (k.getPlayerMapValue(i) === "f") {
        // Flag on place - do nothing
        return
    }
    if (k.getPlayerMapValue(i) === true) {
        // If revealed, then do nothing
        return
    }
    k.setPlayerMapValue(i, true)
    const field = document.getElementById(`field${i}`)
    let value = k.getFieldValue(i)
    if (value === 0) {
        let radius = k.fillNumber(i)
        clickSurroundings(i, radius)
    }
    setFieldClass(field, value)
}

function clickSurroundings(i, radius) {
    for (let j of radius) {
        reveal(j + i)
    }
}

function setFieldClass(field, value) {
    let className
    switch (value) {
        case 0:
            className = "zero"
            break;

        case 1:
            className = "one"
            break;

        case 2:
            className = "two"
            break;

        case 3:
            className = "three"
            break;

        case 4:
            className = "four"
            break;

        case 5:
            className = "five"
            break;

        case 6:
            className = "six"
            break;

        case 7:
            className = "seven"
            break;

        case 8:
            className = "eight"
            break;
        case "flag":
            className = "flag"
            value = "🚩"
            break;
        case "◼":
            className = "none"
            value = "◼"
            break;
        default:
            value = "💣"
    }
    field.setAttribute("class", className)
    field.innerHTML = value
}