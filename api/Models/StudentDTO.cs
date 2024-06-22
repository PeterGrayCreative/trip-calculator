namespace TripCalculator.Models;

public class StudentDTO
{
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
  public int ExpenseTotal { get; set; }
  public IEnumerable<TripDTO> Trips { get; set; } = [];
  public IEnumerable<ExpenseDTO>? Expenses { get; set; }
}