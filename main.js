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
      taskListEl.insertAdjacentHTML('beforeend', '<div  class="task">' + '<li>' + this.tasks[i].name + '</li>' + '<div class="close hidden">X</div>' + '</div>');
    }
    //add click events after li are shown
    this.addDeleteEvents();
    this.addClickEvents();
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
  }
};

//Make Task object to be pushed into task array. Needed to be object to keep track of completion
function Task (name) {
  this.name = name;
  this.completed = false;
}


//document ready
document.addEventListener('DOMContentLoaded', function(){
  //run when enter key is pressed on input
  var newTaskEl = document.querySelector('.new-task');
  newTaskEl.addEventListener('keyup', function(e){
    if (e.keyCode == 13){
      todoApp.addTask(newTaskEl.value);
      newTaskEl.value = '';
    }
  });

});
