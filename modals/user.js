const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SALT_I = 10;

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    admin:{
        type: Boolean,
        required: true,
        default: false
    },
    token: {
        type:String,
    }
});

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
          reject(err);
        } else {
          resolve(isMatch);
        }
      });
    });
  };

  userSchema.methods.generateToken = function() {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  
    user.token = token;
    
    return user.save();
  };

  userSchema.statics.findByToken = function(token) {
    const user = this;
  
    const decode = jwt.verify(token, process.env.SECRET);
    return user.findOne({ '_id': decode, 'token': token });
  };



const User = mongoose.model('User', userSchema,'user');
module.exports = { User }