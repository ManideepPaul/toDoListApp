//////////// This is for Login form. ///////////////
const loginform = document.getElementById('login')

// When we hit submit call registerUser function
loginform.addEventListener('submit', loginUser)

async function loginUser(event) {
  // This will make sure that page will not refresh after submit.
  event.preventDefault()
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  
  // Posting the data to server
  const result = await fetch ('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())
  
  if (result.status === 'ok') {
    console.log('Got the token: ', result.data)
    
    // Setting the JWT token in local storage.
    localStorage.setItem('token', result.data)
    alert('Login Done')
    window.location.assign('../home/home.html')
  } else {
    alert(result.error)
  }
}