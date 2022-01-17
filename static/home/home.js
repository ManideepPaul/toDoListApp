
const addTask = document.getElementById('addTask');

addTask.addEventListener('submit', tasks)


async function tasks(event) {
  // event.preventDefault()
  
  const task = document.getElementById('task').value
  if (task.length == 0) {
    alert("Type content to add");
  }

  const result = await fetch ('/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      task,
      token: localStorage.getItem('token')
    })
  }).then((res) => res.json())

}

const logout = document.getElementById('logOut')
logout.addEventListener('click', remove);

function remove () {
  localStorage.clear();
  window.location.assign('../login/login.html')
}
 

  
  // Getting content from database to display on home page.
    async function reload() {
      const record = await fetch ('/tasks')
      .then( res => res.json());
      record.forEach(({task, _id,}) => {
        document.getElementById('tasks').innerHTML += `
        <form action="/delete" method="post">
        <div class="task">
        <input type="hidden" name="_id" value="${_id}"/>
        <span class="taskname">
        ${task}
        </span>
        <button class="delete" type="submit">
        <i class="fa fa-trash"></i>
        </button>
        </div>
        </form>      `  
      });
    }
    
    // async function verify() {
    //   const userRec = await fetch ('/login')
    //   .then( res => res.json());
    //   console.log(userRec[0].username)
    // }
    
    reload()