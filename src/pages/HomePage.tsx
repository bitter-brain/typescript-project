import { SearchBar } from "../features/search/ui/SearchBar";
import { UserCard } from "../entities/user/ui/UserCard";
import { RepoList } from "../entities/user/ui/RepoList";
import { Loader } from "../shared/components/Loader";
import { ErrorMessage } from "../shared/components/ErrorMessage";
import { useUser } from "../shared/hooks/useUser";

export const HomePage = () => {
  const { user, repos, loading, error, searchUser } = useUser();

  return (
    <div className="container">
      <h1>GitHub User Explorer</h1>

      <SearchBar onSearch={searchUser} />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {user && <UserCard user={user} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
};