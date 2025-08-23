import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContacts(req, res) {
  const pageRaw = parseInt(req.query.page, 10);
  const perPageRaw = parseInt(req.query.perPage, 10);
  const page = isNaN(pageRaw) || pageRaw < 1 ? 1 : pageRaw;
  const perPage = isNaN(perPageRaw) || perPageRaw < 1 ? 10 : perPageRaw;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const type = req.query.type;
  const isFavourite =
    req.query.isFavourite === 'true'
      ? true
      : req.query.isFavourite === 'false'
      ? false
      : undefined;

  const userId = req.user._id;

  const contacts = await getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createNewContactController(req, res) {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const userId = req.user._id;

  if (!name || !phoneNumber || !contactType) {
    return res.status(400).json({
      status: 400,
      message: 'Missing required fields: name, phoneNumber, contactType',
    });
  }

  const { path: photoUrl } = req.file || {};

  const contactData = {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    photo: photoUrl || null,
    userId,
  };

  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const updateData = req.body;

  const updatedContact = await updateContact(contactId, userId, updateData);

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;

  const deleted = await deleteContact(contactId, userId);

  if (!deleted) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
}
