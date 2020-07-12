import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Exercise = (props) => (
  <tr>
    <td>{props.userProp.username}</td>
    <td>{props.userProp.createdAt.substring(0, 10)}</td>

    <td>
      <Link
        to='#'
        onClick={() => {
          props.deleteUserProp(props.userProp._id)
        }}>
        Delete
      </Link>
    </td>
  </tr>
)

export default class ExerciseList extends Component {
  constructor(props) {
    super(props)
    this.deleteUser = this.deleteUser.bind(this)
    this.state = { usersArr: [] }
  }

  componentDidMount() {
    axios
      .get('/users')
      .then((res) => {
        this.setState({ usersArr: res.data })
        console.log(res.data)
      })
      .catch((err) => console.log(`ERROR!! ${err}`))
  }

  deleteUser(id) {
    axios
      .delete('/users/' + id)
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => console.log(`ERROR!! ${err}`))

    this.setState({
      exercises: this.state.usersArr.filter((el) => el._id !== id),
    })
    window.location.reload()
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Username</th>
              <th>Created on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.usersArr.map((element) => {
              return (
                <Exercise
                  userProp={element}
                  deleteUserProp={this.deleteUser}
                  key={element._id}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
