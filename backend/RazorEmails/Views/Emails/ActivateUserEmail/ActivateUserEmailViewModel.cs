namespace RazorEmails.Views.Emails.ActivateUserEmail
{
  public class ActivateUserEmailViewModel
  {
    public string Url { get; set; }
    public ActivateUserEmailViewModel(string url)
    {
      Url = url;
    }
  }
}
