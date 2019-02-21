import React, {Component} from 'react';
import {
	fetchCommentsForArticle,
	postCommentOnArticle,
	deleteComment,
} from '../utils/api';

class Comments extends Component {
	state = {
		comments: [],
		body: '',
		commentDeleted: false,
	};
	componentDidMount() {
		console.log(this.props);
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
								<p className="body"> {body}</p>
								<span>{author}</span> {' | '} <span>{votes}</span>
								<p>{created_at}</p>
								{author === username && (
									<button value={comment_id} onClick={this.handleCommentDelete}>
										delete
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
			this.setState({comments: data.comments});
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
		console.log(this.state.comments);
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

//spread operator in state

export default Comments;
