using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public interface AccountService
{
    public dynamic showAll();
    public bool Register(Account account);
    public bool Update(Account account);
    public Account findById(int id);

}
