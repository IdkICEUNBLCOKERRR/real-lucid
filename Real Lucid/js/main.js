// Navigation
function navigateTo(page) {
  window.location.href = page;
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const searchInput = document.getElementById('search-input');
          const query = searchInput.value.trim();
          
          if (query) {
              // Use Google as the search engine and proxy
              const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`;
              window.open(searchUrl, '_blank');
          }
      });
  }
  
  // Load saved theme
  const savedTheme = localStorage.getItem('lucid-theme') || 'galaxy';
  setTheme(savedTheme);
  
  // Load settings
  loadSettings();
});

// Fullscreen toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
  }
}

// Chat functionality
function openChat() {
  alert('Chat feature coming soon!');
}

// Settings functionality
function loadSettings() {
  const autoCloak = document.getElementById('auto-cloak');
  const antiClose = document.getElementById('anti-close');
  
  if (autoCloak) {
      autoCloak.checked = localStorage.getItem('auto-cloak') === 'true';
      autoCloak.addEventListener('change', function() {
          localStorage.setItem('auto-cloak', this.checked);
      });
  }
  
  if (antiClose) {
      antiClose.checked = localStorage.getItem('anti-close') === 'true';
      antiClose.addEventListener('change', function() {
          localStorage.setItem('anti-close', this.checked);
          toggleAntiClose(this.checked);
      });
  }
  
  // Apply anti-close if enabled
  if (localStorage.getItem('anti-close') === 'true') {
      toggleAntiClose(true);
  }
}

function toggleAntiClose(enabled) {
  if (enabled) {
      window.addEventListener('beforeunload', preventClose);
  } else {
      window.removeEventListener('beforeunload', preventClose);
  }
}

function preventClose(e) {
  e.preventDefault();
  e.returnValue = '';
  return '';
}

function launchCloak() {
  const win = window.open('about:blank', '_blank');
  if (win) {
      win.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
              <title>Google</title>
              <link rel="icon" href="https://www.google.com/favicon.ico">
              <style>
                  body, html {
                      margin: 0;
                      padding: 0;
                      height: 100%;
                      overflow: hidden;
                  }
                  iframe {
                      width: 100%;
                      height: 100%;
                      border: none;
                  }
              </style>
          </head>
          <body>
              <iframe src="${window.location.href}" allowfullscreen></iframe>
          </body>
          </html>
      `);
  } else {
      alert('Pop-up blocked. Please allow pop-ups for this site.');
  }
}

function applyTabCloak() {
  const titleInput = document.getElementById('tab-title');
  const iconInput = document.getElementById('tab-icon');
  
  if (titleInput && titleInput.value) {
      document.title = titleInput.value;
      localStorage.setItem('tab-title', titleInput.value);
  }
  
  if (iconInput && iconInput.value) {
      const linkElements = document.querySelectorAll('link[rel="icon"]');
      if (linkElements.length > 0) {
          linkElements.forEach(link => link.href = iconInput.value);
      } else {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = iconInput.value;
          document.head.appendChild(link);
      }
      localStorage.setItem('tab-icon', iconInput.value);
  }
  
  alert('Tab cloak applied successfully!');
}

// Apply saved tab cloak on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTitle = localStorage.getItem('tab-title');
  const savedIcon = localStorage.getItem('tab-icon');
  
  if (savedTitle) {
      document.title = savedTitle;
  }
  
  if (savedIcon) {
      const linkElements = document.querySelectorAll('link[rel="icon"]');
      if (linkElements.length > 0) {
          linkElements.forEach(link => link.href = savedIcon);
      } else {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = savedIcon;
          document.head.appendChild(link);
      }
  }
});

// Theme functionality
function setTheme(themeName) {
  localStorage.setItem('lucid-theme', themeName);
  document.documentElement.className = themeName;
}