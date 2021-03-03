using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Microsoft.AspNetCore.Http;

using System.Threading;
using System.Threading.Tasks;
using Application.Accounts;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.UserLogin
{
  public class LoginCommand : IRequest<UserTokenDto>
  {
    public LoginRequestDto LoginDetails;

    public class LoginCommandHandler : IRequestHandler<LoginCommand, UserTokenDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IHttpContextAccessor _httpContextAccessor;
      private readonly IMapper _mapper;
      private readonly ITokenService _tokenService;


      public LoginCommandHandler(IApplicationDbContext context, IHttpContextAccessor httpContextAccessor, ITokenService tokenService, IMapper mapper)
      {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
        _tokenService = tokenService;
      }

      public async Task<UserTokenDto> Handle(LoginCommand request, CancellationToken cancellationToken)
      {
        var user = await _context.Users
          .FirstOrDefaultAsync(x => x.Email.Equals(request.LoginDetails.Email));

        if (user == null)
        {
          throw new ArgumentException("Invalid credentials.");
        }

        var (verified, needsUpgrade) = _passwordHasher.Check(user.Password, request.LoginDetails.Password);

        if (!verified)
        {
          throw new ArgumentException("Invalid credentials.");
        }

        var token = _tokenService.CreateToken(user);
        return new UserTokenDto
        {
          User = _mapper.Map<UserDto>(user),
          Token = token
        };
      }
    }
  }
}
