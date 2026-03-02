# Secure Photo Sharing App

A secure, photo-sharing app built with React and Vite

## Project Overview

This project demonstrates a production-style architecture for:

- Client–server separation
- HTTPS development environment
- Structured routing
- Clean Axios API layer

## Installation & Setup

1. clone repo
2. run npm install in your terminal to install dependecies
3. setup environment configuration file .env
4. start server with "npm run dev"

## Configuration Strategy

Frontend uses centralized Axios instance. This done to provide;

- Single source of API truth
- Interceptor support
- Centralized error handling
- Clean component code

Vite was configured to handle cors

## Navigating the Codebase



## Running the Server

### Development

- npm run dev

### Production

- npm run build
