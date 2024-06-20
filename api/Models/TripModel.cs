namespace TripCalculator.Models;

public class TripModel
{
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
  public int TripCost { get; set; }
  public int StudentCount { get; set; }

}