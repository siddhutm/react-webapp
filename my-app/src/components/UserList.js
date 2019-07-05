import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import './UserList.css';

class UserList extends React.Component {


    render() {
        const { type, list } = this.props;
        if(type === 'list') {
            return 'later'
        }

        return (
            <div className="userList">
                { list.map(l => <User { ...l } />) }
            </div>

        )
    }
}


UserList.defaultProps = {
    type: 'grid'
}

UserList.propTypes = {
    list: PropTypes.array,
    type: PropTypes.string
}

export default UserList;