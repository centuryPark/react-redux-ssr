import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    handelClick = () => {
        console.log('click');
    };

    render() {
        return(
            <div className="main-page">
                <p onClick={this.handelClick}>main</p>
                <br />
                <Link to="/list">
                    list
                </Link>
            </div>
        )
    }
}

export default Main;
