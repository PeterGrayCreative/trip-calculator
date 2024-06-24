using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripCalculator.Entities;
using TripCalculator.Context;
using TripCalculator.Models;
using TripCalculator.Exceptions;


namespace TripCalculator.Controllers
{
  [Route("api")]
  [ApiController]
  public class TripController : ControllerBase
  {
    private readonly TripCalculatorContext _context;

    public TripController(TripCalculatorContext context)
    {
      _context = context;
    }

    [Route("all-trips")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TripDTO?>>> GetAllTrips()
    {
      return await _context.Trips.Include(x => x.Students).Include(x => x.Expenses).Select(x => new TripDTO
      {
        Id = x!.Id,
        Name = x.Name,
        CreatedOn = x.CreatedOn,
        TripCost = x.Expenses.Sum(x => x.Amount),
        StudentCount = x.Students.Count
      }).ToListAsync();
    }

    [Route("trip/{tripId}")]
    [HttpGet]
    public async Task<ActionResult<TripDTO?>> GetTripById(Guid tripId)
    {
      return await _context.Trips
        .Where(x => x.Id == tripId)
        .Include(x => x.Students)
        .ThenInclude(x => x.Expenses)
        .Include(x => x.Expenses)
        .Select(x => new TripDTO
        {
          Id = x!.Id,
          Name = x.Name,
          CreatedOn = x.CreatedOn,
          TripCost = x.Expenses.Sum(x => x.Amount),
          StudentCount = x.Students.Count,
          Expenses = x.Expenses.Select(y => new ExpenseDTO
          {
            Name = y.Name,
            Id = y.Id,
            TripId = y.TripId,
            Amount = y.Amount,
            CreatedOn = y.CreatedOn,
            StudentId = y.StudentId
          }),
          Students = x.Students.Select(y => new StudentDTO
          {
            Name = y.Name,
            Id = y.Id,
            ExpenseTotal = y.Expenses!.Count > 0 ? y.Expenses.Sum(x => x.Amount) : 0
          })
        }).FirstOrDefaultAsync();
    }

    [Route("trip")]
    [HttpPost]
    public async Task<ActionResult<TripDTO?>> AddTrip([FromQuery] string TripName)
    {
      Trip? trip;
      var newTrip = new Trip
      {
        Id = Guid.NewGuid(),
        Name = TripName
      };
      _context.Trips.Add(newTrip);
      try
      {
        await _context.SaveChangesAsync();
        trip = await _context.Trips.Include(x => x.Students).Include(x => x.Expenses).FirstOrDefaultAsync(x => x.Id == newTrip.Id);
      }
      catch (Exception e)
      {
        throw new DBSaveException("Unable to save entity", e.InnerException);
      }

      return new TripDTO
      {
        Id = trip!.Id,
        Name = trip.Name,
        CreatedOn = trip.CreatedOn.ToLocalTime(),
        TripCost = trip.Expenses.Sum(x => x.Amount),
        StudentCount = trip.Students.Count
      };
    }

    [Route("trip/{tripId}/expense")]
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Trip>>> AddExpenseToStudent(Guid? tripId, [FromBody] Expense expense)
    {
      if (tripId == null || expense.Amount == 0 || expense.Name == "" || expense.StudentId == Guid.Empty) return BadRequest();

      var expenseModel = new Expense
      {
        Id = Guid.NewGuid(),
        TripId = tripId.Value,
        StudentId = expense.StudentId,
        Name = expense.Name,
        Amount = expense.Amount
      };
      _context.Expenses.Add(expenseModel);
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception e)
      {
        throw new DBSaveException("Unable to save entity", e.InnerException);
      }

      return Ok();
    }

    [Route("student")]
    [HttpPost]
    public async Task<ActionResult<StudentDTO?>> AddStudentToTrip([FromQuery] string? studentName, [FromQuery] Guid? tripId)
    {
      if (studentName == null) return BadRequest();
      Student? studentEntity;

      var student = new Student
      {
        Id = Guid.NewGuid(),
        Name = studentName
      };

      _context.Students.Add(student);
      try
      {
        await _context.SaveChangesAsync();

        studentEntity = await _context.Students.FirstOrDefaultAsync(x => x.Id == student.Id);
        if (studentEntity == null) throw new Exception("Student Entity was not able to save");

        var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);

        if (trip != null) studentEntity!.Trips!.Add(trip);

        trip?.Students?.Add(student);

        await _context.SaveChangesAsync();
      }
      catch (Exception e)
      {
        throw new DBSaveException("Unable to save entity", e.InnerException);
      }

      return Ok();
    }
  }
}