# Spring 2024 COP4710 Database Systems Term Project

### Dependencies: Node.js (React), npm, and MySQL

## Starting project:

 - Install code into desired folder
 - Open root folder in terminal {Terminal 1}
 - (With npm and node.js installed) Run `npm install` to make sure all dependencies are installed
 - Replace [API KEY HERE] with a valid geocoding API key from Google in each file within `src/components/EventPageComp` (This has been removed due to protection regarding sharing API keys from Google.)
 - In a new terminal `cd` to `\sql` folder {Terminal 1}
 - In the sql folder, run the sql command to enter the sql shell. I.E. `mysql --host=localhost --user=root --password=admin` (Replace `root` and `admin` with the correct username and password, respectively.) **THIS PROJECT ASSUMES YOUR SQL USERNAME IS "ROOT" AND PASSWORD IS "ADMIN"**
 - Run `source ./init_db_main.sql` to initialize the database inside the sql shell
 - Returning back to the root folder with `cd ..`, now in a separate terminal {Terminal 3} run `server.js` **IF YOUR SQL USERNAME AND PASSWORD ARE NOT "ROOT" AND "ADMIN", REPLACE THE RESPECTIVE CREDENTIALS IN THE `server.js` FILE**
 - In the original terminal {Terminal 1}, run `npm start`

 ### If all dependencies are installed and foundation initialized, the program should now run correctly