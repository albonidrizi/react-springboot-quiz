# Quiz Application Projects for Students

## Overview
This repository contains two main projects designed to demonstrate the usage of **APIs** and their integration into both **React** (frontend) and **Spring Boot** (backend) applications. These projects are intended as learning tools for students, showcasing how to build and use APIs in real-world applications.

### Projects
- **Frontend (React Quiz App)**: A user-friendly quiz application built using **React.js** that fetches quiz questions and displays them in an interactive interface.
- **Backend (Spring Boot Quiz API)**: A backend service built with **Spring Boot** that serves quiz data via a REST API. The backend interacts with a database to fetch quiz questions based on different categories and difficulties.

## Purpose
The main purpose of these projects is to provide students with a practical example of how **APIs** work, focusing on:
1. **Frontend-Backend Communication**: How to send requests from a React frontend to a Spring Boot backend.
2. **API Integration**: Using real-world APIs to fetch quiz data and display it in an interactive manner.
3. **Building and Using RESTful APIs**: Teaching how to structure API endpoints, send responses, and handle HTTP requests in a Spring Boot application.

## Features
- **Interactive Quiz**: Users can take a quiz with multiple-choice questions, answering and navigating through questions.
- **Dynamic Question Fetching**: The frontend fetches questions from the Spring Boot API based on user settings (e.g., number of questions, category, difficulty).
- **API Integration**: The Spring Boot backend exposes an API that serves quiz questions with different difficulties and categories.

## How It Works
1. **Frontend**: 
   - Built with **React.js**, the frontend interacts with the backend API to retrieve quiz questions dynamically.
   - It allows users to select the number of questions, category, and difficulty before starting the quiz.
   - Once the quiz starts, the questions are displayed one at a time, and users can navigate between them, select answers, and get a final score.

2. **Backend**:
   - The backend is built using **Spring Boot** and exposes endpoints that provide quiz questions in a structured JSON format.
   - The Spring Boot application connects to a database (or mock data) and retrieves questions based on the parameters provided by the frontend.
   - It also includes business logic for scoring and quiz management.
