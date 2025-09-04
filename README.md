
# EspressoChat EspressoChat

EspressoChat is a **real-time chat application** built with **React** and **Socket.IO**. 
It allows users to join multiple chat rooms and communicate instantly.

## Features 
- Real-time messaging using Socket.IO
- Multiple chat rooms with dynamic room creation
- Room-based message history stored in memory
- Simple mock Google login
- Room joining with message history loading
- Clean  UI

## Setup Instructions 
### Prerequisites 
- Node.js (v16 or higher)
- npm or yarn

### Installation 
1. Clone the repository:
```bash
git clone https://github.com/MayaGreber/EspressoChat.git
cd EspressoChat
```
2. Install dependencies and start both servers: 
- Backend
```bash
cd server
npm install
node server.js
```
- Frontend (in a new terminal)
```bash
cd client
npm install
npm run dev
```
### Available Scripts 
* npm run dev - Launch frontend application 
* node server.js - Launch backend server 


## Architecture Overview 

### Frontend 
- **React + TypeScript** for type safety and component structure
- **Context API** for state management (Chat & Socket contexts)
- **Custom hooks** (useChat, useSocket) for cleaner data access
- **Component-based structure:**
- **Login** – Mock authentication interface
- **Sidebar** – Room management and user info
- **Chat** – Main chat container
- **MessagesArea** – Displays messages
- **MessageInput** – Message composition
- **ChatHeader** – Displays room information


### Backend 
- **Express.js** server
- **Socket.IO** for real-time communication
- **In-memory storage** for chat rooms and message history
- Room-based messaging with automatic history delivery


## Data Flow 
1. User authenticates (mock) and joins the app
2. Socket connection is established
3. User can create/join rooms dynamically
4. Messages are broadcast to all users in the room
5. Message history is delivered when joining


## Future Improvements

- Improve security and authentication by implementing real Google OAuth login.  
- Add persistent data storage by integrating a database (MongoDB/PostgreSQL).  
- Enhance user experience with features such as typing indicators, message timestamps, and user profile.  
- Increase performance and scalability by supporting large chat histories and message pagination.  
- Improve code quality and reliability with comprehensive tests (Jest & Cypress) and proper error handling.
