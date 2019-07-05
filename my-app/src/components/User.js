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
            <span className="userIcon"/>
            <p className="name">{ name }</p>
            <p className="org">{ org }</p>
            <p className="os">{ os }</p>
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