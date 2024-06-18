using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TripCalculator.Entities;

public class Student
{
  [Required]
  public Guid Id { get; set; }
  [Required]
  public string Name { get; set; } = "";
  public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
}