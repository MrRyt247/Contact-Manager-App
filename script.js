// Import the LinkedList class and sample data
import LinkedList from "./src/linkedlist.js";
import { getSampleContacts, getNextId } from "./src/data.js";

// Contact Manager App
class ContactManager {
  constructor() {
    this.contactsList = new LinkedList();
    this.nextId = getNextId();
    this.isEditing = false;
    this.currentSearchQuery = "";

    // DOM Elements
    this.elements = {
      loader: document.getElementById("loader"),
      contactsList: document.getElementById("contactsList"),
      searchInput: document.getElementById("searchInput"),
      addContactBtn: document.getElementById("addContactBtn"),
      contactModal: document.getElementById("contactModal"),
      modalTitle: document.getElementById("modalTitle"),
      contactForm: document.getElementById("contactForm"),
      contactId: document.getElementById("contactId"),
      nameInput: document.getElementById("name"),
      phoneInput: document.getElementById("phone"),
      countryInput: document.getElementById("country"),
      profileImageInput: document.getElementById("profileImage"),
      imagePreview: document.getElementById("imagePreview"),
      closeModal: document.getElementById("closeModal"),
      cancelBtn: document.getElementById("cancelBtn"),
      saveBtn: document.getElementById("saveBtn"),
    };

    // Initialize
    this.init();
  }

  init() {
    // Simulate loading
    setTimeout(() => {
      this.elements.loader.style.opacity = 0;
      setTimeout(() => {
        this.elements.loader.style.display = "none";
      }, 100); // 500 for dev sake
    }, 500); // 3000

    // Event Listeners
    this.elements.addContactBtn.addEventListener("click", () =>
      this.openAddContactModal()
    );
    this.elements.closeModal.addEventListener("click", () => this.closeModal());
    this.elements.cancelBtn.addEventListener("click", () => this.closeModal());
    this.elements.contactForm.addEventListener("submit", (e) =>
      this.handleFormSubmit(e)
    );
    this.elements.searchInput.addEventListener("input", () =>
      this.handleSearch()
    );
    this.elements.profileImageInput.addEventListener("input", () =>
      this.updateImagePreview()
    );

    // Load sample contacts
    this.loadSampleContacts();

    // Initial render
    this.renderContacts();
  }

  // Load sample contacts
  loadSampleContacts() {
    const sampleContacts = getSampleContacts();

    sampleContacts.forEach((contact) => {
      this.contactsList.add(contact);
    });
  }

  // Render contacts in the UI
  renderContacts() {
    const contacts = this.contactsList.search(this.currentSearchQuery);
    let html = "";

    if (contacts.length === 0) {
      if (this.currentSearchQuery) {
        html = `<div class="no-results">No contacts found matching "${this.currentSearchQuery}"</div>`;
      } else {
        html = `
          <div class="empty-state">
            <h3>No contacts yet</h3>
            <p>Add your first contact to get started!</p>
          </div>
        `;
      }
    } else {
      contacts.forEach((contact) => {
        html += this.createContactCard(contact);
      });
    }

    this.elements.contactsList.innerHTML = html;

    // Add event listeners to action buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        this.openEditContactModal(id);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        this.deleteContact(id);
      });
    });
  }

  // Create HTML for a contact card
  createContactCard(contact) {
    const { id, name, phone, country, profileImage } = contact;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    // Simple random background color and contrasting text color (black or white)
    const randomBgColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    const brightness =
      parseInt(randomBgColor.substring(1), 16) > 8388607.5
        ? "#000000"
        : "#FFFFFF";

    return `
    <div class="contact-card">
      <div class="contact-header">
        <div class="contact-avatar" style="background-color: ${
          profileImage ? "#e0e0e0" : randomBgColor
        }; color: ${profileImage ? "#3498db" : brightness};">
          ${
            profileImage
              ? `<img src="${profileImage}" alt="${name}">`
              : initials
          }
          </div>
          <div class="contact-info">
            <div class="contact-name">${name}</div>
            <div class="contact-details">${phone}</div>
            ${country ? `<div class="contact-details">${country}</div>` : ""}
          </div>
        </div>
        <div class="contact-actions">
          <button class="edit-btn" data-id="${id}">Edit</button>
          <button class="delete-btn" data-id="${id}">Delete</button>
        </div>
      </div>
    `;
  }

  // Open modal to add a new contact
  openAddContactModal() {
    this.isEditing = false;
    this.elements.modalTitle.textContent = "Add Contact";
    this.elements.contactForm.reset();
    this.elements.contactId.value = "";
    this.elements.imagePreview.innerHTML = "";
    this.elements.contactModal.style.display = "flex";
  }

  // Open modal to edit an existing contact
  openEditContactModal(id) {
    const contact = this.contactsList.getById(id);
    if (!contact) return;

    this.isEditing = true;
    this.elements.modalTitle.textContent = "Edit Contact";
    this.elements.contactId.value = id;
    this.elements.nameInput.value = contact.name;
    this.elements.phoneInput.value = contact.phone;
    this.elements.countryInput.value = contact.country || "";
    this.elements.profileImageInput.value = contact.profileImage || "";

    // Update image preview
    this.updateImagePreview();

    this.elements.contactModal.style.display = "flex";
  }

  // Close the modal
  closeModal() {
    this.elements.contactModal.style.display = "none";
  }

  // Update image preview
  updateImagePreview() {
    const imageUrl = this.elements.profileImageInput.value;
    if (imageUrl) {
      this.elements.imagePreview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
    } else {
      this.elements.imagePreview.innerHTML = "";
    }
  }

  // Handle form submission
  handleFormSubmit(e) {
    e.preventDefault();

    const contact = {
      name: this.elements.nameInput.value,
      phone: this.elements.phoneInput.value,
      country: this.elements.countryInput.value,
      profileImage: this.elements.profileImageInput.value,
    };

    if (this.isEditing) {
      const id = parseInt(this.elements.contactId.value);
      this.contactsList.update(id, contact);
    } else {
      contact.id = this.nextId++;
      this.contactsList.add(contact);
    }

    this.closeModal();
    this.renderContacts();
  }

  // Delete a contact
  deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactsList.delete(id);
      this.renderContacts();
    }
  }

  // Handle search
  handleSearch() {
    this.currentSearchQuery = this.elements.searchInput.value.trim();
    this.renderContacts();
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContactManager();
});

// // Linked List Implementation
// class Node {
//   constructor(contact) {
//     this.contact = contact;
//     this.next = null;
//   }
// }

// class LinkedList {
//   constructor() {
//     this.head = null;
//     this.size = 0;
//   }

//   // Add a contact to the end of the list
//   add(contact) {
//     const newNode = new Node(contact);

//     // If the list is empty
//     if (!this.head) {
//       this.head = newNode;
//     } else {
//       let current = this.head;

//       // Traverse to the end of the list
//       while (current.next) {
//         current = current.next;
//       }

//       // Add the new node
//       current.next = newNode;
//     }

//     this.size++;
//     return contact.id;
//   }

//   // Get all contacts
//   getAll() {
//     const contacts = [];
//     let current = this.head;

//     while (current) {
//       contacts.push(current.contact);
//       current = current.next;
//     }

//     return contacts;
//   }

//   // Get a contact by ID
//   getById(id) {
//     let current = this.head;

//     while (current) {
//       if (current.contact.id === id) {
//         return current.contact;
//       }
//       current = current.next;
//     }

//     return null;
//   }

//   // Update a contact
//   update(id, updatedContact) {
//     let current = this.head;

//     while (current) {
//       if (current.contact.id === id) {
//         current.contact = { ...current.contact, ...updatedContact };
//         return true;
//       }
//       current = current.next;
//     }

//     return false;
//   }

//   // Delete a contact
//   delete(id) {
//     // If the list is empty
//     if (!this.head) {
//       return false;
//     }

//     // If the head node is the one to delete
//     if (this.head.contact.id === id) {
//       this.head = this.head.next;
//       this.size--;
//       return true;
//     }

//     // Find the node before the one to delete
//     let current = this.head;
//     while (current.next && current.next.contact.id !== id) {
//       current = current.next;
//     }

//     // If the node was found
//     if (current.next) {
//       current.next = current.next.next;
//       this.size--;
//       return true;
//     }

//     return false;
//   }

//   // Search contacts by name or phone
//   search(query) {
//     if (!query) return this.getAll();

//     const result = [];
//     let current = this.head;
//     query = query.toLowerCase();

//     while (current) {
//       const { name, phone } = current.contact;
//       if (name.toLowerCase().includes(query) || phone.includes(query)) {
//         result.push(current.contact);
//       }
//       current = current.next;
//     }

//     return result;
//   }
// }

// // Contact Manager App
// class ContactManager {
//   constructor() {
//     this.contactsList = new LinkedList();
//     this.nextId = 1;
//     this.isEditing = false;
//     this.currentSearchQuery = "";

//     // DOM Elements
//     this.elements = {
//       loader: document.getElementById("loader"),
//       contactsList: document.getElementById("contactsList"),
//       searchInput: document.getElementById("searchInput"),
//       addContactBtn: document.getElementById("addContactBtn"),
//       contactModal: document.getElementById("contactModal"),
//       modalTitle: document.getElementById("modalTitle"),
//       contactForm: document.getElementById("contactForm"),
//       contactId: document.getElementById("contactId"),
//       nameInput: document.getElementById("name"),
//       phoneInput: document.getElementById("phone"),
//       countryInput: document.getElementById("country"),
//       profileImageInput: document.getElementById("profileImage"),
//       imagePreview: document.getElementById("imagePreview"),
//       closeModal: document.getElementById("closeModal"),
//       cancelBtn: document.getElementById("cancelBtn"),
//       saveBtn: document.getElementById("saveBtn"),
//     };

//     // Initialize
//     this.init();
//   }

//   init() {
//     // Simulate loading
//     setTimeout(() => {
//       this.elements.loader.style.opacity = 0;
//       setTimeout(() => {
//         this.elements.loader.style.display = "none";
//       }, 500);
//     }, 3000);

//     // Event Listeners
//     this.elements.addContactBtn.addEventListener("click", () =>
//       this.openAddContactModal()
//     );
//     this.elements.closeModal.addEventListener("click", () => this.closeModal());
//     this.elements.cancelBtn.addEventListener("click", () => this.closeModal());
//     this.elements.contactForm.addEventListener("submit", (e) =>
//       this.handleFormSubmit(e)
//     );
//     this.elements.searchInput.addEventListener("input", () =>
//       this.handleSearch()
//     );
//     this.elements.profileImageInput.addEventListener("input", () =>
//       this.updateImagePreview()
//     );

//     // Load sample contacts
//     this.loadSampleContacts();

//     // Initial render
//     this.renderContacts();
//   }

//   // Load some sample contacts
//   loadSampleContacts() {
//     const sampleContacts = [
//       { name: "John Doe", phone: "555-123-4567", country: "USA" },
//       {
//         name: "Jane Smith",
//         phone: "555-765-4321",
//         country: "Canada",
//         profileImage: "/api/placeholder/60/60",
//       },
//       { name: "David Johnson", phone: "555-888-9999", country: "UK" },
//     ];

//     sampleContacts.forEach((contact) => {
//       this.contactsList.add({
//         id: this.nextId++,
//         ...contact,
//       });
//     });
//   }

//   // Render contacts in the UI
//   renderContacts() {
//     const contacts = this.contactsList.search(this.currentSearchQuery);
//     let html = "";

//     if (contacts.length === 0) {
//       if (this.currentSearchQuery) {
//         html = `<div class="no-results">No contacts found matching "${this.currentSearchQuery}"</div>`;
//       } else {
//         html = `
//             <div class="empty-state">
//               <h3>No contacts yet</h3>
//               <p>Add your first contact to get started!</p>
//             </div>
//           `;
//       }
//     } else {
//       contacts.forEach((contact) => {
//         html += this.createContactCard(contact);
//       });
//     }

//     this.elements.contactsList.innerHTML = html;

//     // Add event listeners to action buttons
//     document.querySelectorAll(".edit-btn").forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const id = parseInt(e.target.dataset.id);
//         this.openEditContactModal(id);
//       });
//     });

//     document.querySelectorAll(".delete-btn").forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const id = parseInt(e.target.dataset.id);
//         this.deleteContact(id);
//       });
//     });
//   }

//   // Create HTML for a contact card
//   createContactCard(contact) {
//     const { id, name, phone, country, profileImage } = contact;
//     const initials = name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();

//     return `
//         <div class="contact-card">
//           <div class="contact-header">
//             <div class="contact-avatar">
//               ${
//                 profileImage
//                   ? `<img src="${profileImage}" alt="${name}">`
//                   : initials
//               }
//             </div>
//             <div class="contact-info">
//               <div class="contact-name">${name}</div>
//               <div class="contact-details">${phone}</div>
//               ${country ? `<div class="contact-details">${country}</div>` : ""}
//             </div>
//           </div>
//           <div class="contact-actions">
//             <button class="edit-btn" data-id="${id}">Edit</button>
//             <button class="delete-btn" data-id="${id}">Delete</button>
//           </div>
//         </div>
//       `;
//   }

//   // Open modal to add a new contact
//   openAddContactModal() {
//     this.isEditing = false;
//     this.elements.modalTitle.textContent = "Add Contact";
//     this.elements.contactForm.reset();
//     this.elements.contactId.value = "";
//     this.elements.imagePreview.innerHTML = "";
//     this.elements.contactModal.style.display = "flex";
//   }

//   // Open modal to edit an existing contact
//   openEditContactModal(id) {
//     const contact = this.contactsList.getById(id);
//     if (!contact) return;

//     this.isEditing = true;
//     this.elements.modalTitle.textContent = "Edit Contact";
//     this.elements.contactId.value = id;
//     this.elements.nameInput.value = contact.name;
//     this.elements.phoneInput.value = contact.phone;
//     this.elements.countryInput.value = contact.country || "";
//     this.elements.profileImageInput.value = contact.profileImage || "";

//     // Update image preview
//     this.updateImagePreview();

//     this.elements.contactModal.style.display = "flex";
//   }

//   // Close the modal
//   closeModal() {
//     this.elements.contactModal.style.display = "none";
//   }

//   // Update image preview
//   updateImagePreview() {
//     const imageUrl = this.elements.profileImageInput.value;
//     if (imageUrl) {
//       this.elements.imagePreview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
//     } else {
//       this.elements.imagePreview.innerHTML = "";
//     }
//   }

//   // Handle form submission
//   handleFormSubmit(e) {
//     e.preventDefault();

//     const contact = {
//       name: this.elements.nameInput.value,
//       phone: this.elements.phoneInput.value,
//       country: this.elements.countryInput.value,
//       profileImage: this.elements.profileImageInput.value,
//     };

//     if (this.isEditing) {
//       const id = parseInt(this.elements.contactId.value);
//       this.contactsList.update(id, contact);
//     } else {
//       contact.id = this.nextId++;
//       this.contactsList.add(contact);
//     }

//     this.closeModal();
//     this.renderContacts();
//   }

//   // Delete a contact
//   deleteContact(id) {
//     if (confirm("Are you sure you want to delete this contact?")) {
//       this.contactsList.delete(id);
//       this.renderContacts();
//     }
//   }

//   // Handle search
//   handleSearch() {
//     this.currentSearchQuery = this.elements.searchInput.value.trim();
//     this.renderContacts();
//   }
// }

// // Initialize the app when the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//   new ContactManager();
// });
