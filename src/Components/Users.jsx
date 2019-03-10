import React, {Component} from 'react';
import {fetchUsers} from '../utils/api';
import {Link} from '@reach/router';
import Loader from './Loader';

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
		if (this.state.loading) return <Loader />;
		else
			return (
				<div>
					<h1 className="Page-Title">Users</h1>
					<ul>
						{users.map((user) => {
							console.log(user);
							return (
								<li key={user.username} className="individual-item">
									<Link className="Link" to={`/articles/${user.username}`}>
										{user.username}
									</Link>
								</li>
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
