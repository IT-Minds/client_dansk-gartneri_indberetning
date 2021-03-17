using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Options;
using Application.Mails;
using Microsoft.Extensions.Options;
//using System.Net;
//using System.Net.Mail;
//using MailKit.Security;
//using MimeKit;
//using SmtpClient = MailKit.Net.Smtp.SmtpClient;

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
      MailAddress from = new MailAddress("from@example.com");

      MailMessage message = new MailMessage(from, to);
      message.Subject = mailRequest.Subject;
      message.Body = mailRequest.Body;

      SmtpClient client = new SmtpClient(_mailOptions.Host, _mailOptions.Port)
      {
        Credentials = new NetworkCredential(_mailOptions.Mail, _mailOptions.Password),
        EnableSsl = true, //true?
      };
      /*
      SmtpClient client = new SmtpClient();
      client.UseDefaultCredentials = false;
      client.Credentials = new NetworkCredential(_mailOptions.Mail, _mailOptions.Password);
      client.Host = _mailOptions.Host;
      client.Port = _mailOptions.Port;
      client.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
      client.PickupDirectoryLocation = "c:\\Temp\\mail\\";
      client.EnableSsl = false;
      */

      try
      {
        client.Send(message);
      }
      catch (SmtpException ex)
      {
        Console.WriteLine(ex.ToString());
      }
      
      /*
      var email = new MimeMessage();
      email.Sender = MailboxAddress.Parse(_mailOptions.Mail);
      email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
      email.Subject = mailRequest.Subject;
      var builder = new BodyBuilder();
      if (mailRequest.Attachments != null)
      {
        byte[] fileBytes;
        foreach (var file in mailRequest.Attachments)
        {
          if (file.Length > 0)
          {
            using (var ms = new MemoryStream())
            {
              file.CopyTo(ms);
              fileBytes = ms.ToArray();
            }
            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
          }
        }
      }
      builder.HtmlBody = mailRequest.Body;
      email.Body = builder.ToMessageBody();
      using var smtp = new SmtpClient();
      smtp.Connect(_mailOptions.Host, _mailOptions.Port, SecureSocketOptions.StartTls);
      smtp.Authenticate(_mailOptions.Mail, _mailOptions.Password);
      await smtp.SendAsync(email);
      smtp.Disconnect(true);
      */
    }

    public void TestSendEmail()
    {
      var mail = new MailRequestDto
      {
        ToEmail = "4aa05eab54-030844@inbox.mailtrap.io",
        Subject = "Test mail from Dansk Gartneri",
        Body = "Hello world from mailService"
      };

      SendEmailAsync(mail);
    }
  }
}
