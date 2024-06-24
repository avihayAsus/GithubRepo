using GithubRepo.Models;
using GithubRepo.Services;
using Microsoft.AspNetCore.Mvc;

namespace GithubRepo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RepositoryController : ControllerBase
    {

        private readonly ILogger<RepositoryController> _logger;
        private readonly IGithubService _githubService;

        public RepositoryController(ILogger<RepositoryController> logger, IGithubService githubService)
        {
            _logger = logger;
            _githubService = githubService;
        }

        [HttpGet]
        [Route("search")]
        public async Task<ActionResult<GithubRepositories>> Search([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest();
            }

            var res = await _githubService.SearchRepositoriesAsyn(query);
            if (res is null)
            {
                return NotFound();
            }

            return Ok(res);
        }
        [HttpPost]
        public async Task<ActionResult> Bookmark(Repository repository)
        {
            if (repository is null)
            {
                return BadRequest();
            }

            await _githubService.Bookmark(repository);

            return Ok();
        }
        [HttpGet]
        public async Task<ActionResult<List<Repository>>> GetBookmarkRepositories()
        {
            var res = _githubService.GetRepositories();
            if (res is null)
            {
                return NotFound();
            }

            return Ok(res);
        }
    }
}
