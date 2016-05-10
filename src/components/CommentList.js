import React, {PropType, Component} from 'react';
import Comment from './Comment';

class CommentList extends Component {
	render() {
		let commentsNode = this.props.data.map((comment) => {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});

		return (
			<div className="commentList">
				{commentsNode}
			</div>
		);
	}
}

export default CommentList;