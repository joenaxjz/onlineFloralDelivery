using DemoSession2_WebAPI.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using onlineFloralDelivery.Models;
using onlineFloralDelivery.Services;

namespace onlineFloralDelivery.Controllers;
[Route("api/account")]
public class AccountController : Controller
{
    private AccountService accountService;
    private IWebHostEnvironment webHostEnvironment;

    public AccountController(AccountService _accountService, IWebHostEnvironment _webHostEnvironment)
    {
        accountService = _accountService;
        webHostEnvironment = _webHostEnvironment;
    }
    // SHOW ALL ROLES
    [Produces("application/json")]
    [HttpGet("showAll")]
    public IActionResult showAll()
    {
        try
        {
            var rs = accountService.showAll();
            return Ok(rs);
        }
        catch (Exception ex)
        {
            // ma 400: la co loi roi
            return BadRequest(ex);
        }
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("register")]
    public IActionResult Register(IFormFile photo, string strAccount)
    {
        try
        {
            var fileName = FileHelper.generateFileName(photo.FileName);
            var path = Path.Combine(webHostEnvironment.WebRootPath, "images", fileName);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                photo.CopyTo(fileStream);
            }
            var account = JsonConvert.DeserializeObject<Account>(strAccount, new IsoDateTimeConverter
            {
                DateTimeFormat = "dd/MM/yyyy"
            });
            account.ImageUrl = fileName;
            bool rs = accountService.Register(account);
            return Ok(new
            {
                Results = rs
            });
        }
        catch
        {
            return BadRequest();
        }
    }


    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPut("update")]
    public IActionResult update(IFormFile photo, string strAccount)
    {
        try
        {
            var account = JsonConvert.DeserializeObject<Account>(strAccount, new IsoDateTimeConverter
            {
                DateTimeFormat = "dd/MM/yyyy"
            });

            if (account != null)
            {
                var fileName = FileHelper.generateFileName(photo.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    photo.CopyTo(fileStream);
                }
                account.ImageUrl = fileName;
            }
            else
            {
                account.ImageUrl = accountService.findById(account.AccountId).ImageUrl;
            }
            bool rs = accountService.Update(account);
            return Ok(new
            {
                Results = rs
            });
        }
        catch
        {
            return BadRequest();
        }
    }
}
