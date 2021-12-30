button = document.querySelector(".addBtn");
content = document.querySelector(".add");


//event Listener for enter key

content.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    push();
  }
});

// Function to enter the ToDO work and to delete. But If the input is empty then throw an alert.

function push() {
  
  // Alert statement
  
  if (content.value.length == 0) {
    alert("Type content to add");
    }
  }

  async function reload() {
    const record = await fetch ('/tasks')
    .then( res => res.json());
    record.forEach(({task, id}) => {
      document.getElementById('tasks').innerHTML += `
      <form action="/delete" method="post">
      <div class="task">
      <input type="hidden" name="id" value="${id}"/>
      <span class="taskname">
      ${task}
      </span>
      <button class="delete" type="submit">
      <i class="fa fa-trash"></i>
      </button>
      </div>
      </form>
      `  
    });
  }

  reload()
