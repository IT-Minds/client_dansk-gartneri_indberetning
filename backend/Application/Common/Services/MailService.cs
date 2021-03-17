using System;
using System.IO;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Mails;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using RazorEmail.Services;
using RazorEmails.Interfaces;
using RazorEmails.Views.Emails.ActivateUserEmail;

namespace Application.Common.Services
{
  public class MailService : IMailService
  {
    private readonly MailOptions _mailOptions;
    private readonly IRazorViewToStringRenderer _razorViewToStringRenderer;
    public MailService(IOptions<MailOptions> mailOptions, IRazorViewToStringRenderer razorViewToStringRenderer)
    {
      _mailOptions = mailOptions.Value;
      _razorViewToStringRenderer = razorViewToStringRenderer;
    }
    public async Task SendEmailAsync(MailRequestDto mailRequest)
    {
      MailAddress to = new MailAddress(mailRequest.ToEmail);
      MailAddress from = new MailAddress(_mailOptions.Mail);

      MailMessage message = new MailMessage(from, to);
      message.Subject = mailRequest.Subject;
      message.Body = mailRequest.Body;

      SmtpClient client = new SmtpClient(_mailOptions.Host, _mailOptions.Port)
      {
        Credentials = new NetworkCredential(_mailOptions.Mail, _mailOptions.Password),
        EnableSsl = true
      };

      try
      {
        client.Send(message);
      }
      catch (SmtpException ex)
      {
        Console.WriteLine(ex.ToString());
      }
    }

    public void TestSendEmail()
    {
      string FilePath = Directory.GetCurrentDirectory() + "./my-new-message.html";
      StreamReader str = new StreamReader(FilePath);
      string MailText = str.ReadToEnd();
      str.Close();


      var activateUserModel = new ActivateUserEmailViewModel("testurl");

      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.Mail,
        Subject = "Test mail from Dansk Gartneri",
        //Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ActivateUserEmail/ActivateUserEmail.cshtml", activateUserModel)
        Body = "hej hej"
    };

      SendEmailAsync(mail);
    }
  }
}
