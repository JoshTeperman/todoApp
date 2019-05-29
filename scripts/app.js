// ======================================================================= //
// get app Data --> 
// ======================================================================= //

const getAllTasksData = () => {
  return taskList
}

const getCategoriesData = () => {
  let returnData = []
  taskList.forEach((task) => {
    task.tags.forEach((tag) => {
      if (!returnData.includes(tag)) {
        returnData.push(tag);
      }
    })
  })
  return returnData
}

// ======================================================================= //
// create DOM Elements --> 
// ======================================================================= //

const drawHomePage = () => {
  const title = document.createElement('h1')
  title.innerHTML = 'Task.'
  title.setAttribute('id', 'home-title')
  document.querySelector('.display').appendChild(title);
}

const createNewTask = (taskName) => {
  const newLi = document.createElement('li')
  newLi.innerHTML += `
  <p>${taskName}</p>
  <div class="task-buttons">
    <i class="fas fa-times delete"></i>
    <i class="fas fa-pen edit"></i>    
  </div>
  `
  createEditEvent(newLi);
  createDeleteEvent(newLi);
  return newLi
}

const drawTaskList = () => {
  const newTaskList = drawNewUl()
  taskList.forEach((object) => {
    let newTask = createNewTask(object.name);
    newTaskList.appendChild(newTask);
  })
  drawNewTaskButton()
}

const drawNewUl = () => {
  const newUl = document.createElement('ul');
  newUl.setAttribute('class', 'content-list');
  document.querySelector('.display').appendChild(newUl);
  return newUl
}

const drawNewTaskButton = () => {
  let buttonsDiv = document.createElement('div')
  buttonsDiv.setAttribute('id', 'task-list-buttons')
  let button = document.createElement('span')
  button.setAttribute('id', 'new-task-button')
  button.innerHTML = `<i class="fas fa-plus task-button"></i>`
  buttonsDiv.appendChild(button)
  document.querySelector('.display').appendChild(buttonsDiv)
}

const drawCategories = () => {
  const categoriesArray = getCategoriesData();
  const newList = drawNewUl();
  categoriesArray.forEach((tag) => {
    let newLi = document.createElement('li')
    const text = document.createTextNode(tag)
    newLi.appendChild(text)
    newList.appendChild(newLi);
  })
  document.querySelector('.display').appendChild(newList);
}

const drawCancelTaskButton = () => {
  const button = document.createElement('span')
  button.setAttribute('id', 'cancel-task-button')
  button.innerHTML = `<i class="fas fa-ban task-button"></i>`
  document.querySelector('#task-list-buttons').appendChild(button)
}

const drawSaveTaskButton = () => {
  const button = document.createElement('span')
  button.setAttribute('id', 'save-task-button')
  button.innerHTML = `<i class="fas fa-check task-button"></i>`
  document.querySelector('#task-list-buttons').appendChild(button)
}

const drawNewTaskForm = () => {
  const taskList = document.querySelector('.content-list');
  const form = document.createElement('input')
  form.className = "new-task-form"
  form.placeholder = "New Task..."
  taskList.appendChild(form);
}

// ======================================================================= //
// Events -->
// ======================================================================= //


const createNewTaskEvents = () => {
  document.querySelector('#new-task-button').addEventListener('click', () => {
    if (document.querySelector('.new-task-form') === null) {
      // Events activated after clicking New Task Button -->
      drawNewTaskForm();
      clickInsideFormEvent();
      drawCancelTaskButton();
      drawSaveTaskButton();
      cancelTaskEvent();
      newTaskEnterKeypressEvent();
      newTaskButtonClickEvent();
    }
  })
}

const clickInsideFormEvent = () => {
  const form = document.querySelector('.new-task-form')
  form.addEventListener('click', () => {
    form.placeholder = ""
  })
}

const cancelTaskEvent = () => {  
  const cancelButton = document.querySelector('#cancel-task-button')
  cancelButton.addEventListener('click', (event) => {
    document.querySelector('.new-task-form').remove();
    cancelButton.remove();
    document.querySelector('#save-task-button').remove()
  })
}

const newTaskEnterKeypressEvent = () => {
  const input = document.querySelector('input')
  input.addEventListener('keypress', (event) => {
    if (event.keyCode == 13 && input.value.length > 0) {
      const newTask = createNewTask(input.value)
      document.querySelector('.content-list').appendChild(newTask);
      input.remove();
      document.querySelector('#save-task-button').remove();
      document.querySelector('#cancel-task-button').remove();
    }
  })
}

const newTaskButtonClickEvent = () => {
  const input = document.querySelector('input')
  const button = document.querySelector('#save-task-button')

  button.addEventListener('click', () => {
    if (input.value.length > 0) {
      console.log('clicked')
      const newTask = createNewTask(input.value)
      document.querySelector('.content-list').appendChild(newTask);
      input.remove();
      document.querySelector('#save-task-button').remove();
      document.querySelector('#cancel-task-button').remove();
    }
  })
}

const createDeleteEvent = (task) => {
  const button = task.childNodes[3].childNodes[1]
  button.addEventListener('click', deleteTask)
}

const createEditEvent = (task) => {
  const button = task.childNodes[3].childNodes[3]
  button.addEventListener('click', editTask)
}

const createFilterEvents = () => {
  // code here
}

// ======================================================================= //
// Helper Methods --> 
// ======================================================================= //

const deleteTask = (event) => {
  const task = event.target.parentNode.parentNode;
  task.remove()
}

const editTask = (event) => {
  const task = event.target.parentNode.parentNode;
  const editedTask = prompt("Please edit your task", `${task.childNodes[1].innerHTML}`)
  const p = task.childNodes[1]
  if (editedTask !== null) {
    p.innerHTML = `${editedTask}` 
  }
}

const refreshPage = () => {
  document.querySelector('.content-list') ? document.querySelector('.content-list').remove() : null
  document.querySelector('#task-list-buttons') ? document.querySelector('#task-list-buttons').remove() : null
  document.querySelector('#save-task-button') ? document.querySelector('#save-task-button').remove() : null
  document.querySelector('#cancel-task-button') ? document.querySelector('#cancel-task-button').remove() : null
  document.querySelector('#home-title') ? document.querySelector('#home-title').remove() : null
}

const run = () => {
  // localStorage.clear()
  // localStorage.list = JSON.stringify(taskList)
  // console.log(JSON.parse(localStorage.list))

  // loadMenuEvents()

  // Click 'My Tasks' (View All Tasks)
  document.querySelector('#view-tasks').addEventListener('click', () => {
    refreshPage();
    drawTaskList();
    createNewTaskEvents();
    document.querySelector('.display').style.justifyContent = 'flex-start'
  })
  
  // Cick 'Categories' (View All Categories)
  document.querySelector('#view-categories').addEventListener('click', () => {
    refreshPage();
    drawCategories();
    // create category-event-listeners -->
    // createFilterEvents();
    document.querySelector('.display').style.justifyContent = 'flex-start'
  })
  
  // Click 'Home' (View Home Screen)
  document.querySelector('#home').addEventListener('click', () => {
    refreshPage();
    drawHomePage();
    document.querySelector('.display').style.justifyContent = 'center'
  })
}

