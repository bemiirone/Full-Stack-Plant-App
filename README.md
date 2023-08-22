# Plants App

The Plants app is a single-page application that provides functionality to manage and display a collection of plants.

## Features

- **Plant Listing**: Users can view a list of all available plants.
- **Plant Details**: Each plant can be clicked on to view its detailed information.
- **Add & Edit Plant**: The app offers functionalities to add new plants and update the details of existing ones.
- **Delete Plant**: Any plant can be removed from the collection.
- **Search & Filter**: Users can filter the list of plants based on name, family, or year.
- **Dialog Modals**: Used for Add, Edit and delete operations.

## Libraries and Tools

- **Angular**: The primary framework used for building the application.
- **TypeScript**: The building bocks for this app.
- **Rxjs**: Used to handle state management and services.
- **Ngrx**: State management is done using NgRx, which includes actions, reducers, effects, and selectors.
- **Angular Material**: This is used for designing the UI components, such as dialogs.
- **Tailwind Css**: For responsive styling
- **Jasmine & Karma**: For writing and running unit tests.

## Backend

The app communicates with a backend server that provides CRUD operations for the plants. This server is built using `Express.js` and serves data from a static JSON file.

## Instructions

1. Clone repo.
2. Navigate to the api folder. Run `npm install` and then `npm start`. This will start the api server
3. Navigate to root folder and repeat above npm steps.
4. Navigate to http://localhost:4200/ in your browser

