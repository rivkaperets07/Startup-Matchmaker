# 🚀 Startup Matchmaker & Interest Hub

A Fullstack web application designed to connect innovative startups with talented individuals, developers, and potential investors. The platform allows entrepreneurs to showcase their ideas and manage incoming join requests seamlessly.

## ✨ Features
- **Startup Management:** Create, edit, and view dynamic startup profiles.
- **Interest Request System:** Users can submit detailed joining requests (Partners, Developers, Investors) with contact information.
- **Smart Management Dashboard:** Entrepreneurs can accept/reject applications. Approving an applicant automatically updates the startup's live member count (`membersCount`).
- **Secure Backend:** Full implementation of Mongoose `populate` for data relations, sessions, and route protection.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas & Mongoose
- **Frontend:** EJS (Embedded JavaScript templates), Semantic HTML, CSS3

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rivkaperets07/Startup-Matchmaker.git
   cd Startup-Matchmaker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```env
   MONGO_URI=<your MongoDB connection string>
   JWT_SECRET=<any long random string>
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The app runs at http://localhost:3000.
