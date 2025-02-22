const taskInputField = document.getElementById('taskInput')
const taskAddButton = document.getElementById('taskAddButton')
const inputFilter = document.getElementById("inputFilter")
const clearButton = document.getElementById("clearButton")

inputFilter.addEventListener('input', () => {
   searchItem()
}) 

function newItem(text){
    return `
    <li class=" item-todo list-group-item bg-my-dark d-flex align-items-center px-3 mb-3 mb-md-2 position-relative">
      <div class="d-flex align-items-center ms-2">
        <input class="form-check-input" type="checkbox">
        <label class="content form-check-label text-break ps-3 pe-5 task-description">${text}</label>
        <i class="fa-solid fa-trash deleteIcon"></i>
        <i class="fa-solid fa-pen-to-square editIcon"></i>
        <i class="fa-solid fa-check confirmIcon d-none"></i>
      </div>
    </li>

            `
}

function addItem(){
    const taskInputFieldValue = String(taskInputField.value)
    const taskList = document.getElementById('taskList')
    taskList.innerHTML += newItem(taskInputFieldValue)
}

function registerItem() {

    if (taskInputField.value == ''){
        
     } else {
        addItem()
        deleteItem()
        markCheckbox()
        editItem()
        taskInputField.value = ''
    }
    
    searchItem()

}

function deleteItem(){
    let thrashIcon = Array.from(document.querySelectorAll('.deleteIcon'))

    thrashIcon.forEach((element, index) => {
        element.onclick = () => {
            let elementParent = thrashIcon[index].parentElement
            let divParentElement = elementParent.parentElement
            divParentElement.remove()
        }
    })
}

function editItem(){
    let editIcons = Array.from(document.getElementsByClassName("editIcon"))

    editIcons.forEach(element => {
        element.onclick = () => {
            let parent = element.parentElement
            let confirmIcon = parent.getElementsByClassName("confirmIcon")[0]
            let label = parent.getElementsByClassName("content")[0]
            element.classList.add("d-none")
            confirmIcon.classList.remove("d-none")
            let content = label.textContent
            label.innerHTML = `<input value='${content}'>` 

            confirmIcon.onclick = () => {
                confirmIcon.classList.add("d-none")
                element.classList.remove("d-none")
                content = label.getElementsByTagName("input")[0].value
                label.innerHTML = content
            }
        }
    });

}

function markCheckbox(){
    let taskCheckBoxes = Array.from(document.querySelectorAll('.form-check-input'))
    taskCheckBoxes.forEach((element) => {

        element.onclick = () => {
            element.toggleAttribute('checked')

            const parent = element.parentElement
            const parenLi = parent.parentElement
            const taskDescription = parent.querySelector('.task-description')

            if (element.checked == true){
                taskDescription.classList.toggle('text-decoration-line-through')
                parenLi.classList.toggle('bg-success')
                parenLi.classList.toggle('text-light')  

            } else {
                taskDescription.classList.toggle('text-decoration-line-through')
                parenLi.classList.toggle('bg-success')
                parenLi.classList.toggle('text-light')  
            }
        }

    });
}

function searchItem(){
    const lis = document.getElementsByClassName('item-todo')
    const label = document.getElementsByClassName("content")
    const inputFilterValue = inputFilter.value

    for (let index = 0; index < lis.length; index++) {

        lis[index].classList.add("d-none")
        const labelContent = label[index].textContent

        if (labelContent.toLowerCase().includes(inputFilterValue.toLowerCase())){

            lis[index].classList.remove("d-none")

            label[index].innerHTML = labelContent.replace(new RegExp(`${inputFilterValue}`,"gi"),(match) => {
                return `<strong>${match}</strong>`

            })
        }

    }
}

taskInputField.addEventListener('keypress', function(event){
    if (event.key == 'Enter'){
        registerItem()
    }
})

clearButton.addEventListener("click", () => {
    inputFilter.value = ''
    const lis = document.getElementsByClassName('item-todo')

    for (let index = 0; index < lis.length; index++) {

        lis[index].classList.remove("d-none")
    }
})

taskAddButton.onclick = () => registerItem()