using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace ApplicationCore.Application.Utils
{
    public static class HttpResponseConverter<T>
    {
        public static async Task<IEnumerable<T>> GetArrayFromJsonByKey(
            HttpResponseMessage httpResponseMessage,
            string key,
            CancellationToken cancellationToken)
        {
            var body = await httpResponseMessage.Content
                .ReadAsStringAsync(cancellationToken);

            JObject jobsParsed = JObject.Parse(body);
            IList<JToken> results = jobsParsed[key]
                .Children()
                .ToList();

            IList<T> data = new List<T>();
            foreach (JToken result in results)
            {
                T item = result.ToObject<T>();
                data.Add(item);
            }

            return data;
        }
    }
}
