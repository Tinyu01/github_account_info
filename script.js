const usernameInput = document.getElementById('username');
const searchButton = document.getElementById('search-btn');
const profileContainer = document.getElementById('profile-container');

const BASE_URL = 'https://api.github.com/users/';

searchButton.addEventListener('click', async () => {
  const username = usernameInput.value.trim();

  // Validate username
  if (!username) {
    alert('Please enter a username');
    return;
  }

  try {
    const response = await fetch(BASE_URL + username);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const userData = await response.json();
    displayProfile(userData);
  } catch (error) {
    console.error(error);
    profileContainer.textContent = `Error: ${error.message}`;
  }
});

function displayProfile(data) {
  profileContainer.innerHTML = `
    <img src="${data.avatar_url}" alt="${data.login}'s avatar">
    <h2>${data.name || data.login}</h2>
    <p>Username: ${data.login}</p>
    <p>Bio: ${data.bio || 'No bio provided.'}</p>
    <p>Public Repos: ${data.public_repos}</p>
    <p>Followers: ${data.followers}</p>
    <p>Account Created: ${new Date(data.created_at).toLocaleDateString()}</p>
    <p>Last Login: ${new Date(data.updated_at).toLocaleString()}</p>
    <a href="${data.html_url}" target="_blank">View Profile</a>
  `;
}
