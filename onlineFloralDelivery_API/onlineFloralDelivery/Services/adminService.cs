using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public interface adminService
{
    public dynamic showAll();
    public bool Create(Admin admin);
    public bool update(Admin admin);

}
