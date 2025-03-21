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
    this.updateStats();
  }

  // Load sample contacts
  loadSampleContacts() {
    const sampleContacts = getSampleContacts();

    sampleContacts.forEach((contact) => {
      this.contactsList.add(contact);
    });
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
        return a.name.localeCompare(b.name);
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

  // Toggle favorite status
  toggleFavorite(id) {
    this.contactsList.toggleFavorite(id);
    this.renderContacts();
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

  // Handle form submission
  handleFormSubmit(e) {
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