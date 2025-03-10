# ClearWatt

This repository contains the prototype for the ClearWatt web application. It uses an headless architecture where the frontend (UI) and the backend (logic) are separated.

The deployed prototype can be accessed at [clearwatt.ca](clearwatt.ca).

## Frontend

The frontend of the application is a Single-Page Application (SPA) built in Angular 18.2. It uses Bootstrap, which is a free and open-source frontend toolkit, to facilitate and speed-up the development of the UI. The SPA is located in the `frontend` folder.

## Backend

The backend is built in Python using the [Flask](https://flask.palletsprojects.com/) framework. It uses [SQLite](https://www.sqlite.org/) as a database for prototyping purposes. It is located in the `backend` folder.

## Render

Both the frontend and the backend are deployed on [Render](https://render.com/), using the Hobby tier. [Render](https://render.com/) is a scalable cloud application platform.

### Domain

The domain `clearwatt.ca` was leased on [Namecheap](https://www.namecheap.com/) for 1 year, at the total price of 14.28 CAD$. The blueprints of the deployed services are located in the `render` folder, allowing to easily recreate the current setup.


### Backend Refresh

The Render Hobby tier as one major limitation for deployed web services (backend). After 15 minutes of inactivity, the server spins down. When a new request comes, it can take up to 1 minute to restart the server. To overcome this limitation, a private virtual machine is used to query the server every 5 minutes to keep it active and avoid load times.

Obviously, this is a little hack and it is only sustainable for the prototype. The solution would be to upgrade to a paid tier or to deploy on another platform.

## Cloudinary

Images are hosted on the cloud platform [Cloudinary](https://cloudinary.com/). It allows a a quick and efficient access to the images via their API, without overloading the frontend. A copy of the images are available in the `cloudinary` folder.
