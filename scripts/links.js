// create a baseURL variable that references your root wdd230 repository, GitHub pages URL
const baseURL = "https://ebere-jennifer.github.io/wdd230/";

// add a variable named linksURL that references your links.json data file
const linksURL = "data/links.json";

// Write an asynchronous function to get the links data in the links.json data file.
async function getLinks() {
  try {
    const response = await fetch(linksURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayLinks(data.weeks);
    } else {
      throw Error("Failed to fetch links");
    }

  } catch (error) {
    console.log(error);
  }
}

function displayLinks(weeks) {
  const learningActivities = document.querySelector(".learning-activities"); 

  weeks.forEach(week => {
    const li = document.createElement("li");
    const weekText = document.createTextNode(`${week.week}: `);
    li.appendChild(weekText);

    week.links.forEach((link, index) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.textContent = link.title;

      li.appendChild(a);

      if (index < week.links.length - 1) {
        const separator = document.createTextNode(" | ");
        li.appendChild(separator);
      }
    });

    learningActivities.appendChild(li); 
  });
}

getLinks();