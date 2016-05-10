import React, {PropType, Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
	constructor(props) {
		super(props);
		this.state = {data: []};
	}

	fetchFromServer() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: (data) => {
				this.setState({data: data});
			},
			error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		});
	}

	componentDidMount() {
		this.fetchFromServer();
		setInterval(() => {this.fetchFromServer()}, this.props.pollInterval);
	}

	handleCommentSubmit(comment) {
		comment.id = Date.now();
		let newComment = [comment, ...this.state.data];
		this.setState(newComment);

		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: (data) => {
				this.setState({data: data});
			},
			error: (xhr, status, err) => {
				this.setState({data: this.state.data});
				console.error(this.props.url, status, err.toString());
			}
		});
	}

	render() {
		return (
			<div className="commentBox">
				<h1>Comments.</h1>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
			</div>
	    );
	}
}

export default CommentBox;