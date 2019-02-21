import React, {Component} from 'react';

import {fetchTopics} from '../utils/api';

class Topics extends Component {
	state = {
		topics: [],
	};
	componentDidMount() {
		return this.getTopics();
	}
	render() {
		const {topics} = this.state;
		return (
			<div className="Main">
				<h1 className="Header">Topics</h1>
				<ul className="topics-list">
					{topics.map((topic) => {
						return <span key={topic.slug}>{topic.slug}</span>;
					})}
				</ul>
			</div>
		);
	}
	getTopics = () => {
		return fetchTopics().then(({data}) => {
			this.setState({topics: data.topics});
		});
	};
}

export default Topics;
