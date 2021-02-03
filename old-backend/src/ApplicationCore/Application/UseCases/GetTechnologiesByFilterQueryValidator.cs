using FluentValidation;

namespace ApplicationCore.Application.UseCases
{
    public class GetTechnologiesByFilterQueryValidator : AbstractValidator<GetTechnologiesByFilterQuery>
    {
        public GetTechnologiesByFilterQueryValidator()
        {
            RuleFor(query => query.Filter)
                .NotNull()
                .NotEmpty()
                .MinimumLength(3);
        }
    }
}
