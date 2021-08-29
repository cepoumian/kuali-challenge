const url = process.env.NEXT_PUBLIC_API_URL;
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

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
