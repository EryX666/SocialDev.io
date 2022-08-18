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
|		/:post_id/comment/create		|		POST			|Creates a new comment	|		{success: true, newComment} / Error				|
|		/:post_id/comment/:comment_id/delete	|		POST	|Deletes a comment		|		|
|		signin							|		POST			|a|a|
|		signout							|		POST			|a|	A	|

### Friends Service
The Friends service handles the social aspect of the app, adding friends, removing friends, managing friend requests etc.

``api/friends/*``

|		Route				|		Type			|		Returns								|
|		:----------:		|		:------:		|		:-------:							|
|		currentuser			|		GET				|		Current logged in user / null		|
|		register			|		POST			|		JWT user token						|
|		signin				|		POST			|		JWT user token						|
|		signout				|		POST			|		null								|

### Posts Service
The Posts service handles the user posts, from creating a post, deleting posts, getting a list of posts by user and so on.

``api/posts/*``

|		Route				|		Type			|		Returns								|
|		:----------:		|		:------:		|		:-------:							|
|		currentuser			|		GET				|		Current logged in user / null		|
|		register			|		POST			|		JWT user token						|
|		signin				|		POST			|		JWT user token						|
|		signout				|		POST			|		null								|

### Profiles Service
The Profiles service handles the user profile, editing the profile, and updating the profile info.

``api/profile/*``

|		Route				|		Type			|		Returns								|
|		:----------:		|		:------:		|		:-------:							|
|		currentuser			|		GET				|		Current logged in user / null		|
|		register			|		POST			|		JWT user token						|
|		signin				|		POST			|		JWT user token						|
|		signout				|		POST			|		null								|

### Client Service
this is the service running the react front-end, it is still a work in progress.

## How to run in cloud
First we need to change