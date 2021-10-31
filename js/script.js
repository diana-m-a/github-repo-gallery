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
// Back to repo button
const backToRepoButton = document.querySelector(".view-repos");
// Input 
const filterInput = document.querySelector(".filter-repos");

const getProfile = async function () {
    const fetchProfile = await fetch(`https://api.github.com/users/${username}`);
    const profileData = await fetchProfile.json();
    // console.log(profileData);
    displayProfile(profileData);
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
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await fetchRepos.json();
    // console.log(reposData);
    displayRepoInfo(reposData);
};

getRepos();

const displayRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoListElement.append(li);
    }
};

const repoList = repoListElement.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificRepoInfo(repoName);
    }
});

const getSpecificRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchRepoInfo.json();
    console.log(repoInfo);  
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languagesData = await fetchLanguages.json();
    console.log(languagesData);
    const languages = [];
    for (const key in languagesData) {
        languages.push(key);
    }
    backToRepoButton.classList.remove("hide");
    console.log(languages);
    displaySpecificRepoInfo(repoInfo, languages)
};

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
};

backToRepoButton.addEventListener("click", function () {
    repoInfoElement.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepoButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchTextLower = searchText.toLowerCase();
    for (const repo of repos) {
        const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(searchText.toLowerCase())) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});