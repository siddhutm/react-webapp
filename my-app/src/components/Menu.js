import React from 'react';
import PropTypes from 'prop-types';


const MenuItem = (item) => {
    const { name, onSelect, value, selectedMenuItem } = item;
    const classes = `menuItem ${selectedMenuItem === value ? 'selected' : ' '}`;


    return (
        <div className={ classes } onClick={ () => onSelect(value)  }>
            { name }
        </div>
    )
}

class Menu extends React.PureComponent {

    renderItems() {
        const { items, onSelect, selectedMenuItem } = this.props;
        return items.map((i, index) => <MenuItem { ...i } key={ index } onSelect={ onSelect } selectedMenuItem={ selectedMenuItem } /> );
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

Menu.defaultProps = {
    items: []
};

Menu.propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func,
    selectedMenuItem: PropTypes.string
};


export default Menu;