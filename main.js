//get tasks from previous session
var storedTasks = JSON.parse(localStorage.getItem('tasks'));
//todo Object
var todoApp = {
  tasks: [],
  addTask: function(task){
    this.tasks.push(new Task(task));
    this.showTasks();
  },
  removeTask: function(item) {
    for (var i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].name == item){
        this.tasks.splice(i, 1);
      }
    }

    this.showTasks();
  },
  showTasks: function() {
    var taskListEl = document.querySelector('.task-list');
    taskListEl.innerHTML = "";
    for (var i = 0; i < this.tasks.length; i++){
      //if completed render with css class to visualize, otherwise render without class
      if(this.tasks[i].completed === true){
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li class="complete">' + this.tasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
      } else {
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + this.tasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
      }
    }
    //add click events after li are shown
    this.addDeleteEvents();
    this.addClickEvents();
    localStorage.setItem('tasks', JSON.stringify(todoApp.tasks));
  },
  toggleCompleted: function (obj) {
    if(this.tasks[obj].completed === false){
      this.tasks[obj].completed = true;
    } else if (this.tasks[obj].completed === true) {
      this.tasks[obj].completed = false;
    }
    //toggle css class to show change
    event.target.classList.toggle('complete');
  },
  addClickEvents: function () {
    var taskEl = document.querySelectorAll('.task');
    for (var i = 0; i < taskEl.length; i++){
      taskEl[i].addEventListener('click', myClickEvent);
    }
    function myClickEvent () {
      //get text from li clicked
      var myTarget = event.target.innerHTML;
      //loop through tasks and if the name matches the li then toggleCompleted on that Task
      for (var i = 0; i < taskEl.length; i++){
        //dont check for target matching if task no longer exists
        if (todoApp.tasks[i] !== undefined && todoApp.tasks[i].name == myTarget){
          todoApp.toggleCompleted(i);
        }
      }
    }
  },
  addDeleteEvents: function () {
    var closeEl = document.querySelectorAll('.close');
    for (var i = 0; i < closeEl.length; i++){
      closeEl[i].addEventListener('click', myDeleteEvent);
    }

    function myDeleteEvent () {
      var target = event.target;
      var parent = target.parentElement;
      //access text of list item in front of .close div
      var text = parent.firstChild.innerHTML;
      todoApp.removeTask(text);
    }
  },
  clearCompleted: function () {
    for (var i = 0; i < this.tasks.length; i++){
      if (this.tasks[i].completed === true){
        this.tasks.splice(i, 1);
      }
    }
    this.showTasks();
  },
  //showActive and showCompleted are repetitive, needs refactoring
  showActive: function () {
    var taskListEl = document.querySelector('.task-list');
    taskListEl.innerHTML = "";
    for (var i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].completed === false){
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + this.tasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
      }
    }
    this.addDeleteEvents();
    this.addClickEvents();
  },
  showCompleted: function () {
    var taskListEl = document.querySelector('.task-list');
    taskListEl.innerHTML = "";
    for (var i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].completed === true){
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li class="complete">' + this.tasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
      }
    }
    this.addDeleteEvents();
    this.addClickEvents();
  },
  showStored: function () {
    var taskListEl = document.querySelector('.task-list');
    taskListEl.innerHTML = "";
    for (var i = 0; i < storedTasks.length; i++){
      //if completed render with css class to visualize, otherwise render without class
      if(storedTasks[i].completed === true){
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li class="complete">' + storedTasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
      } else {
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + storedTasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
      }
    }
    this.addDeleteEvents();
    this.addClickEvents();
  }
};

//Make Task object to be pushed into task array. Needed to be object to keep track of completion
function Task (name) {
  this.name = name;
  this.completed = false;
}


//document ready
document.addEventListener('DOMContentLoaded', function(){
  //check if there were tasks from previus session and use them
  if (storedTasks !== undefined){
    todoApp.tasks = storedTasks;
    todoApp.showStored();
  }
  //run when enter key is pressed on input
  var newTaskEl = document.querySelector('.new-task');
  newTaskEl.addEventListener('keyup', function(e){
    if (e.keyCode == 13){
      var trimTask = newTaskEl.value.trim();
      todoApp.addTask(trimTask);
      newTaskEl.value = '';
    }
  });

  var clearBtn = document.querySelector('#clear-btn');
  clearBtn.addEventListener('click', function () {
    todoApp.clearCompleted();
  });

  var allFilter = document.querySelector('#all');
  allFilter.addEventListener('click', function () {
    todoApp.showTasks();
  });

  var activeFilter = document.querySelector('#active');
  activeFilter.addEventListener('click', function () {
    todoApp.showActive();
  });

  var completedFilter = document.querySelector('#completed');
  completedFilter.addEventListener('click', function () {
    todoApp.showCompleted();
  });

});
