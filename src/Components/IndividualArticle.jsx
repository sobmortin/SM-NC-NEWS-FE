import React, {Component} from 'react';
import {Link} from '@reach/router';
import {fetchIndividualArticle, deleteArticle} from '../utils/api';
import '../styles/App.css';
import Comments from './Comments';
import Voter from './Voter';

class IndividualArticle extends Component {
	state = {
		article: {},
		deleted: false,
		loading: true,
	};
	componentDidMount() {
		return this.getIndividualArticles(this.props.id);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.deleted !== prevState.deleted) {
			console.log('updated');
		}
	}

	render() {
		const {
			topic,
			votes,
			title,
			body,
			author,
			comment_count,
			created_at,
			article_id,
		} = this.state.article;
		const {username} = this.props.loggedInUser;
		if (this.state.deleted) return <p>article deleted</p>;
		return (
			<div className="Main">
				<h1 className="Header">{title}</h1>
				<p className="article">{body}</p>
				<span>
					<Link to={`/topics/${topic}/articles`}>{topic}</Link>
				</span>
				{' | '}
				<span>
					<Link to={`/articles/${author}`}>{author}</Link>
				</span>
				<p>{comment_count}</p>
				<span>{created_at}</span>
				<Voter votes={votes} articleID={article_id} />
				{username === author && (
					<button onClick={this.handleDelete} value={article_id}>
						delete article
					</button>
				)}
				{article_id && (
					<Comments id={article_id} loggedInUser={this.props.loggedInUser} />
				)}
			</div>
		);
	}
	getIndividualArticles = (articleID) => {
		fetchIndividualArticle(articleID).then(({data}) => {
			this.setState({article: data.article, loading: false});
		});
	};

	handleDelete = (event) => {
		event.preventDefault();
		const articleID = event.target.value;
		deleteArticle(articleID).then((res) => {
			this.setState({deleted: true, loading: false});
		});
	};
}

export default IndividualArticle;
