import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Live extends Component {
    render() {
        return(
            <div className="live-page">
                <p>live</p>
                <br />
                <Link to="/main">
                    back to main
                </Link>
            </div>
        )
    }
}

export default Live;
