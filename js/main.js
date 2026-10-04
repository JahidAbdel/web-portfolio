const page = document;

function addText(selector, value) {
  page.querySelector(selector).textContent = value;
}

function addTags(container, values, className) {
  values.forEach((value) => {
    const tag = page.createElement('span');
    tag.className = className;
    tag.textContent = value;
    container.appendChild(tag);
  });
}

function showProjects(projects) {
  const list = page.querySelector('#project-list');

  projects.forEach((project, index) => {
    const article = page.createElement('article');
    article.className = 'project-card';

    const number = page.createElement('div');
    number.className = 'project-number';
    number.textContent = String(index + 1).padStart(2, '0');

    const info = page.createElement('div');
    info.className = 'project-info';

    const type = page.createElement('p');
    type.className = 'project-type';
    type.textContent = project.type;

    const title = page.createElement('h3');
    title.textContent = project.name;

    const description = page.createElement('p');
    description.textContent = project.description;

    const tags = page.createElement('div');
    tags.className = 'tags';
    addTags(tags, project.technologies, '');

    info.append(type, title, description, tags);
    article.append(number, info);
    list.appendChild(article);
  });
}

function showContactLink(name, value) {
  const link = page.querySelector(`[data-contact="${name}"]`);
  if (!value) {
    link.hidden = true;
    return;
  }

  const address = name === 'email' ? `mailto:${value}` : value;
  link.href = address;
  link.querySelector('[data-contact-value]').textContent = value;
}

function showPortfolio(data) {
  page.title = `${data.name} — Portfolio`;
  page.querySelector('#page-description').content = data.description;
  page.querySelector('#site-wordmark').setAttribute('aria-label', data.name);
  addText('#site-initials', data.initials);
  addText('#hero-role', data.role);
  addText('#hero-name', data.name);
  addText('#hero-intro', data.intro);
  addText('#hero-welcome', data.welcome);
  addText('#about-first', data.about[0]);
  addText('#about-second', data.about[1]);
  addText('#projects-link-label', data.otherProjects.label);
  addText('#skills-intro', data.skillsIntro);
  addText('#contact-intro', data.contactIntro);
  addText('#footer-name', data.name);

  const otherProjectsLink = page.querySelector('#other-projects-link');
  otherProjectsLink.href = data.otherProjects.url;
  otherProjectsLink.textContent = `${data.otherProjects.text} ↗`;

  showProjects(data.projects);
  addTags(page.querySelector('#skill-list'), data.skills, '');
  showContactLink('github', data.contact.github);
  showContactLink('linkedin', data.contact.linkedin);
  showContactLink('email', data.contact.email);

  page.querySelector('#year').textContent = new Date().getFullYear();
}

fetch('portfolio.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Could not load portfolio.json');
    }
    return response.json();
  })
  .then(showPortfolio)
  .catch(() => {
    page.querySelector('#load-error').hidden = false;
  });
