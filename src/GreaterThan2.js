import React, { Component } from 'react'

let timeleft = 49

export default class GreaterThan2 extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, m1: 0, m2: 1, n1: 2, n2: 3, ma: 4, na: 5, mo: '-', no: '+', wrong: 0, correct: 0};
    this.handleClick1 = this.handleClick1.bind(this);  
    this.handleClick2 = this.handleClick2.bind(this);  
    this.reset = this.reset.bind(this);  
  }

  downloadTimer(){
    this.timerId = setInterval(() => {
      if(timeleft <= 0){
        clearInterval(this.timerId);
        document.getElementById("countdown").innerHTML = "Time is out";
      } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
      console.log(timeleft)
    }, 1000)
  }

  reset(){
    clearInterval(this.timerId);
    timeleft = 49;
    document.getElementById("countdown").innerHTML = "50 seconds remaining";
    this.setState({wrong: 0, correct: 0, loading: true});
    this.randomArithmetic();
  }

  handleClick1() {
    if(timeleft === 49) {
      this.downloadTimer()
      if(this.state.ma > this.state.na) {
        this.setState({correct: this.state.correct + 1})
      } else {
        this.setState({wrong: this.state.wrong + 1})
      }  
      this.setState({loading: true})
      this.randomArithmetic()
    } if (49 > timeleft && timeleft > 0) {
      if(this.state.ma > this.state.na) {
        this.setState({correct: this.state.correct + 1})
      } else {
        this.setState({wrong: this.state.wrong + 1})
      }  
      this.setState({loading: true})
      this.randomArithmetic()
    } else {

    }
  }

  handleClick2() {
    if(timeleft === 49) {
      this.downloadTimer()
      if(this.state.ma < this.state.na) {
        this.setState({correct: this.state.correct + 1})
      } else {
        this.setState({wrong: this.state.wrong + 1})
      }  
      this.setState({loading: true})
      this.randomArithmetic()
    } if (49 > timeleft && timeleft > 0) {
      if(this.state.ma < this.state.na) {
        this.setState({correct: this.state.correct + 1})
      } else {
        this.setState({wrong: this.state.wrong + 1})
      }  
      this.setState({loading: true})
      this.randomArithmetic()
    } else {

    }
  }

  randomArithmetic(){
    try {
      let m1 = Math.floor(Math.random()*10) + 1
      let m2 = Math.floor(Math.random()*10) + 1
      let n1 = Math.floor(Math.random()*10) + 1
      let n2 = Math.floor(Math.random()*10) + 1
      this.setState({m1: m1, m2: m2, n1: n1, n2: n2})
      const array = [
        function plus(a, b) {
          const answer = a + b
          const operator = 'plus' 
          return {answer, operator}
        },
        function minus(a, b) {
          if(a > b) {
            const answer = a - b
            const operator = 'minus' 
            return {answer, operator}
          } else {
            const answer = b - a
            const operator = 'minus' 
            return {answer, operator}
          }
        }
      ]
      let op = array[Math.floor(Math.random()*2)]
      this.setState({ma: op(m1,m2).answer, na: op(n1,n2).answer})
      while(m1 === m2 || n1 === n2 || op(m1,m2).answer === op(n1,n2).answer){
        m1 = Math.floor(Math.random()*10) + 1
        m2 = Math.floor(Math.random()*10) + 1
        n1 = Math.floor(Math.random()*10) + 1
        n2 = Math.floor(Math.random()*10) + 1
        op(m1,m2)
        op(n1,n2)
        console.log('equal')
      }
      if(op(m1,m2).operator === 'minus') {
        let mo = ' - '
        this.setState({mo: mo})
      } if(op(m1,m2).operator === 'plus') {
        let mo = ' + '
        this.setState({mo: mo})
      }
      if(op(n1,n2).operator === 'minus') {
        let no = ' - '
        this.setState({no: no})
      } if(op(n1,n2).operator === 'plus') {
        let no = ' + '
        this.setState({no: no})
      }
      this.setState({loading: false})
    } catch(e) {
      alert(e)
      this.setState({loading: true})
    }
  }

  componentDidMount() {
    this.randomArithmetic()
  }

  render() {
    if(this.state.loading){
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <button onClick={this.handleClick1}>
            {(this.state.m1 > this.state.m2) ? 
              (this.state.m1 + ' ' + this.state.mo + ' ' + this.state.m2) : 
              (this.state.m2 + ' ' + this.state.mo + ' ' + this.state.m1)}
          </button>
          <button onClick={this.handleClick2}>
            {(this.state.n1 > this.state.n2) ? 
              (this.state.n1 + ' ' + this.state.no + ' ' + this.state.n2) : 
              (this.state.n2 + ' ' + this.state.no + ' ' + this.state.n1)}
          </button>
          <p>Correct: {this.state.correct}</p>
          <p>Wrong: {this.state.wrong}</p>
          <p id='countdown'>50 seconds remaining</p>
          <button onClick={this.reset}>Reset</button>
        </div>
      )
    }
  }
}
