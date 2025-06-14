# Social Card Portal

## Overview

Social Card Portal is a full-stack web project that allows users to create digital cards and manage media content.

### Features

- Two main parts: frontend and backend
- Admin dashboard for managing customers and media content
- Login functionality with phone number and password
- Ability to create, edit, and delete media and customer information
- Customization options for digital cards
- Responsive design with Bootstrap 5

---

### Admin Dashboard

- Data caching to optimize performance
- Login page with phone number and password authentication
- Toast component for success and error messages

#### Media Page

- Display all media with English, Arabic names and Logo image
- Add, edit, and delete media with warning prompts

#### Customers Page

- View and manage customer details with edit and delete options

#### Create Customer Page

- Customize customer details including name, domain name, description, and appearance
- Add links to various media for each customer
- Support for multiple languages and templates

#### Digital Card Page

- Personalized digital cards for customers with dynamic content display
- Two templates for displaying media links and company information

### Restrictions

- Prohibition on using specific domain names for customers

## Technologies Used

- React, TypeScript, Bootstrap 5, SASS

## Designed and Coded By

Bassel Abo Khabsa
https://github.com/EN-BAAK

## Usage

1. Clone the repository
2. Navigate to the repo directory: `cd ../repo`
3. Install dependencies using `npm install`
4. Navigate to the environment variables file: `cd ./env`
5. Add dependencies
6. Build the project using `npm run build`
7. To start:

- Start the project without Server `npm run dev`
- Start the project with Server:
  1.  Copy the dist folder and place it in the root of the server folder
  2.  Start the server using `npm start` in the server folder
