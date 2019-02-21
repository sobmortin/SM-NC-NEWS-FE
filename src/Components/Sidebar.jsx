import React, {Component} from 'react';
import {Link} from '@reach/router';

import {fetchTopics} from '../utils/api';

class Sidebar extends Component {
	state = {
		topics: [],
	};

	componentDidMount() {
		this.getTopics();
	}
	render() {
		const {topics} = this.state;
		return (
			<div className="Sidebar">
				{this.props.user.hasOwnProperty('username') ? (
					<p className="welcome-notice">
						Welcome {this.props.user.username}
						<button onClick={this.props.logout}>Logout</button>
					</p>
				) : (
					<p className="welcome-notice">Please Login</p>
				)}

				<table className="topic-table">
					<th className="table-row-header">Topics</th>
					<tbody>
						{topics.map((topic) => (
							<tr className="table-row" key={topic.slug}>
								<Link to={`/topics/${topic.slug}/articles`}>{topic.slug}</Link>
							</tr>
						))}
					</tbody>
				</table>
				<p>
					<Link to={`/article/create`} className="table-row-header">
						Write Article
					</Link>
				</p>
			</div>
		);
	}
	getTopics = () => {
		fetchTopics().then(({data}) => {
			this.setState({topics: data.topics});
		});
	};
}

export default Sidebar;
