using DiscountAPI.Entities;
using DiscountAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace DiscountAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class DiscountController : ControllerBase
    {
        #region props

        private readonly IDiscountRepository _discountRepository;

        #endregion

        #region ctors

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="discountRepository"></param>
        public DiscountController(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }
        #endregion

        #region Endpoints

        [HttpGet("{productName}", Name = "GetDiscount")]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<Coupon>> GetDiscount(string productName)
        {
            var disocount = await _discountRepository.GetDiscount(productName);
            return Ok(disocount);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.Created)]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<Coupon>> CreateDiscount([FromBody] Coupon coupon)
        {
            var result = await _discountRepository.CreateDiscount(coupon);
            return result ? CreatedAtRoute("GetDiscount",new {productName=coupon.ProductName},coupon) : BadRequest();
        }

        [HttpPut]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<Coupon>> UpdateDiscount([FromBody] Coupon coupon)
        {
            var result = await _discountRepository.UpdateDiscount(coupon);
            return result ? Ok() : BadRequest();
        }

        [HttpDelete("{productName}", Name = "GetDiscount")]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Coupon), (int)HttpStatusCode.BadRequest)]
        public async Task<ActionResult<Coupon>> DeleteDiscount(string productName)
        {
            var result = await _discountRepository.DeleteDiscount(productName);
            return result ? Ok() : BadRequest();
        }

        #endregion
    }
}
