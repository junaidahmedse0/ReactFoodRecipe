import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddFoodItem from './Components/AddFoodItem';
import EditFoodItem from './Components/EditFoodItem';
import FoodItemList from './Components/FoodItemList';


class App extends Component
{
  constructor(){
  super();
    this.state={
    id:null,
    userId:1,
    food:'',
    cost:'',
    status:false,
    foodItem:{},
    foodItems:[],
    editing:false
  }
  this.handleInputChange=this.handleInputChange.bind(this);
  this.deleteFoodItem=this.deleteFoodItem.bind(this);
  this.boughtFoodItem=this.boughtFoodItem.bind(this);
  this.addFoodItem=this.addFoodItem.bind(this);
  this.editFoodItem=this.editFoodItem.bind(this);
  this.setEditing=this.setEditing.bind(this);
  this.updateFoodItem=this.updateFoodItem.bind(this);
}

handleInputChange(event)
{
  const target =event.target;
  const value=target.value;
  const name=target.name;
  this.setState({
    [name]:value

  })
}
addFoodItem(event)
{
   event.preventDefault();
   if(!this.state.food) return;
  const foodItem={
       id:this.state.foodItems.length+1,
       food:this.state.food,
       cost:this.state.cost,
       userId:this.state.userId,
       status:this.state.status

  }
console.log(foodItem);
this.setState({
food:'',
cost:'',
foodItem:foodItem,
foodItems:[...this.state.foodItems,foodItem]

})
console.log(this.state.foodItems);

}
deleteFoodItem(id)
{
  const foodItems=this.state.foodItems.filter(item=>item.id!=id);
  this.setState({foodItems:foodItems});
  if(this.state.editing===true)
{
  window.location.reload();
}



}

boughtFoodItem(currentFood)
{
  const updatedCurrentFood = Object.assign({}, currentFood, { status: true });
  const foodItems = this.state.foodItems.map((foodItem, index) => (foodItem.id === currentFood.id ? updatedCurrentFood : foodItem));
  this.setState({foodItems: foodItems})
}


editFoodItem(foodItem)
{
  this.setEditing(true);
  this.setState({
    food:foodItem.food,
    cost:foodItem.cost,
    foodItem:foodItem

  });
  console.log(foodItem);
}

setEditing(value)
{
  if(typeof value!=='boolean'){throw "this value must be either true or false "}
  this.setState(
    {
      editing:value
    }
  )
}
updateFoodItem(event)
{
  event.preventDefault();
  const updatedFood=this.state.food;
  const updatedCost=this.state.cost;
  const updatedFoodItem = Object.assign({}, this.state.foodItem, { food: updatedFood, cost: updatedCost })
    const foodItems = this.state.foodItems.map((foodItem) => (foodItem.id === this.state.foodItem.id ? updatedFoodItem : foodItem));
    this.setState({ food:'', cost: '', foodItems: foodItems});
  
}

render(){
  const {cost,food,foodItems,editing}=this.state;
  return(
<div className="App">

<div className="row">
<FoodItemList
 foodItems={foodItems}
 deleteFoodItem={this.deleteFoodItem}
 boughtFoodItem={this.boughtFoodItem}
 editFoodItem={this.editFoodItem}

/>


</div>

<div className="row">

{
  editing?(
  <EditFoodItem
  food={this.state.food}
  cost={this.state.cost}
  handleInputChange={this.handleInputChange}
  setEditing={this.setEditing}
  updateFoodItem={this.updateFoodItem}


  />

  ):(
    <AddFoodItem
        food={this.state.food}
        cost={this.state.cost}
        handleInputChange={this.handleInputChange}
        addFoodItem={this.addFoodItem}

    />
  )



}

</div>
</div>

  )


}

}

export default App;
