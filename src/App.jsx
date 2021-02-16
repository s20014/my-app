import React from 'react'
import './App.css'
import {Button} from '@material-ui/core'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      caturl:"https://cataas.com/cat/",
      url:"https://cataas.com/api/cats?tags=",
      url1: "https://cataas.com/api/cats?tags=",
      num:0,
      length:0,
      says:'',
      text:'',
      items:[
        {
          id:null,
          created_at:null,
          tags:[]
        }
      ]
    }
  }

  componentDidMount () {
    this.loadData(this.state.url)
  }

   async loadData () {
    const data = await window
    .fetch(this.state.url)
      .then(res => res.json())
      this.setState({items:data})
  }


  componentDidUpdate(prevProps,prevState) {
    if(this.state.url !== prevState.url) {
      this.loadData()
    }
  }

  cuteButton() {
    this.setState({url : this.state.url1 + 'cute',num:0})
    
    console.log(this.state.items.length)
  }

  gifButton() {
    this.setState({url : this.state.url1 + 'gif',num:0})
    console.log(this.state.items.length)
  }

  funButton() {
    this.setState({url : this.state.url1 + 'fun',num:0})
    console.log(this.state.items.length)
  }

  sleepButton() {
    this.setState({url : this.state.url1 + 'sleep',num:0})
    console.log(this.state.items.length)
  }

  jumpButton() {
    this.setState({url : this.state.url1 + 'jump',num:0})
    console.log(this.state.items.length)
  }

  allButton() {
    this.setState({url : this.state.url1,num:0})
    console.log(this.state.items.length)
  }

  randomButton() {
    var random = Math.floor(Math.random() * this.state.items.length )
    this.setState({num:random})
  }

  numcounter(event) {
    const value = event.target.value
    this.setState({num:value})
    console.log(value)
  }

  saystext(event){
   const value = event.target.value
    this.setState({text:value})
  }

  saysButton() {
    if (this.state.text !=='') {
      this.setState({says:'/says/' + this.state.text})
    } 
   console.log(this.state.says)
  }


    
  render () {
      const catid = []
      this.state.items.map(v => catid.push(v.id))
      const num = catid.length-1
    console.log(this.state.url)
    return (
      <>
      <div>
      <h1>君の好きな猫は??</h1>
       <NumCounter num={this.state.num} itemsnum={num}/>
      <NumSetter onChange={this.numcounter.bind(this)} num={this.state.num} items={this.state.items}/>
      <RandomButton onClick={this.randomButton.bind(this)}/>
      <ul>
      <li>
        <All onClick={this.allButton.bind(this)} />
      </li>
      <li>
        <GifButton  onClick={this.gifButton.bind(this)} />
      </li>
      <li>
        <CatButton  onClick={this.cuteButton.bind(this)} />
      </li>
      <li>
        <FunButton  onClick={this.funButton.bind(this)} />
      </li>
      <li>
        <SleepButton  onClick={this.sleepButton.bind(this)} />
      </li>
      <li>       
        <JumpButton  onClick={this.jumpButton.bind(this)} />
      </li>
      </ul>
        <CatViwe says={this.state.says} items={catid} caturl={this.state.caturl} num={this.state.num}/>
      <br />
      <h2>写真に文字を追加</h2>
      <Says text={this.state.text} onChange={this.saystext.bind(this)} />
      <SaysButton onClick={this.saysButton.bind(this)}/>
       
      </div>
      </>
    )
  }
}

const Says = props => {
  return (
    <input style={{width: '150px'}} 
    type="text" value={props.text} 
    onChange={props.onChange} />
  )
}

const SaysButton = props => {
  return (
  <Button 
    onClick={props.onClick}>
    submit
    </Button>
  )
}


const All = props => {
  return (
    <Button 
    onClick={props.onClick}
    color='primary'
    variant='outlined'>
    すべての写真
    </Button>
  )
}

const NumSetter = props => {
  return (
    <input style={{width: '150px'}} 
    type="number" value={props.num} 
    onChange={props.onChange} 
    min="0" max={props.items.length -1}/>
  )
}

const RandomButton = props => {
  return (
    <Button 
    onClick={props.onClick}
    color='primary'>
     ランダム表示
    </Button>
  ) 
}

const NumCounter = props => {
  return (
    <p>全部で{props.itemsnum}枚/{props.num}枚目</p>
  )
}

const GifButton = props => {
  return (
    <Button 
    onClick={props.onClick}
    variant='outlined'
    color='primary'>
     gif写真
    </Button>
  )

}

const CatButton = props => {
  return (
    <Button 
    onClick={props.onClick}
    variant='outlined'
    color='primary'>
     かわいい
    </Button>
  )
}

const CatViwe = props => {
  const items = props.items
  const caturl = props.caturl
  const says = props.says
  const num = props.num
  console.log()
  return (
    <>
    <img src={caturl + items[num] + says} alt="not find" />
    </>
  )
}

const FunButton = props => {
   return (
    <Button 
    onClick={props.onClick}
    variant='outlined'
    color='primary'>
     おもしろ
    </Button>
  )
}
const SleepButton = props => {
   return (
    <Button 
    onClick={props.onClick}
    variant='outlined'
    color='primary'>
    眠り猫
    </Button>
  )
}

const JumpButton = props => {
   return (
    <Button 
    onClick={props.onClick}
    variant='outlined'
    color='primary'>
     ジャンプ！
    </Button>
  )
}

export default App
