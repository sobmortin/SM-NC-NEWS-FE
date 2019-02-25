import React, {Component} from 'react';
import {Link} from '@reach/router';
import {
	fetchAllArticles,
	fetchArticlesByTopic,
	fetchArticlesByUser,
	fetchSortedArticles,
} from '../utils/api.js';
import NoMatch from './NoMatch.jsx';

class Articles extends Component {
	state = {
		articles: [],
		topic: '',
		user: '',
		loading: true,
		err: false,
	};

	componentDidMount() {
		if (this.props.user) {
			this.props.user
				? this.getArticlesByUser(this.props.user)
				: this.getAllArticles();
		} else if (this.props.topic) {
			this.props.topic
				? this.getArticlesByTopic(this.props.uri)
				: this.getAllArticles();
		} else this.getAllArticles();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.user !== this.props.user) {
			if (prevProps.user !== this.props.user) {
				this.props.uri === '/articles'
					? this.getAllArticles()
					: this.getArticlesByUser(this.props.user);
			}
		}
		if (prevProps.topic !== this.props.topic) {
			this.props.topic
				? this.getArticlesByTopic(this.props.uri)
				: this.getAllArticles();
		}
	}

	render() {
		const {topic} = this.state;
		if (this.state.err) {
			return <NoMatch />;
		}
		if (this.state.loading) return <p>loading...</p>;
		else
			return (
				<div className="Main">
					{this.state.topic ? (
						<h1 className="Page-Title">
							{topic.charAt(0).toUpperCase() + topic.slice(1)} Articles
						</h1>
					) : (
						<h1 className="Page-Title">Articles</h1>
					)}
					<div className="sort-buttons">
						{' '}
						<p>Sort Articles</p>
						<button value="created_at" onClick={this.handleSortClick}>
							date
						</button>
						<button value="votes" onClick={this.handleSortClick}>
							votes
						</button>
						<button value="comment_count" onClick={this.handleSortClick}>
							comment count
						</button>
					</div>

					<ul>
						{this.state.articles.map((article) => {
							return (
								<li key={article.article_id} className="individual-item">
									<div>
										<Link
											className="Link"
											to={`/article/${article.article_id}`}
										>
											{article.title}
										</Link>
										<p className="comment-and-votes">
											comments: {article.comment_count}
										</p>
										<p className="comment-and-votes">votes: {article.votes}</p>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			);
	}
	getAllArticles = () => {
		fetchAllArticles().then(({data}) => {
			this.setState({
				articles: data.articles,
				loading: false,
				topic: '',
				err: false,
			});
		});
	};
	getArticlesByTopic = (topicURI) => {
		fetchArticlesByTopic(topicURI)
			.then(({data}) => {
				this.setState({
					articles: data.articles,
					loading: false,
					topic: this.props.topic,
					err: false,
				});
			})
			.catch((err) => {
				this.setState({err: true});
			});
	};
	getArticlesByUser = (username) => {
		fetchArticlesByUser(username).then(({data}) => {
			this.setState({articles: data.articles, loading: false, err: false});
		});
	};
	handleSortClick = (event) => {
		const {value} = event.target;
		fetchSortedArticles(value).then(({data}) => {
			const {articles} = data;
			this.setState({articles, err: false});
		});
	};
}

export default Articles;
