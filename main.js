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
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li class="complete">' + this.tasks[i].name + '</li>' + '<div class="close hidden"><i class="fa fa-times"></i></div>' + '</div>');
      } else {
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + this.tasks[i].name + '</li>' + '<div class="close hidden"><i class="fa fa-times"></i></div>' + '</div>');
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
    localStorage.setItem('tasks', JSON.stringify(todoApp.tasks));
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
      var parent = target.parentElement.parentElement;
      //access text of list item in front of .close div
      var text = parent.firstChild.innerHTML;
      todoApp.removeTask(text);
    }
  },
  clearCompleted: function () {
    var i = this.tasks.length;
    while (i--){
      if (this.tasks[i].completed === true){
        this.tasks.splice(i, 1);
      }
    }
    this.showTasks();
    document.querySelector('#active').parentElement.classList.remove('complete');
    document.querySelector('#completed').parentElement.classList.remove('complete');
    document.querySelector('#all').parentElement.classList.add('complete');
  },
  //showActive and showCompleted are repetitive, needs refactoring
  showActive: function () {
    var taskListEl = document.querySelector('.task-list');
    taskListEl.innerHTML = "";
    for (var i = 0; i < this.tasks.length; i++){
      if(this.tasks[i].completed === false){
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + this.tasks[i].name + '</li>' + '<div class="close hidden"><i class="fa fa-times"></i></div>' + '</div>');
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
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li class="complete">' + this.tasks[i].name + '</li>' + '<div class="close hidden"><i class="fa fa-times"></i></div>' + '</div>');
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
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li class="complete">' + storedTasks[i].name + '</li>' + '<div class="close hidden"><i class="fa fa-times"></i></div>' + '</div>');
      } else {
        taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + storedTasks[i].name + '</li>' + '<div class="close hidden"><i class="fa fa-times"></i></div>' + '</div>');
      }
    }
    this.addDeleteEvents();
    this.addClickEvents();
  },
  deleteAll : function () {
    this.tasks = [];
    this.showTasks();
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
  if (localStorage.getItem('tasks')){
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
    document.querySelector('#active').parentElement.classList.remove('complete');
    document.querySelector('#completed').parentElement.classList.remove('complete');
    event.target.parentElement.classList.add('complete');
  });

  var activeFilter = document.querySelector('#active');
  activeFilter.addEventListener('click', function () {
    todoApp.showActive();
    document.querySelector('#all').parentElement.classList.remove('complete');
    document.querySelector('#completed').parentElement.classList.remove('complete');
    event.target.parentElement.classList.add('complete');
  });

  var completedFilter = document.querySelector('#completed');
  completedFilter.addEventListener('click', function () {
    todoApp.showCompleted();
    document.querySelector('#all').parentElement.classList.remove('complete');
    document.querySelector('#active').parentElement.classList.remove('complete');
    event.target.parentElement.classList.add('complete');
  });

  var deleteAllFilter = document.querySelector('#delete');
  deleteAllFilter.addEventListener('click', function () {
    todoApp.deleteAll();
  })
});
