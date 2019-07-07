import React from 'react';
import PropTypes from 'prop-types';

class User extends React.PureComponent {

    onClick = () => {
        const { id, name, onClick } = this.props;
        onClick(id, name);
    }

    render() {
        const { name, org, os } = this.props;

        return (
        <div className="user" onClick={ this.onClick  }>
            <div className="row">
                <span className="col1">Name: </span>
                <span className="col2 name">{ name }</span>
            </div>
            <div className="row">
                <span className="col1">Organisation: </span>
                <span className="col2 org">{ org }</span>
            </div>
            <div className="row">
                <span className="col1">OS: </span>
                <span className="col2 os">{ os }</span>
            </div>
        </div>
        );
    }
}

User.propTypes = {
    name: PropTypes.string,
    org: PropTypes.string,
    os: PropTypes.string,
    onClick: PropTypes.func
};

export default User;