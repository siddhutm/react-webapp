import React from 'react';
import PropTypes from 'prop-types';
import FileOFolder from './FileOFolder';
import Stack from '../utils/Stack';
import DLL from '../utils/DLL';

class UserDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentList: Object.assign([], props.folderList)
        };

        this.stack = new Stack();
        this.dll = new DLL();
        this.dll.append(this.state.currentList);
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
            this.dll.append(newCurrentList);
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

    onPrev = () => {
        this.dll.onPrevious();
        const currentList = this.dll.getCurrentPointer().data;
        this.setState({
            currentList,
            showAccessLogs: false
        });
    }

    onNext = () => {
        this.dll.onNext();
        const currentList = this.dll.getCurrentPointer().data;
        this.setState({
            currentList,
            showAccessLogs: false
        });
    }

    onClear = () => {
        this.dll.clear();
        const { currentList } = this.state;
        this.dll.append(currentList);
        this.setState({
            currentList
        })
    }

    renderPrevAndNextButtons() {
        const prevBtn = this.dll.hasCurrentPrev() ? <button className="navBtn" onClick={ this.onPrev }>Prev</button> : null;
        const nextBtn = this.dll.hasCurrentNext() ? <button className="navBtn" onClick={ this.onNext }>Next</button> : null;

        if(!prevBtn && !nextBtn) {
            return null
        }
        const clearBtn = (!prevBtn && nextBtn) ? <button className="navBtn clear" onClick={ this.onClear }>Clear Navigation History</button> : null

        return (
            <div className="buttons">
                { prevBtn }
                { nextBtn }
                { clearBtn }
            </div>
        );
    }
    
    render() {
        const { onBack } = this.props;
      
        return ( 
            <div className="userDetail">
                <div className="userDetailheader">
                    <button className="back" onClick={ onBack  }>Back to Users</button>
                    <h1 className="header">User File Explorer</h1>
                </div>
                
                <div className="btnAndContent">
                    { this.renderPrevAndNextButtons() }
                    {/* { this.stack.isEmpty() ? null : <button className="previous" onClick={ this.onPrevious }>Previous</button> } */}
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