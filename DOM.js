const planetColors = {
    "Merkurius": "rgba(140, 139, 135, 1)",
    "Venus": "rgba(231, 204, 203, 1)",
    "Mars": "rgba(239, 93, 93, 1)",
    "Jupiter": "rgba(226, 150, 105, 1)",
    "Saturnus": "rgba(198, 170, 113, 1)",
    "Uranus": "rgba(202, 213, 241, 1)",
    "Neptunus": "rgba(122, 145, 166, 1)",
    "Jorden": "rgb(69, 144, 214)",
    "Solen": "rgb(255, 209, 41)",
};

const defaultBackgroundColor = "#428ed4";

// Function to get the list of planet names
async function getNames(method = "GET") {
    try {
        const url = 'https://majazocom.github.io/Data/solaris.json';
        const options = { method };
        const response = await fetch(url, options);
        const data = await response.json();
        const containerOne = document.getElementById("container-one");

        data.forEach(planet => {
            const listElement = document.createElement('div');
            listElement.classList.add('child-container');
            listElement.addEventListener('click', function() {
                const planetName = planet.name;
                setBodyColor(planetName);
                getInfo(planetName);
            });
            listElement.textContent = planet.name;
            containerOne.appendChild(listElement);
        });

        // Add a button to go back home
        const BtnElement = document.createElement('button');
        BtnElement.className = 'zocom-button';
        BtnElement.addEventListener('click', function() {
            window.location.reload();
        });
        BtnElement.textContent = "ZoCom";
        document.body.appendChild(BtnElement);
    } catch (error) {
        console.error('Something went wrong: ', error);
    }
}

// Function to set the background color of the body based on the selected planet
function setBodyColor(planetName) {
    const color = planetColors[planetName] || defaultBackgroundColor;
    document.body.style.backgroundColor = color;
}

// Function to get planet information
async function getInfo(planetName) {
    try {
        const url = 'https://majazocom.github.io/Data/solaris.json';
        const options = { method: "GET" };
        const response = await fetch(url, options);
        const data = await response.json();
        data.forEach(planet => {
            if (planet.name === planetName) {
                // Create the info container
                const infoContainer = document.createElement('div');
                infoContainer.className = 'info-container';



                // Create and append the pseudo-element
                const pseudoElement = document.createElement('div');
                pseudoElement.className = 'info-container-pseudo';
                pseudoElement.style.position = 'fixed';
                pseudoElement.style.width = '40%';
                pseudoElement.style.content = '""';
                pseudoElement.style.height = '100%';
                pseudoElement.style.left = '-30%';
                pseudoElement.style.top = '0';
                pseudoElement.style.borderRadius = '50%';
                pseudoElement.style.background = planetColors[planetName] || defaultBackgroundColor;
                pseudoElement.style.boxShadow = '0px 0px 250px 0px rgba(255, 208, 41, 0.20)';
               

                const contentContainer = document.createElement('div');
                contentContainer.style.position = 'absolute';
                contentContainer.style.width = '50%';
                contentContainer.style.height="100%"
                contentContainer.style.right = '10%';
                contentContainer.style.display = 'flex';
                contentContainer.style.flexDirection = "column"
                contentContainer.style.justifyContent = "center"

                contentContainer.innerHTML = `
    <h3 class="planet-info ${planetName.toLowerCase().replace(' ', '-')}">${planetName}</h3>
    <h4>${planet.latinName}</h4>
    <p>${planet.desc}</p>
    <h5>Omkrets <br><span class="circumference">${planet.circumference}</span> <br>Km från solen <br><span class="distance">${planet.distance}</span></h5>
    <h5>Max Temperature <br><span class="night">${planet.temp.night}</span> °C <br>Min Temperature <br><span class="day">${planet.temp.day}</span> °C</h5>
    <h6>Månar <br>${planet.moons.join(' - ')}</h6>
</div>`;

                document.body.innerHTML = ''; // Clear the body
                infoContainer.appendChild(pseudoElement);
                infoContainer.appendChild(contentContainer)
                document.body.appendChild(infoContainer);

                // Add a button to go back home
                const BtnElement = document.createElement('button');
                BtnElement.className = 'zocom-button';
                BtnElement.addEventListener('click', function() {
                    window.location.reload();
                });
                BtnElement.textContent = "ZoCom";
                infoContainer.appendChild(BtnElement);
            }
        });
    } catch (error) {
        console.error('Something went wrong: ', error);
    }
}

// To make a GET request and start the application
getNames("GET");
