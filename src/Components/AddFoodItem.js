import React from 'react'
const AddFoodItem=props=>{
   return(
     <div>
 
   <form onSubmit={props.addFoodItem} className="mleft">
    <div className="form-group">

        <label>Food Name</label>
        <input type="text" className="form-control" name="food" value={props.food} onChange={props.handleInputChange} />
    
    </div>
   <div className="form-group"> 
         <label>Food cost</label>
         <input type="number" className="form-control" name="cost" value={props.cost} onChange={props.handleInputChange}/>
     
  </div>
     <button className="btn btn-success mt-2">Add food item</button>

</form>

   </div>

 

   )

}


export default AddFoodItem;