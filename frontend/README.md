# ClearWatt Frontend  

## Overview  
This is the frontend for ClearWatt, built using Angular. It utilizes a mix of native SCSS and Bootstrap for styling.  

## Prerequisites  
Ensure you have the following installed:  
- [Node.js with NPM](https://nodejs.org/) (Latest LTS recommended)  
- [Angular CLI](https://angular.io/cli)  

## Installation  

1. Move to the `frontend` folder:
   ```sh
   cd frontend
   ```

2. Install the packages:
    ```sh
    npm install
    ```

## Running the Application

Run the development application with hot-reload:  
```sh
npm start
```

## Building the Application

### Development Build

Build the application for development:  
```sh
ng build
```

### Production Build

Build the application for production:  
```sh
ng build --configuration production
```

## Styling
- The project uses SCSS for styles (.scss files in components).
- Bootstrap 5.3 is included for additional UI components and responsiveness.
- Modify global styles in `src/styles.scss` or `src/custom.scss`.
