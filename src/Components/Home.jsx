import React, {Component} from 'react';
import {fetchAllArticles} from '../utils/api';

class Home extends Component {
	state = {
		articles: [],
	};

	componentDidMount() {
		return this.getAllArticles();
	}
	render() {
		return (
			<div className="Main">
				<h1>Home</h1>
				<p> Welcome to NC News</p>
			</div>
		);
	}
	getAllArticles = () => {
		return fetchAllArticles().then(({data}) => {
			this.setState({articles: data.articles});
		});
	};
}

export default Home;
