import type { User } from '../model/userTypes'

type Props = {
  user: User
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        width={120}
      />
      <div className="user-card__info">
        <h2>{user.login}</h2>
        <p>Repositories: {user.public_repos}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
        >
          GitHub Profile
        </a>
      </div>
    </div>
  )
}