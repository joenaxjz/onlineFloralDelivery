using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace onlineFloralDelivery.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Bouquet> Bouquets { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Delivery> Deliveries { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DNGUYXNTUANANH;Database=onlineFloralDeliveryDB;user id=sa;password=0335167226aA;trusted_connection=true;encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__account__46A52EF548F5E2CD");

            entity.ToTable("account");

            entity.Property(e => e.AccountId).HasColumnName("account_Id");
            entity.Property(e => e.Address)
                .IsUnicode(false)
                .HasColumnName("address");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");
            entity.Property(e => e.Dob)
                .HasColumnType("date")
                .HasColumnName("dob");
            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.ImageUrl)
                .IsUnicode(false)
                .HasColumnName("imageUrl");
            entity.Property(e => e.Password)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("role_Id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Accounts)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("fk_account_role");
        });

        modelBuilder.Entity<Bouquet>(entity =>
        {
            entity.HasKey(e => e.BouquetId).HasName("PK__bouquet__F55E429AE505151B");

            entity.ToTable("bouquet");

            entity.Property(e => e.BouquetId).HasColumnName("bouquet_id");
            entity.Property(e => e.BouquetName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("bouquet_name");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.EventPrice)
                .HasDefaultValueSql("((0))")
                .HasColumnType("decimal(10, 0)")
                .HasColumnName("event_price");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 0)")
                .HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.SecondPrice)
                .HasDefaultValueSql("((0))")
                .HasColumnType("decimal(10, 0)")
                .HasColumnName("second_price");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Category).WithMany(p => p.Bouquets)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("fk_categories_bouquet");

            entity.HasMany(d => d.Events).WithMany(p => p.Bouquets)
                .UsingEntity<Dictionary<string, object>>(
                    "BouquetEvent",
                    r => r.HasOne<Event>().WithMany()
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_bouquet_bouquet_event_1"),
                    l => l.HasOne<Bouquet>().WithMany()
                        .HasForeignKey("BouquetId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fk_bouquet_bouquet_event"),
                    j =>
                    {
                        j.HasKey("BouquetId", "EventId").HasName("PK__bouquet___97694DE8D9058400");
                        j.ToTable("bouquet_event");
                        j.IndexerProperty<int>("BouquetId").HasColumnName("bouquet_id");
                        j.IndexerProperty<int>("EventId").HasColumnName("event_id");
                    });
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__cart__2EF52A2712A71C2A");

            entity.ToTable("cart");

            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.AccountId).HasColumnName("account_Id");
            entity.Property(e => e.BouquetId).HasColumnName("bouquet_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(10, 0)")
                .HasColumnName("total_price");

            entity.HasOne(d => d.Account).WithMany(p => p.Carts)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("fk_acccount_cart");

            entity.HasOne(d => d.Bouquet).WithMany(p => p.Carts)
                .HasForeignKey(d => d.BouquetId)
                .HasConstraintName("fk_bouquet_cart");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__categori__D54EE9B4E267E764");

            entity.ToTable("categories");

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("category_name");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.CommentId).HasName("PK__comments__E7EC515F477B1B9B");

            entity.ToTable("comments");

            entity.Property(e => e.CommentId).HasColumnName("comment_Id");
            entity.Property(e => e.AccountId).HasColumnName("accountId");
            entity.Property(e => e.BouquetId).HasColumnName("bouquetId");
            entity.Property(e => e.Content)
                .IsUnicode(false)
                .HasColumnName("content");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");

            entity.HasOne(d => d.Account).WithMany(p => p.Comments)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("fk_account_comments");

            entity.HasOne(d => d.Bouquet).WithMany(p => p.Comments)
                .HasForeignKey(d => d.BouquetId)
                .HasConstraintName("fk_bouquet_comments_1");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.ContactId).HasName("PK__contact__024E7A868294AA62");

            entity.ToTable("contact");

            entity.Property(e => e.ContactId).HasColumnName("contact_id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");
            entity.Property(e => e.Email)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Message)
                .IsUnicode(false)
                .HasColumnName("message");
            entity.Property(e => e.Name)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Subject)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("subject");
        });

        modelBuilder.Entity<Delivery>(entity =>
        {
            entity.HasKey(e => e.DeliveryId).HasName("PK__delivery__1C5CF4F5C7FE4E0C");

            entity.ToTable("delivery");

            entity.Property(e => e.DeliveryId).HasColumnName("delivery_id");
            entity.Property(e => e.Message)
                .IsUnicode(false)
                .HasColumnName("message");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.RecipientAddress)
                .IsUnicode(false)
                .HasColumnName("recipient_address");
            entity.Property(e => e.RecipientName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("recipient_name");
            entity.Property(e => e.RecipientPhone)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("recipient_phone");

            entity.HasOne(d => d.Order).WithMany(p => p.Deliveries)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("fk_order_delivery");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId).HasName("PK__event__2370F727BD26010F");

            entity.ToTable("event");

            entity.Property(e => e.EventId).HasColumnName("event_id");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.EndDate)
                .HasColumnType("date")
                .HasColumnName("end_date");
            entity.Property(e => e.EventName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("event_name");
            entity.Property(e => e.ImageUrl)
                .IsUnicode(false)
                .HasColumnName("imageUrl");
            entity.Property(e => e.IsAction).HasColumnName("isAction");
            entity.Property(e => e.StartDate)
                .HasColumnType("date")
                .HasColumnName("start_date");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__Images__336E9B55CECEFF5D");

            entity.Property(e => e.ImageId).HasColumnName("imageId");
            entity.Property(e => e.BouquetId).HasColumnName("bouquet_id");
            entity.Property(e => e.ImageUrl)
                .IsUnicode(false)
                .HasColumnName("imageUrl");

            entity.HasOne(d => d.Bouquet).WithMany(p => p.Images)
                .HasForeignKey(d => d.BouquetId)
                .HasConstraintName("fk_bouquet_images");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__order__465962293D8FA91D");

            entity.ToTable("order");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.AccountId).HasColumnName("account_Id");
            entity.Property(e => e.OrderDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("orderDate");
            entity.Property(e => e.OrderTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("orderTime");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("payment_method");
            entity.Property(e => e.Status)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("status");
            entity.Property(e => e.TotalOrder)
                .HasColumnType("decimal(10, 0)")
                .HasColumnName("total_order");

            entity.HasOne(d => d.Account).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AccountId)
                .HasConstraintName("fk_order_account");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => new { e.OrderId, e.BouquetId }).HasName("PK__orderDet__F90C8600824FF04A");

            entity.ToTable("orderDetails");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.BouquetId).HasColumnName("bouquet_id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(10, 0)")
                .HasColumnName("total_price");

            entity.HasOne(d => d.Bouquet).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.BouquetId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_orderDetails");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_order_orderDetails_1");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__760F99A483B90DDA");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("role_Id");
            entity.Property(e => e.Created)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("created");
            entity.Property(e => e.Description)
                .IsUnicode(false)
                .HasColumnName("description");
            entity.Property(e => e.RoleName)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("roleName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
