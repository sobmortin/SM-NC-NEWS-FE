import React, {Component} from 'react';
import {Link} from '@reach/router';
import {
	fetchCommentsForArticle,
	postCommentOnArticle,
	deleteComment,
} from '../utils/api';
import CommentVoter from './CommentVoter';

class Comments extends Component {
	state = {
		comments: [],
		body: '',
		commentDeleted: false,
	};
	componentDidMount() {
		return this.getCommentsForArticle(this.props.id);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.comments !== this.state.comments) {
			this.getCommentsForArticle(this.props.id);
		}
		if (prevState.commentDeleted) {
			this.getCommentsForArticle(this.props.id);
		}
	}

	render() {
		const {comments} = this.state;
		const {username} = this.props.loggedInUser;
		return (
			<div>
				<form action="" className="comment-form">
					<textarea
						className="comment-box"
						rows="2"
						columns="50"
						type="text"
						onChange={this.handleCommentChange}
					/>
				</form>
				<button className="comment-button" onClick={this.handleCommentSubmit}>
					Post Comment
				</button>

				<ul className="Comments-container">
					{comments.map((comment) => {
						const {votes, created_at, author, comment_id, body} = comment;

						return (
							<li key={comment_id} className="Comments-item">
								<p className="comment-body"> {body}</p>
								<Link to={`/articles/${author}`}>{author}</Link>
								{'|'} <span>{created_at}</span>
								<CommentVoter
									votes={votes}
									commentID={comment_id}
									articleID={this.props.id}
								/>
								{author === username && (
									<button
										className="comment-delete"
										value={comment_id}
										onClick={this.handleCommentDelete}
									>
										Delete Comment
									</button>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	getCommentsForArticle = (articleID) => {
		fetchCommentsForArticle(articleID).then(({data}) => {
			this.setState({comments: data.comments, commentDeleted: false});
		});
	};
	handleCommentChange = (event) => {
		return this.setState({body: event.target.value});
	};
	handleCommentSubmit = (event) => {
		event.preventDefault();
		const {body} = this.state;
		const {id, loggedInUser} = this.props;
		const user = loggedInUser.username;
		postCommentOnArticle(id, user, body);
	};

	handleCommentDelete = (event) => {
		event.preventDefault();
		const {value: commentID} = event.target;
		const {id: articleID} = this.props;
		deleteComment(articleID, commentID).then((res) => {
			this.setState({commentDeleted: true});
		});
	};
}

export default Comments;
