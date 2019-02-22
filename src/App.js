import React, {Component} from 'react';
import './styles/App.css';
import './styles/Article.css';
import './styles/comment.css';
import './styles/sidebar.css';
import './styles/Topics.css';
import './styles/User.css'
import Articles from './Components/Articles';
import Nav from './Components/Nav';
import Home from './Components/Home';
import {Router} from '@reach/router';
import IndividualArticle from './Components/IndividualArticle';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import Topics from './Components/Topics';
import Auth from './Components/Auth';
import Comments from './Components/Comments';
import {fetchUserForLogin} from './utils/api';
import Voter from './Components/Voter';
import WriteArticle from './Components/WriteArticle';
import NoMatch from './Components/NoMatch';
import Users from './Components/Users';

class App extends Component {
	state = {
		user: null,
	};

	componentDidMount() {
		const stringedUser = localStorage.getItem('user');
		const localUser = JSON.parse(stringedUser);
		this.setState({user: localUser});
	}

	render() {
		return (
			<div className="App">
				<Header />
				<Nav />
				<Sidebar user={this.state.user} logout={this.clearUser} />
				<Auth
					login={this.setUser}
					logout={this.clearUser}
					user={this.state.user}
				>
					<Router className="Main">
						<Home path="/" />
						<Articles path="/articles" />
						<Articles path="/topics/:topic/articles/" />
						<Articles path="/articles/:user" />
						<Articles path="/articles/?sort_by" />
						<IndividualArticle
							path="/article/:id"
							loggedInUser={this.state.user}
						/>
						<Topics path="/articles/topics" />
						<Users path="/users" />
						<Comments
							path="/articles/comments"
							loggedInUser={this.state.user}
						/>
						<Voter path="articles/voter" />
						<WriteArticle
							path="/article/create"
							loggedInUser={this.state.user}
						/>
						<NoMatch default />
					</Router>
					<Footer />
				</Auth>
			</div>
		);
	}
	setUser = (username) => {
		return fetchUserForLogin(username).then(({data}) => {
			this.setState({user: data.user});
			localStorage.setItem('user', JSON.stringify(data.user));
		});
	};
	clearUser = () => {
		this.setState({user: null});
		localStorage.removeItem('user');
	};
}

export default App;
