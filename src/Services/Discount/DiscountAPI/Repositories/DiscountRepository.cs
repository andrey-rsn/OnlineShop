﻿using Dapper;
using DiscountAPI.Entities;

namespace DiscountAPI.Repositories
{
    public class DiscountRepository : IDiscountRepository
    {
        private readonly IConfiguration _configuration;

        public DiscountRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

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
        public async Task<bool> CreateDiscount(Coupon coupon)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var affected =
                await connection.ExecuteAsync
                ("INSERT INTO Coupon (ProductName, Description, Amount) VALUES (@ProductName, @Description, @Amount)", new {ProductName= coupon.ProductName,Description= coupon.Description, Amount= coupon.Amount});

            return !(affected == 0);
        }

        public async Task<bool> DeleteDiscount(string productName)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var affected =
                await connection.ExecuteAsync
                ("DELETE FROM Coupon WHERE ProductName=@ProductName", new { ProductName = productName});

            return !(affected == 0);
        }

        public async Task<bool> UpdateDiscount(Coupon coupon)
        {
            using var connection = new Npgsql.NpgsqlConnection(_configuration.GetValue<string>("DatabaseSettings:ConnectionString"));

            var affected =
                await connection.ExecuteAsync
                ("UPDATE Coupon SET ProductName=@ProductName, Description=@Description, Amount=@Amount WHERE Id = @Id", new { ProductName = coupon.ProductName, Description = coupon.Description, Amount = coupon.Amount, Id=coupon.Id });

            return !(affected == 0);
        }
    }
}
