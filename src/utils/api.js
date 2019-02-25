import axios from 'axios';
const BASE_URL = 'https://the-nc-news.herokuapp.com';

const fetchAllArticles = () => {
	return axios.get(`${BASE_URL}/api/articles?limit=100`).catch();
};

const fetchIndividualArticle = (articleID) => {
	return axios.get(`${BASE_URL}/api/articles/${articleID}`).catch();
};

const fetchTopics = () => {
	return axios.get(`${BASE_URL}/api/topics`);
};

const fetchArticlesByTopic = (topicURI) => {
	return axios.get(`${BASE_URL}/api${topicURI}`);
};

const fetchUsers = () => {
	return axios.get(`${BASE_URL}/api/users`).catch();
};
const fetchArticlesByUser = (username) => {
	return axios.get(`${BASE_URL}/api/users/${username}/articles`).catch();
};

const fetchCommentsForArticle = (articleID) => {
	return axios.get(`${BASE_URL}/api/articles/${articleID}/comments`).catch();
};

const fetchUserForLogin = (username) => {
	return axios.get(`${BASE_URL}/api/users/${username}`).catch();
};

const fetchSortedArticles = (sortCriteria) => {
	return axios.get(`${BASE_URL}/api/articles?sort_by=${sortCriteria}`).catch();
};

const postCommentOnArticle = (articleID, username, body) => {
	return axios
		.post(`${BASE_URL}/api/articles/${articleID}/comments`, {
			username,
			body,
		})
		.catch();
};

const voteOnArticle = (increment, articleID) => {
	return axios
		.patch(`${BASE_URL}/api/articles/${articleID}`, {
			inc_votes: `${increment}`,
		})
		.catch();
};

const voteOnComment = (increment, articleID, commentID) => {
	return axios
		.patch(`${BASE_URL}/api/articles/${articleID}/comments/${commentID}`, {
			inc_votes: `${increment}`,
		})
		.catch();
};

const postArticle = (topic, title, body, username) => {
	return axios.post(`${BASE_URL}/api/topics/${topic}/articles`, {
		title,
		body,
		username,
	});
};

const deleteArticle = (articleID) => {
	return axios.delete(`${BASE_URL}/api/articles/${articleID}`);
};

const deleteComment = (articleID, commentID) => {
	return axios.delete(
		`${BASE_URL}/api/articles/${articleID}/comments/${commentID}`
	);
};

const createTopic = (description, slug) => {
	return axios.post(`${BASE_URL}/api/topics`, {
		description,
		slug,
	});
};

export {
	fetchAllArticles,
	fetchIndividualArticle,
	fetchTopics,
	fetchArticlesByTopic,
	fetchCommentsForArticle,
	fetchUsers,
	fetchArticlesByUser,
	fetchUserForLogin,
	fetchSortedArticles,
	postCommentOnArticle,
	voteOnArticle,
	voteOnComment,
	postArticle,
	deleteArticle,
	deleteComment,
	createTopic,
};
