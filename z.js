
function one_site(tool) {
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col-md-6', 'col-lg-4', 'mb-4'); // added mb-4

    const card = document.createElement('div');
    card.classList.add('card', 'h-100');

    card.innerHTML = `
          <img src="//image.thum.io/get/${tool.path}" alt="${tool.name}" class="card-img-top">
        <div class="card-body p-3">
            <div class="d-flex align-items-center justify-content-between mb-2">
                <h4 class="card-title h6 font-weight-bold mb-0">${tool.name}</h4>
                <a href="${tool.path}" target="_blank" rel="noopener noreferrer" class="text-primary">
                    &#x2197;
                </a>
            </div>
            <p class="card-text text-muted mb-2 small">
                ${tool.description}
            </p>
            <ul class="list-unstyled space-y-1">
                ${tool.use_cases.map(use => `
                    <li class="d-flex align-items-center gap-2 small">
                        <span class="rounded-circle bg-primary d-inline-block" style="width: 6px; height: 6px;"></span>
                        ${use}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    toolDiv.appendChild(card);
    return toolDiv
}


document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    fetch('ai.json')
        .then(response => response.json())
        .then(data => {
            const navTabs = document.createElement('ul');
            navTabs.classList.add('nav', 'nav-tabs', 'mb-3', 'justify-content-center'); // Center tabs

            const tabContentDiv = document.createElement('div');
            tabContentDiv.classList.add('tab-content');

            data.forEach((section, index) => {
                const tabId = `section-${index}`;

                const navItem = document.createElement('li');
                navItem.classList.add('nav-item');

                const navLink = document.createElement('a');
                navLink.classList.add('nav-link');
                navLink.setAttribute('href', `#${tabId}`);
                navLink.setAttribute('data-bs-toggle', 'tab');
                navLink.textContent = section.title;
                if (index === 0) {
                    navLink.classList.add('active');
                }

                navItem.appendChild(navLink);
                navTabs.appendChild(navItem);

                const tabPane = document.createElement('div');
                tabPane.classList.add('tab-pane', 'fade');
                tabPane.setAttribute('id', tabId);
                if (index === 0) {
                    tabPane.classList.add('show', 'active');
                }

                const introduction = document.createElement('p');
                introduction.classList.add('mb-4', 'small'); // Reduced margin and font size
                introduction.textContent = section.introduction;
                tabPane.appendChild(introduction);

                const toolsDiv = document.createElement('div');
                toolsDiv.classList.add('row', 'g-3'); // Reduced gap

                section.tools.forEach(tool => {
                    const toolDiv = one_site(tool);
                    toolsDiv.appendChild(toolDiv);
                });

                tabPane.appendChild(toolsDiv);
                tabContentDiv.appendChild(tabPane);
            });

            contentDiv.appendChild(navTabs);
            contentDiv.appendChild(tabContentDiv);

            // Initialize tabs
            const tabElements = document.querySelectorAll('.nav-link');
            tabElements.forEach(tabEl => {
                tabEl.addEventListener('show.bs.tab', (event) => {
                    const relatedTarget = event.relatedTarget;
                    const target = event.target;
                    if (relatedTarget) {
                        relatedTarget.classList.remove('active');
                    }
                    target.classList.add('active');
                });
            });
        })
        .catch(error => console.error('Error fetching ai.json:', error));
});
