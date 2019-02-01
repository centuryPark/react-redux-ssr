import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getMainInfo } from '../../redux/actions/main';
import ServerWithStyle from '../../component/Hoc/ServerWithStyle';
import styles from './main.scss';

class Main extends Component {
  componentDidMount() {
    this.props.getMainInfo();
  }

  handelPushRouter = () => {
    this.props.push('/list');
  };

  render() {
    const { mainInfo } = this.props;
    return (
      <div className="main-page">
        <p>main</p>
        <hr />
        <p>{mainInfo.name || 'name'}</p>
        <p>{mainInfo.desc || 'desc'}</p>
        <hr />
        <button onClick={this.handelPushRouter}>js jump list</button>
        <hr />
        <Link to="/list">
          list
        </Link>
      </div>
    );
  }
}

Main.loadData = store => store.dispatch(getMainInfo());

function mapStateToProps(state) {
  const { mainInfo } = state;
  return {
    mainInfo,
  };
}

export default connect(mapStateToProps, { getMainInfo, push })(ServerWithStyle(Main, styles));
