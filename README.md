
# PayPL

PayPL is a MERN Stack payment web app that allows users to sign up, sign in, and transfer money to other users. The app is styled using Tailwind CSS, with data fetching handled by Axios and input validation managed by Zod. It features JWT-based authentication for secure transactions.

## Features

- **Signup and Signin Functionality**: Create a new account or sign in to an existing account.
- **Random Money Deposit**: Upon signup or signin, a random amount of money is credited to the user's account.
- **Dashboard**: View your account balance and search for other users.
- **Send Money**: Navigate to the payments page to transfer money to other users by entering the amount to be sent.

## Tech Stack

- **Frontend**: ReactJS with Tailwind CSS for styling
- **Backend**: Node.js and Express.js
- **Database**: MongoDB with Mongoose for database management
- **Authentication**: JWT-based authentication
- **Validation**: Zod for input validation
- **Data Fetching**: Axios for API requests

## Installation

To run PayPL locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/shreyashkatkar07/PayPL.git
    cd PayPL
    ```
    
### Backend Setup

2. Open a new terminal window or tab.
3. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
4. Install backend dependencies:
    ```bash
    npm install
    ```
5. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
6. Set up your MongoDB database and update the connection string (`MONGODB_URI`) and `JWT_SECRET` in the `.env` file.
7. Start the backend server:
    ```bash
    node index.js
    ```
    Or
    ```bash
    npm start
    ```
    Note: `nodemon` is already configured. The `npm start` command uses `nodemon` under the hood, as defined in the `package.json` scripts.


### Frontend Setup

8. Open another new terminal window or tab (still in the project directory `PayPL`).
9. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
10. Install frontend dependencies:
    ```bash
    npm install
    ```
11. Start the frontend development server:
    ```bash
    npm run dev
    ```
12. Open your browser and visit [http://localhost:5173](http://localhost:5173).

## Usage

1. **Signup or Signin**: Create a new account or sign in to an existing account.
2. **Dashboard**: View your account balance and search for other users.
3. **Send Money**:
    - Search for a user to send money to.
    - Click on the 'Send Money' button.
    - Enter the amount to send on the payments page and click 'Click here to transfer'.
    - The specified amount will be debited from your account and credited to the receiver's account.

## Note

For transaction support, MongoDB must be configured as a replica set or a sharded cluster. Standalone deployments do not support transactions. If you're using MongoDB on Atlas, there's no need to worry, as all Atlas clusters are already set up as replica sets or sharded clusters. If you're managing your own standalone MongoDB instance, refer to the [MongoDB guide](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/) to convert it to a replica set.

## Status

**PayPL is currently under construction.** More features and improvements are planned, and you can expect additional pull requests in the future.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature requests, feel free to open an issue or create a pull request.

For any questions or feedback, please reach out to [shreyashkatkar04@gmail.com](mailto:shreyashkatkar04@gmail.com).
