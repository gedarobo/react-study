import React from 'react';
import {render} from 'react-dom';
import CommentBox from './components/CommentBox';

render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('app')
);