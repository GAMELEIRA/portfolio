function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('card-visible');
      observer.unobserve(entry.target);
    }
  });
}
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});
document.querySelectorAll('.card-experiences').forEach(card => {
  observer.observe(card);
});

async function loadProjects() {
  const repos = [
    "GAMELEIRA/studies-backend",
    "GAMELEIRA/studies-database",
    "GAMELEIRA/studies-frontend",
    "GAMELEIRA/task-list-backend",
    "GAMELEIRA/task-list-frontend",
    "GAMELEIRA/portfolio",
    "GAMELEIRA/rick-and-morty-app"
  ];

  const container = document.getElementById("list-academic-projects");

  for (const repo of repos) {
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    const data = await response.json();

    console.log(data)

    const card = document.createElement("a");
    card.href = data.html_url;
    card.target = "_blank";
    card.className = 'card card-project';
    card.innerHTML = `
    <div id="card-project-image" class="center-content">
      <img class="project-avatar" src="${data.owner?.avatar_url}" alt="Foto do Perfil GAMELEIRA">
    </div>
    <div id="card-project-content" class="center-content">
      <div>
        <h2 class="headline headline-5 color-text-black card-project-title">${data.name}</h2>
          <p class="body body-1 color-text-black">${data.description}</p>
          <p class="body body-1 color-text-black card-label"><strong>&#9733; Stars:</strong> ${data.stargazers_count} <strong>&#8916; Forks:</strong> ${data.forks_count}</p>       
      </div>
    </div>
    </div>
    `;
    container.appendChild(card);
    document.querySelectorAll('.card-project').forEach(card => {
      observer.observe(card);
    });
    
  }
}

loadProjects();
