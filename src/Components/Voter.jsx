import React, {Component} from 'react';
import {voteOnArticle} from '../utils/api';

class Voter extends Component {
	state = {
		newVote: 0,
	};

	render() {
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
		const {articleID} = this.props;

		voteOnArticle(increment, articleID).then(() => {
			this.setState((state) => {
				return {newVote: state.newVote + increment};
			});
		});
	};
}

export default Voter;
