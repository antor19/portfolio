// Navigation menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li:not(.dropdown)");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when link is clicked
links.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Sticky Header
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll Progress Bar logic
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  let progressBar = document.getElementById("scroll-progress");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    document.body.appendChild(progressBar);
  }
  progressBar.style.width = scrolled + "%";
});

// Scroll Animations using Intersection Observer
const faders = document.querySelectorAll(".fade-in, .fade-in-delay, .fade-in-up");

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// GitHub API Stats Integration
// Update this variable with your actual GitHub username
const githubUsername = "antor19";

const ghStatsSrc = `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&bg_color=1a2235&title_color=38bdf8&text_color=94a3b8&icon_color=38bdf8&hide_border=true&count_private=true`;
const ghLangsSrc = `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&bg_color=1a2235&title_color=38bdf8&text_color=94a3b8&hide_border=true`;
const ghGraphSrc = `https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&bg_color=1a2235&color=38bdf8&line=38bdf8&point=e2e8f0&hide_border=true`;

document.addEventListener('DOMContentLoaded', () => {
  const ghStatsBlock = document.getElementById("gh-stats");
  const ghLangsBlock = document.getElementById("gh-langs");
  const ghGraphBlock = document.getElementById("gh-graph");

  if (ghStatsBlock && ghLangsBlock && ghGraphBlock) {
    ghStatsBlock.src = ghStatsSrc;
    ghLangsBlock.src = ghLangsSrc;
    ghGraphBlock.src = ghGraphSrc;
  }
  
  fetchLatestRepos();
  initRadarChart();

  // Load Confetti Burst
  if (typeof confetti === 'function') {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#ffffff']
      });
    }, 500);
  }
});



// Github Repositories Fetch
async function fetchLatestRepos() {
  const githubUsername = "antor19"; // Updated automatically based on user link patterns
  const repoGrid = document.getElementById("repo-grid");
  const loading = document.getElementById("repo-loading");
  if (!repoGrid) return;
  
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error("Failed to load");
    const repos = await response.json();
    
    if (loading) loading.style.display = "none";
    
    repos.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card fade-in-up appear";
      
      const desc = repo.description || "No description available.";
      const language = repo.language || "Markdown";
      
      card.innerHTML = `
        <div class="project-content">
            <div class="project-header">
                <span class="project-icon">📦</span>
                <span class="project-meta">${language}</span>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-desc">${desc}</p>
            <div class="project-links" style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-secondary); font-size: 0.9rem;">⭐ ${repo.stargazers_count}</span>
                <a href="${repo.html_url}" target="_blank" class="project-link">View Repo &rarr;</a>
            </div>
        </div>
      `;
      repoGrid.appendChild(card);
    });
  } catch (error) {
    if (loading) {
      loading.innerHTML = `<p>Failed to load repositories. Please check out my GitHub profile directly.</p>`;
    }
    console.error(error);
  }
}

// Chart.js Radar Chart
function initRadarChart() {
  const ctx = document.getElementById('skillsRadarChart');
  if (!ctx || typeof Chart === 'undefined') return;

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Android (Java)', 'Flutter', 'Firebase', 'Local DB', 'AI (TFLite)', 'DevOps', 'Networking'],
      datasets: [{
        label: 'Skill Proficiency',
        data: [95, 85, 80, 85, 75, 60, 80],
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderColor: 'rgba(56, 189, 248, 1)',
        pointBackgroundColor: 'rgba(56, 189, 248, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: {
            color: '#e2e8f0',
            font: { family: "'Outfit', sans-serif", size: 13 }
          },
          ticks: { display: false, min: 0, max: 100 }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(26, 34, 53, 0.9)',
          titleColor: '#38bdf8',
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
        }
      }
    }
  });
}

// Web3Forms Submit Interceptor
const form = document.getElementById('contactForm');
if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append("access_key", "aae1bc73-bda9-4224-bf19-86e151b807ac");

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("Success! Your message has been sent.");
                form.reset();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
