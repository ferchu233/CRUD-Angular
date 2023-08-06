using Microsoft.EntityFrameworkCore;
using UserApiWeb.Logic;

namespace UserApiWeb.Date
{

        public class DateContext : DbContext
        {
            public DateContext(DbContextOptions<DateContext> options) : base(options) { }

            public DbSet<User> idUser { get; set; }

            public DbSet<User> userName { get; set; }

            public DbSet<User> userGmail { get; set; }

            public DbSet<User> userPassword { get; set; }

            public DbSet<User> userTypeGender { get; set; }

            public DbSet<UserApiWeb.Logic.userGender>? userGender { get; set; }
        }

    
}
