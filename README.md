# Admin Panel
An admin panel to manage employees built with ``node.js`` and ``React.js``.

## Introduction

### **The front end**
The frond end is written in ``React.js`` and rely on a one react libraries that works perfectly for admin templates and supports CRUD operations, pagination, filtering and sorting. 

Simple, fast and optimized that's why I went with this choice. Fast to integrate which is great for someone who does not have a lot of experience on the front end tools.

### **The back end**

The back end is written in ``Node.js``. 
It supports a REST API to manage the employees.
Relies on env variable so it can be launched in any environemnt.
In order to run the project we need to do the following:

1. Clone the project from this [repo](https://github.com/zaherh8/admin_panel).
2. **DEFAULT**: The database is configured in the ``admin_server/config/config.json``. It works by default with an online database created on [elephantSQL](https://www.elephantsql.com/).
**OPTIONAL**: For more visibility you can use docker-compose to run your local database. You can do that by installing docker-compose from [here](https://docs.docker.com/compose/install/), then open on the root directory your command line and run ``docker-compose up``. You can access the ``adminer`` admin interface on ``http://localhost:8080`` to access the database. In order to use the docker compose don't forget to update you ``config.json`` file with the credentials present inside the ``docker-compose.yml`` file. Last thing to do, head to ``admin_server/config/config.json`` and update the credentials with the one present in ``docker-compose.yml``.
3. run the following commands:
  - ``cd ./admin_server && npm install`` to install server dependencies
  - ``npm run migrate`` to setup our database.
  - ``cd ../admin_client && npm install`` to install client dependencies
4. Setup environemnt variables on both client and server projects.

  - Development environemnt:
    - Client ``.env`` file (on the root directory ``admin_client``):
    ```
    REACT_APP_SERVER_URL=http://localhost:4000
    ```
    - Server ``.env`` file: (on the root directory ``admin_server``)
    ```
    PORT=4000
    DATABASE_USER=user
    DATABASE=postgres
    DATABASE_PASSWORD=pass
    DATABASE_HOST=localhost
    ```
5. Now we can run our project locally. Make sure your are in the server directory and run the next command:
    ``npm run dev``
    Now the admin back office will open automatically and you can start managing your employees.

NB: I tried to seed the database to ease your navigation across the front but the ``bulk insert`` was inserting the database but not updating the index which is not something desirable. For lack of time I will just give you the pleasure to create as much customers as you need to test the demo. However I will try to populate the online database with records and keeping them to ease the way for you.



