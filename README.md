# Final-Project LOST & FOUND Server Side

You can save the location of all your items, and when you search them, the app can take you to the item.
This repository contains the source code for the Lost & Found SERVER. It's built using Node.js, Express.js, and MongoDB.

### Diagram
![final-project-diagram-screenshot](https://user-images.githubusercontent.com/53153372/232776235-6f688fea-5643-4c5c-ada2-71e55dcd8cd4.png)

## Getting Started

To get started with this project, clone the repository:

```bash
git https://github.com/MrBennySolomon/lost-and-found-server.git
```

## Prerequisites
Make sure you have Node.js installed on your system.

#### MongoDB Atlas

To run this project, you'll also need to have a MongoDB Atlas account and create a project for this project in MongoDB Atlas. Once you have created a project in MongoDB Atlas, you can obtain your MongoDB URI, which you will need to set as an environment variable in the `config.env` file to connect to your database. See the [Local Environment Variables](#local-environment-variables) section in this README for more information.

## Installation
After cloning the repository, run the following command to install the required dependencies:

```bash
npm install
```

## Local Environment Variables
In order to run the project locally, you'll need to set some environment variables. Create a `config` folder in the root directory of the project, and add a file named `config.env` with the following variables:

```env
MONGO_URI=<Your MongoDB URI>
PORT=
NODE_ENV=
JWT_SECRET=
JWT_EXPIRE=
JWT_COOKIE_EXPIRE=
```

Make sure to replace `<Your MongoDB URI>` with the actual URI for your MongoDB instance.

## Running the Project
To start the server in development mode with nodemon, run the following command:

```bash
npm run dev
```

The server should now be running on `http://localhost:5000`.

## License
This project is licensed under the MIT License.
