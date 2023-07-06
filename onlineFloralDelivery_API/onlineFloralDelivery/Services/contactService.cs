using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public interface ContactService
{
    public dynamic showAll();
    public bool Create(Contact contact);
}
