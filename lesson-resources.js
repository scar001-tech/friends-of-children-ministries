// ============================================
// LESSON DETAIL PAGE - TAB SWITCHING
// ============================================

// Function to switch between resource tabs
function showResource(resourceType) {
    // Hide all resource content
    const allContent = document.querySelectorAll('.resource-content');
    allContent.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.resource-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the selected resource content
    const selectedContent = document.getElementById(resourceType);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Add active class to the clicked tab
    const clickedTab = event.target;
    if (clickedTab) {
        clickedTab.classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Lesson detail page loaded with media resources');
});
