using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TripCalculator.Entities;

public class Student
{
  [Required]
  public Guid Id { get; set; }
  [Required]
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
  [JsonIgnore]
  public virtual ICollection<Expense>? Expenses { get; set; } = [];
  public virtual ICollection<Trip>? Trips { get; set; } = [];
}