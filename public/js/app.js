

// Using IIFE for Implementing Module Pattern to keep the Local Space for the JS Variables
(function() {
  console.log("app.js");

    //when you want your code to not be async because of the api key getting a call from the ajax!
    function getApiKey(){
      console.log("getting api key");
      var token = "";
     $.ajax({
        url: "/token",
        method: "GET",
        async: false,
        success: function(key){
      
        console.log("this is the", key);
        
        token = key;
        }
      });
      return token;
    } 

    var pusherKey = getApiKey();
    console.log("pusher key", pusherKey);
    


    var serverUrl = "/",
       comments = [],
        pusher = new Pusher(pusherKey, {
          cluster: 'us3',
          encrypted: true
        }),
        // Subscribing to the 'flash-comments' Channel
        channel = pusher.subscribe('Basher-staging'),
        commentForm = document.getElementById('comment-form'),
        commentsList = document.getElementById('comments-list'),
        commentTemplate = document.getElementById('comment-template');

    // Binding to Pusher Event on our 'flash-comments' Channel
    channel.bind('new_comment',newCommentReceived);

    // Adding to Comment Form Submit Event
    commentForm.addEventListener("submit", addNewComment);

    // New Comment Receive Event Handler
    // We will take the Comment Template, replace placeholders & append to commentsList
    function newCommentReceived(data){
      //debugger;
      console.log(`message received`);
      
      console.log(data.name);
      console.log(data.comment);
      
      
      var newCommentHtml = commentTemplate.innerHTML.replace('_name_',data.name);

      newCommentHtml = newCommentHtml.replace('_email_',data.email);
      newCommentHtml = newCommentHtml.replace('_comment_',data.comment);
      
      var newCommentNode = document.createElement('div');
      newCommentNode.classList.add('comment');
      newCommentNode.innerHTML = newCommentHtml;
      commentsList.appendChild(newCommentNode);
    }

    function addNewComment(event){
      event.preventDefault();
      var newComment = {
        "name": document.getElementById('new_comment_name').value,
        "email": document.getElementById('new_comment_email').value,
        "comment": document.getElementById('new_comment_text').value
        
      }
      

      var xhr = new XMLHttpRequest();
      xhr.open("POST", serverUrl+"comment", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200) return;

        // On Success of creating a new Comment
        console.log("Success: " + xhr.responseText);
        commentForm.reset();
      };
      xhr.send(JSON.stringify(newComment));
    }

})();