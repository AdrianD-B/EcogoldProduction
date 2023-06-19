const { User } = require('../modals/user')

let authenticate = (req,res,next) => {
    let token = req.query.token
    console.log( token)
    
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.status(401).send({message: 'bad token'});
        req.data = user
        next()
    })
}

module.exports = {authenticate}