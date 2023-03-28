# Tutorial - 5

* Date Created: 15 MAR 2023
* Render.com URL: https://api-t7.onrender.com/
* Git URL: https://git.cs.dal.ca/jagata/web-t7

## Authors

* Guru Kiran - gkiran@dal.ca (B00917973)

## Prerequisites

* Visual Studio code Installation : 'https://code.visualstudio.com/download'
* Mongoosejs : https://mongoosejs.com/
* Expressjs : https://expressjs.com/
* Nodejs : https://nodejs.org/en

## Installing

- By creating a local folder, clone the project into the folder.
- Open the project in VS Code.
- To install dependencies of the application, run command `npm install`
- To start the node js server run `node index.js`

## Deployment

* Pushed code on a Github repository.
* Connected github repository with render.com account.
* Project is built on render.com.
* App Successfully Deployed.

## Built With

* Node.js - Framework to create server-side web applications.
* ExpressJs - Framework to build a single page, multipage, and hybrid web application.

## Endpoints for testing

- GET - https://api-t7.onrender.com/users
  ```
    {
        "message": "Users retrieved",
        "success": true,
        "users": [
            {
                "_id": "642253777b8fc35cabb64ecb",
                "email": "xyz@dal.ca",
                "firstName": "abc"
            },
            {
                "_id": "64225882be2f224c0b28a11a",
                "email": "lms@dal.ca",
                "firstName": "lmq"
            },
            {
                "_id": "64225beacd5dd69851f3f27b",
                "email": "test@dal.ca",
                "firstName": "test"
            }
        ]
    }
  ```
- PUT - https://api-t7.onrender.com/update/64225beacd5dd69851f3f27b
  ```
  # JSON Body
  {
    "email": "qrst@dal.ca",
    "firstName": "qrst"
  }

  # Output
  {
    "message": "User udpated",
    "success": true
  }
  ```
  When ID is not found the response would be `{"message": "User not found with ID #. ", "success": false}`.

- POST - https://api-t5.onrender.com/add
  ```
  # JSON Body
  {
    "email": "qwe@dal.ca",
    "firstName": "qwe"
  }

  #Output
  {
    "message": "User added",
    "success": true
  }
  ```
  When params of the JSON body are wrong then the response would be `{"message": "User not added. Please provide both email and firstName", "success": false}`.

- GET - https://api-t5.onrender.com/users/2
  ```
  {
    "success": true,
    "user": {
        "email": "qwe@dal.ca",
        "firstName": "qwe",
        "id": 2
    }
  }
  ```
  When ID is not found then the response would be `{"success": false, "message": "ID not found"}`.

