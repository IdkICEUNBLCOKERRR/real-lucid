// Theme switcher
function setTheme(themeName) {
  // Remove all theme classes
  document.body.classList.remove(
      'theme-galaxy', 
      'theme-arctic', 
      'theme-emerald', 
      'theme-sunset', 
      'theme-neon', 
      'theme-midnight', 
      'theme-desert', 
      'theme-ocean', 
      'theme-forest', 
      'theme-volcanic'
  );

  // Add the selected theme class
  document.body.classList.add(`theme-${themeName}`);

  // Save the theme preference
  localStorage.setItem('lucid-theme', themeName);
  
  // Add a visual feedback when theme changes
  showThemeChangeNotification(themeName);
}

// Show a notification when theme changes
function showThemeChangeNotification(themeName) {
  // Check if notification already exists and remove it
  const existingNotification = document.querySelector('.theme-notification');
  if (existingNotification) {
      existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'theme-notification';
  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas fa-paint-brush"></i>
          <span>Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}</span>
      </div>
  `;
  
  // Add styles
  notification.style.position = 'fixed';
  notification.style.bottom = '80px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  notification.style.color = 'white';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '20px';
  notification.style.zIndex = '1000';
  notification.style.backdropFilter = 'blur(10px)';
  notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  notification.style.border = '1px solid rgba(255, 255, 255, 0.1)';
  notification.style.display = 'flex';
  notification.style.alignItems = 'center';
  notification.style.justifyContent = 'center';
  notification.style.animation = 'fadeInUp 0.5s ease, fadeOut 0.5s ease 2.5s forwards';
  
  // Create styles for animations
  const style = document.createElement('style');
  style.textContent = `
      @keyframes fadeInUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
      }
      
      @keyframes fadeOut {
          from { opacity: 1; transform: translate(-50%, 0); }
          to { opacity: 0; transform: translate(-50%, -20px); }
      }
      
      .notification-content {
          display: flex;
          align-items: center;
          gap: 10px;
      }
      
      .notification-content i {
          font-size: 16px;
      }
  `;
  
  // Add to document
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
      notification.remove();
  }, 3000);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('lucid-theme') || 'galaxy';
  setTheme(savedTheme);
  
  // Add active class to the current theme in the themes page
  if (window.location.pathname.includes('t.html')) {
      const themeCards = document.querySelectorAll('.theme-card');
      themeCards.forEach(card => {
          const themeName = card.querySelector('.theme-name').textContent.toLowerCase();
          if (themeName === savedTheme) {
              card.style.transform = 'scale(1.05)';
              card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
              card.style.border = '2px solid rgba(255, 255, 255, 0.3)';
          }
      });
  }
});