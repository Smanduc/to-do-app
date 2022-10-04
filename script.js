//crearevariabile pt a retine doto
let toDoList = [
    {
        id: 1,
        name: "Citesc 25 de pagini",
        isDone: true,
    },
    {
        id: 2,
        name: "Sport 30 minute",
        isDone: true,
    },
    {
        id: 3,
        name: "Beau 3 litri de apa",
        isDone: false,
    },
    {
        id: 4,
        name: "Beau 3 litri de apa",
        isDone: false,
    }
]
let currentId = toDoList.length


//creare funct care afiiseaza datele dn aplicatie (lista de todos)
function displayToDoList() {
    //parcurgem lita de todo uri

    for (let i = 0; i < toDoList.length; i++) {
        //pt fiecare obiect todo din lista cream un li cu div care contine proprietatea name si un div cu butoanele done si delete
        //pt fiecare element html creat il appenduim parintelui din html (li)
        // $("#list-group").append(toDoList[i])
        insertToDoInList(toDoList[i])
    }
}

function insertToDoInList(toDo) {
    //cream un div in care punem numele totoului si unul pt butoane
    //cream li care contine div-urile
    //cream var nameDiv (a creat un elem div si assignat unei variabile)
    //pt numele div
    let nameDiv = $("<div></div>").text(toDo.name)
    //am creatn elem div pt butoane
    let buttonDiv = $("<div></div>")
    //cream 2 butoane unul pt done unul pt delete
    //adaugare event listener pe butonul done daca e facut
    let doneButton = $(`<button onclick="markDoneToDo(this, ${toDo.id})">Done</button>`)
    if (toDo.isDone) { //dca todo is done, butonul trebuie sa fie undone si scrisul sa fie taiat
        doneButton.text("Undone")
        nameDiv.addClass("text-decoration-line-through text color-black")
    }

    doneButton.addClass("btn btn-success mx-2")
    // let age = 10
    // console.log("Ana are: "+ age + " ani")
    // console.log("Ana are: age ani")
    //adaugare event list pe buton delete
    let deleteButton = $(`<button onclick="deleteToDo(this, ${toDo.id})">Delete</button>`)
    // let deleteButton = $('<button onclick="deleteToDo(this, toDo.id)">Delete</button>')
    deleteButton.addClass("btn btn-danger mx-2")
    // deleteButton.click(deleteToDo)
    //append lui buttonDiv cele 2 butoane
    buttonDiv.append(doneButton)
    buttonDiv.append(deleteButton)
    //cream un li care cintine divurile
    let liTodo = $("<li></li>")
    liTodo.addClass("list-group-item my-2 border rounded border-primary d-flex justify-content-between")
    liTodo.append(nameDiv)
    liTodo.append(buttonDiv)
    //selectam ul dupa id si appenduim
    $("#list-group-id").append(liTodo)
}

displayToDoList();
//adaugam event listener pt butonul add


//creare functie care sa adauge valoarea din input inlista
function addToDo() { // extragem valoarea (numele todoului) din input
    let inputVal = $("#input-todo").val();
    //adaugam todoul in arrayul toDoList
    //cream obietul to do
    let toDo = {name: inputVal, isDone: false, id: ++currentId}
    //i++ vs - prima data folsoeste valoarea si apoi o incrementeaza
    // ++i - prima data incrementeaza valoarea si apoi foloseste valoarea incrementata
    //i=2
    //console.log(i++) //afiseaza 2 - apoi i va fi 3
    //i = 2
    //console.log(++i) //afiseaza 3
    toDoList[toDoList.length] = toDo;

    // let arr = [1,2,3,4,5]
    // arr[0]
    // arr[2] = 7
    // arr.length //lungimea arrayului (nr elem)
    // arr[arr.length-1] //accesam ult elem din array
    // arr[arr.length] = 8//adaugam elem nou in array

    //afisam todoul in lista de toDo in html
    insertToDoInList(toDo)
}


//functie care marcheaza done/undone  (linie taiata peste scris)
function markDoneToDo(buttonEl, todoId) {
    let li = buttonEl.parentNode.parentNode
    let div = li.first()
    let todoIndex = getToDoIndexById(todoId)
    if (toDoList[todoIndex].isDone) {
        div.removeClass("text-decoration-line-through")
        toDoList[todoIndex].isDone = false
        buttonEl.text("Undone")
    } else {
        div.addClass("text-decoration-line-through")
        toDoList[todoIndex].isDone = true
        buttonEl.text("Undone")
    }

    // toDoList[todoIndex].isDone = !toDoList[todoIndex].isDone
    // displayToDoList()
}


//creare functie care sterge to do ul

function deleteToDo(buttonEl, todoId) {
    // var li pe care o initializam cu parintii buttonEl (scopul initializarii cu parintii este pentru a ajunge la li)

    let li = buttonEl.parentNode.parentNode
//stergem li

    //stergem todo din array
    //gasim todo dupa nume si creem o noua variabila let toDoName prin care ajungem la nume
    // let toDoName = li.children(" :first").val() // li: nth-child(1) // ${div:first-child"}
    li.remove()

    //trebuie sa gasim indexul dupa numele extras
    // let toDoIndex = getToDoIndexByName(toDoName) //parametri actuali
    //stegerm yodo-ul de la idnexul gasit
    let todoIndex = getToDoIndexById(todoId)
    removeTodoByIndex(todoIndex)
}

function removeTodoByIndex(todoIndex) {
    //stegerea element din array => shiftarea elementelor spre stanga cu cate o pozitie
    for (let i = todoIndex; i < toDoList.length - 1; i++) {
        toDoList[i] = toDoList[i + 1]
    }
    toDoList.length--
}

//functie care cauta todoul in lista dupa nume si returneazxa idnexul todoului gasit
function getToDoIndexByName(name) {
    //parametri formali
    //aprcurgem lista de todo-uri
    for (let i = 0; i < toDoList.length; i++) {
        //cautam todoul cu numele "name"

        if (name == toDoList[i].name) {
            return i;
        }
    }
}

function getToDoIndexById(id) {
    //parametri formali
    //aprcurgem lista de todo-uri
    for (let i = 0; i < toDoList.length; i++) {
        //cautam todoul cu numele "name"

        if (id == toDoList[i].id) {
            return i;
        }
    }
}


