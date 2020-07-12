import React, { Component } from 'react'
import { Input } from 'reactstrap'
import axios from 'axios'

export default class editExercise extends Component {
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
    axios
      .get('/exercises/' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: response.data.date,
        })
      })
      .catch(function (error) {
        console.log(error)
      })

    axios
      .get('/users/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
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
  }
  handleSubmit(e) {
    e.preventDefault()
    axios
      .patch('/exercises/update/' + this.props.match.params.id, {
        ...this.state,
      })
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
    console.log('DONE')
    window.location.href = '/'
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
          <input type='submit' value='Edit' className='btn btn-primary' />
        </form>
      </div>
    )
  }
}
