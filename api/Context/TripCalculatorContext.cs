using Microsoft.EntityFrameworkCore;
using TripCalculator.Entities;

namespace TripCalculator.Context;

public class TripCalculatorContext(DbContextOptions<TripCalculatorContext> options) : DbContext(options)
{
  public DbSet<Expense> Expenses { get; set; } = null!;
  public DbSet<Student> Students { get; set; } = null!;
  public DbSet<Trip> Trips { get; set; } = null!;
}