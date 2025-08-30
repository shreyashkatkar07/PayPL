# PayPL

PayPL is a full-stack digital wallet and payment web app built with the MERN stack. It allows users to sign up, log in, manage their wallet, send and request money, apply for loans, and view transaction history. The app uses Tailwind CSS for styling, JWT for authentication, and Zod for robust input validation. Payment gateway integration is provided via Razorpay.

## Features

- **User Authentication**: Secure signup and login with JWT-based authentication.
- **Wallet Management**: Add money to your wallet, view your balance, and see transaction history.
- **Send & Request Money**: Instantly transfer funds to other users or request money from them using UID, email, or phone number.
- **Transaction History**: View all your sent, received, and wallet transactions in a user-friendly dashboard.
- **Search People**: Find users by name or phone number and send/request money directly from the search results.
- **Loan Application**: Apply for loans and get the amount credited to your wallet.
- **Payment Gateway Integration**: Supports Razorpay for real and simulated transactions.
- **Responsive UI**: Modern, mobile-friendly interface built with React and Tailwind CSS.

## Tech Stack

- **Frontend**: ReactJS, Tailwind CSS, TypeScript, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT
- **Validation**: Zod
- **Data Fetching**: Axios
- **Payment Gateway**: Razorpay

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
    databaseurl=your_mongodb_uri
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    secret=your_jwt_secret
    CORS_ORIGIN=http://localhost:5173
    ```
6. Set up your MongoDB database and update the connection string (`databaseurl`), Razorpay keys (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`), JWT secret (`secret`), and allowed frontend origins (`CORS_ORIGIN`) in the `.env` file.
7. Start the backend server:
    ```bash
    node server.js
    ```
    Or
    ```bash
    npm start
    ```

### Frontend Setup

8. Open another new terminal window or tab (still in the project directory `PayPL`).
9. Navigate to the [frontend](http://_vscodecontentref_/4) directory:
    ```bash
    cd frontend
    ```
10. Install frontend dependencies:
    ```bash
    npm install
    ```
11. Create a [.env](http://_vscodecontentref_/5) file in the [frontend](http://_vscodecontentref_/6) directory and add:
    ```env
    VITE_API_BASEURL=http://localhost:3000
    ```
12. Start the frontend development server:
    ```bash
    npm run dev
    ```
13. Open your browser and visit [http://localhost:5173](http://localhost:5173).

## Usage

1. **Sign Up or Log In**: Create a new account or log in to your existing account.
2. **Wallet Dashboard**: View your wallet balance, add money, and see your transaction history.
3. **Send/Request Money**: Search for users and send/request money using UID, email, or phone number.
4. **Apply for Loan**: Use the loan section to apply for a loan and get the amount credited to your wallet.
5. **Transactions**: Track all your wallet and transfer transactions in one place.

## Note

For transaction support, MongoDB must be configured as a replica set or a sharded cluster. Standalone deployments do not support transactions. If you're using MongoDB Atlas, all clusters are already set up as replica sets or sharded clusters. For standalone MongoDB, see the [MongoDB guide](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/).

## Deployment

- **Frontend**: Can be deployed on Vercel or Netlify.
- **Backend**: Can be deployed on Render, Railway, or as a Docker container.
- **Environment Variables**: Set the above variables in your deployment dashboard for both frontend and backend.

## Status

**PayPL is currently under active development.** More features and improvements are planned. Contributions are welcome!

## Contributing

Contributions are welcome! If you have suggestions, improvements, or feature requests, please open an issue or create a pull request.

For any questions or feedback, contact [shreyashkatkar04@gmail.com](mailto:shreyashkatkar04@gmail.com).