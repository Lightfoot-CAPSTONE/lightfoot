export default function Register(){
    //language=HTML
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <title>Register</title>
        </head>
        <body>
          <h1>Register! ONE OF US ONE OF US</h1>

          <form id="register-form">
            <label for="username">Username</label>
            <input id="username" name="username" type="text"/>
            <label for="email">Email</label>
            <input id="email" type="email" name="email">
            <label for="password">Password</label>
            <input id="password" name="password" type="password"/>
            <input id="register-btn" type="button" value="Register"/>
          </form>
        </body>
      </html>
    `;
}

export function RegisterEvent(){
    $(document).on('click', '#register-btn', function(e){
        const reqBody = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        }

        const options = {
            headers: {
                "Content-Type":"application/json"
            },
            method: 'POST',
            body: JSON.stringify(reqBody)
        }

        fetch("http://localhost:8080/api/users/create", options)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

    })
}