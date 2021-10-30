// Div where profile info will apear
const overview = document.querySelector(".overview");
// My github username
const username = "diana-m-a";
// Unordered list used to display repo list
const repoList = document.querySelector(".repo-list");

const getProfile = async function () {
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const data = await profile.json();
    console.log(data);
    displayProfile(data);
};
getProfile();

const displayProfile = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(userInfoDiv);
};

const getRepos = async function () {
    const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await repos.json();
    console.log(data);
    displayRepoInfo(data);
}

getRepos();

const displayRepoInfo = function (repos) {
    for (let repo of repos) {
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}