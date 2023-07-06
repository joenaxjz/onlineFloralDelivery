using Microsoft.EntityFrameworkCore;
using onlineFloralDelivery.Models;
using onlineFloralDelivery.Services;
//using onlineFloralDelivery.Models;
//using onlineFloralDelivery.Services;
//using System.ComponentModel;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors();
// connect database
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];
builder.Services.AddDbContext<DatabaseContext>(option => option.UseLazyLoadingProxies().UseSqlServer(connectionString));
builder.Services.AddScoped<RoleService, RoleServiceImp>();
builder.Services.AddScoped<ContactService, ContactServiceImp>();
builder.Services.AddScoped<AccountService, AccountServiceImp>();


var app = builder.Build();
app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );
app.UseStaticFiles();
app.MapControllers();

app.Run();
