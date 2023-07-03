using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public interface contactService
{
    public dynamic showAll();
    public bool Create(Contact contact);
}
