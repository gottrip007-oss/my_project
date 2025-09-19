# AI-Powered Cloud-Based Smart Service Platform

## Overview
A full-stack platform for small businesses to manage services, bookings, invoices, and customer interactions using AI.

## Features
- Owner/staff dashboard: manage services, bookings, invoices, see analytics
- Customer portal: register/login, book services, chat with AI assistant
- AI chatbot (OpenAI powered)
- Analytics dashboard
- Cloud-ready deployment (Docker)

## Architecture

![Architecture Diagram](architecture.png)

## Tech Stack
- **Frontend:** React
- **Backend:** Python Flask
- **Database:** MongoDB
- **AI:** OpenAI GPT-3.5 Turbo

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your values
python app.py
```
Or run with Docker:
```bash
docker build -t ai-smart-backend .
docker run --env-file .env -p 5000:5000 ai-smart-backend
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```
Or run with Docker:
```bash
docker build -t ai-smart-frontend .
docker run --env-file .env -p 3000:3000 ai-smart-frontend
```

## Authors
- gottrip007-oss

## License
MIT