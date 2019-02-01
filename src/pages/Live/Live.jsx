import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLiveList } from '../../redux/actions/live';
import ServerWithStyle from '../../component/Hoc/ServerWithStyle';
import styles from './Live.scss';

class Live extends Component {
  componentDidMount() {
    this.props.getLiveList();
  }

  render() {
    const { liveList } = this.props;
    return (
      <div className="live-page">
        <p>live</p>
        <hr />
        {
                liveList.map(item => (
                  <p key={item.id}>{item.content}</p>
                ))
              }
        <hr />
        <Link to="/main">
                    back to main
        </Link>
      </div>
    );
  }
}

Live.loadData = store => store.dispatch(getLiveList());

function mapStateToProps(state) {
  const { liveList } = state;
  return {
    liveList,
  };
}

export default connect(mapStateToProps, { getLiveList })(ServerWithStyle(Live, styles));
