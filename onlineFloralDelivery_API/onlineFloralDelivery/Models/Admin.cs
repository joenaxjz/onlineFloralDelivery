using System;
using System.Collections.Generic;

namespace onlineFloralDelivery.Models;

public partial class Admin
{
    public int AdminId { get; set; }

    public string? Role { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public DateTime? Created { get; set; }

    public bool? Status { get; set; }
}
