class userService{

    logUserIn(req, res){
        req.session.login = 'TestUser'
        req.session.employee = false
        req.session.userID = 1
        req.session.name = 'Marian'
        req.session.save()
        res.json({
            success : true
        })
    }

    logEmployeeIn(req, res){
        req.session.login = 'pracus3310'
        req.session.employee = true
        req.session.userID = 1
        req.session.name = "Wojciech"
        req.session.save()
        res.json({
            success : true
        })
    }

    loggedInData(req, res){
        if(req.session.login){
            res.json({
                isLoggedIn : true,
                name : req.session.name,
                isEmployee : req.session.employee
            })
        }
        else {
            res.json({
                isLoggedIn : false,
                name : null,
                isEmployee : false
            })
        }
        
    }
}

export default new userService