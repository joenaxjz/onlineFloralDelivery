﻿using System;
using System.Collections.Generic;

namespace onlineFloralDelivery.Models;

public partial class Bouquet
{
    public int BouquetId { get; set; }

    public string? BouquetName { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public decimal? SecondPrice { get; set; }

    public decimal? EventPrice { get; set; }

    public int? Quantity { get; set; }

    public DateTime? Created { get; set; }

    public int? CategoryId { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}
