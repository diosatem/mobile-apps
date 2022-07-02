import Auth from './auth.js'
import { makeRequest, Errors } from './authHelper.js';

window.onload=()=> {
  const buttonLogin = document.getElementById('btn-login');
  /*const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');*/
  const auth = new Auth(new Errors('errors'));
  buttonLogin.addEventListener('click', (event) => {
    auth.login(async () => {
      const userPosts = await makeRequest('posts', 'GET', auth.token);
      const postsParent = document.getElementById('posts');
      let postChildren = '';
      for(var post of userPosts) {
        postChildren += `<li><h2>${post.title}</h2><p>${post.content}</p></li>`;
      }
      postsParent.innerHTML = postChildren;
      console.dir(userPosts);
    });
  });
}

/*
makeRequest('login', 'POST', {
  password: 'user1',
  email: 'user1@email.com',
});*/