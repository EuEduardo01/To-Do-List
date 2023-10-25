const LocalStorageKey = 'Lista de tarefas'

// Essa adiciona os itens ao array de objetos
const createItem = () => {
    trashActive()
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
const insertItem = ()=>{
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
    // icone do x
    // <i id="delet-icon" class="fa-solid fa-xmark" style="font-size: 1.5em;"> 

}

// Limpar tela
const cleanScreen = ()=>{
    const tasksContainer = document.querySelector(".tasks");
    
    while(tasksContainer.firstChild){
        tasksContainer.removeChild(tasksContainer.lastChild)
    }
}

// Checa quem sao e corta
function checkText(index) {
    let value = JSON.parse(localStorage.getItem(LocalStorageKey) || '[]')
    value[index].concluida = !value[index].concluida

    setTimeout(() => {
            value.splice(index, 1)
            localStorage.setItem(LocalStorageKey, JSON.stringify(value))
            insertItem()
    }, 600);

    localStorage.setItem(LocalStorageKey, JSON.stringify(value))

    insertItem()
}
// Lixeira
const trashActive = ()=>{
    const delet = document.querySelectorAll('.delet')
    const checked = document.querySelectorAll('#checked')
    const trash = document.querySelector('#trash-icon')

    trash.style.color == "red"? trash.style.color = "#6f6a6a" : trash.style.color = "red";
    
    for(const deletActiv of delet){
        deletActiv.classList.toggle('toggle-display')
    }
    for(const checkedOff of checked){
        checkedOff.classList.toggle('toggle-display')
    }
}
// Deletar
function deletText(index){
// nao esta funcionado
    console.log(index)
}

insertItem()

document.querySelector("#trash").addEventListener('click', trashActive)
document.querySelector(".add-button").addEventListener("click", createItem);

    