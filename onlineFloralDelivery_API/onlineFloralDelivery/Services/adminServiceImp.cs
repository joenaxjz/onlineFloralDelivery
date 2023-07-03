using Microsoft.AspNetCore.Http.HttpResults;
using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public class adminServiceImp : adminService
{
    private DatabaseContext db;
    public adminServiceImp(DatabaseContext _db)
    {
        db = _db;
    }

    public bool Create(Admin admin)
    {
        try
        {
            db.Admins.Add(admin);
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic showAll()
    {
        return db.Admins.Select(adm => new
        {
           Adminid = adm.AdminId,
           Role = adm.Role,
           Username = adm.Username,
           Password = adm.Password,
           Created = adm.Created,
           Status = adm.Status,
        }).ToList();
    }

    public bool update(Admin admin)
    {
        try
        {
            db.Entry(admin).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
}
