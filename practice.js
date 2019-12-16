let req ={
    body: {
        user:{
            username:'username@email.com',
            password:'MyNewPassword'
        }
    }
}

console.log(req.body.user.username);