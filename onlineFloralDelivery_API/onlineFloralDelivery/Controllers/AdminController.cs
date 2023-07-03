using Microsoft.AspNetCore.Mvc;
using onlineFloralDelivery.Models;
using onlineFloralDelivery.Services;

namespace onlineFloralDelivery.Controllers;
[Route("api/admin")]

public class AdminController : Controller
{
    private adminService adminService;
    public AdminController(adminService _adminService)
    {
        adminService = _adminService;
    }

    [Produces("application/json")]
    [HttpGet("showAll")]
    public IActionResult showAll()
    {
        try
        {
            var rs = adminService.showAll();
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
    public IActionResult Create([FromBody] Admin admin)
    {
        try
        {
            bool result = adminService.Create(admin);
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


    [Produces("application/json")]
    [HttpPut("update")]
    public IActionResult Update([FromBody] Admin admin)
    {
        try
        {
            bool result = adminService.update(admin);
            return Ok(new
            {
                Result = result
            });
        }
        catch (Exception ex)
        {
            // Mã 400: Có lỗi xảy ra
            return BadRequest(ex);
        }
    }
}
