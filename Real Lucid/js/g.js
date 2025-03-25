// Game search functionality
document.addEventListener('DOMContentLoaded', function() {
    const gameSearch = document.getElementById('game-search');
    if (gameSearch) {
        gameSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const gameCards = document.querySelectorAll('.game-card');
            let resultsFound = false;
            
            gameCards.forEach(card => {
                const gameName = card.querySelector('h3').textContent.toLowerCase();
                const gameTags = card.querySelectorAll('.tag');
                let matchesTag = false;
                
                // Check if game matches any tag
                gameTags.forEach(tag => {
                    if (tag.textContent.toLowerCase().includes(searchTerm)) {
                        matchesTag = true;
                    }
                });
                
                if (gameName.includes(searchTerm) || matchesTag) {
                    card.style.display = 'block';
                    resultsFound = true;
                    
                    // Highlight the matching text
                    if (searchTerm.length > 0) {
                        highlightText(card.querySelector('h3'), searchTerm);
                    } else {
                        // Reset highlight
                        card.querySelector('h3').innerHTML = gameName;
                    }
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show no results message
            const noResultsMsg = document.getElementById('no-results-message');
            if (!resultsFound && searchTerm.length > 0) {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.id = 'no-results-message';
                    message.style.textAlign = 'center';
                    message.style.padding = '20px';
                    message.style.color = '#adb5bd';
                    message.innerHTML = `No games found matching "<span style="color: white;">${searchTerm}</span>"`;
                    
                    const gamesContainer = document.querySelector('.games-container');
                    gamesContainer.parentNode.insertBefore(message, gamesContainer.nextSibling);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }
    
    // App search functionality
    const appSearch = document.getElementById('app-search');
    if (appSearch) {
        appSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const appCards = document.querySelectorAll('.app-card');
            let resultsFound = false;
            
            appCards.forEach(card => {
                const appName = card.querySelector('.app-name').textContent.toLowerCase();
                const appDesc = card.querySelector('.app-description').textContent.toLowerCase();
                
                if (appName.includes(searchTerm) || appDesc.includes(searchTerm)) {
                    card.style.display = 'flex';
                    resultsFound = true;
                    
                    // Highlight the matching text
                    if (searchTerm.length > 0) {
                        highlightText(card.querySelector('.app-name'), searchTerm);
                        highlightText(card.querySelector('.app-description'), searchTerm);
                    } else {
                        // Reset highlight
                        card.querySelector('.app-name').innerHTML = appName;
                        card.querySelector('.app-description').innerHTML = appDesc;
                    }
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show no results message
            const noResultsMsg = document.getElementById('no-results-message');
            if (!resultsFound && searchTerm.length > 0) {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.id = 'no-results-message';
                    message.style.textAlign = 'center';
                    message.style.padding = '20px';
                    message.style.color = '#adb5bd';
                    message.innerHTML = `No apps found matching "<span style="color: white;">${searchTerm}</span>"`;
                    
                    const appsContainer = document.querySelector('.apps-container');
                    appsContainer.parentNode.insertBefore(message, appsContainer.nextSibling);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        });
    }
    
    // Highlight matching text
    function highlightText(element, searchTerm) {
        const originalText = element.textContent;
        const lowerText = originalText.toLowerCase();
        const index = lowerText.indexOf(searchTerm.toLowerCase());
        
        if (index >= 0) {
            const beforeMatch = originalText.substring(0, index);
            const match = originalText.substring(index, index + searchTerm.length);
            const afterMatch = originalText.substring(index + searchTerm.length);
            
            element.innerHTML = `${beforeMatch}<span style="background-color: rgba(255, 255, 0, 0.3); color: white; padding: 0 2px; border-radius: 3px;">${match}</span>${afterMatch}`;
        }
    }
    
    // Add animation to game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
        card.style.opacity = '0';
    });
});

// Play game function
function playGame(gameId) {
    // Create a loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'game-loading-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.backdropFilter = 'blur(10px)';
    
    // Create loading animation
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '5px solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderTop = '5px solid #3498db';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.textContent = `Loading ${gameId}...`;
    loadingText.style.color = 'white';
    loadingText.style.marginTop = '20px';
    loadingText.style.fontSize = '18px';
    
    // Create cancel button
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.marginTop = '20px';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.style.transition = 'all 0.3s ease';
    
    cancelButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    });
    
    cancelButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    cancelButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });
    
    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    // Add elements to the overlay
    overlay.appendChild(spinner);
    overlay.appendChild(loadingText);
    overlay.appendChild(cancelButton);
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    
    // Simulate loading (this would be replaced by actual game loading)
    setTimeout(() => {
  
        loadingText.textContent = `${gameId} loaded successfully!`;
        spinner.style.borderTop = '5px solid #2ecc71';
        spinner.style.animation = 'none';
        
        setTimeout(() => {
            document.body.removeChild(overlay);
            alert(`${gameId} is now ready to play! Your backend team will implement the actual game functionality.`);
        }, 1000);
    }, 2000);
}