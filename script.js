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
								if (tabName === 'game') {
												initGame();
								}
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

function provideMeditationHelp() {
				const stressLevel = parseInt(document.getElementById('stress-level').value);
				const feedbackElement = document.getElementById('meditation-feedback');

				let feedback = '';

				if (stressLevel >= 1 && stressLevel <= 10) {
								if (stressLevel <= 3) {
												feedback = 'You seem to be doing well! Try a short breathing exercise: inhale deeply through your nose for 4 seconds, hold for 4 seconds, and exhale slowly through your mouth for 4 seconds.';
								} else if (stressLevel <= 6) {
												feedback = 'Consider a guided meditation. Find a quiet place, sit comfortably, and focus on your breath for 10 minutes.';
								} else {
												feedback = 'It might be helpful to talk to a mental health professional. In the meantime, try progressive muscle relaxation or mindfulness exercises.';
								}
				} else {
								feedback = 'Please enter a valid stress level between 1 and 10.';
				}

				feedbackElement.textContent = feedback;
}

function sendMessage() {
		const userInput = document.getElementById('user-input').value;
		const chatBox = document.getElementById('chat-box');

		if (userInput.trim() !== '') {
				chatBox.innerHTML += `<div class="user-message">${userInput}</div>`;
				document.getElementById('user-input').value = '';

				setTimeout(() => {
						const response = getChatbotResponse(userInput);
						chatBox.innerHTML += `<div class="chatbot-message">${response}</div>`;
						chatBox.scrollTop = chatBox.scrollHeight;
				}, 1000);
		}
}

function getChatbotResponse(userInput) {
		const responses = {
				'hello': 'Hi! How can I help you today?',
				'hi': 'Hello! What\'s on your mind?',
				'how are you': 'I\'m doing great, thanks! How about you?',
				'default': 'I didn\'t understand that. Can you please rephrase?',
				'I am not feeling too good today' : 'Sorry to hear that. I suggest that you take a moment to sit down and relax. You can seek this website for further help. https://www.meditationoasis.com/.'
		};

		const userInputLower = userInput.toLowerCase();
		for (const key in responses) {
				if (userInputLower.includes(key)) {
						return responses[key];
				}
		}

		return responses['default'];
}

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
