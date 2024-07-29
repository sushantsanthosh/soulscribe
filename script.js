const journalEntries = {}; // Object to store journal entries
const moodData = {}; // Object to store mood data
let currentDate = new Date(); // Store the current date
let selectedMood = null; // Variable to store selected mood

function openTab(tabName) {
		var tabs = document.getElementsByClassName('tab');
		var contents = document.getElementsByClassName('content');

		for (var i = 0; i < tabs.length; i++) {
				tabs[i].classList.remove('active');
				contents[i].classList.remove('active');
		}

		setTimeout(() => {
				document.getElementById(tabName).classList.add('active');
		}, 200); // Delay to allow transition to complete

		event.currentTarget.classList.add('active');
}

function saveAnswer() {
		const answer = document.getElementById('answer').value;
		const date = currentDate.toLocaleDateString(); // Get the current date as a string

		if (!journalEntries[date]) {
				journalEntries[date] = [];
		}

		journalEntries[date].push(answer); // Save the answer for the current date
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

		const firstDay = new Date(year, month, 1).getDay(); // Day of the week (0-6) of the 1st day
		const lastDay = new Date(year, month + 1, 0).getDate(); // Last day of the month

		// Fill in blank spaces before the first day of the month
		for (let i = 0; i < firstDay; i++) {
				const dayElem = document.createElement('div');
				dayElem.classList.add('day', 'blank');
				daysContainer.appendChild(dayElem);
		}

		// Fill in the days of the month
		for (let i = 1; i <= lastDay; i++) {
				const dayElem = document.createElement('div');
				dayElem.classList.add('day');
				dayElem.textContent = i;
				dayElem.onclick = () => showJournalEntry(year, month, i);

				const date = new Date(year, month, i).toLocaleDateString();
				if (moodData[date]) {
						// Apply the corresponding mood color
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

		// Implement your login logic here (e.g., validate credentials, handle authentication)
		alert(`Logged in as ${username}`);
}

function selectMood(level) {
		selectedMood = level;
		const date = currentDate.toLocaleDateString();
		moodData[date] = level; // Store the mood level for the current date
		generateCalendar(); // Update the calendar to reflect the mood color
		alert(`Mood level ${level} selected!`);
}

function getMoodColor(mood) {
		switch (mood) {
				case 1: return '#D98880'; // Dark Red
				case 2: return '#F5B041'; // Light Red
				case 3: return '#F7DC6F'; // Orange
				case 4: return '#82E0AA'; // Dark Yellow
				case 5: return '#58D68D'; // Light Yellow
				default: return '#ffffff'; // Default color (white) for undefined moods
		}
}

// Call generateCalendar() initially to display current month
generateCalendar();