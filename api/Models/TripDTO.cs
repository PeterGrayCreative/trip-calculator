using TripCalculator.Entities;

namespace TripCalculator.Models;

public class TripDTO
{
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
  public int TripCost { get; set; }
  public int StudentCount { get; set; }
  public IEnumerable<ExpenseDTO>? Expenses { get; set; }
  public IEnumerable<StudentDTO>? Students { get; set; }
}