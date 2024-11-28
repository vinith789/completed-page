import fetchDepartmentData from './departmentsData.js';

// Utility: Redirect to the department.html page
function goToDepartment(departmentName) {
  const url = `department.html?department=${encodeURIComponent(departmentName)}`;
  window.location.href = url;
}

// Render department cards on the index.html page
async function renderIndexPage() {
  const departments = await fetchDepartmentData();
  const cardContainer = document.getElementById("card-container");

  if (!cardContainer) return; // Ensure the card container exists (for index.html)

  departments.forEach((department) => {
    const departmentCard = document.createElement("div");
    departmentCard.className = "department-card";
    departmentCard.onclick = () => goToDepartment(department.name);

    departmentCard.innerHTML = `
      <div class="card" style="--bg-image: url('${department.image}');">
        <img src="https://img.icons8.com/ios-filled/50/000000/department.png" alt="${department.name} Icon" class="icon">
        <h3>${department.name}</h3>
      </div>
    `;
    cardContainer.appendChild(departmentCard);
  });
}

// Render selected department details on department.html
async function renderDepartmentDetails() {
  const params = new URLSearchParams(window.location.search);
  const departmentName = params.get("department");
  const departments = await fetchDepartmentData();
  const selectedDepartment = departments.find(
    (dept) => dept.name === departmentName
  );

  const title = document.getElementById("department-title");
  const description = document.getElementById("department-description");
  const image = document.getElementById("department-image");
  const cardsSection = document.getElementById("department-cards");

  if (selectedDepartment) {
    title.textContent = selectedDepartment.name;
    description.innerHTML = selectedDepartment.description;
    image.src = selectedDepartment.image;

    // Render the dynamic cards
    cardsSection.innerHTML = selectedDepartment.cards
      .map(
        (card) => `
        <div class="info-card">
          <h3>${card.title}</h3>
          <p>${card.content}</p>
        </div>
      `
      )
      .join("");
  } else {
    // Handle cases where the department is not found
    title.textContent = "Department Not Found";
    description.innerHTML = "Please select a valid department from the homepage.";
    image.style.display = "none"; // Hide the image if no department data
    cardsSection.innerHTML = "";
  }
}

// Tab Navigation Setup (for department.html)
function setupTabNavigation() {
  const tabs = document.querySelectorAll('.tab_btn');
  const line = document.querySelector('.line');

  function setLinePosition(activeTab) {
    line.style.width = activeTab.offsetWidth + 'px';
    line.style.left = activeTab.offsetLeft + 'px';
  }

  function showContent(tabName) {
    const sections = {
      Department: 'department-content',
      'Faculty Members': 'faculty-content',
      Association: 'association-content',
    };

    // Hide all sections, then display the selected one
    Object.values(sections).forEach((sectionId) => {
      document.getElementById(sectionId).style.display = 'none';
    });

    document.getElementById(sections[tabName]).style.display = 'block';
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      const tabText = e.target.textContent.trim();
      if (tabText === "Home") {
        window.location.href = "index.html"; // Redirect to home page
        return;
      }

      // Update active tab and line position
      tabs.forEach((tab) => tab.classList.remove('active'));
      tab.classList.add('active');
      setLinePosition(e.target);

      // Show corresponding content
      showContent(tabText);
    });
  });

  // Set the default tab on page load
  window.addEventListener('load', () => {
    const defaultTab = document.querySelector('.tab_btn.active') || tabs[1];
    setLinePosition(defaultTab);
    showContent(defaultTab.textContent.trim());
  });
}

// Initialize functionality based on the current page
if (window.location.pathname.includes("index.html")) {
  renderIndexPage();
} else if (window.location.pathname.includes("department.html")) {
  renderDepartmentDetails();
  setupTabNavigation();
}
