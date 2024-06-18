using System;
using System.ComponentModel.DataAnnotations;

namespace TripCalculator.Models;

public class ExpenseModel
{
  public Guid Id { get; set; }
  public string Name { get; set; } = "";
  public int Amount { get; set; }
}