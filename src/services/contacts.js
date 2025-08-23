import { Contact } from '../models/contact.js';

export async function getAllContacts({
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  type,
  isFavourite,
}) {
  const skip = (page - 1) * perPage;

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sortCriteria = { [sortBy]: sortDirection };

  const filter = { userId };

  if (type) {
    filter.contactType = type;
  }

  if (typeof isFavourite === 'boolean') {
    filter.isFavourite = isFavourite;
  }

  const [contacts, totalItems] = await Promise.all([
    Contact.find(filter).sort(sortCriteria).skip(skip).limit(perPage),
    Contact.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

export async function getContactById(contactId, userId) {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
}

export async function createContact(contactData) {
  const newContact = await Contact.create(contactData);
  return newContact;
}

export async function updateContact(contactId, userId, updateData) {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContact(contactId, userId) {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
}
