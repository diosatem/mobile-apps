import {saveComments, loadComments } from './storageHelper.js';

let commentsUI = `<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentInput" />
<button id="commentSubmit">Submit</button>
</div>
<h2>Comments</h2>
<ul id="commentList" class="commentList"></ul>`;

export default class CommentsController {


  constructor(name, type) {
    this.model = new CommentsModel(type);
    this.name = name;
  }

  // render the comments
  showComments(rootElement){
    //addCommentsUI from above
    rootElement.innerHTML = commentsUI;
    this.wireUpAddCommentButton();
    
    //render the comments themselves
    const commentParent = document.getElementById('commentList');
    const commentsView = new CommentsView(commentParent);
    commentsView.renderComments(this.model.getComments());
  }

  wireUpAddCommentButton() {
    const button = document.getElementById('commentSubmit');
    button.addEventListener('click', () => {
      let input =document.getElementById('commentInput');
      this.model.addComment(this.name, input.value);
    })
  }

  // save/load comments from local storage

}

class CommentsModel {
  #comments = [];
  #type = 'hike';
  constructor(type) {
    this.#type = type;
    this.#comments = loadComments(this.#type);
  }

  getComments() {
    return this.#comments;
  }

  getCommentsByName(name) {
    return this.#comments.filter(c => c.name === name);
  }

  addComment(name, commentText) {
    this.#comments.push({ 
      name:name, 
      date:new Date(), 
      content:commentText
    });
    
    //save comments
    saveComments(this.#type, this.#comments);
  }
} 


class CommentsView {
  #parentElement = null;
  constructor(parentElement) {
    this.#parentElement = parentElement;
  }

  renderComments(comments) {
    for(const comment of comments) {
      this.renderComment(this.#parentElement, comment);
    }
  }
  
  renderComment(parentElement, comment) {
    parentElement.innerHTML = `<li class="comment">
      <div class="comment-date">${comment.date}</div>
      <div class="comment-text">${comment.content}</div>
      </li>`;
  }
}