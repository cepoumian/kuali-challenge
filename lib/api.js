const url = process.env.NEXT_PUBLIC_API_URL;
const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_WEB_API_KEY;
const per_page = process.env.NEXT_PUBLIC_PER_PAGE;

// Github API (Contenido)
export async function getUsers() {
  const res = await fetch(
    `${url}/users?client_id=${clientId}&client_secret=${clientSecret}&per_page=${
      per_page * 4
    }`
  );

  const users = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Could not fetch users.');
  }

  return users;
}

export async function getUserByUsername(username) {
  const res = await fetch(
    `${url}/users/${username}?client_id=${clientId}&client_secret=${clientSecret}&`
  );
  const user = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Could not fetch user.');
  }

  return user;
}

// Firebase API (Registro de usuarios y qutenticación)

export async function signInUser(email, password) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
}

export async function signUpNewUser(email, password) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return res;
}

export async function getAppUserData(token) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  return data;
}
