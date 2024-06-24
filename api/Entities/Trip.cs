using System.ComponentModel.DataAnnotations;

namespace TripCalculator.Entities;

public class Trip
{
  [Required]
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

  public ICollection<Expense> Expenses { get; } = new List<Expense>();
  public ICollection<Student> Students { get; } = new List<Student>();
}