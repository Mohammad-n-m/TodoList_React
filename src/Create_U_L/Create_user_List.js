import React, { Component } from 'react';

class Create_User_List extends Component {

    render() { 
        return (
            <>
                <div className="items">
                    <p className="todoValue">{this.props.value}</p>
                    <div className="btns">
                        <button className={`${this.props.complete}`} onClick={(e)=>this.props.Fun_Change_complete(this.props.id,e)}>Do It</button>
                        <button className="deleteItem" onClick={(e)=>this.props.Fun_Remove_Item(this.props.id)}>Remove</button>
                    </div>
                </div>
            </>
        );
    }
}
 
export default Create_User_List;