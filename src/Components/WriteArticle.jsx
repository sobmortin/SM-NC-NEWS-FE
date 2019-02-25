import React, {Component} from 'react';
import {postArticle, fetchTopics} from '../utils/api';

class WriteArticle extends Component {
	state = {
		existingTopics: [],
		title: '',
		body: '',
		user: '',
		topic: '',
		added: false,
	};

	componentDidMount() {
		this.getTopics();
	}

	render() {
		if (this.state.added)
			return <p>Article added! Go to articles to view it</p>;
		else
			return (
				<div className="write-article">
					<form className="article-form">
						<h1>Title</h1>
						<textarea
							name="Title"
							id="Title"
							cols="50"
							rows="1"
							required
							onChange={this.handleTitleChange}
						/>
						<p>Topic</p>
						<textarea
							cols="30"
							rows="1"
							type="text"
							required
							onChange={this.handleTopicChange}
						/>
						<p>Article</p>
						<textarea
							name="Body"
							id="Body"
							cols="60"
							rows="8"
							required
							onChange={this.handleArticleChange}
						/>
						<p>Submit!</p>
						<button onClick={this.handleArticleFormSubmit}>Post Article</button>
					</form>
				</div>
			);
	}
	handleTitleChange = (event) => {
		const {value} = event.target;
		this.setState({title: value});
	};

	handleTopicChange = (event) => {
		const {value} = event.target;
		this.setState({topic: value});
	};

	handleArticleChange = (event) => {
		const {value} = event.target;
		this.setState({body: value});
	};

	handleArticleFormSubmit = (event) => {
		event.preventDefault();
		const {topic, title, body} = this.state;
		const {username} = this.props.loggedInUser;
		return postArticle(topic, title, body, username).then(({data}) => {
			this.setState({added: true})
		});
	};
	getTopics = () => {
		fetchTopics().then(({data}) => {
			this.setState({existingTopics: [data.topics]});
		});
	};
}

export default WriteArticle;
