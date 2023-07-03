using System;
using System.Collections.Generic;

namespace onlineFloralDelivery.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public string? ImageUrl { get; set; }

    public DateTime? Created { get; set; }

    public DateTime? Dob { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();
}
