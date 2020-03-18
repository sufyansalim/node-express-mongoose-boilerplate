const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const config = require("config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("jwtSecret");

module.exports = passport => {
  passport.use(
    "jwt",
    new JwtStrategy(opts, (payload, done) => {
       try{
       User.findById(payload.user.id).then(user=>{
          if(user){
              console.log('User found');
              done(null,user);
          }else{
              console.log('User not found');
              done(null,false)
          }
            });
        }catch(err){
            done(err);
        }
    })
  );
  
};



