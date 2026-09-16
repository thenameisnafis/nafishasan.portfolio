const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];

const roles = [
  "Graphics Designer",
  "Creative Technologist",
  "AI / ML Research",
  "Software & SQA"
];

let roleIndex = 0;

function renderStats(){
  $("#statsGrid").innerHTML = portfolioData.stats.map(s => `
    <article class="stat reveal">
      <strong>${s.value}</strong>
      <span>${s.label}</span>
    </article>
  `).join("");
}

function renderCreative(filter="All"){
  const items = filter === "All"
    ? portfolioData.creative
    : portfolioData.creative.filter(x => x.category === filter);

  $("#creativeGrid").innerHTML = items.map(x => `
    <article class="creative-card reveal"
      data-title="${escapeAttr(x.title)}"
      data-category="${escapeAttr(x.category)}"
      data-image="${x.image}"
      data-description="${escapeAttr(x.description)}">
      <div class="creative-media ${x.fit === "contain" ? "contain" : ""}">
        <img src="${x.image}" alt="${escapeAttr(x.title)}" loading="lazy" />
        <div class="creative-overlay"><span>${x.category}</span></div>
      </div>
      <div class="creative-body">
        <h3>${x.title}</h3>
        <p>${x.description}</p>
      </div>
    </article>
  `).join("");

  $$(".creative-card").forEach(card => {
    card.addEventListener("click", () => openLightbox({
      image: card.dataset.image,
      title: card.dataset.title,
      category: card.dataset.category,
      description: card.dataset.description
    }));
  });
  observeReveals();
}

function renderFilters(){
  const categories = ["All", ...new Set(portfolioData.creative.map(x => x.category))];
  $("#creativeFilters").innerHTML = categories.map((c,i) => `
    <button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>
  `).join("");

  $$(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCreative(btn.dataset.filter);
    });
  });
}

function renderExperience(){
  $("#experienceList").innerHTML = portfolioData.experience.map(x => `
    <article class="experience-card reveal">
      <img class="org-logo" src="${x.logo}" alt="${escapeAttr(x.org)} logo" loading="lazy" />
      <div>
        <h3>${x.title}</h3>
        <p><strong>${x.org}</strong><br>${x.description}</p>
      </div>
      <span class="experience-date">${x.date}</span>
    </article>
  `).join("");
}

function renderProjects(){
  $("#projectList").innerHTML = portfolioData.projects.map((x,i) => `
    <article class="project-card reveal">
      <span class="project-index">0${i+1}</span>
      <div>
        <h3>${x.name}</h3>
        <div class="tags">${x.stack.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
      <p>${x.description}</p>
    </article>
  `).join("");
}

function renderOriginalProjects(){
  $("#originalProjectGrid").innerHTML = portfolioData.originalProjects.map((x,i) => `
    <article class="archive-project-card reveal">
      <div class="archive-project-media">
        <img src="${x.image}" alt="${escapeAttr(x.name)}" loading="lazy" />
        <span class="archive-project-category">${x.category}</span>
      </div>
      <div class="archive-project-body">
        <span class="archive-project-number">${String(i+1).padStart(2,"0")}</span>
        <h3>${x.name}</h3>
        <p>${x.description}</p>
        ${x.link
          ? `<a class="archive-project-link" href="${x.link}" target="_blank" rel="noopener">View project ↗</a>`
          : `<span class="archive-project-link muted-link">Archived project</span>`}
      </div>
    </article>
  `).join("");
}

function renderResearch(){
  $("#researchGrid").innerHTML = portfolioData.research.map(x => `
    <article class="research-card reveal">
      <span class="type">${x.type}</span>
      <h3>${x.title}</h3>
      <p>${x.description}</p>
    </article>
  `).join("");
}

function renderRecognition(){
  $("#recognitionGrid").innerHTML = portfolioData.recognition.map(x => `
    <article class="recognition-card reveal"
      data-title="${escapeAttr(x.title)}"
      data-category="${escapeAttr(x.type)}"
      data-image="${x.image}">
      <div class="recognition-img">
        <img src="${x.image}" alt="${escapeAttr(x.title)}" loading="lazy" />
      </div>
      <div class="recognition-body">
        <span class="type">${x.type}</span>
        <h3>${x.title}</h3>
      </div>
    </article>
  `).join("");

  $$(".recognition-card").forEach(card => {
    card.addEventListener("click", () => openLightbox({
      image: card.dataset.image,
      title: card.dataset.title,
      category: card.dataset.category,
      description: "Selected recognition from my academic, leadership and technical journey."
    }));
  });
}

function renderGallery(){
  $("#galleryGrid").innerHTML = portfolioData.gallery.map(x => `
    <button class="gallery-item reveal"
      data-title="${escapeAttr(x.title)}"
      data-category="${escapeAttr(x.category)}"
      data-image="${x.image}"
      aria-label="Open ${escapeAttr(x.title)}">
      <img src="${x.image}" alt="${escapeAttr(x.title)}" loading="lazy" />
    </button>
  `).join("");

  $$(".gallery-item").forEach(item => {
    item.addEventListener("click", () => openLightbox({
      image: item.dataset.image,
      title: item.dataset.title,
      category: item.dataset.category,
      description: "Selected item from my visual portfolio archive."
    }));
  });
}

function renderSkills(){
  $("#skillsGrid").innerHTML = portfolioData.skills.map(x => `
    <article class="skill-card reveal">
      <h3>${x.group}</h3>
      <div class="skill-list">
        ${x.items.map(i => `<span class="skill-pill">${i}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function escapeAttr(value=""){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll('"',"&quot;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

/* lightbox */
function openLightbox({image,title,category,description}){
  const dlg = $("#lightbox");
  $("#lightboxImg").src = image;
  $("#lightboxImg").alt = title || "Portfolio preview";
  $("#lightboxTitle").textContent = title || "";
  $("#lightboxCategory").textContent = category || "";
  $("#lightboxText").textContent = description || "";
  if (!dlg.open) dlg.showModal();
}
function setupLightbox(){
  $("#lightboxClose").addEventListener("click", () => $("#lightbox").close());
  $("#lightbox").addEventListener("click", e => {
    if (e.target === $("#lightbox")) $("#lightbox").close();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("#lightbox").open) $("#lightbox").close();
  });
}

/* nav */
function setupNav(){
  const btn = $("#menuBtn");
  const menu = $("#mobileMenu");

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  });

  $$("#mobileMenu a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("open");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded","false");
    menu.setAttribute("aria-hidden","true");
    document.body.classList.remove("menu-open");
  }));

  const sections = $$("main section[id]");
  const links = $$(".nav-links a");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        links.forEach(a => a.classList.toggle(
          "active",
          a.getAttribute("href") === `#${entry.target.id}`
        ));
      }
    });
  }, {rootMargin:"-40% 0px -52% 0px"});
  sections.forEach(s => observer.observe(s));
}

/* reveal */
let revealObserver;
function observeReveals(){
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.10});
  $$(".reveal:not(.visible)").forEach(el => revealObserver.observe(el));
}

/* role cycle */
function setupRoleCycle(){
  const el = $("#roleWord");
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    el.animate(
      [{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-6px)"}],
      {duration:190,fill:"forwards"}
    ).onfinish = () => {
      el.textContent = roles[roleIndex];
      el.animate(
        [{opacity:0,transform:"translateY(7px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:260,fill:"forwards"}
      );
    };
  }, 2600);
}

/* progress */
function setupScrollProgress(){
  const bar = $("#scrollProgress");
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? (scrollY / max) * 100 : 0;
    bar.style.width = `${p}%`;
  };
  addEventListener("scroll",update,{passive:true});
  update();
}

/* preloader */
function setupPreloader(){
  const loader = $("#preloader");
  const count = $("#preloaderCount");
  const bar = $("#preloaderBar");
  let n = 0;
  const start = performance.now();

  function frame(now){
    const t = Math.min(1,(now-start)/900);
    const eased = 1 - Math.pow(1-t,3);
    n = Math.floor(eased*100);
    count.textContent = String(n).padStart(2,"0");
    bar.style.width = `${n}%`;

    if (t < 1){
      requestAnimationFrame(frame);
    } else {
      setTimeout(() => loader.classList.add("done"),140);
    }
  }
  requestAnimationFrame(frame);
}

/* original background signal field */
function setupSignalField(){
  const canvas = $("#signalField");
  const ctx = canvas.getContext("2d");
  let w,h,dpr,points=[];

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1,2);
    w = innerWidth; h = innerHeight;
    canvas.width = Math.floor(w*dpr);
    canvas.height = Math.floor(h*dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);

    const count = Math.min(85,Math.max(40,Math.floor((w*h)/24000)));
    points = Array.from({length:count},() => ({
      x:Math.random()*w,
      y:Math.random()*h,
      vx:(Math.random()-.5)*.10,
      vy:(Math.random()-.5)*.10,
      r:Math.random()*1.15+.25
    }));
  };

  const draw = () => {
    ctx.clearRect(0,0,w,h);

    for (const p of points){
      p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=w; if (p.x>w) p.x=0;
      if (p.y<0) p.y=h; if (p.y>h) p.y=0;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(220,228,240,.30)";
      ctx.fill();
    }

    for (let i=0;i<points.length;i++){
      for (let j=i+1;j<points.length;j++){
        const a=points[i],b=points[j];
        const dx=a.x-b.x,dy=a.y-b.y;
        const d=Math.hypot(dx,dy);
        if (d<118){
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(150,165,190,${(1-d/118)*.07})`;
          ctx.lineWidth=.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  resize();
  addEventListener("resize",resize);
  draw();
}

function init(){
  renderStats();
  renderFilters();
  renderCreative();
  renderExperience();
  renderProjects();
  renderOriginalProjects();
  renderResearch();
  renderRecognition();
  renderGallery();
  renderSkills();

  setupLightbox();
  setupNav();
  setupRoleCycle();
  setupScrollProgress();
  setupPreloader();
  setupSignalField();
  observeReveals();

  $("#year").textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded",init);
