module.exports = function buildProductDataLoader({ database, DataLoader }) {
  async function getProductCategory(categoryIds) {
    const productsCategoryPetitions = categoryIds.map((category) => (
      database.query('SELECT id, name FROM categories WHERE id=ANY($1)', [[category]])
    ));

    const productCategory = await Promise.all(productsCategoryPetitions);

    return productCategory;
  }

  return {
    productCategory: new DataLoader(getProductCategory),
  };
};
