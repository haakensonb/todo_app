//todo Object
var todoApp = {
  tasks: [],
  addTask: function(task){
    this.tasks.push(new Task(task));
    this.showTasks();
  },
  removeTask: function(item) {
    var index = this.tasks.indexOf(item);
    this.tasks.splice(index, 1);
    this.showTasks();
  },
  showTasks: function() {
    /* show the name of each task
    for (var i = 0; i < this.tasks.length; i++){
      console.log(this.tasks[i].name);
    }*/
    //show as array of objects
    console.log(this.tasks);
  },
  toggleCompleted: function (obj) {
    if(this.tasks[obj].completed === false){
      this.tasks[obj].completed = true;
    } else if (this.tasks[obj].completed === true) {
      this.tasks[obj].completed = false;
    }
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

});
