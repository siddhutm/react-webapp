import React from 'react';
import Menu from './Menu';
import UserList from './UserList';
import Loader from './loader';

class AppContent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            fetching: false,
            fetched: false
        }
    }

    async componentWillMount() {
        this.setState({fetching:true});
        const usersData = await fetch('api/users');
        const list = await usersData.json();
        this.setState({
            fetched: true,
            fetching: false,
            list
        });
    }

    renderContent() {
        const { fetching, list } = this.state;
        if(fetching) {
            return <Loader/>
        }
        const userListProps = {
            list
        };

        return (
            <div>
                <div className="toolbar">
                <h1>Users</h1>
                </div>
                <UserList {...userListProps  }/>
            </div>
        )
    }

    renderMenu() {
        const items = [{
            name: 'Dashboard',
            selected: true
        },
        {
            name: 'Menu Item one'
        },
        {
            name: 'Menu Item two'
        }];
        const menuProps = {
            items
        }

        return <Menu { ...menuProps }/>;
    }

    render() {
        return (

            <div className="App">
                <aside className="menu">
                    { this.renderMenu() }
                </aside>
                <main className="content">{this.renderContent() }</main>
            </div>
        )
    }

}

export default AppContent;