const element = document.getElementById("commands");

document.addEventListener('keydown', handleKeyPress);

var directions = new Map();

directions.set(37, 'LEFT');
directions.set(38, 'UP');
directions.set(39, 'RIGHT');
directions.set(40, 'DOWN');

class Command {
    constructor(id, direction, repetitions, state) {
        this.id = id;
        this.direction = direction;
        this.repetitions = repetitions;
        this.state = state;
        this.fails = 0;
    }
}

let commandList = [];
let commandId = 1;
let currentKey = '';
let lastKey = '';

var i = 0;
var id = 1;


function handleKeyPress(e) {
    keyCode = e.keyCode;

    if (keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {

        currentKey = keyCode;
        var newCommand;

        document.getElementById("confirmCommands").removeAttribute("disabled");
        document.getElementById("confirmCommands").setAttribute("class", "btn btn-primary");

        var div = document.getElementById("test-col-" + id);

        if ((id === 3 && div.childElementCount === 6) || commandList.length === 18) {
            var divAlert = document.getElementById("alertsDiv");
            if (divAlert.childElementCount === 0) {

                var divNewAlert = document.createElement("DIV");
                divNewAlert.setAttribute("class", "alert alert-warning");
                divNewAlert.setAttribute("role", "alert");
                divNewAlert.setAttribute("style", "margin-left: 5%; margin-right: 10%;");

                var textAlert = document.createTextNode("You can't enter any more commands. It's time to play!!");
                divNewAlert.appendChild(textAlert);
                divAlert.appendChild(divNewAlert);

                wait();
            }
            return;
        }

        var divRow = document.createElement("DIV");
        divRow.setAttribute("class", "row");
        var divCol = document.createElement("DIV");
        divCol.setAttribute("class", "col-md-12");
        // var commandUI = document.createElement("p");

        var commandUI = document.createElement("INPUT");
        commandUI.setAttribute("type", "text");
        commandUI.setAttribute("readonly", true);
        commandUI.setAttribute("name", "commandFields");


        commandUI.setAttribute("style", "float:left ; margin-left:10%; border-color: transparent;");
        divRow.appendChild(divCol);


        if (currentKey === lastKey) {

            var divsCol12 = document.getElementsByClassName("col-md-12");
            var lastP = divsCol12[divsCol12.length - 1].childNodes[1];

            var lastNum = parseInt(lastP.getAttribute("value").substr(1, 2));
            console.log(lastP.textContent);

            divsCol12[divsCol12.length - 1].parentElement.remove();

            var lastCommand = commandList.pop();
            var currentRepetions = lastCommand.repetitions;
            lastCommand.repetitions = currentRepetions + 1;
            commandList.push(lastCommand);
            // commandUI.setAttribute("value", "x" + (lastNum + 1));
            commandUI.setAttribute("value", "x" + (lastNum + 1) + " - " + lastCommand.direction  );
            printArrow(divCol);
            divCol.appendChild(commandUI);
            div.appendChild(divRow);
            console.log("En el anterior: " + div.childElementCount)

        } else {
            printArrow(divCol);
            newCommand = new Command(commandId, directions.get(keyCode), 1, "ENTERED");
            commandList.push(newCommand);
            commandId++;
            lastKey = currentKey;
            // commandUI.setAttribute("value", "x" + newCommand.repetitions);
            commandUI.setAttribute("value", "x" + newCommand.repetitions + " - " + newCommand.direction  );
            divCol.appendChild(commandUI);
            div.appendChild(divRow);
            i++;

        }

        if (i >= 6 && div.childElementCount === 7) {
            i = 0;
            id++;
        }
    }
}


function printArrow(divCol) {
    if (keyCode === 37) {
        divCol.innerHTML += '<img src="/img/arrow/orange-left-arrow.png" style="float:left"/>';
    } else if (keyCode === 38) {
        divCol.innerHTML += '<img src="/img/arrow/orange-up-arrow.png" style="float:left" />';
    } else if (keyCode === 39) {
        divCol.innerHTML += '<img src="/img/arrow/orange-rigth-arrow.png" style="float:left" />';
    } else if (keyCode === 40) {
        divCol.innerHTML += '<img src="/img/arrow/orange-down-arrow.png" style="float:left" />';
    }
}

window.addEventListener("keydown", function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function wait() {
    console.log('Taking a break...');
    await sleep(4000);
    console.log('Two second later');
    closeAlert();
}


function closeAlert() {
    if ($("#alertsDiv").childElementCount !== 0) {
        $(".alert").alert('close')
    }
}