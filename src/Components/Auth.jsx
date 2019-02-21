import React, {Component} from 'react';

class Auth extends Component {
	state = {
		user: {},
	};
	render() {
		console.log(this.props);
		if (this.state.user === this.props.user.username) {
			return <div>{this.props.children}</div>;
		}
		return (
			<div className="Main">
				<form className="login-form">
					<input
						placeholder="Enter username"
						onChange={this.handleChange}
						required
					/>
					<button type="submit" onClick={this.handleSubmit}>
						Log in
					</button>
					<p>Please use happyamy2016 for testing</p>
				</form>
			</div>
		);
	}
	handleChange = (event) => {
		const {value} = event.target;
		this.setState({user: value});
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const {login} = this.props;
		const {user} = this.state;
		this.setState({user});
		login(user);
	};
}

export default Auth;
