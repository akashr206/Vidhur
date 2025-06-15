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
- Local SQL Database  
  Uses SQLite to manage roadmaps, chapters, etc.

---

## **Team Members**

| Name           | Email                      |
|----------------|----------------------------|
| Akash R        | akashr6514@gmail.com       |
| Shree Vishnu A | shreevishnu1746@gmail.com  |
| Karthik AN     | ankarthik657@gmail.com     |             
| Abhishek AN    | abhishekashok641@gmail.com |

---

## **Tech Stack**

- Frontend: Next.js, Tailwind CSS, Electron
- Backend: Next.js Server components, SQLite
- LLM Communication: AnythingLLM APIs
- LLM Used : Phi-3.5 mini instruct 4k
- RAG : Anything LLM Integrated RAG
- LLM Provider : Qualcomm NPU Execution Provider
- Edge Runtime: Snapdragon X Elite NPU

---

## **Installation Instructions**

# Installation Instructions for Vidhur

Welcome to **Vidhur** – an AI-powered course and doubt-solving platform designed for offline use using Anything LLM. Follow these step-by-step instructions to get everything up and running smoothly.

---

## Prerequisites

Make sure the following tools are installed on your machine before you begin:

| Tool           | Minimum Version | Install Guide                     |
|----------------|------------------|-----------------------------------|
| Node.js        | v20 or above     | Comes with npm                    |
| npm or Yarn    | v10 or above     | You can use either                |
| Git            | Any stable version | Required to clone the repository |
| Anything LLM   | ARM-based setup  | Must be installed and running locally |

> **Note**: If you’re using a Mac with an M1/M2 chip or a Raspberry Pi, you’re already on an ARM-based system.

---

## 1. Clone the Repository

Use Git to clone the project repository from GitHub:

```bash
git clone https://github.com/akashr206/Vidhur.git
```

Navigate into the project directory:

```bash
cd Vidhur
```

---

## 2. Install Dependencies

This project contains two parts: the Electron main app and the Next.js frontend.

### Install root-level dependencies

In the root directory:

```bash
npm install
```

This installs packages required for the Electron shell.

### Install frontend dependencies

Now go into the frontend folder:

```bash
cd frontend
npm install
```

This will install all the required packages for the Next.js frontend, including component libraries, router.


### **Running the Application**


Follow these steps to configure and run the Vidhur app locally using Anything LLM as the backend.

---

### Step 1: Install and Set up the Anything LLM App

 - Choose Qualcomm QNN or AnythingLLM NPU when prompted to choose an LLM provider to target the NPU
 - Choose a model of your choice when prompted. Preffered model is Phi-3.5 mini instruct 4k.
 - Create a workspace by clicking "+ New Workspace"
 - Generate an API key
 1. Click the settings button on the bottom of the left panel
 2. Open the "Tools" dropdown
 3. Click "Developer API"
 4. Click "Generate New API Key"

### Step 2: Configure the Application

Navigate to the frontend directory:

```bash
cd frontend/config
```

You’ll find a configuration file named `config.yaml` Open it and update the following fields:

```yaml
baseURL : "http://localhost:3001/api/v1"
workspaceSlug : "your-workspace-slug"
API_KEY : "your-api-key";
```

### How to Get Workspace Slug

1. Head to root directory of the project.
2. Open Slug.js and paste your API_KEY at Authorization section
4. Run the Slug.js by running
```bash 
  node slug.js
```

5. Copy the workspace slug.
6. Paste the values in config file as said above.


---
### Step 3: Setup RAG in AnythingLLM
To enable context-aware answers using your own IIT-JEE materials, we’ll set up RAG (Retrieval-Augmented Generation) inside AnythingLLM. This allows the system to fetch relevant content from your documents before generating a response, making the chatbot smarter and syllabus-specific.

- Download all the files required from here [Download](https://drive.google.com/drive/folders/11G7iCv6YCsRUAhMnW7YoPjySFvXe_c5Q?usp=drive_link).
- Open the AnythingLLM desktop app.
- Hover the workspace you are using and select upload files.
- Upload all the files downloaded


---

## Step 4: Launch the Application

Once configuration is done, return to the root directory:

```bash
cd ..
```

Now, start the Electron app:

```bash
npm start
```

This will:

- Launch the Electron window  
- Load the Next.JS frontend  
- Connect to your configured Anything LLM instance for real-time IIT-JEE doubt solving

---

## You're Ready to Go!

Your personalized AI IIT JEE TUTOR is now up and running using RAG and Anything LLM.


---

## **Database Information**

- Local database: SQLite
- VectorDB: LanceDB
- Embedder: Anything LLM NPU Embedder

No external cloud DB is used — full data stays on device.

---

# Use Case: Empowering Offline Education with Vidhur

Vidhur is designed with one bold mission in mind:

> "Make AI-driven learning accessible and private for every student — even without internet access."

In today’s world, most intelligent tutoring platforms rely heavily on the cloud, demanding constant internet access and raising privacy concerns. But not everyone has the luxury of high-speed connectivity — especially students in rural or underprivileged areas.

This is where **Vidhur** steps in with its **edge-first architecture**, enabling powerful LLM capabilities directly on local devices without needing to connect to cloud servers.

---

## Who is it for?

### Students in remote or low-connectivity regions
Ideal for those preparing for competitive exams like **IIT-JEE**, **NEET**, or **Olympiads**, who don't have reliable internet.

### Schools and coaching centers
Institutions can deploy Vidhur on local machines or LAN-connected systems to provide AI-assisted tutoring for an entire class.

### Self-learners valuing data privacy
Learners who want AI support but don’t want their study habits and questions sent to cloud servers.

---

## Why Vidhur Stands Out

### Full Data Privacy
No cloud. No tracking. All your questions, doubts, and study history stay **100% local**. This is especially valuable for minors or institutions with strict privacy rules.

### Works Completely Offline
Once set up, Vidhur needs no internet. Students can ask questions, clarify concepts, and explore topics anytime — even in the middle of a power cut (if on battery!).

### Real-Time Performance
By running LLMs like **Phi-3** or **Anything LLM with RAG** locally, Vidhur offers blazing-fast responses with zero latency from network calls.

---

## Use Case Example

Imagine a student in a Tier-3 city preparing for the **JEE Advanced** exam. Their coaching center provides recorded lectures, but when doubts arise, they either wait till the next session or waste time googling half-baked answers.

With **Vidhur**:

- They type the concept they want to learn and It will generate a whole course out of it
- The local chatbot, with RAG (Providing IIT JEE syllabus context), we use it clear the doubts of the user on the board.

**No internet required. No data left the device. And all this happens on the edge.**

## License

MIT License
