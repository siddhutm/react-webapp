import React from 'react';
import PropTypes from 'prop-types';

class FileOFolder extends React.Component {

    renderFolderOFile() {
        const { name, type } = this.props;

        return (
            <div className="fWrapper" onClick={ this.onClick.bind(this, type) }>
                <div className={ type }></div>
                <p className="fname">{ name }</p>
            </div>
        )
    }

    onClick = (type) => {
        this.props.onClick(type);
    }

    render() {
        const { type } = this.props;
        switch(type) {
            case 'folder':
            case 'file':
                return this.renderFolderOFile();
                
            default:
                return null;
        }

    }
}

FileOFolder.defaultProps = {
    type: 'folder'
}

FileOFolder.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func
}

export default FileOFolder;