// Linked List Implementation
class Node {
  constructor(contact) {
    this.contact = contact;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add a contact to the end of the list
  add(contact) {
    // Ensure contact has favorite property if not already set
    if (contact.favorite === undefined) {
      contact.favorite = false;
    }
    
    const newNode = new Node(contact);

    // If the list is empty
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;

      // Traverse to the end of the list
      while (current.next) {
        current = current.next;
      }

      // Add the new node
      current.next = newNode;
    }

    this.size++;
    return contact.id;
  }

  // Get all contacts
  getAll() {
    const contacts = [];
    let current = this.head;

    while (current) {
      contacts.push(current.contact);
      current = current.next;
    }

    return contacts;
  }

  // Get a contact by ID
  getById(id) {
    let current = this.head;

    while (current) {
      if (current.contact.id === id) {
        return current.contact;
      }
      current = current.next;
    }

    return null;
  }

  // Update a contact
  update(id, updatedContact) {
    let current = this.head;

    while (current) {
      if (current.contact.id === id) {
        current.contact = { ...current.contact, ...updatedContact };
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // Delete a contact
  delete(id) {
    // If the list is empty
    if (!this.head) {
      return false;
    }

    // If the head node is the one to delete
    if (this.head.contact.id === id) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    // Find the node before the one to delete
    let current = this.head;
    while (current.next && current.next.contact.id !== id) {
      current = current.next;
    }

    // If the node was found
    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }

    return false;
  }

  // Search contacts by name or phone
  search(query) {
    if (!query) return this.getAll();

    const result = [];
    let current = this.head;
    query = query.toLowerCase();

    while (current) {
      const { name, phone } = current.contact;
      if (name.toLowerCase().includes(query) || phone.includes(query)) {
        result.push(current.contact);
      }
      current = current.next;
    }

    return result;
  }

  // Toggle favorite status
  toggleFavorite(id) {
    let current = this.head;

    while (current) {
      if (current.contact.id === id) {
        current.contact.favorite = !current.contact.favorite;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  // Get number of favorite contacts
  getFavoritesCount() {
    let count = 0;
    let current = this.head;

    while (current) {
      if (current.contact.favorite) {
        count++;
      }
      current = current.next;
    }

    return count;
  }
}

// Export the LinkedList class
export default LinkedList;