# Second-Semester-Exams
This contains my Second Semester Exam Project for the Tinyuka 2024 Cohort

# Do-It App - A React Todo App with TanStack Query, TailwindCSS & DaisyUI

A sleek, single-page Todo application built with **React**, **TanStack Query**, **TailwindCSS**, and **DaisyUI**. 
DO-It App is a comprehensive task management application that allows users to create, read, update, and delete tasks. The application provides a seamless user experience with features like search functionality, status filtering, pagination, and detailed task views. Built with modern React patterns and best practices, the app demonstrates proficiency in state management, API integration, and responsive design.

---

## Features
Core Functionality

- Task Management: Create, edit, delete, and view tasks
- Task Status Viewing: View tasks as completed or pending
- Search Functionality: Search tasks by title with real-time filtering
- Status Filtering: Filter tasks by completion status (All, Completed, Pending)
- Pagination: Navigate through tasks with pagination controls
- Task Details: View detailed information about individual tasks
- Responsive Design: Works seamlessly across desktop and mobile devices

---

## User Experience

- Dynamic Greetings: Time-based greetings (Good Morning, Afternoon, Evening)
- Interactive UI: Hover effects, smooth transitions, and visual feedback
- Intuitive Navigation: Clear navigation between different views
- Loading States: Visual indicators during data fetching
- Confirmation Dialogs: User confirmation for destructive actions

## Error Handling

- Error Boundaries: Catch and handle React component errors gracefully
- 404 Page: Custom not found page with engaging messaging
- Error Testing: Dedicated test error component for development
- User-Friendly Messages: Clear, helpful error messages throughout the app

---

## Built With
### Frontend Framework

- React 18: Modern React with hooks and functional components
- React Router DOM: Client-side routing for navigation
- React Query (TanStack Query): Server state management and caching

### Styling

- Tailwind CSS: Utility-first CSS framework for styling
- DaisyUI: Component library built on Tailwind CSS
- Custom CSS: Additional styling for specific design requirements

### Icons and UI

- Lucide React: Modern icon library for consistent iconography

### API

- DummyJSON API: External API for todo data operations
- Fetch API: Native browser API for HTTP requests

## Resource links
- [React](https://reactjs.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Lucide Icons](https://lucide.dev/)

---

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser

### Steps
1.  Clone the Repository
```sh
git clone https://github.com/nohgu21/second-semester-exams.git
cd react-todo-tanstack
```
2. Install Dependencies
```sh
npm install
```
3. Start the Development Server
```sh
npm run dev
```
---

# API Reference
This app uses the DummyJSON Todos API:
- GET /todos
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id

---

# Component Architecture

## Core Components

### App.jsx

- Main application component
- Router configuration
- Error boundary integration
- Route definitions

### Greeting.jsx

- Dynamic time-based greetings
- Uses React hooks for state management
- Automatically updates based on current time

---

### TodoList.jsx

- Displays paginated list of todos
- Handles search and filter logic
- Manages edit and delete operations
- Implements pagination controls

### TodoDetails.jsx

- Shows detailed view of individual todos
- Allows adding descriptions to pending tasks
- Handles task status display
- Provides navigation back to main list

---

### SearchFilter.jsx

- Provides search input functionality
- Offers status filtering options
- Uses controlled components pattern
- Responsive design for mobile and desktop

### AddTodoModal.jsx

- Modal for creating new todos
- Form validation and submission
- Integration with React Query mutations
- Accessible modal implementation

---

### EditTodoModal.jsx

- Modal for editing existing todos
- Pre-populated with current task data
- Update functionality with API integration
- User-friendly interface

### ErrorBoundary.jsx

- Catches and handles React errors
- Provides fallback UI for error states
- Logs errors for debugging
- User-friendly error messages

---

# Styling and Design
## Design System

### Color Scheme:

- Primary: #0F4C5C (Deep teal)
- Secondary: #1F2937 (Dark gray)
- Background: #0F4C5C
- Text: White and gray variations


- Typography: Lato font family for clean, readable text
- Spacing: Consistent spacing using Tailwind utilities
- Borders: Rounded corners for modern appearance

---

### Responsive Design

- Mobile-First: Designed for mobile devices first
- Flexible Layouts: Uses CSS Grid and Flexbox
- Breakpoints: Responsive design for different screen sizes
- Touch-Friendly: Appropriate button sizes for mobile interaction

### Interactive Elements

- Hover Effects
- Loading States
- Focus Management

--- 

## Technical Improvements

- Performance Monitoring: Add performance tracking
- TypeScript: Migrate to TypeScript for better type safety
- State Management: Consider Redux for complex state needs
- SEO Optimization: Improve search engine optimization
- Documentation: Enhanced code documentation

---

Thank You!
