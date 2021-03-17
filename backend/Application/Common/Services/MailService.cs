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
      MailAddress from = new MailAddress("from@example.com");

      MailMessage message = new MailMessage(from, to);
      message.Subject = mailRequest.Subject;
      message.Body = mailRequest.Body;
      message.IsBodyHtml = true;
      AlternateView htmlView = AlternateView.CreateAlternateViewFromString(mailRequest.Body, null, "text/html");
      LinkedResource logo = new LinkedResource("../RazorEmails/Views/Shared/images/logo.png");
      LinkedResource altLogo = new LinkedResource("../RazorEmails/Views/Shared/images/logo_alt.png");
      LinkedResource topborder = new LinkedResource("../RazorEmails/Views/Shared/images/top_full_border.png");
      LinkedResource bottomborder = new LinkedResource("../RazorEmails/Views/Shared/images/bottom_full_border.png");
      LinkedResource dots = new LinkedResource("../RazorEmails/Views/Shared/images/dots.png");
      logo.ContentId = "logo";
      altLogo.ContentId = "altLogo";
      topborder.ContentId = "topborder";
      bottomborder.ContentId = "bottomborder";
      dots.ContentId = "dots";
      htmlView.LinkedResources.Add(logo);
      htmlView.LinkedResources.Add(altLogo);
      htmlView.LinkedResources.Add(topborder);
      htmlView.LinkedResources.Add(bottomborder);
      htmlView.LinkedResources.Add(dots);
      message.AlternateViews.Add(htmlView);

      SmtpClient client = new SmtpClient(_mailOptions.Host, _mailOptions.Port)
      {
        Credentials = new NetworkCredential(_mailOptions.Mail, _mailOptions.Password),
        EnableSsl = true,
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

    public async Task TestSendEmail()
    {
      /*
      string FilePath = Directory.GetCurrentDirectory() + "./my-new-message.html";
      StreamReader str = new StreamReader(FilePath);
      string MailText = str.ReadToEnd();
      str.Close();
     */

      var activateUserModel = new ActivateUserEmailViewModel("testurl");

      var mail = new MailRequestDto
      {
        ToEmail = "4aa05eab54-030844@inbox.mailtrap.io",
        Subject = "Test mail from Dansk Gartneri",
        Body = await _razorViewToStringRenderer.RenderViewToStringAsync("/Views/Emails/ActivateUserEmail/ActivateUserEmail.cshtml", activateUserModel)
        //Body = MailText
    };

      await SendEmailAsync(mail);
    }
  }
}
