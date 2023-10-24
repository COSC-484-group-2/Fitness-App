function editWeightLifting() {

    var parent = document.getElementById("WL-subsection-board");
    var total_deleteBtn = parent.getElementsByClassName("delete-btn");
    var total_subsection = parent.getElementsByClassName("subsection");
    for (i = 0;i< total_deleteBtn.length;i++) {
      total_deleteBtn[i].classList.toggle("hide");
      total_subsection[i].classList.toggle("subsection-on-edit");
    }
    var editParent = document.querySelector(".WL-section .edit-key");
    if(editParent.innerHTML == "Edit") {
      editParent.innerHTML = "Done";
    } else {
      editParent.innerHTML = "Edit";
    }
}

function editCalisthenics() {

  var parent = document.getElementById("CL-subsection-board");
  var total_deleteBtn = parent.getElementsByClassName("delete-btn");
  var total_subsection = parent.getElementsByClassName("subsection");
  for (i = 0;i< total_deleteBtn.length;i++) {
    total_deleteBtn[i].classList.toggle("hide");
    total_subsection[i].classList.toggle("subsection-on-edit");
  }
  var editParent = document.querySelector(".CL-section .edit-key");
    if(editParent.innerHTML == "Edit") {
      editParent.innerHTML = "Done";
    } else {
      editParent.innerHTML = "Edit";
    }
}

function editCardio() {

  var parent = document.getElementById("cardio-subsection-board");
  var total_deleteBtn = parent.getElementsByClassName("delete-btn");
  var total_subsection = parent.getElementsByClassName("subsection");
  for (i = 0;i< total_deleteBtn.length;i++) {
    total_deleteBtn[i].classList.toggle("hide");
    total_subsection[i].classList.toggle("subsection-on-edit");
  }
  var editParent = document.querySelector(".cardio-section .edit-key");
    if(editParent.innerHTML == "Edit") {
      editParent.innerHTML = "Done";
    } else {
      editParent.innerHTML = "Edit";
    }
}

function startWorkout(startElement) {

  var workoutElement = startElement.parentNode; 
  console.log(workoutElement);
  var total_workoutElements = document.getElementsByClassName("subsection");
  for (i = 0;i < total_workoutElements.length;i++) {
    if(total_workoutElements[i].isEqualNode(workoutElement)) {
      workoutElement.classList.replace("subsection", "active-subsection");
    }
      total_workoutElements[i].classList.add("hide");
  }
}

