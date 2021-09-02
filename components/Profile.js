import Image from 'next/image';
import styles from '../styles/profile.module.css';

export default function Profile({ user }) {
  const {
    login,
    avatar_url,
    name,
    location,
    company,
    followers,
    hireable,
    blog,
    public_repos,
    repos_url,
  } = user;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Image src={avatar_url} alt="Profile avatar" width={300} height={300} />
        <div className={styles.info}>
          <h2>{login}</h2>
          <h3>Nombre Real: {name ? name : 'Información no proporcionada'}</h3>
          <p>Reside en: {location ? location : 'Información no proporcionada'}</p>
          <p>Trabaja en: {company ? company : 'Información no proporcionada'}</p>
          <p>Disponibilidad para trabajar: {hireable ? 'Si' : 'No'}</p>
          <p>Tiene {followers} seguidores</p>
          {blog && <a href={blog}>Blog de {login}</a>}
          {public_repos && <a href={public_repos}>Repositorios de Github de {login}</a>}
        </div>
      </div>
    </div>
  );
}
