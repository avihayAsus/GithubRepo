using GithubRepo.Models;

namespace GithubRepo.Services
{
    public interface IGithubService
    {
        Task Bookmark(Repository Repository);
        List<Repository> GetRepositories();
        Task<GithubRepositories> SearchRepositoriesAsyn(string query);
    }
}