import React, {Component} from 'react';
import {Link} from '@reach/router';

class Nav extends Component {
	state = {
		topics: [],
	};

	render() {
		return (
			<nav className="Topnav">
				<Link className="Topnav-Button" to="/">
					HOME
				</Link>
				<Link className="Topnav-Button" to="/articles">
					ARTICLES
				</Link>
				<Link className="Topnav-Button" to="/articles/topics">
					TOPICS
				</Link>
			</nav>
		);
	}
}

export default Nav;
