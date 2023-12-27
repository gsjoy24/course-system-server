## Instructions on how to run the application locally 📝

- 1️⃣ Clone the repository to your machine if you have the access. Use this link to do it.
  ↦ https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-gsjoy24
- 2️⃣ Open the project in vs code and create a file named .env in the root of the folder.
- 3️⃣ Add the code bellow in the .env file

```

PORT=5000
DATABASE_URL=mongodb+srv://admin-gsj:2O0rnkiIrIGr2L7Q@cluster0.nbdk5o7.mongodb.net/assignment-3?retryWrites=true&w=majority

```

- 4️⃣ Open the command prompt on the project path or terminal on the vs code by pressing Ctrl + `
- 5️⃣ Run the command 'npm i' or 'npm install' to install all the necessary dependencies.
- 6️⃣ To run the server on http://localhost:5000, run the command 'npm run start:dev'. if the server is running, you will see the code bellow on your machine.

```

// on terminal
the server is running on port 5000

// on http://localhost:5000/
  {
    success: true,
    message: 'Server is running!',
  }

```

- 7️⃣ To run the production version, run the command 'npm run build' to build the the project. After complete the build process, run 'npm run start:prod' to run the build or production version on the localhost.
- 8️⃣ You can run the command 'npm run lint' to see if there is any errors on my code. You will see 4 warnings only for console.

Now you can do all the CRUD operations that was required for the assignment. I will recommend you to see the package.json file to see all the commands.
This server is deployed on vercel, the link is ↦ https://l2-assingment-4.vercel.app
