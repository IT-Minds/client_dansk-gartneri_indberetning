using System;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Mails;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Application.Common.Services
{
  public class MailService : IMailService
  {
    private readonly MailOptions _mailOptions;
    public MailService(IOptions<MailOptions> mailOptions)
    {
      _mailOptions = mailOptions.Value;
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
      var mail = new MailRequestDto
      {
        ToEmail = _mailOptions.Mail,
        Subject = "Test mail from Dansk Gartneri",
        Body = "Hello world from mailService"
      };

      SendEmailAsync(mail);
    }
  }
}
