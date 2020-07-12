const router = require('express').Router()
const Exercise = require('../models/exercise.model')
const User = require('../models/user.model')

router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const description = req.body.description
  const duration = Number(req.body.duration)
  const date = Date.parse(req.body.date)

  const newExercise = new Exercise({
    username: username,
    description: description,
    duration: duration,
    date,
  })
  newExercise
    .save()
    .then(() =>
      res.json(
        `New exercise with parameters: ${username},${description},${duration},${date} Added!!`
      )
    )
    .catch((err) => res.status(400).json(`ERROR!!! ${err}`))
})

router
  .route('/:id')
  .get((req, res) => {
    Exercise.findById(req.params.id)
      .then((exercises) => res.json(exercises))
      .catch((err) => res.status(400).json(`ERROR!! ${err}`))
  })
  .delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(res.json('Deleted successfully'))
      .catch((err) => res.status(400).json(`ERROR!! ${err}`))
  })
router.route('/update/:id').patch((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id, {
    ...req.body,
  })
    .then(res.json('Updated successfully'))
    .catch((err) => res.status(400).json(`ERROR!! ${err}`))
})

module.exports = router
