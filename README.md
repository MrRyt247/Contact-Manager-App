# 👤 Contact Manager App Using Linked List Data Structure (Web Implementation)

## 📑 Table of Contents

- [Description](#description)
- [Features](#features)
- [Objectives](#objectives)
- [Methodology](#methodology)
- [Technologies Used](#technologies-used)
- [Setup/Installation](#setupinstallation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [New Features and Improvements](#new-features-and-improvements)
- [Team Members](#team-members)
- [Contributions](#contributions)
- [License](#license)
- [References](#references)

## ✏️ Description

This is a **web-based Contact Manager application** implemented using **HTML, CSS, and JavaScript**, utilizing the **Linked List** data structure for dynamic contact management. The project provides a responsive user interface with advanced features for efficient contact organization and management.

## ✨ Features

### Core Functionalities

- **Add Contact**: Insert a new contact with comprehensive details
- **Delete Contact**: Remove a contact with confirmation
- **Search Contact**: Find contacts by name or phone number
- **Edit Contact**: Update existing contact details
- **List All Contacts**: Display contacts dynamically in the UI
- **Favorites Management**: Mark and filter favorite contacts

### UI-Specific Features

- Responsive design with clean and intuitive interface
- Real-time updates of the contact list
- Loading screen during initialization
- Contact sorting (ascending/descending)
- Dynamic contact card generation with random color avatars
- File system integration for saving contacts

## 🆕 New Features and Improvements

### Recent Enhancements

1. **File System Integration**

   - Added support for File System Access API
   - Allow users to save contacts to a JSON file
   - Persistent storage using localStorage

2. **Enhanced Contact Management**

   - Implemented advanced sorting (favorites first, alphabetical)
   - Added visual indicators for favorite contacts
   - Dynamic avatar generation with random colors
   - Improved search functionality

3. **User Experience Improvements**

   - Hover effects on contact cards
   - Intuitive action buttons (edit, delete, favorite)
   - Responsive modal for adding/editing contacts
   - Loading screen with spinner

4. **Search and Filter**

   - Real-time search across name and phone number
   - No-results state handling
   - Sorting options (ascending/descending)

5. **Performance Optimizations**
   - Efficient linked list implementation
   - Minimal DOM manipulations
   - Streamlined data management

## 🚀 Objectives

1. Implement CRUD operations using linked lists in JavaScript
2. Demonstrate dynamic data management with a web-based interface
3. Highlight the advantages of linked lists over static arrays
4. Ensure seamless integration of front-end logic with data structures
5. Provide a polished, responsive user experience

## ⚒️ Methodology

### Why Linked Lists in JavaScript?

- **Dynamic Memory Management**: Efficient insertion and deletion without reindexing
- **Modularity**: Clear separation of linked list logic and UI
- **Traversal Efficiency**: O(1) insertion/deletion for certain operations
- **Flexible Data Handling**: Easy to implement advanced sorting and filtering

## 💻 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Responsive and modern styling
- **JavaScript (ES6+)**: Dynamic interactions and data management
- **File System Access API**: File saving capabilities
- **LocalStorage**: Client-side data persistence

## 📦 Setup/Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/contact-manager-web.git
   cd contact-manager-web
   ```

2. **Browser Compatibility**:

   - Requires a modern browser supporting File System Access API (Chrome recommended)
   - No additional dependencies needed

3. **Running the Application**:
   - Open `index.html` directly in a modern web browser
   - Ensure JavaScript is enabled

## 🚗 Usage

### Workflow

1. **Launch the App**

   - Loading screen appears briefly
   - Main contact management interface loads

2. **Contact Operations**

   - **Add Contact**: Click "+" button, fill in details
   - **Edit Contact**: Click pencil icon on contact card
   - **Delete Contact**: Click trash icon, confirm deletion
   - **Favorite Contacts**: Use star button to toggle

3. **Advanced Features**
   - Search contacts by name or phone
   - Sort contacts (ascending/descending)
   - Save contacts to a JSON file
   - Responsive design for various devices

## 👷 Code Structure

```
contact-manager-web/
├── index.html         # Main HTML structure
├── script.js          # Core application logic
├── style.css          # Styling and responsive design
├── src/
│   ├── linkedlist.js  # Linked list data structure implementation
└── README.md          # Project documentation
```

## 👥 Team Members

| Name                       | Index   | Role                            |
| -------------------------- | ------- | ------------------------------- |
| Flavio Sobbin              | 1828322 | Documentation & Code Review     |
| Edmund Kwame Denteh        |         | Frontend Development (HTML/CSS) |
|  Sampah Allen Ekyem        | 1827822 | Backend Logic (JavaScript)      |
| Odame Adwoa Animah         |         | Project Lead & Core Logic       |
| Elizabeth Tandoh Maame Ama |         | Code Review                     |
| Benjamin Kofi Selorm Azumah| 1819322 | Testing and QA                  |

## 👥✨ Contributions

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## ©️ License

MIT License — see the LICENSE file for details.

## 📖 References

- [MDN Web Docs](https://developer.mozilla.org/)
- [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
- [Linked List Data Structure](https://en.wikipedia.org/wiki/Linked_list)
