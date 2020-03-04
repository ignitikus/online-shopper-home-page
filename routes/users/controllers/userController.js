const User = require('../models/User')
const {validationResult} = require('express-validator')
const faker = require('faker')

module.exports = {
   register:(req,res,next) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})
      User.findOne({email:req.body.email }).then(user=>{
         if(user) {
            return res.render('auth/register', {errors: 'User already exists'})
            // req.flash('errors', 'User already exists')
         }

         const newUser = new User
         newUser.profile.name = req.body.name
         newUser.profile.picture = faker.image.avatar()
         newUser.email = req.body.email
         newUser.password = req.body.password


         newUser.save().then(user=>{
            if(user) return req.login(user, (err) => {
               if(err) return res.status(400).json({confirmation: false, message: err})
               return res.redirect('/')
            })
         }).catch(err=> next(err))
      }).catch(err=> next(err))
   },
   
   // register: async(req,res,next) => {
   //    const errors = validationResult(req)
   //    if(!errors.isEmpty()) return res.status(422).json({errors: errors.array()})

   //    let user = await User.findOne({email: req.body.email})
   //    try {
   //       if(user) return res.status(500).json({message:'User already exists'})

   //       user = await User.create({
   //          ['profile.name']: req.body.name,
   //          email: req.body.email,
   //          password: req.body.password
   //       })
   //       return res.json({message:'Success', user})
   //    } catch (error) {
   //       return next(error)
   //    }
   // }
   
}