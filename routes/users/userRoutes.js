const express = require('express');
const router = express.Router();
const passport = require('passport')

const {
  register
} = require('./controllers/userController')

const {
  userValidation
} = require('./utils/userValidation')


router.get('/',(req, res, next)=> {
  res.send('respond with a resource');
});

router.get('/login', (req,res) => {
  if(req.isAuthenticated())res.redirect('/')
  return res.render('auth/login', {errors: req.flash('errors')})
})

router.get('/register', (req,res,next) => {
  return res.render('auth/register', {errors: req.flash('errors')})
})

router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/api/users/login',
    failureFlash: true
  })
)
router.post('/register', userValidation,register)

router.get('/profile', (req,res,next) => {
  if(req.isAuthenticated()){
    return res.render('auth/profile')
  }
  return res.redirect('/api/users/login')
})

module.exports = router;
