//////////// This is for Login form. ///////////////
const loginform = document.getElementById('login')

// When we hit submit call registerUser function
loginform.addEventListener('submit', loginUser)

async function loginUser(event) {
  // This will make sure that page will not refresh after submit.
  event.preventDefault()
  const password = document.getElementById('password').value
  
  // Posting the data to server
  const result = await fetch ('/change-password', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newpassword: password,
      token: localStorage.getItem('token') // Getting the JWT token from local storage for authorization.
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {
    // Everything is fine
    console.log('Got the token: ', result.data)
    alert('Password Changed')
    window.location.assign('../home/home.html')
  } else {
    alert(result.error)
  }
}