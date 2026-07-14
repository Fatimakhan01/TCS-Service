# TCS Cargo Services Management System

A modern and responsive Cargo Management System built with React.js. This project is being developed as part of a Full Stack Internship and currently focuses on the frontend implementation using reusable components, clean architecture, and responsive design.

## Overview

The application provides a professional interface for managing cargo operations, including order management, customer management, dashboard analytics, and employee profile management. The project is structured to support future backend integration without requiring major frontend changes.

## Features

### Authentication
- Login page with form validation
- Remember Me functionality
- Local Storage based authentication (Frontend)

### Dashboard
- Statistics cards
- Chart placeholders
- Recent orders table
- Responsive dashboard layout

### Order Management
- Create new orders
- Edit existing orders
- Delete orders
- Search orders
- Filter by status
- Sort orders
- Automatic tracking ID generation
- Status badges
- Local Storage persistence

### Customer Management
- Add customers
- Edit customer information
- Delete customers
- Search customers
- Local Storage persistence

### Profile & Settings
- Update employee profile
- Controlled form inputs
- Local Storage persistence

## Tech Stack

- React.js
- React Router DOM
- Tailwind CSS
- JavaScript (ES6+)
- Local Storage

## Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── layout/
│   ├── shared/
│   └── ui/
│
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Orders/
│   ├── Customers/
│   ├── Profile/
│
├── routes/
├── utils/
├── App.jsx
└── main.jsx
```

## Current Status

The project is currently in frontend development.

Completed modules include:

- Login
- Dashboard
- Orders CRUD
- Customers CRUD
- Profile & Settings
- Responsive Navbar
- Responsive Sidebar
- Local Storage Integration

## Planned Features

- Backend Integration
- REST API
- Database Integration
- Authentication using JWT
- Order Tracking Timeline
- Protected Routes
- User Roles & Permissions
- Data Visualization
- API Error Handling

## Learning Objectives

This project focuses on improving practical frontend development skills by implementing:

- Component-based architecture
- React Hooks
- State Management
- CRUD Operations
- Form Handling
- Reusable Components
- Responsive Design
- Local Storage
- Clean Folder Structure
- Scalable Project Architecture

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Navigate to the project:

```bash
cd your-repository
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Future Improvements

The project architecture has been designed to support future backend integration using Node.js, Express.js, and MongoDB while keeping the frontend scalable and maintainable.