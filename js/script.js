// Div where profile info will apear
const overview = document.querySelector(".overview");
// My github username
const username = "diana-m-a";
// Unordered list used to display repo list
const repoListElement = document.querySelector(".repo-list");
// Section where all repo info apears
const repoInfoElement = document.querySelector(".repos");
// Section where all repo data apears
const repoData = document.querySelector(".repo-data");

const getProfile = async function () {
    const profile = await fetch(`https://api.github.com/users/${username}`);
    const data = await profile.json();
    console.log(data);
    displayProfile(data);
}
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
}

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
        repoListElement.append(li);
    }
}

const repoList = repoListElement.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        getSpecificRepoInfo(repoName);
    }
});

const getSpecificRepoInfo = async function (repoName) {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await response.json();
    console.log(repoInfo);  
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languagesData = await fetchLanguages.json();
    console.log(languagesData);
    const languages = [];
    for (let key in languagesData) {
        languages.push(key);
    }
    console.log(languages);
    displaySpecificRepoInfo(repoInfo, languages)
}

const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(repoInfoDiv);
    repoData.classList.remove("hide");
    repoInfoElement.classList.add("hide");
}