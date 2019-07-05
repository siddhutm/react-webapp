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
            detailFetched: false
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
        const { fetching, list, detailFetching, isDetailPage, userDetail, userId, userName } = this.state;
        if(fetching || detailFetching) {
            return <Loader/>
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