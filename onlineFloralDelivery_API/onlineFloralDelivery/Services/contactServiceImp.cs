using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public class contactServiceImp : contactService
{
    private DatabaseContext db;
    public contactServiceImp(DatabaseContext _db)
    {
        db = _db;
    }

    public bool Create(Contact contact)
    {
        try
        {
            db.Contacts.Add(contact);
            return db.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    // hiển thị tất cả contact
    public dynamic showAll()
    {
        return db.Contacts.Select(ct => new
        {
            Contactid = ct.ContactId,
            Name = ct.Name,
            Email = ct.Email,
            Subject = ct.Subject,
            Message = ct.Message,
            Created = ct.Created,
        }).ToList();
    }
}
