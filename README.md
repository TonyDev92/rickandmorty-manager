# Rick and Morty Manager Dashboard

Frontend dashboard application for browsing and managing Rick and Morty characters using the public API.  
Built with Nuxt 3, Pinia for state management, and SCSS for styling.

# Service-Oriented Modular Architecture

A Modular Service-Oriented Architecture has been chosen for the separation of responsibilities and extraction of logic to specialized layers.
It allows for scalability and reuse.

## Simulated secure autentication 

The project implements a simulated hybrid cookie strategy to demonstrate knowledge of security best practices:

Emulated HttpOnly Cookies: The backend server simulates the issuance of an auth token. This demonstrates the flow required to prevent XSS attacks in a real production environment.

## State Management & Reactivity
Pinia Stores: Centralized logic for favorites and authentication, decoupling business rules from the UI.

Custom Composables: Encapsulated data fetching logic to handle API states, pagination, and filtering independently of the view.

## Features 
Responsive Design: Optimized for mobile, tablet, and desktop using a mobile-first SCSS approach.

Real-time Search: Filter characters by name with an optimized computed-logic system.

Favorites System: Persistent bookmarking of characters with global state synchronization.

Smart Pagination: Intuitive navigation through with automatic scroll-to-top and loading states.

Route Protection: Custom middleware to guard private views against unauthenticated access.

## Live deployment

Access the ap at : https://rickandmorty-manager.vercel.app/

## Getting Started

Prerequisites : 
Node.js v18.x or higher
Package Manager: npm

## Access Credentials
Email : Any valid email address : jonhDoe@example.com
password: Any String with more than 6 characters.

# Local instalation

Clone the repository :

git clone https://github.com/TonyDev92/rickandmorty-manager.git

Navigate to the project root:

cd rickandmorty-dashboard

Install dependencies:

npm install

Start development server:

npm run dev

Access the app at http://localhost:3000