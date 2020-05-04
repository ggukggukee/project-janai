import React, { Component } from 'react'

export default class GreaterThan extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, ten1: 0, ten2: 1};
    this.handleClick1 = this.handleClick1.bind(this);  
    this.handleClick2 = this.handleClick2.bind(this);  
  }

  handleClick1() {
    if(this.state.ten1 > this.state.ten2) {
      alert('correct')
    } else {
      alert('wrong')
    }  
    this.setState({loading: true})
    this.randomNumbers()
  }
  handleClick2() {
    if(this.state.ten1 < this.state.ten2) {
      alert('correct')
    } else {
      alert('wrong')
    }  
    this.setState({loading: true})
    this.randomNumbers()
  }
    
  randomNumbers(){
    let ten1 = Math.floor(Math.random()*20)
    let ten2 = Math.floor(Math.random()*20)
    this.setState({ten1: ten1, ten2: ten2})
    while(this.state.ten1 === this.state.ten2){
      this.setState({ten1: Math.floor(Math.random()*20), ten2: Math.floor(Math.random()*20)})
    }
    this.setState({loading: false})
  }

  componentDidMount() {
    this.randomNumbers()
  }

  render() {
    if(this.state.loading){
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <button onClick={this.handleClick1}>{this.state.ten1}</button>
          <button onClick={this.handleClick2}>{this.state.ten2}</button>
        </div>
      )
    }
  }
}
