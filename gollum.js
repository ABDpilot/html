document.addEventListener('DOMContentLoaded', () => {
  let history = [];
  let selectedLanguage = 'en';
  let lastTicketID = null;

  const translations = {
    en: {
      ticketPromptCreate: 'Absolutely.<br>For ticket creation visit <a href="https://www.google.com" target="_blank">https://www.google.com</a>',
      suggestion1: 'Track the status of your ticket',
      suggestion2: 'I need help with my attendance',
      suggestion3: 'Provide me insights about my MTD performance',
      trackStatusPrompt: 'Do you have an existing ticket or would you like to create a new ticket?',
      existingTicketPrompt: 'Please select a ticket:',
      tickets: ['EN1234', 'EN2354', 'EN5678'],
      attendancePrompt: 'Please select the month, week or date:',
      attendanceMissing: 'You have two instances where your attendance is missing - May 3, May 14.',
      attendanceOk: 'Your attendance for 2025-05-10 is 100%.',
      botPlaceholder: 'Bot response placeholder',
      headerText: 'Welcome to the Chase Walrus LLM',
      newChat: 'New Chat',
      historicalChats: 'Historical Chats',
      settings: 'Settings',
      settingsTitle: 'Settings',
      languageLabel: 'Language:',
      bgColorLabel: 'Background Color:',
      closeButton: 'Close'
    },
    es: {
      ticketPromptCreate: 'Absolutamente.<br>Para crear un ticket, visite <a href="https://www.google.com" target="_blank">https://www.google.com</a>',
      suggestion1: 'Rastree el estado de su ticket',
      suggestion2: 'Necesito ayuda con mi asistencia',
      suggestion3: 'Proporcióname información sobre mi rendimiento MTD',
      trackStatusPrompt: '¿Tiene un ticket existente o desea crear uno nuevo?',
      existingTicketPrompt: 'Por favor seleccione un ticket:',
      tickets: ['ES1234', 'ES5678'],
      attendancePrompt: 'Por favor seleccione mes, semana o fecha:',
      attendanceMissing: 'Falta su asistencia el 3 y 14 de mayo.',
      attendanceOk: 'Su asistencia para el 10/05/2025 es del 100%.',
      botPlaceholder: 'Respuesta del bot',
      headerText: 'Bienvenido al Chase Walrus LLM',
      newChat: 'Nuevo Chat',
      historicalChats: 'Chats Históricos',
      settings: 'Configuraciones',
      settingsTitle: 'Configuraciones',
      languageLabel: 'Idioma:',
      bgColorLabel: 'Color de fondo:',
      closeButton: 'Cerrar'
    },
    fr: {
      ticketPromptCreate: 'Absolument.<br>Pour créer un ticket, visitez <a href="https://www.google.com" target="_blank">https://www.google.com</a>',
      suggestion1: 'Suivez le statut de votre ticket',
      suggestion2: 'J\'ai besoin d\'aide avec ma présence',
      suggestion3: 'Fournissez-moi des informations sur mes performances MTD',
      trackStatusPrompt: 'Avez-vous un ticket existant ou souhaitez-vous en créer un nouveau ?',
      existingTicketPrompt: 'Veuillez sélectionner un ticket :',
      tickets: ['FR1234', 'FR5678'],
      attendancePrompt: 'Veuillez sélectionner le mois, la semaine ou la date :',
      attendanceMissing: 'Votre présence est manquante le 3 et le 14 mai.',
      attendanceOk: 'Votre présence pour le 10/05/2025 est de 100%.',
      botPlaceholder: 'Réponse du bot',
      headerText: 'Bienvenue au Chase Walrus LLM',
      newChat: 'Nouveau Chat',
      historicalChats: 'Chats Historiques',
      settings: 'Paramètres',
      settingsTitle: 'Paramètres',
      languageLabel: 'Langue:',
      bgColorLabel: 'Couleur de fond:',
      closeButton: 'Fermer'
    },
    de: {
      ticketPromptCreate: 'Absolut.<br>Für die Ticketerstellung besuchen Sie <a href="https://www.google.com" target="_blank">https://www.google.com</a>',
      suggestion1: 'Verfolgen Sie den Status Ihres Tickets',
      suggestion2: 'Ich brauche Hilfe bei meiner Anwesenheit',
      suggestion3: 'Geben Sie mir Einblicke in meine MTD-Leistung',
      trackStatusPrompt: 'Haben Sie ein bestehendes Ticket oder möchten Sie ein neues erstellen?',
      existingTicketPrompt: 'Bitte wählen Sie ein Ticket:',
      tickets: ['DE1234', 'DE5678'],
      attendancePrompt: 'Bitte wählen Sie Monat, Woche oder Datum:',
      attendanceMissing: 'Ihre Anwesenheit fehlt am 3. und 14. Mai.',
      attendanceOk: 'Ihre Anwesenheit für den 10.05.2025 beträgt 100%.',
      botPlaceholder: 'Bot-Antwort',
      headerText: 'Willkommen beim Chase Walrus LLM',
      newChat: 'Neuer Chat',
      historicalChats: 'Historische Chats',
      settings: 'Einstellungen',
      settingsTitle: 'Einstellungen',
      languageLabel: 'Sprache:',
      bgColorLabel: 'Hintergrundfarbe:',
      closeButton: 'Schließen'
    }
  };

  function translate(key) {
    return translations[selectedLanguage][key] || translations['en'][key] || '';
  }

  function getRandomMockTicketDetails(ticketID) {
    const people = ['Snehojit', 'Rahul', 'Aanya', 'Mohit', 'Priya'];
    const issues = ['microservice failure', 'certificate license update', 'network latency', 'API timeout', 'login session glitch'];
    const statusOptions = ['Received', 'Pending Assign', 'Under Development', 'Review Pending', 'Cancelled', 'Resolved'];
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const date = new Date(Date.now() - Math.random() * 1e10).toLocaleDateString();

    return `Ticket ID: ${ticketID}
Created on: ${date}
Created by: ${rand(people)}
Short Description: ${rand(issues)}
Assigned to: ${rand(people)}
Current Status: ${rand(statusOptions)}
Estimated time of closure: ${Math.floor(Math.random() * 23) + 2} hours`;
  }

  function addMessage(role, text) {
    const chatBox = document.getElementById('chat-box-normal');
    const msg = document.createElement('div');
    msg.className = `message ${role}-message`;

    if (role === 'bot' && text.includes('<a')) {
      msg.innerHTML = text;
    } else {
      msg.innerText = text;
    }

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    history.push({ role, text });
  }

  function clearSuggestions() {
    const chatBox = document.getElementById('chat-box-normal');
    const suggestionBox = chatBox.querySelector('.suggestions');
    if (suggestionBox) suggestionBox.remove();
  }

  function handleMessage(text) {
    if (!text.trim()) return;

    const input = document.getElementById('user-input-normal');
    clearSuggestions();
    addMessage('user', text);

    const lower = text.toLowerCase();
    const containsTicket = /ticket/i.test(lower);
    const containsCheck = /\b(check|existing)\b/i.test(lower);
    const containsCreate = /\b(create|new)\b/i.test(lower);
    const containsFollowUp = /\b(determine|status|update|issue|problem|wrong)\b/i.test(lower);

    const ticketIDRegex = /\b[A-Z]{2,5}[0-9]{3,}\b/i;
    const ticketIDMatch = text.match(ticketIDRegex);

    const knownTickets = translations[selectedLanguage].tickets.map(t => t.toLowerCase());
    const isKnownTicket = knownTickets.includes(lower);

    if (containsTicket || containsCheck || containsCreate || ticketIDMatch || isKnownTicket) {
      if (ticketIDMatch) {
        lastTicketID = ticketIDMatch[0];
        addMessage('bot', getRandomMockTicketDetails(lastTicketID));
      } else if (isKnownTicket) {
        lastTicketID = text;
        addMessage('bot', getRandomMockTicketDetails(lastTicketID));
      } else if (containsCheck) {
        addMessage('bot', translate('existingTicketPrompt'));
        addSuggestions(translations[selectedLanguage].tickets);
      } else if (containsCreate) {
        addMessage('bot', translate('ticketPromptCreate'));
      } else {
        addSuggestions(['Create New Ticket', 'Check Existing Ticket']);
      }
    } else if (lastTicketID && containsFollowUp) {
      addMessage('bot', getRandomMockTicketDetails(lastTicketID));
    } else if (lower.includes('attendance')) {
      addMessage('bot', translate('attendancePrompt'));
      addSuggestions(['May', 'Week 1', '2025-05-10']);
    } else if (lower.includes('may')) {
      addMessage('bot', translate('attendanceMissing'));
    } else if (lower.includes('2025-05-10')) {
      addMessage('bot', translate('attendanceOk'));
    } else if (
      lower.includes('track') ||
      lower.includes(translate('suggestion1').toLowerCase())
    ) {
      addMessage('bot', translate('trackStatusPrompt'));
      addSuggestions(['Existing Ticket', 'Create New Ticket']);
    } else {
      addMessage('bot', translate('botPlaceholder'));
    }

    input.value = '';
  }

  function addSuggestions(suggestions) {
    const chatBox = document.getElementById('chat-box-normal');
    const suggestionDiv = document.createElement('div');
    suggestionDiv.className = 'suggestions';
    suggestions.forEach(s => {
      const bubble = document.createElement('div');
      bubble.className = 'suggestion-bubble';
      bubble.textContent = s;
      bubble.addEventListener('click', () => handleMessage(s));
      suggestionDiv.appendChild(bubble);
    });
    chatBox.appendChild(suggestionDiv);
  }

  function updateStaticText() {
    document.getElementById('header-text').textContent = translate('headerText');
    document.getElementById('new-chat').textContent = translate('newChat');
    document.getElementById('history-btn').textContent = translate('historicalChats');
    document.getElementById('settings-btn').textContent = translate('settings');
    document.getElementById('settings-title').textContent = translate('settingsTitle');
    document.getElementById('language-label').childNodes[0].textContent = translate('languageLabel') + ' ';
    document.getElementById('bg-color-label').childNodes[0].textContent = translate('bgColorLabel') + ' ';
    document.getElementById('close-settings-btn').textContent = translate('closeButton');
    document.querySelectorAll('.suggestion-bubble').forEach(b => {
      const key = b.getAttribute('data-translation-key');
      if (key) b.textContent = translate(key);
    });
  }

  function attachButtonListeners() {
    document.getElementById('send-btn-normal').addEventListener('click', () => {
      handleMessage(document.getElementById('user-input-normal').value);
    });
    document.getElementById('user-input-normal').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleMessage(e.target.value);
      }
    });

    document.getElementById('menu-toggle').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const mainContent = document.getElementById('main-content');
      sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('expanded');
      document.body.classList.toggle('sidebar-collapsed', sidebar.classList.contains('collapsed'));
      document.body.classList.toggle('sidebar-expanded', !sidebar.classList.contains('collapsed'));
    });

    document.getElementById('dark-toggle').addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });

    document.getElementById('language-select').addEventListener('change', e => {
      selectedLanguage = e.target.value;
      updateStaticText();
    });

    document.getElementById('settings-btn').addEventListener('click', () => {
      document.getElementById('settings-modal').classList.remove('hidden');
    });
    document.getElementById('close-settings-btn').addEventListener('click', () => {
      document.getElementById('settings-modal').classList.add('hidden');
    });

    document.getElementById('bg-color-picker').addEventListener('input', e => {
      document.body.style.backgroundColor = e.target.value;
    });
    document.getElementById('header-color-picker').addEventListener('input', e => {
      document.querySelector('.header').style.backgroundColor = e.target.value;
    });
    document.getElementById('sidebar-color-picker').addEventListener('input', e => {
      document.querySelector('.sidebar').style.backgroundColor = e.target.value;
    });
    document.getElementById('hamburger-color-picker').addEventListener('input', e => {
      document.querySelector('.hamburger').style.backgroundColor = e.target.value;
    });
    document.getElementById('sidebar-button-color-picker').addEventListener('input', e => {
      document.querySelectorAll('.chat-options button').forEach(btn => {
        btn.style.background = e.target.value;
      });
    });

    document.getElementById('new-chat').addEventListener('click', () => {
      const chatBox = document.getElementById('chat-box-normal');
      if (chatBox.innerHTML.trim()) {
        chatBox.innerHTML = '';
      }
      chatBox.innerHTML = `
        <div class="suggestions">
          <div class="suggestion-bubble" data-translation-key="suggestion1">${translate('suggestion1')}</div>
          <div class="suggestion-bubble" data-translation-key="suggestion2">${translate('suggestion2')}</div>
          <div class="suggestion-bubble" data-translation-key="suggestion3">${translate('suggestion3')}</div>
        </div>`;
      attachSuggestionListeners();
    });

    document.getElementById('history-btn').addEventListener('click', () => {
      const chatBox = document.getElementById('chat-box-normal');
      if (!history.length) {
        chatBox.innerHTML = '<h4>No historical chats available.</h4>';
        return;
      }
      chatBox.innerHTML = '<h4>Historical Chats</h4>' +
        history.map(h => `<div class='history-item ${h.role}-message'>${h.text}</div>`).join('');
    });
  }

  function attachSuggestionListeners() {
    document.querySelectorAll('.suggestion-bubble').forEach(bubble => {
      bubble.addEventListener('click', () => handleMessage(bubble.textContent));
    });
  }

  updateStaticText();
  attachButtonListeners();
  attachSuggestionListeners();
});
