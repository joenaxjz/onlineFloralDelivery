using onlineFloralDelivery.Models;
using System.Data;

namespace onlineFloralDelivery.Services;

public class ContactServiceImp : ContactService
{
    private DatabaseContext db;
    public ContactServiceImp(DatabaseContext _db)
    {
        db = _db;
    }

    public dynamic showAll()
    {
        return db.Contacts.OrderByDescending(ct => ct.ContactId).Select(ct => new
        {
            contactId = ct.ContactId,
            Name = ct.Name,
            Email = ct.Email,
            Subject = ct.Subject,
            Message = ct.Message,
            Created = ct.Created,
        }).ToList();
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
}
