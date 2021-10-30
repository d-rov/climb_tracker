import React from 'react'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  state = {
    connect: null,
    data: [],
    inputName: '',
    climbName: '',
    climbType: '',
    climbGrade: ''
  }

  // initial test call
  // good example of axios .get() call
  callBackendAPI = async () => {
    await axios.get('/express_backend')
      .then(response => {this.setState({ connect: response.data.express })})
  }

  // makes an axios .get() request with this.state.name
  getByName = async (event) => {
    event.preventDefault()
    const byName = this.state.inputName
    this.setState({ inputName: '' })
    await axios.get(`/names/?name=${byName}`)
      .then(res => {
        let list = [...this.state.data, res.data]
        this.setState({ data: list })
      })
  }

  // axios POST call
  // adds a new climb to the db
  addAClimb = (event) => {
    event.preventDefault()
    const newClimb = {
      name: this.state.climbName,
      type: this.state.climbType,
      grade: this.state.climbGrade
    }
    this.setState({ climbName: '' })
    this.setState({ climbType: '' })
    this.setState({ climbGrade: '' })
    console.log(newClimb)
    axios.post('/new_climb/', newClimb)
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.getByName}>
          <label>
            Search by Name:
            <input
              type="text"
              name="inputName"
              value={this.state.inputName}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.connect}</p>

        <ul>
          {this.state.data.map((el) => (
            <li key={el._id}>{el.name + ' - ' + el.type + ' - ' + el.grade}</li>
          ))}
        </ul>

        <form onSubmit={this.addAClimb}>
          <label>
            Add a Climb:
            <input
              type="text"
              name="climbName"
              value={this.state.climbName}
              onChange={this.handleChange} 
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              name="climbType"
              value={this.state.climbType}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Grade:
            <input
              type="text"
              name="climbGrade"
              value={this.state.climbGrade}
              onChange={this.handleChange}
              />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <h3>{this.state.climbName}</h3>
        <h3>{this.state.climbType}</h3>
        <h3>{this.state.climbGrade}</h3>

        <button onClick={this.callBackendAPI}>BUTTON</button>
      </div>
    )
  }
}

export default App;
