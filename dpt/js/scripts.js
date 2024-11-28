// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select all tab buttons and the underline line
  const tabs = document.querySelectorAll('.tab_btn');
  const line = document.querySelector('.line');

  // Get the content sections by their IDs
  const departmentContent = document.getElementById('department-content');
  const facultyContent = document.getElementById('dpt-faculty-content');
  const associationContent = document.getElementById('dpt-association-content');
  const cardsSection = document.getElementById('department-cards');

  // Function to show the relevant content and hide others
  function showContent(tabName) {
      // Hide all content sections
      departmentContent.style.display = 'none';
      facultyContent.style.display = 'none';
      associationContent.style.display = 'none';

      // Show the clicked tab's content based on tabName
      switch(tabName) {
          case 'Department':
              cardsSection.style.display = 'flex';
              departmentContent.style.display = 'flex'; // Assuming flex layout
              break;
          case 'Faculty Members':
              facultyContent.style.display = 'block';
              cardsSection.style.display = 'none';
              break;
          case 'Association':
              associationContent.style.display = 'block';
              cardsSection.style.display = 'none';
              break;
          default:
              console.warn(`No content section found for tab: ${tabName}`);
      }
  }

  // Function to update the active tab and position the underline
  function setActiveTab(tab) {
      // Remove 'active' class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add 'active' class to the clicked tab
      tab.classList.add('active');

      // Move the underline below the active tab
      setLinePosition(tab);
  }

  // Function to set the underline position and width
  function setLinePosition(activeTab) {
      // Get the position and width of the active tab
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = activeTab.parentElement.getBoundingClientRect();

      // Calculate the left offset relative to the parent container
      const left = activeTab.offsetLeft;

      // Set the line's width and left position
      line.style.width = `${activeTab.offsetWidth}px`;
      line.style.left = `${left}px`;
  }

  // Event listeners for tab clicks
  tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
          const clickedTab = e.currentTarget;
          const tabName = clickedTab.textContent.trim();

          // Redirect to "Home" if Home tab is clicked
          if (tabName === 'Home') {
              window.location.href = 'index.html';
              return; // Stop further execution
          }

          // Update active tab and move underline
          setActiveTab(clickedTab);

          // Show the relevant content based on the clicked tab
          showContent(tabName);
      });
  });

  // Function to initialize the default active tab
  function initializeTabs() {
      // Find the tab that has the 'active' class
      let activeTab = document.querySelector('.tab_btn.active');

      // If no tab is active, default to the first tab (Department)
      if (!activeTab) {
          activeTab = tabs[1]; // Assuming Department is the second tab
          setActiveTab(activeTab);
          showContent(activeTab.textContent.trim());
      } else {
          // Ensure the corresponding content is displayed
          showContent(activeTab.textContent.trim());
      }

      // Position the underline correctly
      setLinePosition(activeTab);
  }

  // Initialize tabs on page load
  initializeTabs();

  // Adjust the underline position on window resize
  window.addEventListener('resize', () => {
      const activeTab = document.querySelector('.tab_btn.active');
      if (activeTab) {
          setLinePosition(activeTab);
      }
  });

  // Additional Functionality: Load Department Details if on Department Tab
  // Assuming you have a function loadDepartmentDetails for department-specific content
  function loadDepartmentDetails() {
      const departmentData = {
          "Mechanical Engineering": {
              description: `The department was established in the year 2011. The department offers 4-year B.E. program (8 semesters) in Mechanical Engineering which is affiliated to Anna University, Chennai and approved by All India Council for Technical Education (AICTE). The department currently has an intake of 120 students.
              The department has qualified competent and motivated faculty members with minimum qualification of M.Tech/M.E in subjects like engineering design, thermal engineering, manufacturing engineering, CAD/CAM, industrial engineering etc., with good teaching experience.<br>
              We have joined together to upgrade the laboratories towards research activities and to equip the department as a Centre of Excellence in the areas of CAD/CAM, Manufacturing Technology and Thermal Engineering.<br>
              Department is creating technical awareness among the students through special lectures from eminent resource persons of both academic and industries, practically through industrial visits, training courses, placement trainings and in plant trainings.<br>
              Motivating the entire faculty to adopt the latest techniques in teaching and learning process. And also improving the student & faculty performance through continuous education, research works, organizing and participating in seminars, workshops, development programs, national and international conferences in order to achieve 100% placement for the students.`,
              image: "https://via.placeholder.com/300",
              cards: [
                  { title: "VISION", content: "To impart futuristic technical education through dedicated staff and set a global standard by making students, technologically superior, disciplined and ethically strong who will improve the life of human being." },
                  { title: "MISSION", content: "To create an environment that shall foster the growth of intellectually capable and innovative professionals who can contribute to the growth of technology in partnership with industry and harness it for the welfare of the nation and mankind" },
              ],
          },
          "Civil Engineering": {
              description: `Civil Engineering involves designing... (Detailed description)`,
              image: "https://via.placeholder.com/300",
              cards: [
                  { title: "VISION", content: "To construct sustainable infrastructure... (vision content)." },
                  { title: "MISSION", content: "Focus on environmental impact... (mission content)." },
              ],
          },
      };

      const params = new URLSearchParams(window.location.search);
      const departmentName = params.get("department");

      const content = document.getElementById("department-content");
      const cardsSection = document.getElementById("department-cards");

      if (departmentName && departmentData[departmentName]) {
          const data = departmentData[departmentName];
          document.getElementById("department-image").src = data.image;
          document.getElementById("department-title").textContent = departmentName;
          document.getElementById("department-description").innerHTML = data.description;
          // Render cards dynamically
          cardsSection.innerHTML = data.cards
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
          content.innerHTML = "<p>Department not found. Please select a valid department.</p>";
          cardsSection.innerHTML = "";
      }
  }

  // Initialize department details if on the Department tab
  // Check if the current page is department.html
  if (window.location.pathname.includes("department.html")) {
      loadDepartmentDetails();
  }
});
