import React, {Component} from 'react';
import {Link} from '@reach/router';
import {
	fetchAllArticles,
	fetchArticlesByTopic,
	fetchArticlesByUser,
	fetchSortedArticles,
} from '../utils/api.js';
import WriteArticle from './WriteArticle.jsx';

class Articles extends Component {
	state = {
		articles: [],
		topic: '',
		user: '',
		loading: true,
	};

	componentDidMount() {
		if (this.props.user) {
			return this.props.user
				? this.getArticlesByUser(this.props.user)
				: this.getAllArticles();
		} else if (this.props.topic) {
			return this.props.topic
				? this.getArticlesByTopic(this.props.uri)
				: this.getAllArticles();
		} else return this.getAllArticles();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.user !== this.props.user) {
			if (prevProps.user !== this.props.user) {
				return this.props.uri === '/articles'
					? this.getAllArticles()
					: this.getArticlesByUser(this.props.user);
			}
		}
		if (prevProps.topic !== this.props.topic) {
			return this.props.topic
				? this.getArticlesByTopic(this.props.uri)
				: this.getAllArticles();
		}
	}

	render() {
		if (this.state.loading) return <p>loading...</p>;
		else
			return (
				<div className="Main">
					{this.state.topic ? (
						<h1 className="Header">{this.state.topic} Articles</h1>
					) : (
						<h1 className="Header">Articles</h1>
					)}
					<div className="sort-buttons">
						{' '}
						<p>sort articles</p>
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
									<Link className="Link" to={`/article/${article.article_id}`}>
										{article.title}
									</Link>
									<p className="comment-and-votes">
										comments: {article.comment_count}
									</p>
									<p className="comment-and-votes">votes: {article.votes}</p>
								</li>
							);
						})}
					</ul>
					<WriteArticle
						topic={this.state.topic}
						user={this.props.user}
						addArticle={this.addArticle}
					/>
				</div>
			);
	}
	getAllArticles = () => {
		return fetchAllArticles().then(({data}) => {
			this.setState({articles: data.articles, loading: false, topic: ''});
		});
	};
	getArticlesByTopic = (topicURI) => {
		return fetchArticlesByTopic(topicURI).then(({data}) => {
			this.setState({
				articles: data.articles,
				loading: false,
				topic: this.props.topic,
			});
		});
	};
	getArticlesByUser = (username) => {
		return fetchArticlesByUser(username).then(({data}) => {
			this.setState({articles: data.articles, loading: false});
		});
	};
	handleSortClick = (event) => {
		const {value} = event.target;
		fetchSortedArticles(value).then(({data}) => {
			const {articles} = data;
			this.setState({articles});
		});
	};
	addArticle = (articleObject) => {
		console.log(articleObject);
	};
}

export default Articles;
