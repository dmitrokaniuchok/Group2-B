export const paginate = ({ totalItems, page = 1, perPage = 12 }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
  };
};
