namespace TripCalculator.Models;

public class StudentDTO
{
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
  public IEnumerable<TripDTO> Trips { get; set; } = [];
}