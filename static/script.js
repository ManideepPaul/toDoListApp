button = document.querySelector(".addBtn");
content = document.querySelector(".add");


//event Listener for enter key

content.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    return push();
  }
});

// Function to enter the ToDO work and to delete. But If the input is empty then throw an alert.

function push() {

// Alert statement

  if (content.value.length == 0) {
    alert("Type content to add");
  } else {

// ToDo input code

    document.querySelector("#tasks").innerHTML += `
        <div class="task">
        <span id="taskname">
        ${document.querySelector(".addTask input").value}
        </span>
        <button class="delete" >
        <i class="fa fa-trash"></i>
        </button>
        </div>
        `;
    
    document.querySelector(".addTask input").value = " ";

// Delete Todo code

    allTask = document.querySelectorAll(".delete");
    // console.log(allTask)
    for (i = 0; i < allTask.length; i++) {
      //   console.log(allTask[i]);
      allTask[i].onclick = function () {
        this.parentNode.remove();
      };
    }
  }
}
