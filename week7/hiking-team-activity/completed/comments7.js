import {saveComments, loadComments } from './storageHelper.js';

let commentUI = `<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentEntry" />
<button id="commentSubmit">Comment</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;

export default class Comments {
    constructor(type="hikes", elementID) {
        this.type = type;
        this.elementID = elementID;
        this.commentList = loadComments(this.type);
        console.log(this.commentList);
    }


  showCommentList(name = null){
    // Target the comments div and add comments as list items
    let element = document.getElementById(this.elementID);

    element.innerHTML = commentUI; // Include 'add comment' form
    if (name !== null) {
        // looking at one post, show comments and new comment button
        document.querySelector('.addComment').style.display = 'block';
        this.addSubmitListener(name);
      } else {
        // no post name provided, hide comment entry
        document.querySelector('.addComment').style.display = 'none';
      }

    let filteredList = [];

    if (name == null) {
        filteredList = this.commentList;
    }
    else {
        filteredList = this.commentList.filter(comment => comment.hikeName == name);
    }

    let listElement = element.querySelector(".comments");
    
    for (let comment of filteredList){
        const item = document.createElement('li');
    item.innerHTML = ` <div> <h2>${comment.hikeName}</h2><p>${comment.text}</p> </div>`;
    listElement.appendChild(item);
    //append comment thingy to DOM element.
    }
    
  }

  addComment(name, text) {
      // Add comment to list
      const newComment = new Comment(name, text);
      this.commentList.push(newComment);
      saveComments(this.type, this.commentList);
  }

  addSubmitListener(name) {
    // use element.ontouchend to avoid more than one listener getting attached at a time to the button.
    document.getElementById('commentSubmit').ontouchend = () => {
        // debugger;
        this.addComment(
          name,
          document.getElementById('commentEntry').value
        );
        document.getElementById('commentEntry').value = '';
        this.showCommentList(name);
      };
  }
}

class Comment {
    constructor(hikeName, text) {
        this.hikeName = hikeName;
        this.text = text;
        this.date = new Date().getTime;
    }
}