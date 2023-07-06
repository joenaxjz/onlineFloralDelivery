using onlineFloralDelivery.Models;

namespace onlineFloralDelivery.Services;

public interface RoleService
{
    public dynamic showAll();
    public bool Create(Role role);
    public bool Update(Role role);
}
