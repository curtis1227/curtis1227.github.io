console.log("todo.js loaded");
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
var token;
var user;
var tasks = [];
//Get table from todo.html
todotb = $("#todo_table");
class Task {
  constructor(id, time, place, task) {
  	this.id = id;
    this.time = time;
    this.place = place;
    this.task = task;
  }
}
//Checks if a string is blank or null
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
//Checks input values for validity
function checkInput(){
	var valid = true;
	if(isBlank($("#input_time").val())) valid = false;
	if(isBlank($("#input_place").val())) valid = false;
	if(isBlank($("#input_task").val())) valid = false;
	return valid;
}
//Create a row for the todo table
function createRow(task){
	var row = $('<tr></tr>').appendTo(todotb);
	$('<td></td>').attr({class: "animated fadeInUp"}).text(task.time).appendTo(row);
	$('<td></td>').attr({class: "animated fadeInUp"}).text(task.place).appendTo(row);
	$('<td></td>').attr({class: "animated fadeInUp"}).text(task.task).appendTo(row);
	row.append("<td><input type='button' value='X' data-id=" + task.id + "></td>");
}
//Update database
function updateDatabase(){
	//index to put in database
	var index = 0;
	//iterate thru tasks
	for(var i = 0; i < tasks.length; i++){
		//if task wasn't deleted
		if(tasks[i].id != -1){
			console.log("updating task id " + tasks[i].id + " with new index " + index);
			database.ref('/todo/list/' + index).set({
			    time: tasks[i].time,
			    place: tasks[i].place,
			    task: tasks[i].task
			  });
			//incre database index
			index++;
		}
	}
	//update database size
	database.ref('/todo/size').set(index);
	// for(var i = index; i < tasks.length; i++){
	// 	console.log("removing out of scope index " + i);
	// 	database.ref('/todo/list/' + i).remove();
	// }
}

function loadTask(i){
	console.log("loading task " + i);
	//console.log("current tasks.length: " + tasks.length);
	//Fill task[i]
	database.ref('/todo/list/' + i).once('value').then(function(item) {
		tasks[i] = new Task(i, item.val().time, item.val().place, item.val().task);
	}).then(function(){
		//Create row
		createRow(tasks[i]);
		//Increment i and next load
		i++;
		if(i < tasks.length) loadTask(i);
	});
}

//Fill tasks with tasks from database
function loadTasks(){
	database.ref('/todo/size').once('value').then(function(todo_size) {
		tasks.length = todo_size.val();
		if(tasks.length > 0) loadTask(0);
		//NOTHING AFTER loadTask
	});
}

////INITIALIZE CODE////
//Overlay before loading
$("body").prepend("<div class=\"overlay\"></div>");
$(".overlay").css({
    "position": "absolute", 
    "width": $(document).width(), 
    "height": $(document).height(),
    "z-index": 99999, 
});
//Sign in with redirect
firebase.auth().signInWithRedirect(provider);

firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    token = result.credential.accessToken;
  }
  // The signed-in user info.
  user = result.user;
  //Remove overlay
  $(".overlay").remove();
});

//On new task creation
$("#input_button").click(function() {
	console.log("input detected");
	if(checkInput()) {
		//Add to tasks
		tasks.push(new Task(tasks.length,$("#input_time").val(),$("#input_place").val(),$("#input_task").val()));
		//Update database
		updateDatabase();
		//Create row
		createRow(tasks[tasks.length-1]);
	} else {
		alert("Invalid input");
	}
});

//On deletion
todotb.on('click', 'input[data-id]', function(){
	console.log("delete detected");
	//"Remove" from tasks
	tasks[$(this).attr("data-id")].id = -1;
	//Update database
	updateDatabase();
	//Delete row
	$(this).parents("tr:first")[0].remove();
});