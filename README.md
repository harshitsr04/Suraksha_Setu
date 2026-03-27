🚨 Suraksha Setu – AI Powered Emergency Voice Alert System
📌 Table of Contents
Overview
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
  <li><a href="#author--contact">Author & Contact</a></li>
</ul>

🧠 Overview

Suraksha Setu (EVA – Emergency Voice Assistant) is a smart emergency response system that allows users to send SOS alerts using voice commands, even when they cannot physically access their phones.

It combines AI-based voice detection, real-time location tracking, and instant alert systems to provide rapid assistance during critical situations.

⚠️ Problem Statement

In emergency situations:

Victims may not be able to unlock their phone
Manual SOS actions may not be possible
Time delay can cost lives

👉 Existing solutions depend heavily on manual interaction, making them unreliable in real emergencies.

💡 Proposed Solution

Suraksha Setu introduces:

🎙️ Voice-triggered SOS system
📡 Background listening mechanism
📍 Real-time GPS tracking
🚨 Instant alert delivery

All combined into a fully automated emergency response system.

🔥 Key Features
🎙️ Voice Trigger Detection
Trigger phrase: “EVA HELP ME”
Works in:
Background mode
Locked screen state
Uses:
Speech-to-text processing
Loudness threshold (~75–80 dB)
AI-based filtering
🚨 Smart SOS Alert System

On trigger:

Sends 📍 live location
Sends 💬 emergency message
Sends 🎧 optional audio snippet
Alerts:
Family
Friends
Authorities
📍 Live Location Tracking
Continuous GPS updates
Real-time monitoring via dashboard
🆘 Manual SOS Button
One-tap emergency trigger inside app
🔐 Secure Authentication
Firebase Auth / Spring Security
Google Sign-In support
🏗️ System Architecture
User Voice Input
      ↓
Flutter Mobile App
      ↓
Voice Detection Engine (AI/ML)
      ↓
Spring Boot Backend (REST APIs)
      ↓
Database (MySQL/PostgreSQL)
      ↓
Web Dashboard (React)
      ↓
Emergency Contacts / Authorities
⚙️ Tech Stack
Layer	Technology	Purpose
Mobile	Flutter	UI + Voice Detection
Backend	Spring Boot (Java)	API & Logic
Database	MySQL / PostgreSQL	Data storage
AI/ML	Whisper / Google Speech API	Voice recognition
Auth	Firebase / Spring Security	Authentication
Notifications	Firebase Cloud Messaging	Alerts
Maps	Google Maps API	Location tracking
Deployment	Docker / AWS / Render	Hosting
🔄 Workflow
App runs in background 🎧
Detects “EVA HELP ME”
Confirms via AI model
Activates SOS 🚨
Fetches GPS 📍
Sends alert to backend
Backend:
Stores event
Sends notifications
Dashboard displays alert in real-time
🔗 API Endpoints
Endpoint	Method	Description
/api/auth/register	POST	Register user
/api/auth/login	POST	Login
/api/sos/trigger	POST	Trigger SOS
/api/sos/getAll	GET	Fetch alerts
/api/user/{id}	GET	User info
/api/location/update	POST	Update location
📂 Project Structure
suraksha-setu/
│
├── mobile-app/
│   ├── lib/
│   ├── assets/
│   └── main.dart
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
│
├── dashboard/
│   ├── components/
│   ├── pages/
│   └── services/
│
└── README.md
⚙️ Installation Guide
Backend
cd backend
mvn clean install
mvn spring-boot:run
Flutter App
cd mobile-app
flutter pub get
flutter run
Dashboard
cd dashboard
npm install
npm start
⚡ Hackathon MVP
✅ Voice trigger working
✅ SOS alert system
✅ GPS location sharing
✅ Basic dashboard
🚀 Future Enhancements
🎯 Distress sound recognition
📡 Offline SOS mode
⌚ Smartwatch integration
🤖 AI risk-level prioritization
🛰️ Satellite-based alerts
📸 Screenshots

Add your app screenshots here
Example:

App UI
SOS Trigger
Dashboard View
🧾 Conclusion

Suraksha Setu is designed to save lives when users cannot act.
It bridges the gap between inability and immediate response using AI and automation.

⭐ If you like this project

Give it a ⭐ on GitHub and support innovation in safety tech!
