//import logo from './logo.svg';
import './App.css';
import React,{ Component } from 'react';  // for class componenets
import CardList from './components/card-list/card-list.componenet';
import SearchBox from './components/search-box/search-box.component';
import { useState, useEffect } from 'react'; // for function components ie hooks

//import ReactDOM from 'react-dom/client';

/* Introduction, changing name code
class App extends Component {
  constructor(){
    super();
    this.state={name:{firstName: 'Nikita', lastName: 'Phulkar'},
    company:'Accenture'
  }
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Hi {this.state.name.firstName} {this.state.name.lastName} Company: {this.state.company}
        </p>
        <button onClick={()=>{
          
          this.setState((state,props)=>{return {name:{firstName: 'Nikiiis', lastName:'Ruchitass'}, company:'Google'}}, ()=>{
            console.log(this.state)
          });
          }
          

          }> Change Name</button>      
        
      </header>
    </div>
  );
  }
}*/

//Functional component
const App = () =>{

  const[searchField,setSearchField]=useState(''); // hook
  const[monsters,setMonsters]=useState([])
  const [filterdMonsters, setFilteredMonsters]=useState(monsters)
  console.log(searchField)

  const onSearchChange=(event)=>{
 
    const searchFieldString=event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
    }
   useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((users)=>setMonsters(users))
   }, [])


   useEffect(()=>{
    const newfilterdMonsters=monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
})
      setFilteredMonsters(newfilterdMonsters)
   },[monsters,searchField])
      
    // const filterdMonsters=monsters.filter((monster)=>{
    //          return monster.name.toLocaleLowerCase().includes(searchField);
    // }) in order to make it more efficient, it is written inside useEffect.. so the the monsters list will be filterd
    // only if monsters array or the searchfield is changed or else this function was getting called if any other component 
    // was changing... wriiten above

  return(
  <div className='App'>
        <h1 className="app-title">Monster Rolodex</h1>
        <SearchBox 
        onChangeHandler={onSearchChange} 
        placeholder="Search for monsters" 
        className="search-box" 
        />
        <CardList monsters={filterdMonsters}/>
  </div>
  )
}


///Monstor Rolodex code starts here
// class component
// class App extends Component{
//   constructor(){
//     super();
//     this.state={
//       monsters:[],
//       searchField:''
//     }
//   }
//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users').then((response)=> response.json()).then((users)=>this.setState(
//       ()=>{
//         return {monsters:users}
//       }
//       // ()=>{
//       //   console.log(this.state)
//       // }
//     ))
//   }
//   onSearchChange=(event)=>{
//   //  console.log(event.target.value)
//     const searchField=event.target.value.toLocaleLowerCase();
    
// this.setState(()=>{
//     return {searchField}
//  })
// }

//   render(){

//     const { monsters, searchField}=this.state; // we save the state variables into some variables, so all we donot have to write this.state ,etc
//     const {onSearchChange}=this
//     const filterdMonsters=monsters.filter((monster)=>{
//       return monster.name.toLocaleLowerCase().includes(searchField);
// })

//     return(
//       <div className='App'>
      
//         {/* {
//           filterdMonsters.map((monster)=>{
//           return <div key={monster.id}><h1>{monster.name}</h1></div>
//         }) */}

//         {/*  */}
//         <h1 className="app-title">Monster Rolodex</h1>
//         <SearchBox 
//         onChangeHandler={onSearchChange} 
//         placeholder="Search for monsters" 
//         className="search-box" />
//         <CardList monsters={filterdMonsters}/>
//       </div>
//     ) 
//   }
// }

export default App;
