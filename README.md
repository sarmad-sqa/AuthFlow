AuthFlow

Full-Stack Signup & Login Application

AuthFlow is a web application built with React, Node.js, Express.js, and Turso. It includes a complete signup flow and a working login API with password verification, deployed on Vercel (frontend + API).

🚀 Features

Signup





User registration using React.



Express.js Signup API integration.



Turso database connectivity using LibSQL.



Password hashing using bcrypt.



Required field validation.



Terms & Conditions validation.



Duplicate email handling.



Success and error notifications.



Form reset after successful registration.



Backend error handling.

Login





Login page UI built with React.



Signup and Login page navigation.



Password visibility toggle.



Login backend API (POST /login) with email lookup and bcrypt password compare.



Credential verification with generic 401 messages for missing user or wrong password.



Success toast after a valid login.

🛠️ Tech Stack







Technology



Purpose





React.js



Frontend development





Node.js



Backend runtime





Express.js



REST API





Turso



Database





LibSQL



Database connectivity





bcrypt



Password hashing





Playwright



End-to-end testing





React Testing Library



Component testing





GitHub Actions



CI/CD automation





Vercel



Frontend + API hosting





Git & GitHub



Version control

📁 Project Structure

authflow/
├── .github/
│   └── workflows/
│       ├── main.yml
│       └── playwright.yml
├── public/
├── scripts/
│   └── start-e2e.js
├── server/
│   ├── db.js
│   ├── index.js
│   ├── vercel.json
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── api.js
│   ├── App.js
│   ├── App.test.js
│   └── Login.js
├── tests/
│   ├── SignUp.spec.js
│   └── example.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js

⚙️ Installation & Setup

1. Clone the Repository

git clone https://github.com/sarmad-sqa/AuthFlow.git
cd AuthFlow

2. Install Frontend Dependencies

npm ci

3. Install Backend Dependencies

npm ci --prefix server

4. Configure Environment Variables

Create a .env file inside the server directory.

TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token

Optional frontend env (project root) for local API base URL:

REACT_APP_API_URL=http://localhost:3001

Never commit environment files or expose database credentials publicly.

▶️ Run Locally

Start Backend

cd server
$env:PORT=3001
npm start

Backend: http://localhost:3001

Start Frontend

Open another terminal in the project root:

npm start

Frontend: http://localhost:3000/authflow (or the port CRA prints)

🧪 Testing

React Tests

npm test -- --watchAll=false

Playwright E2E Tests

npm run test:e2e

Configured browsers:





Chromium



Firefox



WebKit

Production Build

npm run build

🔄 CI/CD Pipeline

GitHub Actions automates the project's testing and build processes.

React CI Pipeline





Installs dependencies.



Runs React component tests.



Generates an optimized production build.



Deploys the frontend to GitHub Pages.

Playwright Tests





Installs frontend and backend dependencies.



Installs Playwright browsers.



Uses GitHub Secrets for Turso credentials.



Executes automated cross-browser tests.



Uploads HTML test reports as workflow artifacts.

🌐 Live Demo





Frontend: https://auth-flow-flame.vercel.app



API: https://auth-flow-kvyy.vercel.app

Signup and login both call the live Express API (Turso-backed). Local development uses REACT_APP_API_URL / the default http://localhost:3001.

👨‍💻 Author

Sarmad Sarwar

Executive SQA Engineer | Software Quality Assurance | Test Automation





GitHub: @sarmad-sqa



⭐ Feel free to explore the project and its implementation.