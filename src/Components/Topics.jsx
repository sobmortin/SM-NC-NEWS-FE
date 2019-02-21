import React, {Component} from 'react';
import {Link} from '@reach/router';

import {fetchTopics, createTopic} from '../utils/api';

class Topics extends Component {
	state = {
		topics: [],
		newTopicDescription: '',
		newTopicSlug: '',
	};
	componentDidMount() {
		return this.getTopics();
	}

	componentDidUpdate() {
		console.log('in update');
	}
	render() {
		const {topics} = this.state;
		return (
			<div className="Topics">
				<h1 className="Page-Title">Topics</h1>
				<ul className="topics-list">
					{topics.map((topic) => {
						return (
							<Link
								to={`/topics/${topic.slug}/articles`}
								key={topic.slug}
								className="Topic-Link"
							>
								{topic.slug.toUpperCase()}
							</Link>
						);
					})}
				</ul>

				<form action="">
					<input
						type="text"
						placeholder="create new topic"
						onChange={this.handleTopicChange}
					/>
					<input
						type="text"
						placeholder="give a brief description"
						onChange={this.handleSlugChange}
					/>
					<button onClick={this.handleSubmit}>Create!</button>
				</form>
			</div>
		);
	}
	getTopics = () => {
		return fetchTopics().then(({data}) => {
			this.setState({topics: data.topics});
		});
	};

	handleTopicChange = (event) => {
		this.setState({newTopicDescription: event.target.value});
	};

	handleSlugChange = (event) => {
		this.setState({newTopicSlug: event.target.value});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {newTopicDescription, newTopicSlug} = this.state;
		createTopic(newTopicDescription, newTopicSlug).then(({data}) => {
			console.log(data.topic);
			const {topic} = data;
			this.setState((prevState) => {
				console.log(prevState);
				return {topics: [topic, ...prevState.topics]};
			});
		});
	};
}

export default Topics;
