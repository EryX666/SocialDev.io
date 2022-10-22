# Socialdev.io
Socialdev.io is a mock implementation of a social network such as facebook/twitter/instagram but for code developers.
The backend is built using microservices architecture such that every service doesnt affects the rest of the API and has 0 knowladge or ties to the other services and runs completly on its own accord.

##Prerequisites
###running locally:
- Docker desktop with the Kubernetes setting on
- Skaffold installed
- A running MongoDB database(i used MongoDB Atlas cloud service)

###running in cloud:
- check out this section [How to run in cloud]()

##install



## API schema
### Auth Service
the Auth service manages everything that has to do with the authentication side of the app, from the current logged in user to actually registering, logging in and signing out users.

``api/auth/*``

|		Route				|		Type			|		Description		|		Returns								|
|		:----------:		|		:------:		|		:------:		|		:-------:							|
|		/currentuser		|		GET				|Gets current logged in user|		Current logged in user / null		|
|		/register			|		POST			|Registers a user|		JWT user token						|
|		/signin				|		POST			|Signs a user in|		JWT user token						|
|		/signout			|		POST			|Sign a user out|		null								|

### Comments Service
The Comments service handles everything that has to di with comments, either on posts, likes on comments and embedded comments(comments on comments)

``api/post-comments/*``

|		Route							|		Type			|		Description		|		Returns								|
|		:----------:					|		:------:		|		:------:		|		:-------:							|
|/:post_id/comment/create				|		POST			|Creates a new comment	|		{success: true, newComment} / Error				|
|/:post_id/comment/:comment_id/delete	|		DELETE			|Deletes a comment		|		{commentSection} after deletion / Error|
|/:post_id/comment/:comment_id/edit		|		PUT				|Edit a comment on a post|{ success: true, newComment } / Error|
|/:post_id/comment/:comment_id/like		|		POST			|Like or unlike a comment|	{ success: true, newComment} / Error	|

##### Embedded comments
this routes site under the comments service as a sub-service handling whats known as "embedded comment" - comments on comments just like in facebook where you have a comment heirarchy tree

|		Route							|		Type			|		Description		|		Returns								|
|		:----------:					|		:------:		|		:------:		|		:-------:							|
|/:post_id/comment/:comment_id/embedded/create|		POST	|Creates a new embedded comment - a comment on a comment|{success: true, newComment} / Error|
|/:post_id/comment/:comment_id/embedded/deletee	|	DELETE	|	Deletes an embedded comment	|{success: true, embdCommentsArray} / Error|
|/:post_id/comment/:comment_id/embedded/edit	|		PUT				|Edit an embedded comment|{success: true, embdCommentsArray} / Error|
|/:post_id/comment/:comment_id/embedded/like	|		POST			|Like or unlike an embedded comment|{success: true, embdCommentsArray} / Error	|


### Friends Service
The Friends service handles the social aspect of the app, adding friends, removing friends, managing friend requests etc.

``api/friends/*``

|		Route				|		Type			|		Description		|		Returns								|
|		:----------:		|		:------:		|		:------:		|		:-------:							|
|	/answer_friend_request/:userA_Id/:answer	|	POST	|	User B answer to User A friend request	|{ success: true, userA, userB } / Error|
|	/cancel_friendship/:userB_id	|	POST	|	User A cancel a friendship with User B	|{success: true, userA: userA_FriendsList, userB: userB_FriendsList }|
|	/send_friend_request/:userB_id	|	POST	|User A sends a friend request to User B / User A unsends a sent request to User B|{success: true/false, message: "Friend request sent/unsent successfully"}|
|	/:user_id/friends_list	|	GET	|Get friends list by user_id|		[{friend1}, {friend2}] / [] 		|
|	/sent_requests_list	|	GET	|Get current user sent friend-request list|		[{sentRequest1}, {sentRequest2}] / []		|
|	/:user_id/received_requests_list	|	GET	|Get current user received friend-requests list|		[{receivedRequest1}, {receivedRequest2}] / []		|

### Posts Service
The Posts service handles the user posts, from creating a post, deleting posts, getting a list of posts by user and so on.

``api/posts/*``

|		Route				|		Type			|		Description		|		Returns								|
|		:----------:		|		:------:		|		:------:		|		:-------:							|
|		/create				|		POST			|Creates a new user post|		{sucess: true/false, newPost?}		|
|		/:post_id/delete	|		DELETE			|	Delete a user post	|	{ success: true/false, deletedPost }	|
|		/:post_id/edit		|		PUT				|	Edit a user post	|	{ success: true/false, updatedPost }	|
|		/:post_id/like		|		POST			|Like/Unlike a user post|				{post}						|
|		/:post_id			|		GET				|Get a post by its Id	|				{post}						|
|		/					|		GET				|Gets all posts in DB	|				{posts}						|

### Profiles Service
The Profiles service handles the user profile, editing the profile, and updating the profile info.

``api/profile/*``

|		Route					|		Type			|		Description								|		Returns			|
|		:----------:			|		:------:		|		:------:								|		:-------:		|
|		/current				|		GET				|		Returns current profile					|		{profile}		|
|		/edit					|		PUT				|		Edits current profile					|		{profile}		|
|		/experience/add			|		POST			|		Adds a new experience					|		{profile}		|
|/experience/:experience_id/edit|		PUT				|		Edit an experience based on its Id		|		{profile}		|
|/experience/:experience_id/delete|		DELETE			|		Delete experience based on its Id		|		{NewProfile}	|
|		/handle/:handle			|		GET				|		Get profile by handle					|		{profile}		|
|			/:user_id			|		GET				|		Get profile by user_id					|		{profile}		|
|				/				|		GET				|		Get all profiles in DB					|		{profiles}		|


### Client Service
this is the service running the react front-end, it is still a work in progress.

## How to run in cloud
First we need to change

