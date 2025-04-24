# Event Listing Platform 🎉

A full-stack web app to browse, create, and manage local events.

## 🔗 Live Demo
Frontend: https://event-listing-platform-git-master-muj-is-projects.vercel.app/ 

Backend API: https://event-listing-platform-production.up.railway.app/

## 🧰 Tech Stack
- Frontend: React, Zustand, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Auth: JWT
- Deployment: Vercel, Railway

## 🚅 Initially, the instruction was to deploy the backend on Vercel, but I chose to use Railway instead as I enjoy learning new deployment methods.
- Database: MongoDB Atlas
- Hosting: Railway

## 🚀 Features
- User authentication (login/register)
- Create, edit, delete events (dashboard)
- Browse all events by category/location
- Mobile responsive UI

## 🛠 Setup Instructions

1. Clone this repo
2. Set `.env` for backend:

    ```bash
    PORT=5000
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    ```