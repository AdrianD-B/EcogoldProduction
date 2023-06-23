const { User } = require('../modals/user')

let authenticate = (req, res, next) => {
    let token = req.query.token;
    console.log(token);
  
    User.findByToken(token)
      .then((user) => {
        if (!user) return res.status(401).send({ message: 'bad token' });
        req.data = user;
        next();
      })
      .catch((err) => {
        throw err;
      });
  };

module.exports = {authenticate}