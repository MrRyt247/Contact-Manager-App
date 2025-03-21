// Sample contacts data
const sampleContacts = [
  {
    id: 1,
    name: "John Doe",
    phone: "555-123-4567",
    email: "john.doe@example.com",
    favorite: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "555-765-4321",
    email: "jane.smith@example.com",
    favorite: false,
    // profileImage: "/api/placeholder/60/60",
  },
  {
    id: 3,
    name: "David Johnson",
    phone: "555-888-9999",
    email: "david.johnson@example.com",
    favorite: true,
  },
  {
    id: 4,
    name: "Sarah Williams",
    phone: "555-222-3333",
    email: "sarah.williams@example.com",
    favorite: false,
    // profileImage: "/api/placeholder/60/60",
  },
];

// Function to get the sample contacts
export function getSampleContacts() {
  return sampleContacts;
}

// Function to get the next available ID
export function getNextId() {
  // Find the maximum ID in the sample contacts
  const maxId = sampleContacts.reduce(
    (max, contact) => (contact.id > max ? contact.id : max),
    0
  );

  // Return the next ID
  return maxId + 1;
}