# Database Systems Term Project

## COP4710 - Spring 2024

### Dependencies:

- Node.js (React)
- npm
- MySQL

---

## Project Setup

Follow these steps to get the project up and running:

### 1. Install Project Files

- Clone or download the project into your desired folder.

### 2. Install Dependencies

- Open a terminal in the root project folder. (Terminal 1)
- Run the following command to install all required dependencies:
  ```bash
  npm install
  ```

### 3. Set Up Google API Key

- In the `src/components/EventPageComp` folder, replace `[API KEY HERE]` with your valid Google Geocoding API key.  
  **Note:** The API key is removed for security reasons.

### 4. Set Up MySQL Database

- Open a new terminal and navigate to the `\sql` folder:
  ```bash
  cd /path/to/project/sql
  ```
- Enter the MySQL shell by running the following command:

  ```bash
  mysql --host=localhost --user=root --password=admin
  ```

  **Important:** Replace `root` and `admin` with your actual MySQL username and password if different.  
  **This project assumes your MySQL username is "root" and password is "admin".**

- Initialize the database by running the SQL command:
  ```bash
  source ./init_db_main.sql
  ```

### 5. Configure Server Credentials

- Return to the root project folder:
  ```bash
  cd ..
  ```
- Open the `server.js` file and replace the MySQL credentials (username and password) if they are not set to "root" and "admin".

### 6. Start the Application

- In the original terminal (Terminal 1), run the following to start the project:

  ```bash
  npm start
  ```

- In a separate terminal (Terminal 2), run the server:
  ```bash
  node server.js
  ```

---

### Troubleshooting:

- Ensure that all dependencies are installed and the database is initialized.
- If the program is not running, check for missing or incorrect credentials.

Once everything is set up, the application should be up and running successfully.

### Key Improvements:

1. **Headings and Subheadings:** Clear, descriptive headings make the steps easier to follow.
2. **Step-by-Step Instructions:** Numbered steps guide the user through the process in a logical order.
3. **Terminal Commands:** Preformatted code blocks highlight the commands for better readability.
4. **Clarified Notes:** Added a note for the Google API key and emphasized the username/password assumption for MySQL.
