🚨 Suraksha Setu – Emergency Voice Alert System
<br>
📌 Table of Contents
<div align="left">

<a href="#overview">🔹 Overview</a><br>
<a href="#problem-statement">🔹 Problem Statement</a><br>
<a href="#dataset--inputs">🔹 Dataset & Inputs</a><br>
<a href="#tools--technologies">🔹 Tools & Technologies</a><br>
<a href="#project-structure">🔹 Project Structure</a><br>
<a href="#core-features">🔹 Core Features</a><br>
<a href="#logic--workflow">🔹 Logic & Workflow</a><br>
<a href="#user-interface--design">🔹 User Interface & Design</a><br>
<a href="#strengths--limitations">🔹 Strengths & Limitations</a><br>
<a href="#recommendations--future-work">🔹 Recommendations & Future Work</a><br>
<a href="#how-to-run-this-project">🔹 How to Run This Project</a><br>
<a href="#author--contact">🔹 Author & Contact</a><br>

</div>
<hr>
<a id="overview"></a> 🧠 Overview

Suraksha Setu (EVA) is an AI-powered emergency alert system that enables users to send SOS signals using voice commands, even when they cannot physically access their device.

It integrates voice recognition, background listening, and real-time GPS tracking to provide immediate assistance during critical situations.

<a id="problem-statement"></a> ⚠️ Problem Statement

In emergency scenarios:

<ul> <li>Users may not be able to unlock their phone</li> <li>Manual SOS actions are not always possible</li> <li>Time delay can result in serious consequences</li> </ul> <p><b>👉 Existing solutions rely heavily on manual interaction.</b></p>
<a id="dataset--inputs"></a> 📂 Dataset & Inputs
<ul> <li>🎙️ Voice input (keyword detection: <b>"EVA HELP ME"</b>)</li> <li>📍 GPS location data</li> <li>🎧 Background audio stream</li> <li>👤 User profile & emergency contacts</li> </ul>
<a id="tools--technologies"></a> ⚙️ Tools & Technologies
<table> <tr><th>Layer</th><th>Technology</th></tr> <tr><td>Mobile App</td><td>Flutter</td></tr> <tr><td>Backend</td><td>Spring Boot (Java)</td></tr> <tr><td>Database</td><td>MySQL / PostgreSQL</td></tr> <tr><td>AI/ML</td><td>Whisper / Google Speech API</td></tr> <tr><td>Authentication</td><td>Firebase Auth / Spring Security</td></tr> <tr><td>Notifications</td><td>Firebase Cloud Messaging</td></tr> <tr><td>Maps</td><td>Google Maps API</td></tr> </table>
<a id="project-structure"></a> 📁 Project Structure
suraksha-setu/
│
├── mobile-app/
├── backend/
├── dashboard/
└── README.md
<a id="core-features"></a> 🔥 Core Features
<ul> <li>🎙️ Voice Trigger SOS ("EVA HELP ME")</li> <li>🚨 Automatic Emergency Alerts</li> <li>📍 Real-time Location Tracking</li> <li>🆘 Manual Panic Button</li> <li>🔐 Secure Authentication</li> </ul>
<a id="logic--workflow"></a> 🔄 Logic & Workflow
<ol> <li>App listens in background 🎧</li> <li>Detects trigger phrase</li> <li>Validates using AI model</li> <li>Activates SOS 🚨</li> <li>Fetches GPS location 📍</li> <li>Sends alert to backend</li> <li>Notifies emergency contacts</li> </ol>
<a id="user-interface--design"></a> 🎨 User Interface & Design
<ul> <li>📱 Clean and minimal Flutter UI</li> <li>⚡ One-tap SOS button</li> <li>🗺️ Dashboard with real-time map view</li> <li>📊 Alert monitoring panel</li> </ul>
<a id="strengths--limitations"></a> ⚖️ Strengths & Limitations

<b>Strengths:</b>

<ul> <li>Hands-free emergency activation</li> <li>Real-time response system</li> <li>Scalable backend architecture</li> </ul>

<b>Limitations:</b>

<ul> <li>Background listening consumes battery</li> <li>Internet required for real-time alerts</li> <li>False triggers possible (without advanced AI filtering)</li> </ul>
<a id="recommendations--future-work"></a> 🚀 Recommendations & Future Work
<ul> <li>🎯 Distress sound detection</li> <li>📡 Offline alert system</li> <li>⌚ Wearable integration</li> <li>🤖 AI-based alert prioritization</li> </ul>
<a id="how-to-run-this-project"></a> ⚙️ How to Run This Project

<br>


<br>

<hr>

<h2 id="screenshots">📸 Screenshots</h2>

<hr>



<p align="center">
  <img src="assets/landing page.jpeg" width="70%"/><br>
  <b>Landing Page</b>
</p>

<br>

<p align="center">
  <img src="assets/SurakshaSetu App Onboarding Process.png" width="70%"/><br>
  <b>Onboarding Process</b>
</p>

<br>

<p align="center">
  <img src="assets/hero section.jpeg" width="70%"/><br>
  <b>Hero Section</b>
</p>
<br>
<br>

<b>⚙️ Backend Architecture</b>

cd backend
The backend of Suraksha Setu is built using Node.js, following a modular and scalable architecture. It efficiently handles real-time SOS alerts, user management, and communication between the mobile app and dashboard.

The system is structured into multiple layers to ensure clean code separation, maintainability, and scalability.
<br>

📂 Folder Structure & Description
<br>
🔹 config/

Contains configuration files for the application.

Database connection setup
Environment variables (.env)
Third-party service configurations
<br><br>
🔹 controllers/

Handles incoming HTTP requests and sends responses.

Processes API calls
Connects routes with business logic
Example: triggering SOS, user login
<br><br>
🔹 middleware/

Custom middleware functions for request processing.

Authentication & authorization
Error handling
Request validation
<br><br>
🔹 models/

Defines the data structure for the database.

User schema
SOS alert schema
Location tracking data

<br>
🔹 routes/

Defines API endpoints and maps them to controllers.

/api/auth
/api/sos
/api/user

<br>
🔹 services/

Contains core business logic of the application.

SOS alert processing
Notification handling
Integration with external APIs (maps, messaging)

<br>
🔹 utils/

Utility/helper functions used across the project.

Common reusable logic
Formatting, validations, helpers

<br>
🔥 Key Highlights
⚡ Built on Node.js for high performance and scalability
🧩 Modular architecture for easy maintenance
🔐 Secure authentication using middleware
📡 Real-time SOS handling and alert system
🔗 Clean separation of concerns (MVC + Service Layer)
<br>

<b>🎨 Frontend Architecture (React.js)</b>
cd frontend
The frontend of Suraksha Setu is developed using React.js, providing a fast, responsive, and interactive user interface for both users and administrators.
<br>
It ensures seamless communication with the backend APIs and delivers a clean, real-time dashboard experience for monitoring SOS alerts.

👨‍💻 Author & Contact

<p> <b>Harshit Srivastava</b><br> 📧 Email: your-harshitsr22@gmail.com<br> 🌐 GitHub: https://github.com/harshitsr04 </p>
