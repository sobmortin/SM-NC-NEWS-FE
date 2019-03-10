import React, {Component} from 'react';
import {Link} from '@reach/router';

import {fetchTopics, createTopic} from '../utils/api';
import Loader from './Loader';

class Topics extends Component {
	state = {
		topics: [],
		newTopicDescription: '',
		newTopicSlug: '',
		loading: true,
	};
	componentDidMount() {
		this.getTopics();
	}

	componentDidUpdate() {}
	render() {
		const {topics} = this.state;
		if (this.state.loading) return <Loader />;
		else
			return (
				<div className="Topics">
					<h1 className="Page-Title">Topics</h1>
					<form action="">
						<input
							className="slug"
							type="text"
							placeholder="create new topic"
							onChange={this.handleSlugChange}
						/>
						<input
							className="description"
							type="text"
							placeholder="give a brief description"
							onChange={this.handleTopicChange}
						/>
						<button onClick={this.handleSubmit}>Create!</button>
					</form>
					<ul>
						{topics.map((topic) => {
							return (
								<li className="individual-item">
									<Link
										to={`/topics/${topic.slug}/articles`}
										key={topic.slug}
										className="Link"
									>
										{topic.slug}: {topic.description}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			);
	}
	getTopics = () => {
		fetchTopics().then(({data}) => {
			this.setState({topics: data.topics, loading: false});
		});
	};

	handleTopicChange = (event) => {
		this.setState({newTopicDescription: event.target.value, loading: false});
	};

	handleSlugChange = (event) => {
		this.setState({newTopicSlug: event.target.value, loading: false});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {newTopicDescription, newTopicSlug} = this.state;
		createTopic(newTopicDescription, newTopicSlug).then(({data}) => {
			this.setState((prevState) => {
				return {topics: [...prevState.topics, data], loading: false};
			});
		});
	};
}

export default Topics;
