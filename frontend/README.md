# Vidhur — AI-Powered Edge IIT-JEE Tutor

Vidhur is an AI-powered desktop application built for IIT-JEE aspirants. It generates personalized study roadmaps based on each student's preferences, such as current knowledge level, exam type (JEE Mains or Advanced), time availability, and course duration. Vidhur leverages Edge AI principles — ensuring privacy and performance by executing large language models directly on-device (Snapdragon X Elite NPU).

> Privacy-first, Intelligent-by-design, Tailored for You

---
 
## **Key Features**
 
- Personalized Roadmap Generation  
  Generate structured chapter-wise roadmaps based on:
  - Knowledge level
  - Target exam (JEE Mains / Advanced)
  - Daily time commitment
  - Duration until exam

- Dynamic Subtopic Breakdown  
  Each chapter includes intelligent subtopic generation tailored by the LLM.

- Built-in Chatbox for Doubts  
  Interact with an LLM-powered chatbot trained on IIT-JEE content (via Phi-3 API) for real-time doubt clarification.

- Edge AI Execution  
  Utilizes on-device LLM inference via Snapdragon X Elite NPU, maintaining full user data privacy.

- Lightweight Local Database  
  Uses SQLite to manage user preferences and roadmap history.

---

## **Team Members**

| Name           | Email                      |
|----------------|----------------------------|
| Akash R        | akashr6514@gmail.com       |
| Shrre Vishnu A | shreevishnu1746@gmail.com  |
| Karthik AN     | ankarthik657@gmail.com     |             
| Abhishek AN    | abhishekashok641@gmail.com |

---

## **Tech Stack**

- Frontend: Next.js, Tailwind CSS, Electron
- Backend: Node.js, SQLite
- LLM Communication: API interaction with Phi-3
- Edge Runtime: Snapdragon X Elite NPU
- AI Chatbox: Lightweight local LLM or Phi-3 (configurable)

---

## **Installation Instructions**
### Prerequisites
- Node.js ≥ v18
- npm ≥ v9 or Yarn
- Python ≥ 3.8 (for AI components)
- Tailwind CSS
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/akashr206/Vidhur.git
cd Vidhur
```

### 2. Install Dependencies (Frontend + Electron)

```bash
npm install
cd frontend
npm install
```

---

## **Running the Application**

### 1. Start the Frontend

```bash
cd frontend
npm run dev
```

### 2. Start the Desktop App

In a separate terminal:

```bash
cd electron
npm start
```

---

## **Database Information**

- Local database: SQLite
- Default location: created in runtime
- Stores: User profiles, roadmap data, chat history (optional)

No external cloud DB is used — full data stays on device.

---

## **Use Case**

Vidhur ensures equitable access to intelligent tutoring without needing cloud connectivity. Its edge-first approach ensures:
- Full data privacy
- Offline access
- Real-time performance

Perfect for remote students or low-connectivity environments preparing for competitive exams like JEE.

---

## **Hackathon Context**

- Event: Edge AI Hackathon
- Track: LLM + Edge + Privacy
- Focus: Deploying usable LLMs on-device for real-world education

---

## License

[Add your license here, if applicable. For example: MIT, Apache-2.0, etc.]

