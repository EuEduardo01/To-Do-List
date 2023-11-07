const LocalStorageKey = 'Lista de tarefas'
let isClicked = false

// Data e hora atual
const dateTime = (() => {
    const week = [
        "Domingo",
        "Segunda-Feira",
        "Terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado"
    ];
    const month = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez"
    ];
    const newDate = new Date()
    document.querySelector("#date").innerHTML = `${week[newDate.getDay()]}, ${newDate.getDate()} ${month[newDate.getMonth()]}`
})()
// Essa adiciona os itens ao array de objetos
const createItem = () => {
    const trash = document.querySelector('#trash-icon')
    trash.style.color = "#6f6a6a"
    let incluidBar = document.querySelector("#incluid").value;
    
    if (incluidBar === "") {
        alert("Favor preencha o espaço vazio!");
        return;
    }

    let valor = JSON.parse(localStorage.getItem(LocalStorageKey) || '[]')
    valor.push({tarefa: incluidBar, concluida: false})
    localStorage.setItem(LocalStorageKey, JSON.stringify(valor))

    insertItem()
};

// Faz os itens aparecerem na tela
const insertItem = () => {
    let tasksContainer = document.querySelector(".tasks");

    cleanScreen()
    let value = JSON.parse(localStorage.getItem(LocalStorageKey) || '[]')

    value.forEach((item, index)=>{
        const counter = document.querySelector("#counter");
        counter.textContent = `${index+1} tarefas`;
        tasksContainer.innerHTML += `
            <li id="li-container">
            <div class="delet-checked">
                <button id="checked" onclick="checkText(${index})"><i id="checked-icon" class="fa-solid fa-check" style="color: #0077b6; font-size: 1.5em; ${item.concluida && "opacity: 100%"}"></i></button>
                <button id="delet" class="delet toggle-display" onclick="deletText(${index})">
                    <span class="delet-icon" id="delet-icon-one"></span>
                    <span class="delet-icon" id="delet-icon-two"></span>
                </button>   
            </div>
            <span class="text ${item.concluida && "active"}">${item.tarefa}</span>
        </li>
         `;
    })
}

// Limpar tela
const cleanScreen = () => {
    const tasksContainer = document.querySelector(".tasks");
    
    while(tasksContainer.firstChild){
        tasksContainer.removeChild(tasksContainer.lastChild)
    }
}

// Checa quem sao e corta
function checkText(index) {
    let value = JSON.parse(localStorage.getItem(LocalStorageKey) || '[]')
    value[index].concluida = !value[index].concluida
    localStorage.setItem(LocalStorageKey, JSON.stringify(value))

    insertItem()
}

// Lixeira
const trashActive = () => {
    const trash = document.querySelector('#trash-icon')

    if(isClicked){
        trash.style.color == "red"? trash.style.color = "#6f6a6a" : trash.style.color = "red";
        insertItem()
    }else{
        const delet = document.querySelectorAll('.delet')
        const checked = document.querySelectorAll('#checked')
        trash.style.color == "red"? trash.style.color = "#6f6a6a" : trash.style.color = "red";
         
        for(const deletActiv of delet){
            deletActiv.classList.toggle('toggle-display')
        }
        for(const checkedOff of checked){
            checkedOff.classList.toggle('toggle-display')
        }
     }

    isClicked = !isClicked;
}

// Deletar
function deletText(index){
    let value = JSON.parse(localStorage.getItem(LocalStorageKey) || '[]');

    const deletIconTwo = document.querySelectorAll("#delet-icon-two")[index];
    const deletIconOne = document.querySelectorAll("#delet-icon-one")[index];
    const text = document.querySelectorAll(".text")[index];

    deletIconOne.style.transform = "rotate(90deg)";
    deletIconOne.style.animation = "offFocus 1.5s forwards";
    deletIconTwo.style.transform = "rotate(360deg)";
    deletIconTwo.style.animation = "slicer 0.5s forwards";
    text.style.color = "#cac3c3"

    value.splice(index, 1)
    localStorage.setItem(LocalStorageKey, JSON.stringify(value))

}

insertItem()

document.querySelector("#trash").addEventListener('click', trashActive)
document.querySelector(".add-button").addEventListener("click", createItem);
document.querySelector("#incluid").addEventListener("keyup", (e)=>{ e.key === "Enter" && createItem()});

    