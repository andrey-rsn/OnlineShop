using Catalog.API.Data;
using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ICatalogContext _catalogContext;

        #region ctor

        /// <summary>
        /// ProductRepository Constructor
        /// </summary>
        /// <param name="catalogContext"></param>
        public ProductRepository(ICatalogContext catalogContext)
        {
            _catalogContext = catalogContext;
        }
        #endregion

        #region Implementation of IProductRepository
        /// <summary>
        /// Created and added product in db
        /// </summary>
        /// <param name="product">product model</param>
        /// <returns></returns>
        public async Task CreateProduct(Product product)
        {
            await _catalogContext.Products.InsertOneAsync(product);
        }

        /// <summary>
        /// Deleted product from db
        /// </summary>
        /// <param name="id">Product id</param>
        /// <returns>bool value</returns>
        public async Task<bool> DeleteProduct(string id)
        {
            FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Id, id);

            var deleteResult = await _catalogContext
                                            .Products
                                            .DeleteOneAsync(filter);
            return deleteResult.IsAcknowledged && deleteResult.DeletedCount > 0;
        }

        /// <summary>
        /// Get product by product id
        /// </summary>
        /// <param name="id">Product id</param>
        /// <returns>Product object</returns>
        public async Task<Product> GetProductById(string id)
        {
            return await _catalogContext
                                .Products
                                .Find(prop => prop.Id == id)
                                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Get all product from db
        /// </summary>
        /// <returns>Collection of Product objects</returns>
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _catalogContext
                                .Products
                                .Find(prop => true)
                                .ToListAsync();
        }

        /// <summary>
        /// Get products by category name
        /// </summary>
        /// <param name="categoryName"></param>
        /// <returns>Collection of Product objects</returns>
        public async Task<IEnumerable<Product>> GetProductsByCategory(string categoryName)
        {
            FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Category, categoryName);

            return await _catalogContext
                                .Products
                                .Find(filter)
                                .ToListAsync();
        }

        /// <summary>
        /// Get products by product name
        /// </summary>
        /// <param name="name"></param>
        /// <returns>Collection of Product objects</returns>
        public async Task<IEnumerable<Product>> GetProductsByName(string name)
        {
            FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Name, name);

            return await _catalogContext
                                .Products
                                .Find(filter)
                                .ToListAsync();
        }

        /// <summary>
        /// Updated Product object in db
        /// </summary>
        /// <param name="product">Product model</param>
        /// <returns>bool value</returns>
        public async Task<bool> UpdateProduct(Product product)
        {
            var updateResult = await _catalogContext
                                            .Products
                                            .ReplaceOneAsync(filter: g => g.Id == product.Id, replacement: product);
            return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
        }
        #endregion
    }
}
