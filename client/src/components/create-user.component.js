import React, { Component } from 'react'
import { Input } from 'reactstrap'
import axios from 'axios'
export default class createUser extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      username: '',
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target
    this.setState((p) => {
      return { ...p, [name]: value }
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    axios
      .post('/users/add', { ...this.state })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(`ERROR!! ${err}`))
    this.setState((p) => {
      return { username: '' }
    })

    console.log('done')
    window.location.href = '/'
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete='off'>
        <Input
          placeholder='Username'
          name='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <hr />
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
    )
  }
}
