# Community Connect

Community Connect is a modern, user-friendly web application designed to bring people together through local activities, workshops, meetups, social events, and volunteering opportunities. It allows users to create, discover, and participate in community-based events.

## Features

*   **User Authentication:** Secure sign-up and login utilizing JSON Web Tokens (JWT).
*   **Event Creation:** Registered users can host events, specifying details such as title, description, date/time, location, category, and maximum participants constraint.
*   **Event Discovery:** A searchable and filterable explore page displaying upcoming events.
*   **Event Participation:** Users can join or leave events seamlessly.
*   **User Dashboard:** A personalized space where users can manage the events they are hosting and track the events they plan to attend.
*   **Modern UI:** A sleek, responsive dark-themed user interface built with Tailwind CSS.

## Tech Stack

**Frontend:**
*   [Next.js 15](https://nextjs.org/) (App Router)
*   [React](https://reactjs.org/)
*   [Tailwind CSS (v4)](https://tailwindcss.com/)
*   [Axios](https://axios-http.com/) (Data Fetching)
*   [React Hot Toast](https://react-hot-toast.com/) (Notifications)
*   [Lucide React](https://lucide.dev/) (Icons)

**Backend:**
*   [Node.js](https://nodejs.org/)
*   [Express.js](https://expressjs.com/)
*   [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (Database)
*   [JSON Web Tokens (JWT)](https://jwt.io/) (Authentication)
*   [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) (Password Hashing)

## Getting Started

### Prerequisites

*   **Node.js** (v18+ recommended)
*   **MongoDB:** Ensure you have a local MongoDB instance running or a MongoDB Atlas connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/community-connect.git
    cd community-connect
    ```

2.  **Setup the Backend:**
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory and configure the following variables:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/com-connect
    JWT_SECRET=your_jwt_secret_key
    ```

3.  **Setup the Frontend:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    cd server
    npm run dev
    ```
    *(The backend runs on http://localhost:5000 by default)*

2.  **Start the Frontend Next.js Server:**
    ```bash
    cd client
    npm run dev
    ```
    *(The frontend runs on http://localhost:3000 by default)*

3.  **Open your browser:** Navigate to `http://localhost:3000` to interact with Community Connect!

## License

This project is open-source and available under the ISC License.
