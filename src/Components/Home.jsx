import React, {Component} from 'react';

class Home extends Component {
	render() {
		const {user} = this.props;
		return (
			<div className="Main">
				<h1>Home</h1>
				<p>
					{`Welcome to NC News ${
						user.name
					}! This is the front-end of my Northcoders NC News
					project.`}
				</p>
			</div>
		);
	}
}

export default Home;
