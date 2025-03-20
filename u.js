async function loadAndDisplayContent() {

    const response = await fetch('ai.json');
    const data = await response.json();

    const tabsList = document.getElementById('categoryTabs');
    const tabsContent = document.getElementById('categoryContent');

    data.forEach((category, index) => {
        // Create tab trigger (list item)
        const tabItem = document.createElement('li');
        tabItem.classList.add('nav-item');
        const tabLink = document.createElement('a');

        // tabLink.classList.add('nav-link', index === 0 ? 'active' : ''); // First tab active
        tabLink.classList.add('nav-link');
        if (index === 0) {
            tabLink.classList.add('active');
        }

        tabLink.id = `tab-${index}-link`;
        tabLink.href = `#tab-${index}`;
        tabLink.setAttribute('data-bs-toggle', 'tab');
        tabLink.role = 'tab';
        tabLink.setAttribute('aria-controls', `tab-${index}`);
        tabLink.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        tabLink.textContent = category.title;
        tabItem.appendChild(tabLink);
        tabsList.appendChild(tabItem);

        // Create tab content (pane)
        const tabPane = document.createElement('div');
        tabPane.classList.add('tab-pane', 'fade'); // Add classes individually
        if (index === 0) {
            tabPane.classList.add('show', 'active'); // Add 'show' and 'active' for the first tab
        }
        tabPane.id = `tab-${index}`;
        tabPane.role = 'tabpanel';
        tabPane.setAttribute('aria-labelledby', `tab-${index}-link`);

        // ... (rest of the code for creating and appending card content)
        const introDiv = document.createElement('div');
        const title = document.createElement('h3');
        title.classList.add('mb-3');
        title.textContent = category.title;
        const intro = document.createElement('p');
        intro.textContent = category.introduction;
        introDiv.append(title, intro);

        const toolsRow = document.createElement('div');
        toolsRow.classList.add('row');


        category.tools.forEach(tool => {
            const toolCol = createToolCard(tool);
            toolsRow.appendChild(toolCol);
        });


        tabPane.append(introDiv, toolsRow);

        tabsContent.appendChild(tabPane);
    });
}




function createToolCard(tool) {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4'); // Bootstrap grid classes
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = `//image.thum.io/get/${tool.path}`;
    img.classList.add('card-img-top');  // Bootstrap class
    img.alt = tool.name;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');  // Bootstrap class
    title.textContent = tool.name;

    const link = document.createElement('a');
    link.href = tool.path;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.classList.add('stretched-link'); // Bootstrap helper class for card links


    title.appendChild(link)
    const description = document.createElement('p');
    description.classList.add('card-text'); // Bootstrap class
    description.textContent = tool.description;

    const useCasesList = document.createElement('ul');
    tool.use_cases.forEach(useCase => {
        const listItem = document.createElement('li');
        listItem.textContent = useCase;
        useCasesList.appendChild(listItem);
    });

    cardBody.append(title, description, useCasesList);
    card.append(img, cardBody);
    col.appendChild(card);


    return col;

}
