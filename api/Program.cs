using Microsoft.EntityFrameworkCore;
using TripCalculator.Context;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "enablelocalhost",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000",
            "http://localhost:5036")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
builder.Services.AddDbContext<TripCalculatorContext>(opt =>
    opt.UseInMemoryDatabase("TripCalcDB"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.UseCors("enablelocalhost");

app.Run();
