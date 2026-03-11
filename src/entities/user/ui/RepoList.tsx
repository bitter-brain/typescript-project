import { useState } from 'react'
import type { Repo } from '../model/userTypes'

type Props = {
  repos: Repo[];
}

export const RepoList = ({ repos }: Props) => {
  const [sort, setSort] = useState<"stars" | "name">("stars")

  const sorted = [...repos].sort((a, b) =>
    sort === "stars"
      ? b.stargazers_count - a.stargazers_count
      : a.name.localeCompare(b.name)
  )

  return (
    <div className="repo-list">
      <div className="repo-list__header">
        <h3>Repositories ({repos.length})</h3>
        <select value={sort} onChange={(e) => setSort(e.target.value as "stars" | "name")}>
          <option value="stars">By stars</option>
          <option value="name">By name</option>
        </select>
      </div>

      {sorted.map((repo) => (
        <div key={repo.id} className="repo-item">
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
          <span>⭐ {repo.stargazers_count}</span>
        </div>
      ))}
    </div>
  )
}