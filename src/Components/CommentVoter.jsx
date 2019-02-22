import React, {Component} from 'react';
import {voteOnComment} from '../utils/api';

class CommentVoter extends Component {
	state = {
		newVote: 0,
	};

	render() {
		// console.log(this.props);
		const {votes} = this.props;
		const {newVote} = this.state;
		return (
			<div>
				<button
					disabled={newVote === 1}
					onClick={() => this.handleCommentVote(1)}
				>
					Vote Up
				</button>
				<span>Votes : {votes}</span>
				<button
					disabled={newVote === -1}
					onClick={() => this.handleCommentVote(-1)}
				>
					Vote Down
				</button>
			</div>
		);
	}
	handleCommentVote = (increment) => {
		const {articleID, commentID} = this.props;
		voteOnComment(increment, articleID, commentID).then(() => {
			this.setState((state) => {
				return {newVote: state.newVote + increment};
			});
		});
	};
}

export default CommentVoter;
