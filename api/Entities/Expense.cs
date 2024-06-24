using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TripCalculator.Entities;

public class Expense
{
  [Required]
  public Guid Id { get; set; }
  [Required]
  public Guid TripId { get; set; }
  [Required]
  public Guid StudentId { get; set; } = Guid.Empty;
  public string Name { get; set; } = "";
  public int Amount { get; set; }

  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

  [ForeignKey(nameof(TripId))]
  public Trip? Trip { get; set; }

  [ForeignKey(nameof(StudentId))]
  [JsonIgnore]
  public Student? Student { get; set; }
}