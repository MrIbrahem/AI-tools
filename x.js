
function one_site(tool) {
    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col-md-6', 'col-lg-4');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const toolName = document.createElement('h3');
    toolName.classList.add('card-title', 'text-blue-600', 'mb-2');
    toolName.textContent = tool.name;

    const toolDescription = document.createElement('p');
    toolDescription.classList.add('card-text', 'text-gray-600', 'mb-2');
    toolDescription.textContent = tool.description;

    const useCasesTitle = document.createElement('h4');
    useCasesTitle.classList.add('card-subtitle', 'mb-1', 'text-muted');
    useCasesTitle.textContent = 'استخدامات:';

    const useCasesList = document.createElement('ul');
    useCasesList.classList.add('list-unstyled', 'mb-3');
    tool.use_cases.forEach(useCase => {
        const li = document.createElement('li');
        li.textContent = useCase;
        useCasesList.appendChild(li);
    });

    const link = document.createElement('a');
    link.href = tool.path;
    link.textContent = 'المزيد';
    link.classList.add('btn', 'btn-primary', 'stretched-link');
    link.target = '_blank';

    cardBody.appendChild(toolName);
    cardBody.appendChild(toolDescription);
    cardBody.appendChild(useCasesTitle);
    cardBody.appendChild(useCasesList);
    card.appendChild(cardBody);
    card.appendChild(link);
    toolDiv.appendChild(card);
    return toolDiv
}

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');

    fetch('ai.json')
        .then(response => response.json())
        .then(data => {
            const navTabs = document.createElement('ul');
            navTabs.classList.add('nav', 'nav-tabs', 'mb-3');

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
                introduction.classList.add('mb-4');
                introduction.textContent = section.introduction;
                tabPane.appendChild(introduction);

                const toolsDiv = document.createElement('div');
                toolsDiv.classList.add('row', 'gy-4');

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
                    const relatedTarget = event.relatedTarget; // السابق
                    const target = event.target; // الحالي
                    if (relatedTarget) {
                        relatedTarget.classList.remove('active');
                    }
                    target.classList.add('active');
                });
            });
        })
        .catch(error => console.error('Error fetching ai.json:', error));
});
