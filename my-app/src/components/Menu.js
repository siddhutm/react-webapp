import React from 'react';
import PropTypes from 'prop-types';


const MenuItem = (item) => {
    const classes = `menuItem ${item.selected ? 'selected' : ' '}`;

    return (
        <div className={ classes }>
            { item.name }
        </div>
    )
}

class Menu extends React.PureComponent {

    renderItems() {
        return this.props.items.map((i, index) => <MenuItem { ...i } key={ index }/> );
    }

    render() {
        return (
            <div className="">
                <div className="dataAnchor"></div>
                <div className="items">
                    { this.renderItems() }
                </div>
            </div>

        )
    }
}

Menu.propTypes = {
    items: PropTypes.array
};

export default Menu;