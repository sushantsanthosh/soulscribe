const journalEntries = {}; 
const moodData = {};
let currentDate = new Date();
let selectedMood = null; 

function openTab(tabName) {
		var tabs = document.getElementsByClassName('tab');
		var contents = document.getElementsByClassName('content');

		for (var i = 0; i < tabs.length; i++) {
				tabs[i].classList.remove('active');
				contents[i].classList.remove('active');
		}

		setTimeout(() => {
				document.getElementById(tabName).classList.add('active');
		}, 200); 

		event.currentTarget.classList.add('active');
}

function saveAnswer() {
		const answer = document.getElementById('answer').value;
		const date = currentDate.toLocaleDateString();

		if (!journalEntries[date]) {
				journalEntries[date] = [];
		}

		journalEntries[date].push(answer);
		alert('Answer saved successfully!');
}

function generateCalendar() {
		const daysContainer = document.querySelector('.days');
		daysContainer.innerHTML = '';

		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		const monthNames = ["January", "February", "March", "April", "May", "June",
												"July", "August", "September", "October", "November", "December"];
		document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;

		const firstDay = new Date(year, month, 1).getDay();
		const lastDay = new Date(year, month + 1, 0).getDate(); 

		
		for (let i = 0; i < firstDay; i++) {
				const dayElem = document.createElement('div');
				dayElem.classList.add('day', 'blank');
				daysContainer.appendChild(dayElem);
		}

		
		for (let i = 1; i <= lastDay; i++) {
				const dayElem = document.createElement('div');
				dayElem.classList.add('day');
				dayElem.textContent = i;
				dayElem.onclick = () => showJournalEntry(year, month, i);

				const date = new Date(year, month, i).toLocaleDateString();
				if (moodData[date]) {
						
						dayElem.style.backgroundColor = getMoodColor(moodData[date]);
				}

				daysContainer.appendChild(dayElem);
		}
}

function showJournalEntry(year, month, day) {
		const date = new Date(year, month, day).toLocaleDateString();
		const entries = journalEntries[date] || [];
		const entriesContent = document.getElementById('entries-content');
		const entriesHeader = document.getElementById('entries-header');

		entriesHeader.textContent = `Journal Entries for ${date}`;

		if (entries.length) {
				entriesContent.innerHTML = entries.map(entry => `<p>${entry}</p>`).join('');
		} else {
				entriesContent.textContent = 'No journal entries for this date.';
		}
}

function changeMonth(delta) {
		currentDate.setMonth(currentDate.getMonth() + delta);
		generateCalendar();
}

function login() {
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		alert(`Logged in as ${username}`);
}

function selectMood(level) {
		selectedMood = level;
		const date = currentDate.toLocaleDateString();
		moodData[date] = level;
		generateCalendar();
		alert(`Mood level ${level} selected!`);
}

function getMoodColor(mood) {
		switch (mood) {
				case 1: return '#D98880'; 
				case 2: return '#F5B041'; 
				case 3: return '#F7DC6F'; 
				case 4: return '#82E0AA'; 
				case 5: return '#58D68D'; 
				default: return '#ffffff'; 
		}
}


generateCalendar();
