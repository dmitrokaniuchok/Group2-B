import User from '../models/User.js';

export async function getCurrentUserServices(userId) {
  const user = await User.findById(userId).select('name');

  if (!user) return null;

  const { name } = user;
  const initial = name?.[0].toUpperCase() || '';

  return { name, initial };
}
