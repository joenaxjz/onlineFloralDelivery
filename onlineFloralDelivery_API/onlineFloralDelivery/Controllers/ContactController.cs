using Microsoft.AspNetCore.Mvc;
using onlineFloralDelivery.Models;
using onlineFloralDelivery.Services;

namespace onlineFloralDelivery.Controllers;
[Route("api/contact")]
public class ContactController : Controller
{
    private contactService contactService;
    public ContactController(contactService _contactService)
    {
        contactService = _contactService;
    }

    [Produces("application/json")]
    [HttpGet("showAll")]
    public IActionResult showAll()
    {
        try
        {
            var rs = contactService.showAll();
            return Ok(rs);
        }
        catch (Exception ex)
        {
            // ma 400: la co loi roi
            return BadRequest(ex);
        }
    }

    [Produces("application/json")]
    [HttpPost("create")]
    // cùng lúc nhận hình ảnh và chuỗi JSON
    public IActionResult Create([FromBody] Contact contact)
    {
        try
        {
            bool result = contactService.Create(contact);
            return Ok(new
            {
                Result = result
            });
        }
        catch (Exception ex)
        {
            // mã 400: có lỗi xảy ra
            return BadRequest(ex);
        }
    }
}
