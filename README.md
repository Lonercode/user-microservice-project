# user-microservice-project
>
> ***The app targets node 18.7.0***\
> link to API documentation on postman here: https://documenter.getpostman.com/view/25777649/2sA3duGZ3e

## Start here
To use the app, you would need mongodb, nodejs and npm installed.\
Both frontend, backend and database are run concurrently.


### How to set up MongoDB
> Install mongodb on your machine.\
> Refer to the <a href="https://www.mongodb.com/docs/manual/installation">*www.mongodb.com*</a> for instructions on installation for your operation system.
>Afterwards, start the mongod service in your cmd.

### How to set up Nodejs
Install nodejs from <a href="https://nodejs.org">*nodejs.org*</a>. Likewise, follow the instructions for your operating system.
#### Installation of nodejs and npm on different Operating Systems
*windows*
>Install using the link above and follow the instructions.

*macOS*
>Install nodejs and npm using Homebrew. Open the terminal and run;
```bash
    brew install node
```
*Linux*
>Use apt to install nodejs and npm. In the terminal run;
```bash
    sudo apt update
    sudo apt install nodejs npm
```
#### Testing of the endpoints in the backend 
>Move to the Backend folder and run:
```bash
    npm run test
```

### Steps to run project
1. *Clone the Repository*
``` bash 
    git clone https://github.com/Lonercode/user-microservice-project.git
    cd user-microservice-project
```

2. *Backend Setup*
```bash
    cd Backend
    npm install
```

3. *Frontend Setup*
```bash
    cd ../Frontend
    npm install
```
4. *Environment variables*
> Create a .env file using the .env.example file as a guide.
> Create your PORT and DB_URI env variables depending on your setup.

5. *Concurrency Usage (Project setup)*
>In the root of the project, run the follwing code:
```bash
    npm install
```

6. *Start the Application*
>Start both backend and frontend servers concurrentlty. In the root of the project run:
```bash
    npm run start
```