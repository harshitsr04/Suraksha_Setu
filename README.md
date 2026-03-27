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

<b>Backend:</b>

cd backend
mvn spring-boot:run

<b>Frontend:</b>

cd mobile-app
flutter run
<a id="author--contact"></a> <br>

👨‍💻 Author & Contact

<p> <b>Harshit Srivastava</b><br> 📧 Email: your-harshitsr22@gmail.com<br> 🌐 GitHub: https://github.com/harshitsr04 </p>
