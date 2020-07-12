const router = require('express').Router()
const User = require('../models/user.model')

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})

router.route('/add').post((req, res) => {
  //   const username = req.body.username
  const newUser = new User({ username: req.body.username })
  newUser
    .save()
    .then(() => res.json(`New User with username ${req.body.username} added!!`))
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})

router
  .route('/:id')
  .get((req, res) => {
    User.findById(req.params.id)
      .then((exercises) => res.json(exercises))
      .catch((err) => res.status(400).json(`ERROR!! ${err}`))
  })
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(res.json('Deleted successfully'))
      .catch((err) => res.status(400).json(`ERROR!! ${err}`))
  })
module.exports = router
