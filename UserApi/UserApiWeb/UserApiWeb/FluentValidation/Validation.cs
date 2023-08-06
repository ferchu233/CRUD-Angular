using FluentValidation;

namespace UserApiWeb.FluentValidation
{
    public class Validation : AbstractValidator<Logic.User>
    {
        public Validation()
        {
            // Check name

            RuleFor(customer => customer.userName)
                .NotNull()
                .NotEmpty()
                .Length(3, 30);

            // Check Gmail

            RuleFor(customer => customer.userGmail)
                .NotNull()
                .NotEmpty()
                .Length(10, 40);


            // Check Password

            RuleFor(customer => customer.userPassword).NotNull()
                .NotEmpty()
                .Length(8, 16);

            // Check Gender

            RuleFor(x => x.userTypeGender)
                .NotNull().WithMessage("Esta Vacio")
                .NotEqual(0)
                .LessThan(4);
            
                

        }
    }
}