# Plants App

The Plants app is a single-page MEAN application that provides functionality to manage and display a collection of plants.

## Features

- **Plant Listing**: Users can view a list of all available plants.
- **Plant Details**: Each plant can be clicked on to view its detailed information.
- **Add & Edit Plant**: The app offers functionalities to add new plants and update the details of existing ones.
- **Delete Plant**: Any plant can be removed from the collection.
- **Search & Filter**: Users can filter the list of plants based on name, family, or year.
- **Dialog Modals**: Used for Add, Edit and Delete operations.
- **Pagination**: For easier navigation of the plants list

## Frontend Libraries and Tools

- **Angular 16**: The primary framework used for building the application.
- **TypeScript**: The building bocks for this app.
- **Rxjs**: Used to handle state management and services.
- **Ngrx**: State management is done using NgRx, which includes actions, reducers, effects, and selectors.
- **Angular Material**: This is used for the UI components, such as dialogs.
- **Tailwind Css**: Used for responsive styling
- **Jasmine & Karma**: For writing and running unit tests.

## Backend
- **Node**: The server-side Javascript environment.
- **Express**: Module used to create the REST api.
- **NestJs**: For TypeScript implementation.
- **Mongo**: NoSql database used to store the data.


## Instructions

1. Clone repo.
2. Navigate to the nest-plants-api folder. Run `npm install` and then `npm run start:dev`. This will start the api server
3. Navigate to root folder.  Run `npm install` and then `npm start`.
4. Navigate to http://localhost:4200/ in your browser

