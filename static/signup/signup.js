// Function to enter the ToDO work and to delete. But If the input is empty then throw an alert.



//////////// This is for Sign Up form. ///////////////
const signupform = document.getElementById('signup')

// When we hit submit call registerUser function
signupform.addEventListener('submit', registerUser)

async function registerUser(event) {
  // This will make sure that page will not refresh after submit.
  event.preventDefault()
  const name = document.getElementById('name').value
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  
  // Posting the data to server
  const result = await fetch ('/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      username,
      password
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // Everything is fine
    alert('User Registered')
    window.location.assign('../home/home.html')
  } else {
    alert(result.error)
  }
}





