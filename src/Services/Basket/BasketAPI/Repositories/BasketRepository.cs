using BasketAPI.Entities;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace BasketAPI.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        #region props

        private readonly IDistributedCache _redisCache;

        #endregion

        #region ctors

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="redisCache"></param>
        public BasketRepository(IDistributedCache redisCache)
        {
            _redisCache = redisCache;
        }

        #endregion

        #region Implementing of IBasketRepository

        /// <summary>
        /// Delete basket from redis cache
        /// </summary>
        /// <param name="userName">user name string</param>
        /// <returns></returns>
        public async Task DeleteBasket(string userName)
        {
            await _redisCache.RemoveAsync(userName);
        }

        /// <summary>
        /// Get ShoppingCart object from redis cache
        /// </summary>
        /// <param name="userName">user name string</param>
        /// <returns>ShoppingCart object</returns>
        public async Task<ShoppingCart> GetBasket(string userName)
        {
            var basket = await _redisCache.GetStringAsync(userName);

            if (String.IsNullOrEmpty(basket))
                return null;

            return JsonConvert.DeserializeObject<ShoppingCart>(basket);
        }

        /// <summary>
        /// Update ShoppingCart object in redis cache
        /// </summary>
        /// <param name="userName">ShoppingCart object</param>
        /// <returns>updated ShoppingCart object</returns>
        public async Task<ShoppingCart> UpdateBasket(ShoppingCart basket)
        {
            await _redisCache.SetStringAsync(basket.UserName,JsonConvert.SerializeObject(basket));

            return await GetBasket(basket.UserName);
        }

        #endregion
    }
}
