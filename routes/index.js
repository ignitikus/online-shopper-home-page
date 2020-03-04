const express = require('express');
const router = express.Router();

const {products} = require('../lib/loader')

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('main/home', {products});
});

router.get('/logout', (req,res,next) => {
  req.logout()
  req.session.destroy()
  return res.redirect('/')
})

module.exports = router;
