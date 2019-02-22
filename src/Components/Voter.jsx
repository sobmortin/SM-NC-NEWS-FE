import React, {Component} from 'react';
import {voteOnArticle, voteOnComment} from '../utils/api';

class Voter extends Component {
	state = {
		newVote: 0,
	};

	render() {
		// console.log(this.props);
		const {votes} = this.props;
		const {newVote} = this.state;
		return (
			<div>
				<button disabled={newVote === 1} onClick={() => this.handleVote(1)}>
					Vote Up
				</button>
				<span>Votes : {votes + newVote}</span>
				<button disabled={newVote === -1} onClick={() => this.handleVote(-1)}>
					Vote Down
				</button>
			</div>
		);
	}
	handleVote = (increment) => {
		const {articleID, commentID} = this.props;
		this.props.commentID
			? voteOnComment(increment, articleID, commentID).then(() => {
					this.setState((state) => {
						return {newVote: state.newVote + increment};
					});
			  })
			: voteOnArticle(increment, articleID).then(() => {
					this.setState((state) => {
						return {newVote: state.newVote + increment};
					});
			  });
	};
}

export default Voter;
