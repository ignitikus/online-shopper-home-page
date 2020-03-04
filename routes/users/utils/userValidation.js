const {check} = require('express-validator')

module.exports = {
   userValidation: [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').isLength({min: 3})
   ]

}
