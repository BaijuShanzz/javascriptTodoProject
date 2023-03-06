// take the input,button,ul elements in a variable
let todoInput = document.getElementById("todo-input");
let addBtn = document.getElementById("add-btn");
let todoItemsList = document.getElementById("todo-items-list");
let todoInputData; // set the inputing data assign vlaue globally

let todoInputArray = []; // create an empty array to push the input box value 

// set a local storange and put in to data to the local storange 
function setLocalStorage(){
  localStorage.setItem("todoInput", JSON.stringify(todoInputArray));
}

// take the local storage data and displying it 
function getLocalStorage(){
  if(localStorage.getItem("todoInput")){
    todoInputArray = JSON.parse(localStorage.getItem("todoInput"));   
    buildUI();
  }
}

function buildUI(){
  todoItemsList.textContent="";
  todoInputArray.forEach((item)=>{
    let li = document.createElement("li");
    let spanEl = document.createElement('span');
    li.appendChild(spanEl);
    spanEl.innerText = item;
    // set a style in the item add in list 
    li.style.cssText = "animation-name : slideIn";
    todoInput.value = ""; // reset the value input box empty
    todoInput.focus(); // the cursor point will set still there 
    todoItemsList.appendChild(li); // set the input items to the list li element
  
    // create a trasn button to deletting the items
    let trashBtn = document.createElement("i");
    trashBtn.classList.add("fa-solid", "fa-trash");
    li.appendChild(trashBtn);
    
    //create a edit button  to edit the values
    let editBtn = document.createElement("i");
    editBtn.classList.add("fa-solid", "fa-pen-to-square")
    li.appendChild(editBtn);
  });

}

//entering vlauel taking function
addTodoItems = () => {
  todoInputData = todoInput.value;
  todoInputArray.push(todoInputData);
  console.log(todoInputArray);
  setLocalStorage()
  getLocalStorage()
  
};

// delete items list function
deleteItems = (event) => {
  if (event.target.classList[1] === "fa-trash") {
    let item = event.target.parentElement;
    item.classList.add("slideOut");
    item.addEventListener("transitionend", () => {
      item.remove();
    });
  }
};


//edit items list function
editItems = (event) =>{

if (event.target.classList[1] === "fa-pen-to-square") {
  // set a box to enter the editing value 
  let editedValue = prompt("Entere new value ");
  
  // it take the where is our clicking that portion parentelement will take it
  let item = event.target.parentElement;

  // to select the list in side the element span 
  let spanEl = item.querySelector("span");
  spanEl.innerHTML = editedValue;
 }
}


// evetnt listner to set the button
addBtn.addEventListener("click", addTodoItems);

// add a event listner to the list element li and inside the button delete and edit
todoItemsList.addEventListener("click", deleteItems);
todoItemsList.addEventListener("click", editItems);

// calling get localstorage 
getLocalStorage()