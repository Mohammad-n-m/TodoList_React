import React, { Component } from 'react';
import './App.css';
import Create_User_List from '../Create_U_L/Create_user_List.js';

class App extends Component {
  constructor(props) {
      super(props);

      this.state={
        TodoArray:[],
        Index_for_Map:0
      }

  }

  componentDidMount(){

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        this.setState({
            TodoArray:localStorageTodos
        })

    } else {
          this.setState({
            TodoArray:[{id:0,value:"go shop",complete:false}]
          },()=>this.FocousOnInput())
    }

  }

  
// ? for add Todo in list
  AddItemBtnHandler=()=>{

    this.setState((prevIndex)=>{
      return{
        Index_for_Map:(prevIndex.Index_for_Map+1)
      }
    },()=>{
      console.log(this.state.Index_for_Map);
      let UserInput=document.querySelector('.userInput')
      
      if(UserInput.value){
        let obj = {
          id: this.state.Index_for_Map,
          value: UserInput.value,
          complete: false
        };
        
        
        this.setState((prevArray) => {
          return {
            TodoArray: [...prevArray.TodoArray, obj]
          };
        },()=>{
          this.FocousOnInput();
        })
  
      }
    })
  }




// ? this will remove all Todoes
  RemoveAllBtnHandler=()=>{
      this.setState({
        TodoArray:[]
      },()=>this.FocousOnInput());
    
  }
  



// ? this will Change the state of Todo
  SetComplete=(Id,event)=>{

    let ExampleArray=this.state.TodoArray

    let Index_of_Todo=ExampleArray.findIndex(item=>{
      return item.id==Id
    })

      ExampleArray[Index_of_Todo].complete=(!ExampleArray[Index_of_Todo].complete)
      if(ExampleArray[Index_of_Todo].complete){
        event.target.innerHTML="Done"
      }
      else{
        event.target.innerHTML = "Do It";
      }
    

    this.setState({
      TodoArray:ExampleArray
    },()=>this.FocousOnInput());

  }




// ? this is for remove Item when user clicked
  Remove_item=(Id)=>{

      let ExampleArray=this.state.TodoArray

      let Index=ExampleArray.findIndex(item=>{
        return item.id==Id
      })

      ExampleArray.splice(Index,1)

      this.setState({
        TodoArray:ExampleArray
      },()=>this.FocousOnInput());

  }



// ? in this code when user remove or add item this function will run and it will set the new value in local storage
  FocousOnInput=()=>{

      localStorage.setItem('todos', JSON.stringify(this.state.TodoArray))
    
      let UserInput=document.querySelector('.userInput')
      UserInput.value="";
      UserInput.focus();

  }

  render() { 
    return (
      <>
            <div className="counter">
             <h2 className="headerText">TO-DO LIST</h2>
              <input type="text" className="userInput"/>   
              <button onClick={this.AddItemBtnHandler} className="addItembtn">Add Item</button>
              <button onClick={this.RemoveAllBtnHandler} className="clearItemsBtn">Clear All</button>
              <h2 className="text">Lists</h2>
              <div className="UserTodos">

              { this.state.TodoArray.map((item)=>{
                return <Create_User_List Fun_Change_complete={this.SetComplete} Fun_Remove_Item={this.Remove_item} {...item} key={item.id}/>
                })}

              </div>
        </div>
      </>
    );
  }
}
 
export default App;
