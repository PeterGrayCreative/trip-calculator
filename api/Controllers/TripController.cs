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
      return await _context.Trips.ToListAsync();
    }

    [Route("add-trip")]
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Trip>>> AddTrip(Guid tripId, [FromQuery] string TripName)
    {
      _context.Trips.Add(new Trip
      {
        Id = Guid.NewGuid(),
        Name = TripName
      });
      await _context.SaveChangesAsync();
      return await _context.Trips.ToListAsync();
    }

    [Route("{tripId}/expense")]
    [HttpPost]
    public async Task<ActionResult<Trip?>> AddExpenseToStudent(Guid tripId)
    {
      _context.Expenses.Add(new Expense
      {
        Id = Guid.NewGuid(),
        TripId = Guid.NewGuid(),
        StudentId = Guid.NewGuid(),
        Name = "anexpense",
        Amount = 100
      });
      await _context.SaveChangesAsync();
      return await _context.Trips.Where(x => x.Id == tripId).FirstOrDefaultAsync();
    }

    [Route("{tripId}/student")]
    [HttpPost]
    public async Task<ActionResult<Trip?>> AddStudentToTrip(Guid tripId)
    {
      return await _context.Trips.Where(x => x.Id == tripId).FirstOrDefaultAsync();
    }
  }
}