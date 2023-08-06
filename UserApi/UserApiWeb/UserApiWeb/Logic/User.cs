using System.ComponentModel.DataAnnotations;

namespace UserApiWeb.Logic
{
    public class User
    {

        public int Id { get; set; }

        public string userName { get; set; } = string.Empty;

        public string userGmail { get; set; } = string.Empty;

        public string userPassword { get; set; } = string.Empty;

        public int userTypeGender { get; set; }

        public userGender? userGender { get; set; }

    }
}
