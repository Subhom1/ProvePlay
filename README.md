# ProvePlay Casino

ProvePlay Casino is a provably fair online gaming platform built with a modern tech stack. It features a transparent and secure gaming experience with instant verification of game results.
<img src="https://raw.githubusercontent.com/Subhom1/mygitsrc/refs/heads/master/src/proveplay.png" alt="ProvePlay Casino">

## Features

-   **Provably Fair Gaming**: Verify the fairness of every game outcome (Coin Flip, Dice Roll).
-   **Modern UI**: Sleek and responsive design using Tailwind CSS and Radix UI.
-   **Secure Backend**: Powered by FastAPI and MongoDB.
-   **Wallet Management**: Simulated deposit and withdrawal functionality.
-   **Game History**: Track your bets, wins, and losses.

## Tech Stack

### Frontend
-   **React 19**: UI library.
-   **Tailwind CSS**: Utility-first CSS framework.
-   **Radix UI**: Unstyled, accessible UI primitives.
-   **Lucide React**: Beautiful icons.
-   **React Router**: Client-side routing.
-   **Axios**: HTTP client.

### Backend
-   **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python.
-   **MongoDB**: NoSQL database for storing user data and game history.
-   **Motor**: Asynchronous MongoDB driver for Python.
-   **Pydantic**: Data validation using Python type hints.

## Prerequisites

-   **Node.js** (v18 or higher)
-   **Python** (v3.10 or higher)
-   **MongoDB** (running locally on default port 27017)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Subhom1/ProvePlay.git
cd ProvePlay
```

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Configure Environment Variables:
    -   Ensure you have a `.env` file in the `backend` directory (or create one):
        ```env
        MONGO_URL="mongodb://localhost:27017"
        DB_NAME="proveplay_db"
        CORS_ORIGINS="http://localhost:3000"
        ```

5.  Run the server:
    ```bash
    uvicorn server:app --reload --port 8000
    ```
    The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup

1.  Navigate to the frontend directory (open a new terminal):
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Configure Environment Variables:
    -   Ensure you have a `.env` file in the `frontend` directory:
        ```env
        REACT_APP_BACKEND_URL=http://localhost:8000
        ```

4.  Start the development server:
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will open at `http://localhost:3000`.

## Directory Structure

```
ProvePlay/
├── backend/            # FastAPI backend
│   ├── server.py       # Main application entry point
│   ├── requirements.txt
│   └── .env
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── App.js      # Main App component
│   │   └── index.css   # Global styles
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md           # Project documentation
```


