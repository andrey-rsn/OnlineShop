using Dapper;
using DiscountAPI.Entities;

namespace DiscountAPI.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        #region props
        
        private readonly IConfiguration _configuration;

        #endregion

        #region ctor
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="configuration"></param>
        public DiscountRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #endregion

        #region Implementation of IDiscountRepository
        /// <summary>
        /// Get discount model from db
        /// </summary>
        /// <param name="productName">product name string</param>
        /// <returns>Coupon object</returns>
        public async Task<Coupon> GetDiscount(string productName)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));
            var coupon = await connection.QueryFirstOrDefaultAsync<Coupon>
                ("SELECT * FROM Coupon WHERE ProductName = @ProductName", new {ProductName= productName});
            if(coupon == null)
            {
                return new Coupon();
            }
            return coupon;
        }

        /// <summary>
        /// Create new coupon instance in db
        /// </summary>
        /// <param name="coupon">Coupon object</param>
        /// <returns>bool value</returns>
        public async Task<bool> CreateDiscount(Coupon coupon)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var affected =
                await connection.ExecuteAsync
                ("INSERT INTO Coupon (ProductName, Description, Amount) VALUES (@ProductName, @Description, @Amount)", new {ProductName= coupon.ProductName,Description= coupon.Description, Amount= coupon.Amount});

            return !(affected == 0);
        }

        /// <summary>
        /// Delete Coupon object from db
        /// </summary>
        /// <param name="productName">Product name string</param>
        /// <returns>bool value</returns>
        public async Task<bool> DeleteDiscount(string productName)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var affected =
                await connection.ExecuteAsync
                ("DELETE FROM Coupon WHERE ProductName=@ProductName", new { ProductName = productName});

            return !(affected == 0);
        }

        /// <summary>
        /// Update Coupon instance in db
        /// </summary>
        /// <param name="coupon">Coupon object</param>
        /// <returns>bool value</returns>
        public async Task<bool> UpdateDiscount(Coupon coupon)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var affected =
                await connection.ExecuteAsync
                ("UPDATE Coupon SET ProductName=@ProductName, Description=@Description, Amount=@Amount WHERE Id = @Id", new { ProductName = coupon.ProductName, Description = coupon.Description, Amount = coupon.Amount, Id=coupon.Id });

            return !(affected == 0);
        }

        #endregion
    }
}
