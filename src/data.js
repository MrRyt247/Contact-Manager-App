// Contacts data
const sampleContacts = [
  {
    id: 1,
    name: "John Doe",
    phone: "0241234567",
    email: "john.doe@example.com",
    favorite: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "0557654321",
    email: "jane.smith@example.com",
    favorite: false,
  },
  {
    id: 3,
    name: "David Johnson",
    phone: "0558869979",
    email: "david.johnson@example.com",
    favorite: true,
    profileImage:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Sarah Williams",
    phone: "0272098865",
    email: "sarah.williams@example.com",
    favorite: false,
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
