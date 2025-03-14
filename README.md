👤 Contact Manager App Using Linked List Data Structure (Web Implementation)
📑 Table of Contents
Description
Features
Objectives
Methodology
Technologies Used
Setup/Installation
Usage
Code Structure
Example Output
Team Members
Contributions
License
References
✏️ Description
This is a web-based Contact Manager application implemented using HTML, CSS, and JavaScript , utilizing the Linked List data structure for dynamic contact management. The project provides a responsive user interface with features such as adding, deleting, searching, and listing contacts. It demonstrates how linked lists can be used effectively in a front-end environment to manage dynamic data.

✨ Features
Core Functionalities
Add Contact : Insert a new contact (name, phone number, optional country, and profile image).
Delete Contact : Remove a contact by name.
Search Contact : Find contacts by name or partial match.
Edit Contact : Update existing contact details.
List All Contacts : Display all contacts dynamically in the UI.
UI-Specific Features
Responsive design with HTML and CSS for a clean and intuitive interface.
Real-time updates of the contact list after each operation.
Loading screen with a placeholder image during initialization.
🚀 Objectives
Implement CRUD operations using linked lists in JavaScript.
Demonstrate dynamic data management with a web-based interface.
Highlight the advantages of linked lists over static arrays in JavaScript.
Ensure seamless integration of front-end logic with data structures.
Provide a polished user experience with HTML, CSS, and vanilla JavaScript.
⚒️ Methodology
Why Linked Lists in JavaScript?
Dynamic Memory Management : Linked lists allow efficient insertion and deletion without reindexing.
Modularity : Separation of linked list logic (backend) from UI (frontend) ensures maintainability.
Traversal Efficiency : Linked lists provide O(1) insertion/deletion compared to O(n) for arrays in some cases.
Implementation Highlights
Node Structure : Each contact is stored as a Node object with data (name, phone, country, image) and next pointer.
Frontend Design : HTML and CSS provide a structured layout, while JavaScript handles interactivity and data manipulation.
Edge Cases : Handle empty lists, duplicate entries, and invalid inputs gracefully with error messages.
💻 Technologies Used
HTML : For structuring the app's UI components.
CSS : For styling the app and ensuring responsiveness.
JavaScript : For implementing linked list logic, event handling, and dynamic updates.
Browser Testing : Tested on modern browsers (Chrome, Firefox, Edge).
Code Editor : VS Code (Recommended), Sublime Text, or any text editor.
📦 Setup/Installation
Clone the repository :
bash
Copy
1
2
git clone https://github.com/your-username/contact-manager-web.git
cd contact-manager-web
Run the application :
Open index.html in your preferred browser.
No additional dependencies are required since this is a vanilla JavaScript implementation.
🚗 Usage
Workflow
Launch the App :
Open index.html in your browser.
A loading screen will appear for 3 seconds before transitioning to the main UI.
Add a Contact :
Click the "Add Contact" button to open the form.
Fill in the required fields (Name, Phone Number) and optional fields (Country, Profile Image URL).
Click "Save" to add the contact.
Search Contacts :
Enter a search key in the search bar and click "Search."
Matching contacts will be displayed dynamically.
Edit or Delete a Contact :
Use the "Edit" button to modify contact details.
Use the "Delete" button to remove a contact.
👷 Code Structure
plaintext
Copy
1
2
3
4
5
6
.
├── index.html # Main HTML file for the app
├── styles.css # CSS file for styling
├── script.js # JavaScript file for logic and linked list implementation
├── LICENSE # MIT License
└── README.md # Project documentation
Key Components
index.html : Contains the structure of the app, including the loading screen, main UI, and add/edit contact form.
styles.css : Defines the visual appearance of the app, including layout, colors, and responsiveness.
script.js : Implements the linked list data structure and handles app functionality (adding, searching, editing, and deleting contacts).
Example Output
Main UI

(Example placeholder image)

Add/Edit Contact Form

(Example placeholder image)

Search Results
Searching for "Alice" displays:
Copy
1
2
Alice - 123-456-7890
Country: USA
👥 Team Members
Flavio Sobbin
Documentation & Code Review
Frontend Development (HTML/CSS)
Backend Logic (JavaScript)
Project Lead & Core Logic

👥✨ Contributions
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature.
Develop in either the frontend or backend (or both!).
Submit a pull request.
Report bugs or suggest features via GitHub Issues .

©️ License
This project is licensed under the MIT License — see the LICENSE file for details.
