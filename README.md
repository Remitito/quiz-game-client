**Inquizitive**

This is the front end of the my quiz game, which was made as an alternative to sites like Bamboozle which were unaccessible in the school I was working at due to regional internet restrictions. 

**How to run**

To run it locally: 1) Clone the repo 2) Enter 'npm install' in the terminal 3) Enter 'npm run dev' in the terminal 4) Go to http://localhost:5173/ in the browser

**P.S.** you need Node 14.8+ installed, as it uses async and await at the top level which is not supported in earlier versions of Node

**Live Version**

The live version can be found at: https://inquizitive-l7wp.onrender.com

**Features**

- Users can browse existing official quizzes (made by me) or user quizzes (made by former students/colleagues)
- Users can choose between 1-4 teams and 20,30 or 40 squares
- The default settings are recommended, especially 'Bonuses': ON, as the bonuses make the game much more interesting
- Click the user icon in the navbar to make your own quiz too!

**Tech Stack**

- This app uses React on the front end, with Redux used for state management, Axios used to make calls to the Node server, and Ant Design used sparingly to speed up styling
- The back end was done using Node and Express, with Mongoose used to make interactions with MongoDB (where quizzes are stored) easier  
