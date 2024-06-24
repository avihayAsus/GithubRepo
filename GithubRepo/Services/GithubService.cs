using GithubRepo.Models;
using GithubRepo.Session;

namespace GithubRepo.Services
{
    public class GithubService : IGithubService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IRepositorySession repositorySession;
        private readonly IRepositorySession _session;

        public GithubService(IHttpClientFactory httpClientFactory, IRepositorySession repositorySession)
        {
            _httpClientFactory = httpClientFactory;
            _session = repositorySession;
        }

        public async Task<GithubRepositories> SearchRepositoriesAsyn(string query)
        {
            using var client = _httpClientFactory.CreateClient();

            client.DefaultRequestHeaders.Add("user-agent", ".net");

            var response = await client.GetAsync($"https://api.github.com/search/repositories?q={query}");
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<GithubRepositories>();

            ArgumentNullException.ThrowIfNull(result, nameof(result));

            return result;

        }
        public async Task Bookmark(Repository Repository)
        {
            _session.Set("bookmark", Repository);
        }

        public List<Repository> GetRepositories()
        {
            var repo = _session.Get("bookmark");

            return repo.ToList();

        }
    }
}
