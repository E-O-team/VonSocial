import React from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/actions';
class Home extends React.Component {
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div>
                <h1>Welcome to home</h1>
            </div>
        )
    }
};

export default Home;
