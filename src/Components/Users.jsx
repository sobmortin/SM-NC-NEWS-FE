import React, {Component} from 'react';
import {fetchUsers} from '../utils/api';
import {Link} from '@reach/router';

class Users extends Component {
	state = {
		users: [],
		loading: true,
	};

	componentDidMount() {
		this.getUsers();
	}
	render() {
		const {users} = this.state;
		return (
			<div>
				<h1 className="Page-Title">Users</h1>
				<ul className="User-List">
					{users.map((user) => {
						console.log(user);
						return (
							<div key={user.username}>
								<Link className="User-Link" to={`/articles/${user.username}`}>
									{user.username}
								</Link>
							</div>
						);
					})}
				</ul>
			</div>
		);
	}
	getUsers = () => {
		fetchUsers().then(({data}) => {
			this.setState({users: data.users, loading: false});
		});
	};
}

export default Users;
