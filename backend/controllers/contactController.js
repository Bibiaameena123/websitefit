// controllers/contactController.js
import Contact from '../models/Contact.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
