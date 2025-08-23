import { getAllContacts } from '../services/contacts.js';

export async function getContacts(req, res) {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
