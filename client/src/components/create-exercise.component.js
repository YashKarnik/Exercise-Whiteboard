import React, { Component } from 'react'
import { Input } from 'reactstrap'
import axios from 'axios'

export default class createExercise extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      username: '',
      description: '',
      duration: '',
      date: '',
      users: [],
    }
  }

  componentDidMount() {
    console.log('Mounted')
    // this.setState({ users: ['test user', 'abc'] })
    // console.log(this.state.users)
    axios
      .get('/users')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  handleChange(evt) {
    const { name, value } = evt.target
    this.setState((p) => {
      return { ...p, [name]: value }
    })
    console.log(this.state)
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state)
    //Adding data to database
    axios
      .post('/exercises/add', { ...this.state })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`ERROR!! ${err}`))

    this.setState((p) => {
      return {
        username: p.username,
        description: '',
        duration: '',
        date: '',
        users: p.users,
      }
    })
    window.location.reload()
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <div className='form-group'>
            <select
              className='form-control'
              id='exampleFormControlSelect1'
              name='username'
              value={this.state.username}
              onChange={this.handleChange}>
              {this.state.users.map((user, index) => {
                return (
                  <option key={index} value={user}>
                    {user}
                  </option>
                )
              })}
            </select>
          </div>
          <hr />
          <Input
            placeholder='Description'
            name='description'
            type='text'
            value={this.state.description}
            onChange={this.handleChange}
          />
          <hr />
          <Input
            placeholder='Duration'
            name='duration'
            type='number'
            value={this.state.duration}
            onChange={this.handleChange}
          />
          <hr />
          <Input
            placeholder='Date'
            name='date'
            type='date'
            value={this.state.date}
            onChange={this.handleChange}
          />
          <hr />
          <input type='submit' value='Register' className='btn btn-primary' />
        </form>
      </div>
    )
  }
}
