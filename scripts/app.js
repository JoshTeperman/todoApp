const allTasks = () => {
  return taskList
}

const categories = () => {
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

const drawHomePage = () => {
  const title = document.createElement('h1')
  title.innerHTML = 'Task.'
  title.setAttribute('id', 'home-title')
  document.querySelector('.display').appendChild(title);
}

const createNewTask = (taskName) => {
  // const newTask = new Task(value)
  const newLi = document.createElement('li')
  newLi.innerHTML += `
  <p>${taskName}</p>
  <div class="task-buttons">
    <i class="fas fa-times delete"></i>
    <i class="fas fa-pen edit"></i>    
  </div>
  `
  createEditEvents();
  createDeleteEvents();
  return newLi

}


const drawTaskList = (element) => {
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
  let button = document.createElement('span')
  button.setAttribute('id', 'new-task-button')
  button.innerHTML = `<i class="fas fa-plus task-button"></i>`
  document.querySelector('.display').appendChild(button)
}

const drawCategories = () => {
  const categoriesArray = categories();
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
  document.querySelector('.display').appendChild(button)
}

const drawSaveTaskButton = () => {
  const button = document.createElement('span')
  button.setAttribute('id', 'save-task-button')
  button.innerHTML = `<i class="fas fa-check task-button"></i>`
  document.querySelector('.display').appendChild(button)
}

const drawNewTaskForm = () => {
  const taskList = document.querySelector('.content-list');
  const form = document.createElement('input')
  form.className = "new-task-form"
  form.placeholder = "What's your new task?"
  taskList.appendChild(form);
}

// Click New Task Button (Create New Task Form)
const createNewTaskEvents = () => {

  // Click New Task Button -->
  document.querySelector('#new-task-button').addEventListener('click', (event) => {
    if (document.querySelector('.new-task-form') === null) {
      drawNewTaskForm();
      clickInsideFormEvent();
      drawCancelTaskButton();
      drawSaveTaskButton();
      cancelTaskEvent();
      newTaskEnterKeypressEvent();
      newTaskButtonClickEvent();
    }
  })

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
    console.log('early clicked')

    button.addEventListener('click', (event) => {
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

}

// create new create new (enter)
// add new task to list (keep form open)
// if click away then close form



// const button = document.getElementById('enter')
// const input = document.getElementById('userinput')
// const ul = document.querySelector('ul')

// const inputLength = () => {
//   return input.value.length;
// }

// const createListElement = () => {
//   let li = document.createElement('li');
//   li.appendChild(document.createTextNode(input.value))
//   ul.appendChild(li)
//   input.value = ""
// }

// const addListAfterClick = () => {
//   if (inputLength() > 0) {
//     createListElement()
//   }
// }

// const addListAfterEnter = (event) => {
//   if (inputLength() > 0 && event.keyCode == 13) {
//     createListElement()
//   }
// }

// button.addEventListener('click', addListAfterClick())
// input.addEventListener('keypress', addListAfterEnter(event))


const createDeleteEvents = () => {
  let deleteButton = document.querySelectorAll('.delete');
  deleteButton.forEach((node) => {
    node.addEventListener('click', (event) => {
      deleteTask(event);
    })
  })
}

const createEditEvents = () => {
  let editButton = document.querySelectorAll('.edit');
  editButton.forEach((node) => {
    node.addEventListener('click', (event) => {
      return editTask(task)
    })
  })
}

const createFilterEvents = () => {
  // code here
}

const deleteTask = (event) => {
  task = event.target.parentNode.parentNode;
  task.remove()
}

const editTask = (task) => {
  const editedTask = prompt("Please edit your task", `${task.childNodes[1].innerHTML}`)
  const p = task.childNodes[1]
  p.innerHTML = `${editedTask}`
}

const refreshPage = () => {
  document.querySelector('.content-list') ? document.querySelector('.content-list').remove() : null
  document.querySelector('#new-task-button') ? document.querySelector('#new-task-button').remove() : null
  document.querySelector('#save-task-button') ? document.querySelector('#save-task-button').remove() : null
  document.querySelector('#cancel-task-button') ? document.querySelector('#cancel-task-button').remove() : null
  document.querySelector('#home-title') ? document.querySelector('#home-title').remove() : null
}


const run = () => {
  localStorage.clear()
  localStorage.list = JSON.stringify(taskList)
  console.log(JSON.parse(localStorage.list))


  // --> event listeners:

  // Click 'My Tasks' (View All Tasks)
  let viewTasks = document.querySelector('#view-tasks');
  
  viewTasks.addEventListener('click', (event) => {
    const display = document.querySelector('.display');

    refreshPage();
    drawTaskList();

    // create task-event-listeners
    createDeleteEvents();
    createEditEvents();
    createNewTaskEvents();
    document.querySelector('.display').style.justifyContent = 'flex-start'
    
  })
  
  // Cick 'Categories' (View All Categories)
  let viewCategories = document.querySelector('#view-categories')  
  viewCategories.addEventListener('click', (event) => {
    const display = document.querySelector('.display')

    refreshPage();
    drawCategories();

    // create category-event-listeners -->
    // createFilterEvents();
    
    document.querySelector('.display').style.justifyContent = 'flex-start'
  })
  
  // Click 'Home' (View Home Screen)
  let home = document.querySelector('#home');
  home.addEventListener('click', (event) => {

    refreshPage();
    drawHomePage();

    document.querySelector('.display').style.justifyContent = 'center'
  })

}

// FORM:
// form.addEventListener('submit', function(e) {
//   e.preventDefault()

//   liMaker(input.value)
//   input.value = ''
// })

// display.removeChild('#home-title')
// display tasks
// click on 'Home'
// tasks.replaceChile(oldChild)

// newdivinnerhtml = `<class=classname> ${object.attributeName}`



/* <script type="text/javascript">
Using jQuery.

$(function() {
    $('form').each(function() {
        $(this).find('input').keypress(function(e) {
            Enter pressed?
            if(e.which == 10 || e.which == 13) {
                this.form.submit();
            }
        });

        $(this).find('input[type=submit]').hide();
    });
});
</script>


<form name="loginBox" target="#here" method="post">
    <input name="username" type="text" /><br />
    <input name="password" type="password" />
    <input type="submit" />
</form> */

// HTML
// <form>
//   <input class="submit_on_enter" type="text" name="q" placeholder="Search...">
// </form>

// JQUERY
// $(document).ready(function() {

// $('.submit_on_enter').keydown(function(event) {
//   // enter has keyCode = 13, change it if you want to use another button
//   if (event.keyCode == 13) {
//     this.form.submit();
//     return false;
//   }
// });

// });