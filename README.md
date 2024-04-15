# E-Commerce

A fully functional E-commerce application using Node.js, MongoDB and HTML, CSS, Javascript.<br>

This project is running live at [E-Commerce.](https://pranavtelangade.github.io/e-commerce)<br>

## To run the project locally:<br>

### Setup:

### --> MongoDB:

• Create your account on [MongoDB Atlas.](https://www.mongodb.com/cloud/atlas/register)<br>
• Create a new Cluster.<br>
• Get your connection URI from MongoDB.<br>
• Create a .env file in the backendnode folder with MONGO_URI variable.<br>

```
MONGO_URI=<your URI link>
```

### --> Local Machine:

• Use command in the `/backendnode` directory to install all dependencies.<br>

```
cd backendnode
npm install
```

• Change the `apiserver` variable in <b>`common.js`</b> file in the <b>`/docs`</b> directory to your localhost server.<br>

```
var apiserver = "http://localhost:3000"
```

• Use the `run.bat` file to run the project.
