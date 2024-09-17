let teamsData = [
  { name: "Team Alpha", logoUrl: "https://via.placeholder.com/50", ranking: 1, kills: 10, membersAlive: [true, true, true, true, true] },
  { name: "Team Beta", logoUrl: "https://via.placeholder.com/50", ranking: 2, kills: 8, membersAlive: [true, true, true, false, false] },
  { name: "Team Gamma", logoUrl: "https://via.placeholder.com/50", ranking: 3, kills: 7, membersAlive: [true, true, true, false, false] },
  { name: "Team Delta", logoUrl: "https://via.placeholder.com/50", ranking: 4, kills: 6, membersAlive: [true, true, false, false, false] },
  { name: "Team Epsilon", logoUrl: "https://via.placeholder.com/50", ranking: 5, kills: 5, membersAlive: [true, false, false, false, false] },
  { name: "Team Zeta", logoUrl: "https://via.placeholder.com/50", ranking: 6, kills: 4, membersAlive: [true, false, false, false, false] },
  { name: "Team Eta", logoUrl: "https://via.placeholder.com/50", ranking: 7, kills: 3, membersAlive: [true, false, false, false, false] },
  { name: "Team Theta", logoUrl: "https://via.placeholder.com/50", ranking: 8, kills: 2, membersAlive: [true, false, false, false, false] },
  { name: "Team Iota", logoUrl: "https://via.placeholder.com/50", ranking: 9, kills: 1, membersAlive: [true, false, false, false, false] },
  { name: "Team Kappa", logoUrl: "https://via.placeholder.com/50", ranking: 10, kills: 0, membersAlive: [false, false, false, false, false] }
];

const themes = ['styles1.css', 'styles2.css', 'styles3.css', 'styles4.css', 'styles5.css'];
let currentThemeIndex = 0;

function handleFileSelect(event, index) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(readerEvent) {
    const logoImg = document.getElementById(`logoImg${index}`);
    logoImg.src = readerEvent.target.result;

    teamsData[index].logoUrl = readerEvent.target.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function createTeamsTable() {
  const teamsBody = document.querySelector('.teams-body');
  teamsBody.innerHTML = '';

  teamsData.sort((a, b) => a.ranking - b.ranking);

  teamsData.forEach((team, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="logo-cell">
        <label>
          <img src="${team.logoUrl}" alt="${team.name} Logo" style="width: 40px; height: 40px;" id="logoImg${index}">
          <input type="file" style="display: none;" accept="image/*" onchange="handleFileSelect(event, ${index})">
        </label>
      </td>
      <td contenteditable="true">${team.name}</td>
      <td contenteditable="true">${team.ranking}</td>
      <td contenteditable="true">${team.kills}</td>
      <td class="alive-cell">
        ${team.membersAlive.map((alive, memberIndex) => `
          <label class="checkbox-container ${alive ? 'checked' : ''}">
            <input type="checkbox" ${alive ? 'checked' : ''} data-index="${memberIndex}" class="alive-checkbox">
          </label>
        `).join('')}
      </td>
    `;
    teamsBody.appendChild(row);

    const rankingCell = row.cells[2];
    rankingCell.addEventListener('blur', () => {
      const newRanking = parseInt(rankingCell.textContent);
      teamsData[index].ranking = newRanking;

      teamsData.sort((a, b) => a.ranking - b.ranking);
      
      // Apply reordering class
      row.classList.add('reordering');
      setTimeout(() => {
        createTeamsTable();
      }, 500); // Delay matches the transition duration
    });

    const aliveCheckboxes = row.querySelectorAll('.alive-checkbox');
    aliveCheckboxes.forEach(checkbox => {
      checkbox.closest('.checkbox-container').classList.toggle('checked', checkbox.checked);
      checkbox.addEventListener('change', () => {
        checkbox.closest('.checkbox-container').classList.toggle('checked', checkbox.checked);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', createTeamsTable);

document.getElementById('switchStyleButton').addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const stylesheet = document.getElementById('themeStylesheet');
  stylesheet.setAttribute('href', themes[currentThemeIndex]);

  // Apply wipe transition effect
  document.body.classList.add('wipe-transition');

  // Remove wipe transition class after animation ends
  setTimeout(() => {
    document.body.classList.remove('wipe-transition');
  }, 1000); // Adjust timing to match animation duration
});
