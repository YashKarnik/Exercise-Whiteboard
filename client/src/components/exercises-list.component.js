import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={'/edit/' + props.exercise._id}>Edit</Link> |{' '}
      <Link
        to='#'
        onClick={() => {
          props.deleteExerciseProp(props.exercise._id)
        }}>
        Delete
      </Link>
    </td>
  </tr>
)

export default class ExerciseList extends Component {
  constructor(props) {
    super(props)
    this.deleteExercise = this.deleteExercise.bind(this)
    this.state = { exercises: [] }
  }

  componentDidMount() {
    axios
      .get('/exercises')
      .then((res) => {
        this.setState({ exercises: res.data })
      })
      .catch((err) => console.log(`ERROR!! ${err}`))
    console.log(this.state.exercises)
  }

  deleteExercise(id) {
    axios
      .delete('/exercises/' + id)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => console.log(`ERROR!! ${err}`))

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((currentexercise) => {
              return (
                <Exercise
                  exercise={currentexercise}
                  deleteExerciseProp={this.deleteExercise}
                  key={currentexercise._id}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
