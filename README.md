# Calculator App

## Overview

This repository contains a simple calculator application with a React frontend and a .NET backend.

This is an MVP of the functionality required and unit testing has not been added.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)

## Project Structure

- `./api`: Contains the .NET backend project
- `./ui`: Contains the React frontend project

## Technologies Used

### Backend

- .NET 8.0
- ASP.NET Core
- Entity Framework Core (InMemory)
- Swagger (Swashbuckle)

### Frontend

- React
- Redux/RTK Query
- TypeScript
- Tailwind CSS/DaisyUI

## Getting Started

### Prerequisites

Ensure you have the following software installed:

- Node.js v20 or above should work, I developed this with Node v22
- .NET SDK v8.0

### Setup

1. UI:

   ```bash
   git clone https://github.com/PeterGrayCreative/trip-calculator.git
   cd ui
   npm install
   npm start
   ```

2. Backend:

   ```bash
   cd api
   dotnet restore
   dotnet run
   ```

## Packages used

The backend is built using .NET 8.0 and uses EF Core with EF Core's in-memory database

### API Documentation

Swagger is set up for API documentation. No detail has been added to the endpoints yet. Visit `http://localhost:5036/swagger` to view docs.

### Frontend Documentation

The frontend is built using React and bootstrapped with Create React App and includes the following npm packages:

### Dependencies

- `@reduxjs/toolkit` (2.2.5)
- `lodash` (4.17.21)
- `react-redux` (9.1.2)
- `react-router-dom` (6.23.1)
- `typescript` (4.9.5)
- `@tailwindcss/typography` (0.5.13)
- `@types/lodash` (4.17.5)
- `daisyui` (4.12.2)
- `tailwindcss` (3.4.4)

Thanks for your consideration!
