<h1 align="center">🚨 Suraksha Setu – Emergency Voice Alert System</h1>

<h2>📌 Table of Contents</h2>
<ul>
  <li><a href="#overview">Overview</a></li>
  <li><a href="#problem-statement">Problem Statement</a></li>
  <li><a href="#dataset--inputs">Dataset & Inputs</a></li>
  <li><a href="#tools--technologies">Tools & Technologies</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
  <li><a href="#core-features">Core Features</a></li>
  <li><a href="#logic--workflow">Logic & Workflow</a></li>
  <li><a href="#user-interface--design">User Interface & Design</a></li>
  <li><a href="#strengths--limitations">Strengths & Limitations</a></li>
  <li><a href="#recommendations--future-work">Recommendations & Future Work</a></li>
  <li><a href="#how-to-run-this-project">How to Run This Project</a></li>
  <li><a href="#backend-architecture">Backend Architecture</a></li>
  <li><a href="#frontend-architecture">Frontend Architecture</a></li>
  <li><a href="#author--contact">Author & Contact</a></li>
</ul>

<hr>

<h2 id="overview">🧠 Overview</h2>
<p>
Suraksha Setu (EVA) is an AI-powered emergency alert system that enables users to send SOS signals using voice commands.
</p>

<h2 id="problem-statement">⚠️ Problem Statement</h2>
<ul>
  <li>Users may not be able to unlock their phone</li>
  <li>Manual SOS actions are not always possible</li>
  <li>Time delay can result in serious consequences</li>
</ul>

<h2 id="dataset--inputs">📂 Dataset & Inputs</h2>
<ul>
  <li>🎙️ Voice input (keyword: <b>"EVA HELP ME"</b>)</li>
  <li>📍 GPS location data</li>
  <li>🎧 Background audio stream</li>
  <li>👤 User profile & emergency contacts</li>
</ul>

<h2 id="tools--technologies">⚙️ Tools & Technologies</h2>
<table>
  <tr>
    <th>Layer</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td>Mobile App</td>
    <td>Flutter</td>
  </tr>
  <tr>
    <td>Backend</td>
    <td>Spring Boot</td>
  </tr>
  <tr>
    <td>Database</td>
    <td>MySQL / PostgreSQL</td>
  </tr>
  <tr>
    <td>AI/ML</td>
    <td>Whisper / Google Speech API</td>
  </tr>
</table>

<h2 id="project-structure">📁 Project Structure</h2>
<pre>
suraksha-setu/
├── mobile-app/
├── backend/
├── dashboard/
└── README.md
</pre>

<h2 id="core-features">🔥 Core Features</h2>
<ul>
  <li>🎙️ Voice Trigger SOS</li>
  <li>🚨 Automatic Alerts</li>
  <li>📍 Real-time Tracking</li>
</ul>

<h2 id="logic--workflow">🔄 Logic & Workflow</h2>
<ol>
  <li>App listens in background</li>
  <li>Detects trigger</li>
  <li>Activates SOS</li>
</ol>

<h2 id="user-interface--design">🎨 UI & Design</h2>
<p>Minimal Flutter UI with dashboard view</p>

<h2 id="strengths--limitations">⚖️ Strengths & Limitations</h2>
<p><b>Strengths:</b> Hands-free, Real-time</p>
<p><b>Limitations:</b> Battery usage, Internet dependency</p>

<h2 id="recommendations--future-work">🚀 Future Work</h2>
<ul>
  <li>Distress sound detection</li>
  <li>Wearable support</li>
</ul>

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

<h2 id="backend-architecture">⚙️ Backend Architecture</h2>

<p>
The backend of Suraksha Setu is built using Node.js, following a modular and scalable architecture. 
It efficiently handles real-time SOS alerts, user management, and communication between the mobile app and dashboard.
</p>

<p>
The system is structured into multiple layers to ensure clean code separation, maintainability, and scalability.
</p>

<h3>📂 Folder Structure & Description</h3>

<ul>
  <li>
    <b>🔹 config/</b>
    <ul>
      <li>Database connection setup</li>
      <li>Environment variables (.env)</li>
      <li>Third-party service configurations</li>
    </ul>
  </li>

  <li>
    <b>🔹 controllers/</b>
    <ul>
      <li>Handles incoming HTTP requests and responses</li>
      <li>Processes API calls</li>
      <li>Connects routes with business logic</li>
      <li>Example: triggering SOS, user login</li>
    </ul>
  </li>

  <li>
    <b>🔹 middleware/</b>
    <ul>
      <li>Authentication & authorization</li>
      <li>Error handling</li>
      <li>Request validation</li>
    </ul>
  </li>

  <li>
    <b>🔹 models/</b>
    <ul>
      <li>User schema</li>
      <li>SOS alert schema</li>
      <li>Location tracking data</li>
    </ul>
  </li>

  <li>
    <b>🔹 routes/</b>
    <ul>
      <li>/api/auth</li>
      <li>/api/sos</li>
      <li>/api/user</li>
    </ul>
  </li>

  <li>
    <b>🔹 services/</b>
    <ul>
      <li>SOS alert processing</li>
      <li>Notification handling</li>
      <li>Integration with external APIs (maps, messaging)</li>
    </ul>
  </li>

  <li>
    <b>🔹 utils/</b>
    <ul>
      <li>Common reusable logic</li>
      <li>Formatting, validations, helpers</li>
    </ul>
  </li>
</ul>

<h3>🔥 Key Highlights</h3>
<ul>
  <li>⚡ Built on Node.js for high performance and scalability</li>
  <li>🧩 Modular architecture for easy maintenance</li>
  <li>🔐 Secure authentication using middleware</li>
  <li>📡 Real-time SOS handling and alert system</li>
  <li>🔗 Clean separation of concerns (MVC + Service Layer)</li>
</ul>

<hr>

<h2 id="frontend-architecture">🎨 Frontend Architecture (React.js)</h2>

<p>
The frontend of Suraksha Setu is developed using React.js, providing a fast, responsive, and interactive user interface for both users and administrators.
</p>

<p>
It ensures seamless communication with the backend APIs and delivers a clean, real-time dashboard experience for monitoring SOS alerts.
</p>
<h2 id="author--contact">👨‍💻 Author & Contact</h2>

<p> <b>Harshit Srivastava</b><br> 📧 Email: your-harshitsr22@gmail.com<br> 🌐 GitHub: https://github.com/harshitsr04 </p>
