namespace TripCalculator.Exceptions;

[Serializable]
public class DBSaveException : Exception
{
  public DBSaveException() : base() { }
  public DBSaveException(string message) : base(message) { }
  public DBSaveException(string message, Exception? inner) : base(message, inner) { }
}