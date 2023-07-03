using System;
using System.Collections.Generic;

namespace onlineFloralDelivery.Models;

public partial class Order
{
    public int OrderDetailId { get; set; }

    public int? CartId { get; set; }

    public int? QuantityTotal { get; set; }

    public string? PaymentMethod { get; set; }

    public DateTime? OrderDate { get; set; }

    public TimeSpan? OrderTime { get; set; }

    public virtual Cart? Cart { get; set; }

    public virtual ICollection<Delivery> Deliveries { get; set; } = new List<Delivery>();
}
