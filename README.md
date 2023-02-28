
# Sector test - backend

## Main route:

https://sector-test.herokuapp.com/

## Description:

REST API for registration users profiles with file storage option, linked with SQL database.
  
## Technologies:
- API: node.js, express, mysql2, sequelize, joi, celebrate, nanoid, bcrypt, jsonwebtoken, multer, sharp, 

## How to run:

```
npm i
npm run start
```

### Endpoints.

#### Public endpoints:

##### For user registration:
  	
  - POST **"/user/register"**. It receive **name**, **email** and **password** to register a new user account. Beyond that, there are optional values. If this are not received, they are assigned to default values.

  Accepted values are validated for:
   - email, string, required, email verification, unique in database
   - password, string, required, string check, length check (min 5, max 30)
   - name, string, required, length check (min 2, max 30)

  After sending request, account information are stored in the database, with hashed password and unique ID, and returned in response.

Request example:
```
  {
    "name: "Maxim",
    "email": "sipus2006@yandex.ru",
    "password": "qwerty123456"
  }
```
Response example:
```
  {
    "Number": 52,
    "Email": "sipus2006@yandex.ru",
    "Name": "Maxim",
    "ID": "pGx389RpOD",
    "RegDate": "2023-02-28T15:51:47.000Z"
  }
```
##### For authentication:
  - POST "/user/login". Takes the login and password for the authentication of an already registered user. Returns a Bearer token.
 
Request example:
```
	{
      "login": "sipus2006@yandex.ru",
      "password": "qwerty123456"
    }
```
Response example:
```
    {
      "token": "eyJhbGciOiJIUzI..."
    }
```

#### Private endpoints:
  
  Access requires "Bearer authentication" in "Authorization" header field :
```
  "Authorization" : "Bearer eyJhbGciOiJIUzI..."
```
If token not valid or user not exist, error 401 are returned.

##### For get array with list of all users:
  GET /profiles?page=1

Route works with pagination, return 10 user by one request.

##### For get user by ID:
  GET /profile/[id]

Route return certain user information.
```
  {
    "number": 1,
    "id": "jYZbdFkd0k",
    "name": "Maxim",
    "surname": null,
    "email": "sipus2066@yandex.ru",
    "gender": "male",
    "photo": "jYZbdFkd0k.jpg",
    "thumbnail": "jYZbdFkd0k.jpg",
    "createdAt": "2023-02-28T16:58:14.000Z",
    "updatedAt": "2023-02-28T19:42:05.000Z"
  }
```
##### For update current user info:
  PUT /profile/[id]
  
  For update photo, request must be send via form-data method,
  Request can be contain the following values:
  
   - email, string, required, email verification, unique in database
   - name, string, required, length check (min 2, max 30)
   - surname, string, length check (min 2, max 30)
   - gender, string, must be 'male' or 'female'
   - photo, must be '.jpg', '.jpeg' or '.png', less than 10mb
  
  In addition to this, request with file must be contain current mime-type: 'image/png', 'image/jpeg', 'image/jpg'
  If file has been attached, it create 100x100 pixels thumbnail.
  Both files stores in 'uploads' folder, and renames to user id title. Titles adds to database as "file" value. 
  Images shares on server public folder: 
   - original image in 'uploads\originals'
   - thumbnails in 'uploads\thumbnails'
 
 Response return only edited values.