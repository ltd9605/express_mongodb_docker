# 🚀 Express MongoDB Docker App

A lightweight **Express.js + MongoDB** application packaged with **Docker**, allowing you to run it instantly without installing Node.js or manually configuring the environment.

---

## 📦 1. Overview

This project includes:
- An **Express.js** backend connected to **MongoDB**
- Fully packaged into a **Docker image**
- Distributed as a `.tar` file for easy sharing and deployment

---

## 🐳 2. Run the App Using Docker

### 🧩 Requirements
- Install **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** on your system.

---

### ⚙️ Step 1: Download the Docker Image

The prebuilt Docker image is included in this repository:express_mongodb_docker.tar
### ⚙️ Step 2: Import the Image

Open your terminal (PowerShell or CMD) in the folder containing the `.tar` file and run:

```
docker load -i express_mongodb_docker.tar
```
Once the import is complete, verify that the image is available:
```
docker images
```
### ⚙️ Step 3: Create an .env File

Create a file named .env in the project root directory and fill in the following details:
```
PORT=<yourport>
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
```
### ⚙️ Step 4: Run the Container

Run the Docker container with the following command:
```
docker run -d -p <yourcustomport>:<container_port> --env-file .env express_mongodb_docker:1.0
```
### 🌐 Step 5: Access the App
Open your browser and go to: 
```
http://localhost:<yourcustomport>
```

- Another way you can try is:
# Step 1: Clone repo
```
git clone https://github.com/yourusername/express_mongodb_docker.git

cd express_mongodb_docker
```
# Step 2: Create .env file
```
cp .env.example .env
Then edit PORT, MONGO_URI if needed
```
# Step 3: Build and run
```
docker-compose up --build -d
```
# Step 4: Access the app
Open browser:
```
 http://localhost:3000 (or mapped host port)
```