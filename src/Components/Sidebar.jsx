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
					<thead className="table-row-header">
						<tr>
							<td>Topics</td>
						</tr>
					</thead>

					<tbody>
						{topics.map((topic) => (
							<tr className="table-row" key={topic.slug}>
								<td>
									<Link to={`/topics/${topic.slug}/articles`}>
										{topic.slug}
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<p className="border" />
				<p>
					<Link className="write-article-link" to={`/article/create`}>
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
