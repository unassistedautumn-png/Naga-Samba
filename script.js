
/* ============================================
   NAGA SAMBA - CHURCH COMPANION
   Updated Complete JavaScript
   ============================================ */

const $ = id => document.getElementById(id);

/* ============================================
   1. USER REGISTRATION AND PROFILE
   ============================================ */

const welcomeScreen = $("welcomeScreen");
const mainApp = $("mainApp");
const welcomeForm = $("welcomeForm");

function saveUser(name, location) {
    try {
        localStorage.setItem("nagaName", name);
        localStorage.setItem("nagaLocation", location);
        return true;
    } catch (error) {
        alert("Unable to save your profile.");
        return false;
    }
}

function startApp(name, location) {
    if (!saveUser(name, location)) return;

    if ($("displayName")) {
        $("displayName").textContent = name + "!";
    }

    if ($("displayLocation")) {
        $("displayLocation").textContent =
            "Your area: " + location;
    }

    welcomeScreen?.classList.add("hidden");
    mainApp?.classList.remove("hidden");

    showPage("homePage");
}

welcomeForm?.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = $("userName")?.value.trim();
    const location = $("userLocation")?.value.trim();

    if (!name || !location) {
        alert("Please enter your name and location.");
        return;
    }

    startApp(name, location);
});

function loadSavedUser() {
    let name = "";
    let location = "";

    try {
        name = localStorage.getItem("nagaName") || "";
        location = localStorage.getItem("nagaLocation") || "";
    } catch (error) {
        console.log(error);
    }

    if (name) {
        if ($("displayName")) {
            $("displayName").textContent = name + "!";
        }

        if ($("displayLocation")) {
            $("displayLocation").textContent =
                "Your area: " + location;
        }

        welcomeScreen?.classList.add("hidden");
        mainApp?.classList.remove("hidden");

        showPage("homePage");
    } else {
        welcomeScreen?.classList.remove("hidden");
        mainApp?.classList.add("hidden");
    }
}

/* ============================================
   2. PROFILE BUTTON
   ============================================ */

$("profileBtn")?.addEventListener("click", function() {
    const oldName = localStorage.getItem("nagaName") || "";
    const oldLocation = localStorage.getItem("nagaLocation") || "";

    const name = prompt("Enter your name:", oldName);

    if (!name || !name.trim()) return;

    const location = prompt(
        "Enter your city or barangay:",
        oldLocation
    );

    if (location === null || !location.trim()) return;

    if (saveUser(name.trim(), location.trim())) {
        if ($("displayName")) {
            $("displayName").textContent = name.trim() + "!";
        }

        if ($("displayLocation")) {
            $("displayLocation").textContent =
                "Your area: " + location.trim();
        }
    }
});

/* ============================================
   3. PAGE NAVIGATION
   ============================================ */

function showPage(pageId) {
    $("homeContent")?.classList.add("hidden");

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    if (pageId === "homePage") {
        $("homeContent")?.classList.remove("hidden");
    } else {
        $(pageId)?.classList.remove("hidden");
    }

    if (pageId === "mapPage") {
        setTimeout(() => {
            initializeMap();

            if (window.churchMapInstance) {
                window.churchMapInstance.invalidateSize();
            }
        }, 300);
    }

    if (pageId === "schedulePage") {
        renderSchedule();
    }

    if (pageId === "activitiesPage") {
        renderActivities();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.showPage = showPage;

/* ============================================
   4. DAILY BIBLE VERSE
   ============================================ */

const verses = [
    {
        text: "The Lord is my shepherd; I shall not want.",
        reference: "Psalm 23:1"
    },
    {
        text: "I can do all things through Christ who strengthens me.",
        reference: "Philippians 4:13"
    },
    {
        text: "Trust in the Lord with all your heart.",
        reference: "Proverbs 3:5"
    },
    {
        text: "Be still, and know that I am God.",
        reference: "Psalm 46:10"
    },
    {
        text: "The Lord is my light and my salvation.",
        reference: "Psalm 27:1"
    },
    {
        text: "With God all things are possible.",
        reference: "Matthew 19:26"
    },
    {
        text: "Rejoice always.",
        reference: "1 Thessalonians 5:16"
    },
    {
        text: "Love one another as I have loved you.",
        reference: "John 15:12"
    },
    {
        text: "Do everything in love.",
        reference: "1 Corinthians 16:14"
    },
    {
        text: "The Lord is good to all.",
        reference: "Psalm 145:9"
    },
    {
        text: "Pray without ceasing.",
        reference: "1 Thessalonians 5:17"
    },
    {
        text: "God is love.",
        reference: "1 John 4:8"
    }
];

const today = new Date();

const dayNumber = Math.floor(
    (Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ) - Date.UTC(today.getFullYear(), 0, 0)) / 86400000
);

const dailyVerse = verses[dayNumber % verses.length];

if ($("verseText")) {
    $("verseText").textContent = dailyVerse.text;
}

if ($("verseReference")) {
    $("verseReference").textContent = dailyVerse.reference;
}

if ($("fullVerse")) {
    $("fullVerse").textContent = dailyVerse.text;
}

if ($("fullReference")) {
    $("fullReference").textContent = dailyVerse.reference;
}

/* ============================================
   5. CHURCH DIRECTORY
   ============================================ */

const churches = [
    {
        id: "cathedral",
        name: "Metropolitan Cathedral and Parish of St. John the Evangelist",
        shortName: "Naga Metropolitan Cathedral",
        address: "Elias Angeles Street, Naga City",
        lat: 13.628376,
        lng: 123.187331
    },
    {
        id: "basilica",
        name: "Minor Basilica and National Shrine of Our Lady of Peñafrancia",
        shortName: "Peñafrancia Basilica Minore",
        address: "Balatas Road, Naga City",
        lat: 13.63194,
        lng: 123.20000
    },
    {
        id: "shrine",
        name: "Our Lady of Peñafrancia Shrine and Parish",
        shortName: "Peñafrancia Shrine",
        address: "Peñafrancia Avenue, Naga City",
        lat: 13.63439,
        lng: 123.19557
    },
    {
        id: "st-jude-concepcion",
        name: "Archdiocesan Shrine and Parish of St. Jude Thaddeus",
        shortName: "St. Jude Thaddeus Shrine",
        address: "Concepcion Grande, Naga City"
    },
    {
        id: "san-francisco",
        name: "San Francisco Parish",
        shortName: "San Francisco Parish",
        address: "Barangay San Francisco, Naga City"
    },
    {
        id: "immaculate-concepcion",
        name: "Our Lady of the Immaculate Conception Parish",
        shortName: "Immaculate Conception Parish",
        address: "Concepcion Pequeña, Naga City"
    },
    {
        id: "holy-cross",
        name: "Holy Cross Parish",
        shortName: "Holy Cross Parish",
        address: "Tabuco, Naga City"
    },
    {
        id: "san-lorenzo",
        name: "San Lorenzo Ruiz Parish",
        shortName: "San Lorenzo Ruiz Parish",
        address: "Abella, Naga City"
    },
    {
        id: "mater-salutis",
        name: "Mater Salutis Parish",
        shortName: "Mater Salutis Parish",
        address: "Cararayan, Naga City"
    },
    {
        id: "mount-carmel",
        name: "Our Lady of Mount Carmel Parish",
        shortName: "Mount Carmel Parish",
        address: "Carolina, Naga City"
    },
    {
        id: "st-jude-panicuason",
        name: "St. Jude Parish",
        shortName: "St. Jude Parish",
        address: "Panicuason, Naga City"
    },
    {
        id: "christ-king",
        name: "Church of Christ the King",
        shortName: "Christ the King Church",
        address: "Ateneo de Naga University, Naga City"
    },
    {
        id: "fatima",
        name: "Our Lady of Fatima Church",
        shortName: "Our Lady of Fatima Church",
        address: "Tabuco, Naga City"
    },
    {
        id: "carmelite",
        name: "Carmel of the Immaculate Heart of Mary / Carmelite Monastery",
        shortName: "Carmelite Monastery",
        address: "Concepcion Pequeña, Naga City"
    },
    {
        id: "mary-coredemptrix",
        name: "Mary Coredemptrix Church",
        shortName: "Mary Coredemptrix Church",
        address: "San Felipe, Naga City"
    },
    {
        id: "perpetual-help",
        name: "Our Lady of Perpetual Help Chapel",
        shortName: "Our Lady of Perpetual Help Chapel",
        address: "University of Nueva Caceres, Naga City"
    },
    {
        id: "louise-marillac",
        name: "St. Louise de Marillac Chapel",
        shortName: "St. Louise de Marillac Chapel",
        address: "Naga City - exact location to confirm"
    }
];

let selectedChurch = null;
let mapInitialized = false;

/* ============================================
   6. SAFE TEXT DISPLAY
   ============================================ */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

/* ============================================
   7. SELECT CHURCH
   ============================================ */

function selectChurch(church) {
    selectedChurch = church;

    const details = $("churchDetails");

    if (details) {
        details.innerHTML = `
            <h3>${escapeHTML(church.shortName)}</h3>

            <p>
                <strong>Full Name:</strong>
                ${escapeHTML(church.name)}
            </p>

            <p>
                <strong>Address:</strong>
                ${escapeHTML(church.address)}
            </p>

            <p>
                Mass schedules and activities must be
                confirmed with the parish office.
            </p>

            <button onclick="showPage('schedulePage')">
                View Mass Schedule
            </button>

            <button onclick="showPage('activitiesPage')">
                View Activities
            </button>
        `;
    }

    renderSchedule();
    renderActivities();
}

window.selectChurch = selectChurch;

window.selectChurchById = function(id) {
    const church = churches.find(item => item.id === id);

    if (!church) return;

    selectChurch(church);
    showPage("mapPage");

    if (church.lat && window.churchMapInstance) {
        window.churchMapInstance.setView(
            [church.lat, church.lng],
            16
        );
    }
};

/* ============================================
   8. CHURCH DIRECTORY DISPLAY
   ============================================ */

function renderDirectory() {
    const directory = $("churchDirectory");

    if (!directory) return;

    directory.innerHTML = churches.map(church => `
        <button
            class="directory-item"
            onclick="selectChurchById('${church.id}')"
        >
            <strong>${escapeHTML(church.shortName)}</strong>

            <span>${escapeHTML(church.address)}</span>

            <small>
                ${church.lat
                    ? "Shown on map"
                    : "Map coordinates need verification"}
            </small>
        </button>
    `).join("");
}

/* ============================================
   9. MASS SCHEDULE
   ============================================ */

function renderSchedule() {
    const target = $("scheduleContent");

    if (!target) return;

    if (!selectedChurch) {
        target.innerHTML = `
            <p>Please select a church from the Church Map.</p>
        `;
        return;
    }

    target.innerHTML = `
        <h3>${escapeHTML(selectedChurch.shortName)}</h3>

        <p>
            <strong>Address:</strong>
            ${escapeHTML(selectedChurch.address)}
        </p>

        <h4>Mass Schedule</h4>

        <p>
            Mass schedule has not yet been verified.
            Please contact the parish for the latest
            weekday, Sunday, and Holy Day Mass times.
        </p>
    `;
}

/* ============================================
   10. CHURCH ACTIVITIES
   ============================================ */

function renderActivities() {
    const target = $("activitiesContent");

    if (!target) return;

    if (!selectedChurch) {
        target.innerHTML = `
            <p>Please select a church from the Church Map.</p>
        `;
        return;
    }

    target.innerHTML = `
        <h3>${escapeHTML(selectedChurch.shortName)}</h3>

        <p>
            <strong>Address:</strong>
            ${escapeHTML(selectedChurch.address)}
        </p>

        <h4>Church Activities</h4>

        <p>
            Upcoming activities are not yet confirmed.
            Please contact the parish office for announcements.
        </p>
    `;
}

/* ============================================
   11. LEAFLET MAP - UPDATED MAP PROVIDER
   ============================================ */

function initializeMap() {
    if (mapInitialized) return;

    const mapElement = $("churchMap");

    if (!mapElement) return;

    if (typeof L === "undefined") {
        alert(
            "Map library did not load. Please check your internet connection."
        );
        return;
    }

    const map = L.map("churchMap").setView(
        [13.631, 123.194],
        14
    );

    // UPDATED MAP TILES
    // Uses Esri World Street Map instead of the blocked tile server.

    L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        {
            attribution: "Tiles &copy; Esri",
            maxZoom: 19
        }
    ).addTo(map);

    // ADD CHURCH MARKERS

    churches.forEach(church => {
        if (
            typeof church.lat !== "number" ||
            typeof church.lng !== "number"
        ) {
            return;
        }

        const marker = L.marker([
            church.lat,
            church.lng
        ]).addTo(map);

        marker.bindPopup(`
            <strong>${escapeHTML(church.shortName)}</strong>
            <br>
            ${escapeHTML(church.address)}
        `);

        marker.on("click", function() {
            selectChurch(church);
        });
    });

    window.churchMapInstance = map;

    mapInitialized = true;

    renderDirectory();
}

/* ============================================
   12. APPLICATION STARTUP
   ============================================ */

document.addEventListener("DOMContentLoaded", function() {
    loadSavedUser();
    renderDirectory();

    console.log(
        "Naga Samba successfully loaded!"
    );
});
