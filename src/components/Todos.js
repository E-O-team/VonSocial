import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/actions';
class Todos extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    handleToggle = (e) => {
        this.props.toggleTodo(0)
    }
    render(){
        return(
            <div>
                <h1>yo</h1>
                <input type="button" value="toggle" onClick={this.handleToggle}/>
            </div>
        )
    }
};

export default connect(null, { toggleTodo } )(Todos);
