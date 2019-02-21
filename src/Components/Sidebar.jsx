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
		console.log('in sidebar', this.props.user === undefined);
		console.log('in sidebar props', this.props);
		return (
			// fix the ternary statement
			<div className="Sidebar">
				{this.props.user ? (
					<p className="welcome-notice">
						Welcome {this.props.user}
						<button onClick={() => this.props.logout()}>Logout</button>
					</p>
				) : (
					<p className="welcome-notice">Please Login</p>
				)}

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
