using System;
using System.Collections.Generic;

namespace onlineFloralDelivery.Models;

public partial class BouquetEvent
{
    public int BouquetId { get; set; }

    public int EventId { get; set; }

    public string? BouquetName { get; set; }

    public string? EventName { get; set; }

    public virtual Bouquet Bouquet { get; set; } = null!;

    public virtual Event Event { get; set; } = null!;
}
