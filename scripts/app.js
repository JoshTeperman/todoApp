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


const drawTaskList = (element) => {
  const newTaskList = drawNewUl()
  taskList.forEach((object) => {
    let newLi = document.createElement('li')
    newLi.innerHTML += `
    <p>${object.name}</p>
    <div class="task-buttons">
      <i class="fas fa-times delete"></i>
      <i class="fas fa-pen edit"></i>    
    </div>
    `
    newTaskList.appendChild(newLi);
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
  let button = document.createElement('div')
  button.setAttribute('id', 'new-task-button')
  button.innerHTML = `<i class="fas fa-plus"></i>`
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


const createNewTaskEvents = () => {
  document.querySelector('#new-task-button').addEventListener('click', (event) => {
    let form = document.createElement('input')
    document.querySelector('.content-list').appendChild(form);
    // form.className = ""
  })
}

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
      task = event.target.parentNode.parentNode;
      parentNode = task.parentNode;
      deleteTask(task, parentNode)
    })
  })
}

const createEditEvents = () => {
  let editButton = document.querySelectorAll('.edit');
  editButton.forEach((node) => {
    node.addEventListener('click', (event) => {
      task = event.target.parentNode.parentNode;
      return editTask(task)
    })
  })
}

const createFilterEvents = () => {
  // code here
}

const deleteTask = (task, parentNode) => {
  parentNode.removeChild(task);
}

const editTask = (task) => {
  const editedTask = prompt("Please edit your task", `${task.childNodes[1].innerHTML}`)
  const p = task.childNodes[1]
  p.innerHTML = `${editedTask}`
}


const run = () => {
  localStorage.clear()
  localStorage.list = JSON.stringify(taskList)
  console.log(JSON.parse(localStorage.list))


  // --> event listeners:

  // view all tasks
  let viewTasks = document.querySelector('#view-tasks');
  
  viewTasks.addEventListener('click', (event) => {
    const display = document.querySelector('.display');

    // re-populate the page -->
    document.querySelector('.content-list') ? document.querySelector('.content-list').remove() : null
    document.querySelector('#new-task-button') ? document.querySelector('#new-task-button').remove() : null
    document.querySelector('#hello') ? document.querySelector('#hello').remove() : null
    drawTaskList();

    // create task-event-listeners
    createDeleteEvents();
    createEditEvents();
    createNewTaskEvents();
    document.querySelector('.display').style.justifyContent = 'flex-start'
    
  })
  
  // view all categories
  let viewCategories = document.querySelector('#view-categories')  
  viewCategories.addEventListener('click', (event) => {
    const display = document.querySelector('.display')

    // re-populate the page -->
    document.querySelector('.content-list') ? document.querySelector('.content-list').remove() : null
    document.querySelector('#new-task-button') ? document.querySelector('#new-task-button').remove() : null
    document.querySelector('#hello') ? document.querySelector('#hello').remove() : null
    drawCategories()

    // create task-event-listeners -->
    // createFilterEvents();
    
    document.querySelector('.display').style.justifyContent = 'flex-start'




  })
  
  // view home
  let home = document.querySelector('#home');
  home.addEventListener('click', (event) => {
    // repopulate the page -->
    document.querySelector('.content-list') ? document.querySelector('.content-list').remove() : null
    document.querySelector('#new-task-button') ? document.querySelector('#new-task-button').remove() : null
    document.querySelector('#hello') ? document.querySelector('#hello').remove() : null

    let hello = document.createElement('h1')
    hello.textContent = 'Hello.'
    hello.setAttribute('id', 'hello')
    const display = document.querySelector('.display')
    if (document.querySelector('.content-list')) {
      const currentContent = document.querySelector('.content-list') 
      console.log(currentContent)
      display.replaceChild(hello, currentContent)
    }
    document.querySelector('.display').style.justifyContent = 'center'
  })

}

// FORM:
// form.addEventListener('submit', function(e) {
//   e.preventDefault()

//   liMaker(input.value)
//   input.value = ''
// })

// display.removeChild('#hello')
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

