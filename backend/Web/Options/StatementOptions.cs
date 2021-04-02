using System.Collections.Generic;
using Domain.Entities;

namespace Web.Options
{
  public class StatementOptions
  {
    public const string Statement = "Statement";
    public List<StatementField> StatementFields { get; set; }
  }
}
