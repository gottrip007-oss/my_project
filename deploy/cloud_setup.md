# Cloud Deployment Instructions

## Backend
- Use AWS EC2, GCP Compute Engine, or Azure VM for Flask API
- Use MongoDB Atlas for managed database (recommended) or self-hosted MongoDB
- Store OpenAI API keys securely (environment variable)

## Frontend
- Host React app on AWS Amplify, Vercel, Netlify, or similar

## Environment Variables
- Put sensitive keys in `.env` files
- Use Docker for easy deployment

## Scaling
- Use Docker Compose for local multi-container setup
- Add monitoring/alerts with CloudWatch, Datadog, etc.