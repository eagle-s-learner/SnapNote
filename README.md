
# SnapNote

A full-stack web app to share thoughts via text and images, connect with friends, liking or comment on posts.

Tech Stack Used: SQL database, Cloudinary, React, Tailwind, Node, Express, Sequlize-cli (ORM)

## Run Locally

Clone the project

```bash
  git clone https://github.com/eagle-s-learner/SnapNote.git
```

Go to the project directory

```bash
  cd to folder in which you cloned this application
```

Open terminal for client and server both and Install dependencies

```bash
  npm install
```
create a .env file in server folder and add following details
```
PORT = 
PASSWORD_WORKBENCH = your workbench password
EMAIL_PASSWORD = your email app password to send email verification 
CLOUD_NAME = provided by cloudinary
API_KEY = provided by cloudinary
API_SECRET = provided by cloudinary
JWT_SECRET = add some secret key
```
Now similarly run command in client and server terminal

```bash
  npm run dev
```


## Features

- **SQL** as database and integrated with **Sequelize-cli** for efficient **ORM (Object-Relational Mapping)**, handling
complex queries, database migrations, and data validation seamlessly
- **Cloudinary** to store images, **React and Tailwind** are used to design the frontend, ensuring dynamic interfaces.
- Provide registration with **Email Verification** and **authentication using JWT** for secure user login management.



