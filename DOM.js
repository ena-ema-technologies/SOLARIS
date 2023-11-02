const planetColors = {
    "Merkurius": "red",
    "Venus": "orange",
    "Earth": "blue",
    "Mars": "red",
    "Jupiter": "green",
    "Saturn": "yellow",
    "Uranus": "cyan",
    "Neptune": "darkblue",
    // Add more planets and colors as needed
};

const defaultBackgroundColor = "linear-gradient(90deg, rgba(33, 23, 99, 1) 12%, rgba(9, 9, 121, 1) 53%, rgba(63, 30, 30, 1) 100%)";

async function getNames(method = "GET") { //get the list of names
    try {
        
        const url = 'https://majazocom.github.io/Data/solaris.json';
        const options = {
            method,
        };
            
            const response = await fetch(url, options);
            const data = await response.json();
            const containerOne = document.getElementById("container-one");

            data.forEach(solaris => { //each object of json
                const listElement = document.createElement('div');
                listElement.classList.add('child-container');
                listElement.addEventListener('click', function() { //add click event to show the information
                    getInfo(listElement.textContent)
                    setBodyColor(solaris.name);
                    
                  });
                listElement.textContent = solaris.name;
                console.log(solaris.name);
                containerOne.appendChild(listElement);

            });
               //add button to back home
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

    function setBodyColor(planetName) {
        // Get the color for the planet from the mapping
        const color = planetColors[planetName];
    if (color) {
        document.body.style.background = color;
    } else {
        // If the planet is not in the mapping, set a default background
        document.body.style.background = defaultBackgroundColor;
    }
    }
    
    async function getInfo(pname) { //get the detail information when you click the certain planet
        try {
            const url = 'https://majazocom.github.io/Data/solaris.json';
            const options = {
                method: "GET"
            };
                
            const response = await fetch(url, options);
                const data = await response.json();
                data.forEach(solaris => {
                    if(solaris.name === pname) //choose only you want among all data
                    {
                        console.log(solaris);
                        // document.body.className = planetColorClass;
                        //show the infomation from json data
                        let info = '<div class="info-contianer">';
                        info += '<div class="lines">'
                        info += '<h3 class="planet-info ' + solaris.name.toLowerCase().replace(' ', '-') + '">' + '</h3>';
                        info += '<h3> '+solaris.name+'</h3>';
                        info += '<h4> '+solaris.latinName+'</h4>';
                        info += '<p>'+solaris.desc+'<p>';
                        info += '<h5> Omkrets <br> <span class="circumference">' + solaris.circumference + ' </span> <br> Km från solen <br> <span class="distance"> ' + solaris.distance + '</span> </h5>';
                        /*info += '<h5> Omkrets <br>'+solaris.circumference+'</h5>'                        
                        info += '<h5> Km från Solen <br> '+solaris.distance+ ' km' + '</h5>'*/
                        info += '<h5> Max Temperature <br> <span class="night">' + solaris.temp.night + '</span> °C <br>' + ' Min Temperature <br> <span class="day">' + solaris.temp.day + ' </span> °C</h5>'; // Display Min-Max temperature

                        /*info += '<h5> Rotation <br> '+solaris.rotation+'</h5>'
                        info += '<h5> orbitalPeriod <br> '+solaris.orbitalPeriod+'</h5>' */
                        let moon_info = ''
                        for(var i=0; i< solaris.moons.length; i++)
                        {
                            moon_info += solaris.moons[i]
                            if(i+1 < solaris.moons.length) // if it is last element, you don't need comma
                                moon_info += ' - ';                            
                        }   
                        info += '<h6> Månar <br>' + moon_info +'<h6>'
                        info += '</div>'; 
                        info += '</div>'; 
                        document.body.innerHTML = info;

                        
                        //add button to back home
                        const BtnElement = document.createElement('button');
                        BtnElement.className = 'zocom-button';
                        BtnElement.addEventListener('click', function() {
                            window.location.reload();
                        });
                        BtnElement.textContent = "ZoCom";
                        document.body.appendChild(BtnElement);
                    }
                });
            } catch (error) {
                console.error('Something went wrong: ', error);
            }
        }
    // To make a GET request:

getNames("GET")
