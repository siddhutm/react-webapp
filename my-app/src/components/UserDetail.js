import React from 'react';
import PropTypes from 'prop-types';
import FileOFolder from './FileOFolder';
import Stack from '../utils/Stack';

class UserDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentList: Object.assign([], props.folderList)
        };

        this.stack = new Stack();
    }

    onPrevious = () => {
        const topItem = this.stack.getTop();
        this.stack.pop();
        this.setState({
            currentList: topItem,
            showAccessLogs: false
        });
    }

    onFolderClick = (key, type) => {
        const { currentList } = this.state;
        if(type === 'folder') {
            const newCurrentList = currentList[key].children;
            this.stack.push(currentList);
            this.setState({
                currentList: newCurrentList,
                showAccessLogs: false
            });
        } else {
            this.setState({
                showAccessLogs: true,
                currentFile: currentList[key]
            });
        }
    }

    printLocation() {
        // const coords = window.navigator.geolocation.getCurrentPosition((pos) => pos.coords );
        // console.log
    }

    renderFileLogs() {
        const { showAccessLogs, currentFile } = this.state;
        if(!showAccessLogs) {
            return null;
        }

        const { name, size } = currentFile;
        return (
            <div>
                <h1 className="accessLogTitle">Access Log</h1>
                <p>{ `Name: ${name}` }</p>
                <p>{ `Size: ${size}` }</p>
                <p>{ `Last User accessed: ${this.props.userName}` }</p>
                <p>{ `Last time accessed: ${ new Date().toLocaleString() }` }</p>
                { this.printLocation() }
            </div>
        )
    }

    renderFolderList() {
        const { currentList } = this.state;

        return currentList.map((f, index) => <FileOFolder { ...f } key={ index } onClick={ this.onFolderClick.bind(this, index) }/>);
    }
    
    render() {
        const { onBack } = this.props;
      
        return ( 
            <div className="userDetail">
                <div className="userDetailheader">
                    <button className="back" onClick={ onBack  }>Back</button>
                    <h1>Machine Details</h1>
                </div>
                
                <div className="btnAndContent">
                    { this.stack.isEmpty() ? null : <button className="previous" onClick={ this.onPrevious }>Previous</button> }
                    <div className="userDetailContent">
                        <div className="folderList">{ this.renderFolderList() }</div>
                        <div className="accessLog">{ this.renderFileLogs() }</div>
                    </div>
                </div>
            </div>
       );
    }
}

UserDetail.propTypes = {
    folderList: PropTypes.array,
    onBack: PropTypes.func,
    userId: PropTypes.string,
    userName: PropTypes.string
}

export default UserDetail;