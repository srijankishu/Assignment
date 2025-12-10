# 📘 Patient Document Portal — Design Document

This document describes the architecture, design decisions, API specifications, data flow, and assumptions for the Patient Document Portal application.

---

# 1. 🧰 Tech Stack Choices

## **Q1. What frontend framework did you use and why?**
### ✔ **React (Vite)**
- Fast development workflow  
- Component-based UI structure  
- Easy API integration using Axios  
- Ideal for single-page applications  
- Vite provides extremely fast dev server and build times  

React was chosen because it is widely used, easy to structure, and perfect for building a small but efficient upload portal.

---

## **Q2. What backend framework did you choose and why?**
### ✔ **Node.js + Express**
- Lightweight and fast  
- Simple routing for REST APIs  
- Excellent support for file uploads using Multer  
- Works well with SQLite for local storage  
- Easy to organize controllers, routes, and middleware  

Express is minimal and perfect for building clear, clean APIs for uploading, fetching, downloading, and deleting documents.

---

## **Q3. What database did you choose and why?**
### ✔ **SQLite (via Sequelize ORM)**
- Serverless and file-based — ideal for local applications  
- No installation required  
- Automatically generates a `.sqlite` file  
- Works perfectly with Sequelize  
- Meets assignment requirement: “Use SQLite, PostgreSQL, or similar”  

SQLite fits the scope of this assignment because it keeps the project self-contained and easy to run locally.

---

## **Q4. If you were to support 1,000 users, what changes would you consider?**

To scale the system for real-world usage:
- Move from **SQLite → PostgreSQL** for concurrency and performance  
- Store files in cloud storage (AWS S3, Google Cloud Storage) instead of local folder  
- Add **user authentication** and document ownership rules  
- Enable **load balancing** and horizontal scaling  
- Add cache layer (Redis) for faster metadata retrieval  
- Serve files using CDN for faster downloads  

---

# 2. 🏗 Architecture Overview

## **System Components**
- **Frontend (React)**: Uploads files, lists documents, sends requests to backend  
- **Backend (Express)**: Handles uploads, stores metadata, serves files  
- **Database (SQLite)**: Stores file metadata  
- **Local File Storage**: Saves PDF files in `backend/src/uploads/`

---

## **Architecture Diagram (ASCII)**



                 ┌───────────────────────────────┐
                 │            Frontend           │
                 │            (React)            │
                 └───────────────┬───────────────┘
                                 │  HTTP Requests
                                 ▼
                 ┌───────────────────────────────┐
                 │            Backend            │
                 │         (Express API)         │
                 └───────┬───────────┬───────────┘
                         │           │
                         │           │ JSON Responses
                         ▼           ▼
            ┌────────────────┐   ┌────────────────────┐
            │   SQLite DB    │   │  Local File Storage│
            │ (file metadata)│   │     /uploads       │
            └────────────────┘   └────────────────────┘
 

---

### 🔍 Architecture Diagram Explanation

The architecture shows how the different parts of the Patient Document Portal interact with each other:

1. **Frontend (React)**  
   The user interacts with the React UI to upload, view, download, and delete PDF documents.  
   The frontend communicates with the backend by sending HTTP requests (GET, POST, DELETE).

2. **Backend (Express API)**  
   The backend receives requests from the frontend and performs the required actions:
   - Validates uploaded files  
   - Saves PDF files to local storage (`/uploads`)  
   - Stores file metadata in the SQLite database  
   - Retrieves files or metadata when requested  
   - Sends JSON responses back to the frontend  

3. **SQLite Database (File Metadata)**  
   The database stores **only metadata** for each uploaded file, such as:
   - filename  
   - filepath  
   - filesize  
   - created_at  
   
   When the frontend requests a list of documents, the backend queries SQLite and returns the results.

4. **Local File Storage (/uploads)**  
   The actual PDF files are stored on disk inside the `uploads/` directory.  
   When a user downloads or views a file, the backend reads the file from this folder and streams it to the frontend.

### 🔄 How the components work together

- **Upload Flow:**  
  React → Express → `/uploads` folder → SQLite → React updates UI  

- **List Documents:**  
  React → Express → SQLite → React  

- **Download/Delete:**  
  React → Express → `/uploads` + SQLite → React



<br/>

<br/>


# 3. 📡 API Specifications

Below are the required endpoints for the system.

---

### **1. Upload a PDF**

**Method:** `POST`  
**URL:** `/documents/upload`

### **Description:**
Uploads a single PDF and stores its metadata.

### **Request (multipart/form-data):**

file: 1712852191000-report.pdf


### **Response:**
```json
{
  "id": 1,
  "filename": "1712852191000-report.pdf",
  "filepath": "src/uploads/1712852191000-report.pdf",
  "filesize": 23000,
  "created_at": "2025-12-10T18:30:00.000Z"
}
```


### **2. List All Documents**



**Method:** `GET`  
**URL:** `/documents`

### **Description:**

Returns an array of all uploaded documents.

### **Response:**
```json
[
  {
    "id": 1,
    "filename": "1712852191000-report.pdf",
    "filepath": "src/uploads/1712852191000-report.pdf",
    "filesize": 23000,
    "created_at": "2025-12-10T18:30:00.000Z"
  }
]
```

### **3. Download a Document**


**Method:** `GET`  
**URL:** `/documents/:id`


### **Description:**

Downloads the PDF file associated with the given ID.

### **Response:**
```json
Binary file download.
```

### **4. Delete a Document**

**Method:** `DELETE`  
**URL:** `/documents/:id`


### **Description:**

Deletes the file from local storage and removes metadata from the database.

### **Response:**

```json
 { "message": "Document deleted successfully" }
 ```

<br/>

<br/>

# 4. 🔄 Data Flow Description

## **Q5. Describe the step-by-step process of what happens when a file is uploaded and downloaded.**

---

## 📤 **File Upload Flow**

1. User selects a PDF on the frontend.  
2. Frontend sends `POST /documents/upload` with the file.  
3. Backend validates that the file is a PDF.  
4. Multer stores the file at:  
5. Backend extracts metadata:
- filename  
- filepath  
- filesize  
- timestamp  
6. Sequelize inserts the metadata into the SQLite database.  
7. Backend returns the file metadata to the frontend.  
8. The UI updates and shows the new document in the list.

---

## 📥 **File Download Flow**

1. User clicks **Download** in the frontend.  
2. Frontend sends `GET /documents/:id`.  
3. Backend retrieves file metadata from SQLite.  
4. Backend streams the file back to the client.  
5. Browser downloads the PDF.

---

<br/>

<br/>


# 5. 📝 Assumptions

## **Q6. What assumptions did you make while building this?**

1. Only **PDF files** are allowed.  
2. File size is within Multer’s default limits.  
3. No user authentication — assume a **single user** as per assignment.  
4. Local storage (`uploads/`) is sufficient for this project.  
5. No heavy concurrency issues expected due to small scale.  
6. File names are made unique using timestamps.  
7. All requests come from a **trusted local environment**.

