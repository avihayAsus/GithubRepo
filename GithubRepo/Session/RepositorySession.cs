using GithubRepo.Models;
using Microsoft.AspNetCore.Session;
using System.Text.Json;

namespace GithubRepo.Session
{
    public interface IRepositorySession : ISessionStore
    {
        HashSet<Repository> Get(string key);
        void Remove(string key);
        void Set(string key, Repository value);
        ISession Create(string sessionKey, TimeSpan idleTimeout, TimeSpan ioTimeout, Func<bool> tryEstablishSession, bool isNewSessionKey);

    }

    public class RepositorySession : IRepositorySession
    {
        private readonly HashSet<Repository> _session;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public RepositorySession(IHttpContextAccessor httpContextAccessor, ILogger<RepositorySession> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _session = new HashSet<Repository>();
        }

        public HashSet<Repository> Get(string key)
        {
            ISession? session = TryGetSHttpSession();

            var value = session.Get(key);
            if (value is null) return null;

            var data = JsonSerializer.Deserialize<HashSet<Repository>>(value);
            ArgumentNullException.ThrowIfNull(data, nameof(data));

            return data;

        }

        public void Set(string key, Repository value)
        {
            if (value is null) return;

            ISession? session = TryGetSHttpSession();
            _session.Add(value);

            var serializedData = JsonSerializer.SerializeToUtf8Bytes(_session);
            session.Set(key, serializedData);
        }

        public void Remove(string key)
        {
            ISession? session = TryGetSHttpSession();

            session.Remove(key);
        }

        private ISession TryGetSHttpSession()
        {
            var session = _httpContextAccessor?.HttpContext?.Session;
            ArgumentNullException.ThrowIfNull(session, nameof(session));
            return session;
        }

        public ISession Create(string sessionKey, TimeSpan idleTimeout, TimeSpan ioTimeout, Func<bool> tryEstablishSession, bool isNewSessionKey)
        {
            return TryGetSHttpSession();
        }

    }
}
