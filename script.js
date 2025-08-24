// Add task button
// const add_btn = document.getElementById('add-btn')
// const add_task = document.getElementById('task-list')
// add_btn.addEventListener('click', ()=>{
//     const task = document.createElement('div')
//     task.className = 'task-info'
//     let taskName = prompt('Enter your task')
//     task.innerHTML = `<input type="checkbox" class="task-check">
//                       <span class="task-name">${taskName}</span>
//                       <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
//                       <button class="del-btn"><i class="fa-solid fa-trash"></i></button>`   
//     add_task.appendChild(task)

// const { createElement } = require("react")
//     // add_task.addEventListener('click',(e)=>{
//     //     if (e.target.classList.contains('del-btn')){
//     //         e.target.parentElement.remove()
//     //     }
//     // })
//     // every time we add, refresh the loop

//     // delete task
//     const del_btns = document.getElementsByClassName('del-btn')
//     for (let i = 0; i < del_btns.length; i++) {
//         del_btns[i].addEventListener('click', function() {
//             this.parentElement.remove()
//         })
//     }
//     // edit task
//     const edit_btn = document.getElementsByClassName('edit-btn')
//     for (let m = 0; m < edit_btn.length; m++) {
//         edit_btn[m].addEventListener('click', (e)=>{
//             const taskEdit = e.target.parentElement.querySelector('.task-name')
//             // add_btn.appendChild(taskEdit)
//             const newTask = prompt("edit your task: ", taskEdit.innerText)
//             if (newTask) {
//                 taskEdit.innerText = newTask
//             }
//         })
//     }
//     // checkbox button
//     const check_btn = document.getElementsByClassName('task-check')
//     for (let x = 0; x < check_btn.length; x++) {
//         check_btn[x].addEventListener('click', (e)=>{
//             const task_ck = e.target.parentElement.querySelector('.task-name')
//             // task_ck.innerHTML = `<s><span class="task-name">${taskName}</span></s>`
//             if (e.target.checked) {
//                 task_ck.style.textDecoration = 'line-through'
//             }
//             else{
//                 task_ck.style.textDecoration = 'none'
//             }
//         })
//     }
//     // show full task
//     const show_task = document.getElementsByClassName('task-list')
//     for (let s = 0; s < show_task.length; s++) {
//         show_task[s].addEventListener('click',()=>{
//             const click_task = document.querySelector('.task-name').innerText            
//         })
//     }
// })

// Add task button
const add_btn = document.getElementById('add-btn')
const add_task = document.getElementById('task-list')
function createTask(taskName){
    // input.className = 'input-task'
    // taskAddButton.className = 'enter-btn'
    const task = document.createElement('div')
    task.className = 'task-info'
    task.innerHTML = `<input type="checkbox" class="task-check">                   
                      <span class="task-name">${taskName}</span>
                      <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                      <button class="del-btn"><i class="fa-solid fa-trash"></i></button>`   
    add_task.appendChild(task)
    
    const del_btns = document.getElementsByClassName('del-btn')
    for (let i = 0; i < del_btns.length; i++) {
        del_btns[i].addEventListener('click', function() {
            this.parentElement.remove()
            saveTask()
        })
    }
    // edit task
    // const edit_btn = document.getElementsByClassName('edit-btn')
    // for (let m = 0; m < edit_btn.length; m++) {
    //     edit_btn[m].addEventListener('click', (e)=>{
    //         const taskEdit = e.target.parentElement.querySelector('.task-name')
    //         // add_btn.appendChild(taskEdit)
    //         const newTask = prompt("edit your task: ", taskEdit.innerText)
    //         if (newTask) {
    //             taskEdit.innerText = newTask
    //             saveTask()
    //         }
    //     })
    // }
    task.addEventListener('click', (e)=>{
        if (e.target.classList.contains('edit-btn')) {
            const taskDiv = e.target.closest('.task-info')
            const taskName = taskDiv.querySelector('.task-name')

            if (!taskDiv.querySelector('.edit-input')) {
                const currentTask = taskName.innerText
                const input = document.createElement('textarea')
                // input.type = 'textarea'
                input.value = currentTask
                input.className = 'edit-input'

                taskDiv.replaceChild(input, taskName)
                e.target.innerText = 'Save'
            }
            else{
                const input = taskDiv.querySelector('.edit-input')
                const newSpan = document.createElement('span')
                newSpan.className = 'task-name'
                newSpan.innerText = input.value
                taskDiv.replaceChild(newSpan, input)
                e.target.innerHTML = `<i class="fa-solid fa-pen"></i>`
                saveTask()
            }
        }
    })
    // checkbox button
    const check_btn = document.getElementsByClassName('task-check')
    for (let x = 0; x < check_btn.length; x++) {
        check_btn[x].addEventListener('click', (e)=>{
            const task_ck = e.target.parentElement.querySelector('.task-name')
            // task_ck.innerHTML = `<s><span class="task-name">${taskName}</span></s>`
            if (e.target.checked) {
                task_ck.style.textDecoration = 'line-through'
            }
            else{
                task_ck.style.textDecoration = 'none'
            }
        })
    }
    // show full task
    const show_task = document.getElementsByClassName('task-list')
    for (let s = 0; s < show_task.length; s++) {
        show_task[s].addEventListener('click',()=>{
            const click_task = document.querySelector('.task-name').innerText            
        })
    }
}
// const space = document.querySelector('.task-list')
add_btn.addEventListener('click', () => {
    const input = document.createElement('textarea');
    input.className= 'input-task'
    const taskAddButton = document.createElement('button');
    taskAddButton.className = 'input-btn'
    // input.type = 'textarea';
    input.placeholder = 'Enter your task....';
    taskAddButton.textContent = 'ADD';
    
    // put input + button inside main container right away
    const mainContainer = document.querySelector('.main');
    mainContainer.prepend(input);
    mainContainer.appendChild(taskAddButton);

    // now handle task creation when Ok is clicked
    taskAddButton.addEventListener('click', () => {
        let taskName = input.value.trim();
        if (taskName) {
            createTask(taskName);
            saveTask();
            input.value = '';
        }
        
        input.remove()
        taskAddButton.remove()
    });
});

// save task
function saveTask(){
    const tasks = []
    document.querySelectorAll('.task-name').forEach(task =>{
        tasks.push(task.textContent)
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// load task
window.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(taskName => {
        createTask(taskName)
    });
});
