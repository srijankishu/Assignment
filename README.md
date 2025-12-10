# Patient Document Portal  
A simple full-stack application that allows users to upload, view, download, and delete medical PDF documents.  
Built as part of a Full Stack Developer Intern assignment.

---

##  Tech Stack

### **Frontend**
- React (Vite)
- Axios
- Tailwind CSS (optional but supported)

### **Backend**
- Node.js + Express
- Multer (file upload)
- Sequelize ORM
- SQLite database

### **Storage**
- Local folder `uploads/` for storing PDFs  
- SQLite file `database.sqlite` for document metadata

---

## 📁 Project Structure
```
.
├── backend
│ ├── src
│ │ ├── index.js
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── config/
│ │ └── uploads/ ← stored PDFs
│ └── package.json
│
├── frontend
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── design.md
└── README.md

```
---

## 🗄 Database Schema

Table: **documents**

| Field       | Type       | Description                   |
|-------------|-----------|-------------------------------|
| id          | INTEGER PK | Auto-increment ID             |
| filename    | STRING     | Saved filename                |
| filepath    | STRING     | File path inside uploads/     |
| filesize    | INTEGER    | Size in bytes                 |
| created_at  | DATE       | Upload timestamp              |

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

git clone https://github.com/srijankishu/Assignment.git

cd Assignment


---

# 🛠 Backend Setup

 ```sh
cd backend \
npm install \
npm run dev
```

Backend runs at:

👉 **http://localhost:5000**

### ✔ Backend Features
- Upload PDFs
- List all uploaded documents
- View PDF (open in browser tab)
- Download PDF
- Delete PDF
- Stores file metadata in SQLite

---

# 🎨 Frontend Setup

 ```sh
cd frontend \
cd vite-project \
npm install \
npm run dev
 ```

Frontend runs at:

👉 **http://localhost:5173**

### ✔ Frontend Features
- PDF upload form (with validation)
- Display uploaded files
- View PDF (opens in new tab)
- Download PDF
- Delete PDF
- Auto-refresh document list

---

# 🔌 API Endpoints

### **Upload PDF**

POST /documents/upload
Content-Type: multipart/form-data
file: <PDF file>

### **Get all documents**

GET /documents

### **Download a document**

GET /documents/:id

### **Delete a document**

DELETE /documents/:id

## 🧪 Example API Calls (cURL & Postman)

Below are example requests you can use to test the backend APIs.

---

### 📤 1. Upload a PDF

#### cURL
```sh
curl -X POST http://localhost:5000/documents/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@yourfile.pdf"
```

1- Open Postman

2- Create a POST request: http://localhost:5000/documents/upload

3- Go to Body → form-data

4- Add a field:

         Key: file
         Type: File
         Select: any PDF

5- Click Send

### 📄 2. Get All Documents

  #### cURL
  ```sh
   curl http://localhost:5000/documents
  ```

   Postman

  1- Method: GET

  2- URL: http://localhost:5000/documents

  3- Click Send

       You will receive a JSON list of uploaded documents.

 ### 📥 3. Download a Document

   #### cURL
  ```sh
   curl -X GET http://localhost:5000/documents/1 -o downloaded.pdf
  ```
  
  Postman

  1- Method: GET

  2- URL: http://localhost:5000/documents/<id>

  3- Click Send

  4- Postman will download the PDF file.

 ### 🗑 4. Delete a Document

  #### cURL
  ```sh
  curl -X DELETE http://localhost:5000/documents/1
  ```

  Postman

  1- Method: DELETE

  2- URL: http://localhost:5000/documents/:id

  3- Click Send

     A success message will appear:

    { "message": "Document deleted successfully" }


    










