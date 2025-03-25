// Import the LinkedList class
import LinkedList from "./src/linkedlist.js";

// Contact Manager App
class ContactManager {
  constructor() {
    this.contactsList = new LinkedList();
    this.nextId = 0;
    this.isEditing = false;
    this.currentSearchQuery = "";
    this.sortDirection = "asc";
    this.contactsFileHandle = null;

    // DOM Elements
    this.elements = {
      loader: document.getElementById("loader"),
      contactsList: document.getElementById("contactsList"),
      searchInput: document.getElementById("searchInput"),
      addContactBtn: document.getElementById("addContactBtn"),
      saveContactsBtn: document.getElementById("saveContactsBtn"),
      sortIcon: document.querySelector(".sort i.fa-arrow-up-a-z"),
      sortIconDesc: document.querySelector(".sort i.fa-arrow-down-z-a"),
      sortContainer: document.querySelector(".sort"),
      contactModal: document.getElementById("contactModal"),
      modalTitle: document.getElementById("modalTitle"),
      contactForm: document.getElementById("contactForm"),
      contactId: document.getElementById("contactId"),
      nameInput: document.getElementById("name"),
      phoneInput: document.getElementById("phone"),
      emailInput: document.getElementById("email"),
      profileImageInput: document.getElementById("profileImage"),
      imagePreview: document.getElementById("imagePreview"),
      closeModal: document.getElementById("closeModal"),
      cancelBtn: document.getElementById("cancelBtn"),
      saveBtn: document.getElementById("saveBtn"),
      favoriteCheckbox: document.getElementById("favorite"),
      statsContainer: document.getElementById("statsContainer"),
      totalContacts: document.getElementById("totalContacts"),
      totalFavorites: document.getElementById("totalFavorites"),
    };

    // Initialize
    this.init();
  }

  async init() {
    // Simulate loading
    setTimeout(() => {
      this.elements.loader.style.opacity = 0;
      setTimeout(() => {
        this.elements.loader.style.display = "none";
      }, 100);
    }, 500);

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
    this.elements.sortContainer.addEventListener("click", () =>
      this.toggleSort()
    );
    this.elements.saveContactsBtn.addEventListener("click", () =>
      this.saveContactsToFile()
    );

    // Load existing contacts from localStorage or contacts.json
    this.loadContacts();

    // Initial sort icon state
    this.updateSortIcons();

    // Initial render
    this.renderContacts();
    this.updateStats();
  }

  // Load contacts from localStorage
  loadContacts() {
    const savedContacts = localStorage.getItem("contacts");
    const savedNextId = localStorage.getItem("nextId");

    if (savedContacts) {
      const contacts = JSON.parse(savedContacts);
      this.nextId = savedNextId ? parseInt(savedNextId) : 0;

      // Populate the LinkedList
      contacts.forEach((contact) => {
        this.contactsList.add(contact);
      });
    }
  }

  // Save contacts to file using File System Access API
  async saveContactsToFile() {
    try {
      // Prepare contacts data
      const contacts = this.contactsList.getAll();
      const data = {
        contacts: contacts,
        nextId: this.nextId,
      };

      // Save to localStorage (for persistence)
      localStorage.setItem("contacts", JSON.stringify(contacts));
      localStorage.setItem("nextId", this.nextId.toString());

      // Prompt to save file
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: "contacts.json",
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      });

      // Create a writable stream
      const writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(data, null, 2));
      await writable.close();

      alert("Contacts saved successfully!");
    } catch (error) {
      console.error("Error saving contacts:", error);
      if (error.name !== "AbortError") {
        alert("Failed to save contacts. Please try again.");
      }
    }
  }

  // Toggle sort direction
  toggleSort() {
    this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    this.updateSortIcons();
    this.contactsList.reverse();
    this.renderContacts();
  }

  // Update sort icons
  updateSortIcons() {
    if (this.sortDirection === "asc") {
      this.elements.sortIcon.style.display = "inline";
      this.elements.sortIconDesc.style.display = "none";
    } else {
      this.elements.sortIcon.style.display = "none";
      this.elements.sortIconDesc.style.display = "inline";
    }
  }

  // Update stats display
  updateStats() {
    const totalContacts = this.contactsList.size;
    const totalFavorites = this.contactsList.getFavoritesCount();

    this.elements.totalContacts.textContent = totalContacts;
    this.elements.totalFavorites.textContent = totalFavorites;
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
            <i class="fa fa-wind" ></i>
            <h3>No contacts yet</h3>
            <p>Add your first contact to get started!</p>
          </div>
        `;
      }
    } else {
      // Sort contacts: favorites first, then alphabetically by name
      const sortedContacts = [...contacts].sort((a, b) => {
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;

        const comparison = a.name.localeCompare(b.name);
        return this.sortDirection === "asc" ? comparison : -comparison;
      });

      sortedContacts.forEach((contact) => {
        html += this.createContactCard(contact);
      });
    }

    this.elements.contactsList.innerHTML = html;

    // Add event listeners to action buttons
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        this.openEditContactModal(id);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        this.deleteContact(id);
      });
    });

    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        this.toggleFavorite(id);
      });
    });

    // Update stats
    this.updateStats();
  }

  // Create HTML for a contact card
  createContactCard(contact) {
    const { id, name, phone, email, profileImage, favorite } = contact;
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
    <div class="contact-card ${favorite ? "favorite-card" : ""}">
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
            <div class="contact-name">
              ${name}
              ${
                favorite
                  ? '<span class="favorite-badge"><i class="fa fa-star"></i></span>'
                  : ""
              }
            </div>
            <div class="contact-details">${phone}</div>
            ${email ? `<div class="contact-details">${email}</div>` : ""}
          </div>
        </div>
        <div class="contact-actions">
          <button class="favorite-btn ${
            favorite ? "active" : ""
          }" data-id="${id}">
            <i class="fa fa-star"></i>
          </button>
          <button class="edit-btn" data-id="${id}">
            <i class="fa fa-pencil"></i>
          </button>
          <button class="delete-btn" data-id="${id}">
            <i class="fa fa-trash"></i>
          </button>
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
    this.elements.favoriteCheckbox.checked = false;
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
    this.elements.emailInput.value = contact.email || "";
    this.elements.profileImageInput.value = contact.profileImage || "";
    this.elements.favoriteCheckbox.checked = contact.favorite || false;

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

  // Handle form submit
  async handleFormSubmit(e) {
    e.preventDefault();

    const contact = {
      name: this.elements.nameInput.value,
      phone: this.elements.phoneInput.value,
      email: this.elements.emailInput.value,
      profileImage: this.elements.profileImageInput.value,
      favorite: this.elements.favoriteCheckbox.checked,
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

    // Save to localStorage
    localStorage.setItem(
      "contacts",
      JSON.stringify(this.contactsList.getAll())
    );
    localStorage.setItem("nextId", this.nextId.toString());
  }

  // Delete contact
  async deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactsList.delete(id);
      this.renderContacts();

      // Save to localStorage
      localStorage.setItem(
        "contacts",
        JSON.stringify(this.contactsList.getAll())
      );
      localStorage.setItem("nextId", this.nextId.toString());
    }
  }

  // Handle search
  handleSearch() {
    this.currentSearchQuery = this.elements.searchInput.value.trim();
    this.renderContacts();
  }

  // Toggle favorite
  async toggleFavorite(id) {
    this.contactsList.toggleFavorite(id);
    this.renderContacts();

    // Save to localStorage
    localStorage.setItem(
      "contacts",
      JSON.stringify(this.contactsList.getAll())
    );
  }
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if File System Access API is supported
  if ("showSaveFilePicker" in window) {
    new ContactManager();
  } else {
    alert(
      "Your browser does not support File System Access API. Please use a modern browser like Chrome."
    );
  }
});
