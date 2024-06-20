using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TripCalculator.Entities;
using TripCalculator.Context;

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
    public async Task<ActionResult<IEnumerable<Trip>>> GetAllTrips()
    {
      return await _context.Trips.Include(x => x.Students).Include(x => x.Expenses).ToListAsync();
    }

    [Route("trip")]
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Trip>>> AddTrip(Guid tripId, [FromQuery] string TripName)
    {
      _context.Trips.Add(new Trip
      {
        Id = Guid.NewGuid(),
        Name = TripName
      });
      await _context.SaveChangesAsync();
      return await _context.Trips.Include(x => x.Students).Include(x => x.Expenses).ToListAsync();
    }

    [Route("{tripId}/expense")]
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Trip>>> AddExpenseToStudent(Guid? tripId, [FromBody] Expense expense)
    {
      if (tripId == null || expense.Amount == 0 || expense.Name == "") return BadRequest();

      var expenseModel = new Expense
      {
        Id = Guid.NewGuid(),
        TripId = tripId.Value,
        StudentId = expense.StudentId,
        Name = expense.Name,
        Amount = expense.Amount
      };
      _context.Expenses.Add(expenseModel);

      await _context.SaveChangesAsync();

      return await _context.Trips.Include(x => x.Students).Include(x => x.Expenses).ToListAsync();
    }

    [Route("student")]
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Trip>>> AddStudentToTrip([FromQuery] string? studentName, [FromQuery] Guid? tripId)
    {
      if (studentName == null) return BadRequest();

      var student = new Student
      {
        Id = Guid.NewGuid(),
        Name = studentName
      };

      _context.Students.Add(student);
      await _context.SaveChangesAsync();

      var studentEntity = _context.Students.First(x => x.Id == student.Id);
      var trip = await _context.Trips.FirstOrDefaultAsync(x => x.Id == tripId);

      if (trip != null) studentEntity!.Trips!.Add(trip);

      trip?.Students?.Add(student);

      await _context.SaveChangesAsync();

      return await _context.Trips.Include(x => x.Students).Include(x => x.Expenses).ToListAsync();
    }
  }
}