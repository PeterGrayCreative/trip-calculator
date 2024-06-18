using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripCalculator.Entities;

public class Expense
{
  [Required]
  public Guid Id { get; set; }
  [Required]
  public Guid TripId { get; set; }
  [Required]
  public Guid StudentId { get; set; }
  public string Name { get; set; } = "";
  public int Amount { get; set; }

  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

  [ForeignKey(nameof(TripId))]
  public virtual Trip? Trip { get; set; }

  [ForeignKey(nameof(StudentId))]
  public virtual Student? Student { get; set; }
}