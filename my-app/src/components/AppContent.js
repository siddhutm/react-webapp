import React from 'react';
import Menu from './Menu';
import UserList from './UserList';
import Loader from './loader';
import UserDetail from './UserDetail';

class AppContent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            fetching: false,
            fetched: false,
            isDetailPage: false,
            detailFetching: false,
            detailFetched: false,
            selectedMenuItem: 'dashboard',
            items: [{
                name: 'User Dashboard',
                value: 'dashboard'
            },
            {
                name: 'Profile',
                value: 'itemOne'
            },
            {
                name: 'Certifications',
                value: 'itemTwo'
            }]
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

    onUserClick = (id, name) => {
        this.fetchUserDetail(id, name);
    }

    fetchUserDetail = async (id, name) => {
        this.setState({detailFetching:true});
        const userDetailPromise = await fetch(`api/users/${id}`);
        const userDetail = await userDetailPromise.json();
        this.setState({
            detailFetched: true,
            detailFetching: false,
            userDetail,
            isDetailPage: true,
            userId: id,
            userName: name
        });
    }

    onBack = () => {
        this.setState({isDetailPage: false});
    }

    renderContent() {
        const { fetching, list, detailFetching, isDetailPage, userDetail, userId, userName, selectedMenuItem } = this.state;
        if(fetching || detailFetching) {
            return <Loader/>
        }

        if(selectedMenuItem !== 'dashboard') {
            return <p className="placeHolder">{ `<Place holder for menu item ${selectedMenuItem}>` }</p>;
        }

        if(isDetailPage) {
            const detailProps = {
                folderList: userDetail,
                onBack: this.onBack,
                userId,
                userName
            };

            return <UserDetail { ...detailProps }/>;
        }

        const userListProps = {
            list,
            onClick: this.onUserClick
        };

        return (
            <div>
                <div className="toolbar">
                <h1 className="header">Users</h1>
                </div>
                <UserList {...userListProps  }/>
            </div>
        )
    }

    onMenuSelect = (value) => {
        this.setState({
            selectedMenuItem: value
        })
    }

    renderMenu() {
        const { items, selectedMenuItem } = this.state;
        const menuProps = {
            items,
            onSelect: this.onMenuSelect,
            selectedMenuItem
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