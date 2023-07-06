using Microsoft.EntityFrameworkCore;
using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public class AccountServiceImp : AccountService
{
    private DatabaseContext db;
    private IConfiguration configuration;
    public AccountServiceImp(DatabaseContext _db, IConfiguration _configuration)
    {
        db = _db;
        configuration = _configuration;
    }

    public Account findById(int id)
    {
        return db.Accounts.AsNoTracking().SingleOrDefault(a => a.AccountId == id);
    }

    public bool Register(Account account)
    {
        try
        {
            db.Accounts.Add(account);
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic showAll()
    {
        return db.Accounts.Where(a => a.Status == true).OrderByDescending(a => a.AccountId).Select(a => new
        {
            accountId = a.AccountId,
            userName = a.Username,
            email = a.Email,
            phone = a.Phone,
            address = a.Address,
            imageUrl = configuration["BaseUrl"] + "images/" + a.ImageUrl,
            roleId = a.RoleId,
            roleName = a.Role.RoleName,
            created = a.Created,
            dob = a.Dob,
        }).ToList();

    }

    public bool Update(Account account)
    {
        try
        {
            db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
}
