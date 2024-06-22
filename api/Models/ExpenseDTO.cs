namespace TripCalculator.Models;

public class ExpenseDTO
{
  public Guid Id { get; set; }
  public Guid TripId { get; set; }
  public Guid StudentId { get; set; }
  public string Name { get; set; } = "";
  public int Amount { get; set; }
  public DateTime CreatedOn { get; set; }
}