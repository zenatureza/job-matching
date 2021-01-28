using ApplicationCore.Domain.Interfaces;
using AutoMapper;
using System;
using System.Linq;
using System.Reflection;

namespace ApplicationCore.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private void ApplyMappingsFromAssembly(Assembly assembly)
        {
            var types = assembly
                .GetExportedTypes()
                .Where(t =>
                {
                    return t.GetInterfaces()
                        .Any(i =>
                        {
                            return i.IsGenericType &&
                                i.GetGenericTypeDefinition() == typeof(IMapFrom<>);
                        });
                })
                .ToList();

            foreach (var type in types)
            {
                var instance = Activator
                    .CreateInstance(type);

                var mappingInterfaces = type
                    .GetInterfaces()
                    .Where(i => i.Name.Contains("IMapFrom"))
                    .ToList();

                mappingInterfaces
                    .ForEach(x =>
                    {
                        var methodInfo = type.GetMethod("Mapping") ??
                            x.GetMethod("Mapping");

                        methodInfo?
                            .Invoke(instance, new object[] { this });
                    });
            }
        }
    }
}
