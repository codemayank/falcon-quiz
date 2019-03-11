# Question 2 and 3 answers

- Question1 : Create a node.js server with an HTTP POST endpoint which writes data to MongoDB
  (use mLab or local MongoDB deployment). In this particular case, consider that the
  request body contains user account related information (name, email, password,
  address, phone, DOB, etc.) and use this information to create a user account in
  MongoDB database in the ‘user’ collection as a document. Use validation to validate
  data in the request body.
  Note: User accounts have unique email and phone number combination

- Question2 : Add contacts to user accounts created in the previous problem (create separate
  collection for contacts and store reference of contact document in user document)
  and delete them on user deletion using pre and post hooks.

## Solution

I have used the Koa framework to create the node.js server. Mongoose to connect with the mongodb database. Data is stored on the local data base.

### API Endpoints-

- get - /:id - api to get user data
- post - /create-user - api to create new user
  request body should contain following parameters

```json
  {
    "name" : ,
    "email" : ,
    "mobileNo" : ,//indian phone numbers only
    "address" : ,
    "dob" : ,
    "pasword" :
  }

```

- delete - /delete-user/:id delete user
- post - /add-contact add new contact
  request body should contain following parameters

```json
    {
	"name" : ,
	"phone" : ,
	"userId" : //valid mongodb id
    }
```

### Assumptions

I have assumed here that contacts collection will contain duplicate data.

### Notes

Please create .env file and assign the url of mongodb to the MONGODB_URI variable.

## By

### Mayank Yadav
