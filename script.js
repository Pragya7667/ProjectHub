
/* ================= DEFAULT PROJECTS ================= */

let projects = JSON.parse(
    localStorage.getItem("projectHubProjects")
) || [

    {
        id: 1,

        name: "Personal Portfolio",

        description:
            "A modern responsive portfolio website.",

        status: "Completed",

        progress: 100,

        deadline: "2026-09-10"
    },

    {
        id: 2,

        name: "Student Management System",

        description:
            "Dashboard for managing student information.",

        status: "In Progress",

        progress: 65,

        deadline: "2026-09-25"
    },

    {
        id: 3,

        name: "Weather App",

        description:
            "Weather application with a clean interface.",

        status: "Pending",

        progress: 20,

        deadline: "2026-10-05"
    }

];


let editProjectId = null;


/* ================= ELEMENTS ================= */

const addProjectBtn =
    document.getElementById("addProjectBtn");

const projectModal =
    document.getElementById("projectModal");

const cancelBtn =
    document.getElementById("cancelBtn");

const projectForm =
    document.getElementById("projectForm");

const projectContainer =
    document.getElementById("projectContainer");

const searchInput =
    document.getElementById("searchInput");

const filterSelect =
    document.getElementById("filterSelect");

const themeBtn =
    document.getElementById("themeBtn");


/* ================= SAVE DATA ================= */

function saveProjects() {

    localStorage.setItem(
        "projectHubProjects",
        JSON.stringify(projects)
    );

}


/* ================= FORMAT DATE ================= */

function formatDate(date) {

    if (!date) {

        return "No deadline";

    }

    return new Date(
        date + "T00:00:00"
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ================= ESCAPE HTML ================= */

function escapeHTML(text) {

    return text.replace(
        /[&<>"']/g,

        function(character) {

            const entities = {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#039;"

            };

            return entities[character];

        }
    );

}


/* ================= DISPLAY PROJECTS ================= */

function displayProjects() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedFilter =
        filterSelect.value;


    const filteredProjects =
        projects.filter(function(project) {

            const matchesSearch =

                project.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                project.description
                    .toLowerCase()
                    .includes(searchText);


            const matchesFilter =

                selectedFilter === "All"

                ||

                project.status === selectedFilter;


            return matchesSearch && matchesFilter;

        });


    projectContainer.innerHTML = "";


    if (filteredProjects.length === 0) {

        document.getElementById(
            "noProjects"
        ).style.display = "block";

    }

    else {

        document.getElementById(
            "noProjects"
        ).style.display = "none";

    }


    filteredProjects.forEach(function(project) {

        let statusClass = "";


        if (project.status === "Completed") {

            statusClass = "completed";

        }

        else if (project.status === "In Progress") {

            statusClass = "in-progress";

        }

        else {

            statusClass = "pending";

        }


        const card = document.createElement("article");

        card.className = "project-card";


        card.innerHTML = `

            <div class="project-header">

                <div>

                    <div class="project-title">

                        ${escapeHTML(project.name)}

                    </div>

                </div>

                <span class="status ${statusClass}">

                    ${project.status}

                </span>

            </div>


            <p class="project-description">

                ${escapeHTML(project.description)}

            </p>


            <div class="progress-area">

                <div class="progress-info">

                    <span>Progress</span>

                    <strong>${project.progress}%</strong>

                </div>


                <div class="progress-bar">

                    <div

                        class="progress-fill"

                        style="width:${project.progress}%"

                    ></div>

                </div>

            </div>


            <div class="project-footer">

                <span class="deadline">

                    📅 ${formatDate(project.deadline)}

                </span>


                <div class="actions">

                    <button

                        class="edit-btn"

                        onclick="editProject(${project.id})"

                    >

                        ✏️

                    </button>


                    <button

                        class="delete-btn"

                        onclick="deleteProject(${project.id})"

                    >

                        🗑️

                    </button>

                </div>

            </div>

        `;


        projectContainer.appendChild(card);

    });


    updateStatistics();

}


/* ================= STATISTICS ================= */

function updateStatistics() {

    document.getElementById(
        "totalProjects"
    ).textContent = projects.length;


    document.getElementById(
        "completedProjects"
    ).textContent =

        projects.filter(
            project =>
                project.status === "Completed"
        ).length;


    document.getElementById(
        "progressProjects"
    ).textContent =

        projects.filter(
            project =>
                project.status === "In Progress"
        ).length;


    document.getElementById(
        "pendingProjects"
    ).textContent =

        projects.filter(
            project =>
                project.status === "Pending"
        ).length;

}


/* ================= OPEN ADD MODAL ================= */

function openAddModal() {

    editProjectId = null;


    document.getElementById(
        "modalTitle"
    ).textContent = "Add New Project";


    projectForm.reset();


    document.getElementById(
        "projectProgress"
    ).value = 0;


    projectModal.classList.add("show");

}


/* ================= CLOSE MODAL ================= */

function closeModal() {

    projectModal.classList.remove("show");

}


/* ================= EDIT PROJECT ================= */

function editProject(id) {

    const project =
        projects.find(
            item => item.id === id
        );


    if (!project) return;


    editProjectId = id;


    document.getElementById(
        "modalTitle"
    ).textContent = "Edit Project";


    document.getElementById(
        "projectName"
    ).value = project.name;


    document.getElementById(
        "projectDescription"
    ).value = project.description;


    document.getElementById(
        "projectStatus"
    ).value = project.status;


    document.getElementById(
        "projectProgress"
    ).value = project.progress;


    document.getElementById(
        "projectDeadline"
    ).value = project.deadline;


    projectModal.classList.add("show");

}


/* ================= DELETE PROJECT ================= */

function deleteProject(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this project?"
        );


    if (!confirmation) return;


    projects =
        projects.filter(
            project =>
                project.id !== id
        );


    saveProjects();

    displayProjects();

}


/* ================= FORM SUBMIT ================= */

projectForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "projectName"
            ).value.trim();


        const description =
            document.getElementById(
                "projectDescription"
            ).value.trim();


        const status =
            document.getElementById(
                "projectStatus"
            ).value;


        const progress =
            Math.max(
                0,
                Math.min(
                    100,

                    Number(
                        document.getElementById(
                            "projectProgress"
                        ).value
                    )
                )
            );


        const deadline =
            document.getElementById(
                "projectDeadline"
            ).value;


        const projectData = {

            name: name,

            description: description,

            status: status,

            progress: progress,

            deadline: deadline

        };


        /* EDIT */

        if (editProjectId !== null) {

            const project =
                projects.find(
                    item =>
                        item.id === editProjectId
                );


            Object.assign(
                project,
                projectData
            );

        }


        /* ADD */

        else {

            projects.push({

                id: Date.now(),

                ...projectData

            });

        }


        saveProjects();

        displayProjects();

        closeModal();

    }
);


/* ================= EVENTS ================= */

addProjectBtn.addEventListener(
    "click",
    openAddModal
);


cancelBtn.addEventListener(
    "click",
    closeModal
);


searchInput.addEventListener(
    "input",
    displayProjects
);


filterSelect.addEventListener(
    "change",
    displayProjects
);


/* ================= CLOSE MODAL OUTSIDE ================= */

projectModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === projectModal
        ) {

            closeModal();

        }

    }
);


/* ================= DARK MODE ================= */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "projectHubDarkMode",
            darkMode
        );


        themeBtn.textContent =
            darkMode ? "☀️" : "🌙";

    }
);


/* ================= LOAD DARK MODE ================= */

const savedDarkMode =
    localStorage.getItem(
        "projectHubDarkMode"
    );


if (savedDarkMode === "true") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


/* ================= INITIAL LOAD ================= */

displayProjects();