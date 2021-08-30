const url = process.env.NEXT_PUBLIC_API_URL;
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_WEB_API_KEY;

export async function getUsers() {
  const response = await fetch(
    `${url}/users?client_id=${clientId}&client_secret=${clientSecret}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch user.');
  }

  const users = {
    ...data,
  };

  return users;
}

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
