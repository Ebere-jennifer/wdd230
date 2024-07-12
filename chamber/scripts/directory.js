document.addEventListener("DOMContentLoaded", () => {
  const url = "data/members.json";

  async function getMembersData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // Check the fetched data in console
      displayMembers(data.members);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  }

  const gridViewButton = document.querySelector('#grid-view');
  const listViewButton = document.querySelector('#list-view');
  const membersCard = document.querySelector('#membersCard');

  // Set default view to grid-view
  membersCard.classList.add("grid-view");

  gridViewButton.addEventListener("click", () => {
    membersCard.classList.add("grid-view");
    membersCard.classList.remove("list-view");
  });

  listViewButton.addEventListener("click", showList);

  function showList() {
    membersCard.classList.add("list-view");
    membersCard.classList.remove("grid-view");
  }

  const displayMembers = (members) => {
    membersCard.innerHTML = ''; 
    members.forEach((member, index) => {
      const section = document.createElement('div');
      section.classList.add('member-card');
      
      if (index % 2 === 0) {
        section.classList.add('even');
      } else {
        section.classList.add('odd');
      }

      const logo = document.createElement('img');
      const name = document.createElement('h4');
      const address = document.createElement('p');
      const number = document.createElement('p');
      const links = document.createElement('a');

      logo.src = member.image;
      logo.alt = `${member.name} logo`;
      logo.setAttribute('width', '250'); 
      logo.setAttribute('height', '250'); 


      name.textContent = member.name;
      address.textContent = member.address;
      number.textContent = member.phone;
      links.href = member.website;
      links.textContent = member.website;

      section.appendChild(logo);
      section.appendChild(name);
      section.appendChild(address);
      section.appendChild(number);
      section.appendChild(links);

      membersCard.appendChild(section);
    });
  };

  getMembersData();
});
