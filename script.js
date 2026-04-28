const photoUpload = document.getElementById('photoUpload');
const uploadSection = document.getElementById('uploadSection');
const loadingSection = document.getElementById('loadingSection');
const gallerySection = document.getElementById('gallerySection');
const photoGrid = document.getElementById('photoGrid');
const categoryTabs = document.getElementById('categoryTabs');

// Categories for classification simulation
const categories = [
  { id: 'family', label: '👨‍👩‍👧‍👦 가족' },
  { id: 'landscape', label: '⛰️ 풍경' },
  { id: 'flower', label: '🌸 꽃' },
  { id: 'travel', label: '✈️ 여행' }
];

let photosData = [
  { url: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=400&q=80', category: 'family', categoryLabel: '👨‍👩‍👧‍👦 가족' },
  { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80', category: 'landscape', categoryLabel: '⛰️ 풍경' },
  { url: 'https://images.unsplash.com/photo-1490750967868-88cb4ecb07cb?auto=format&fit=crop&w=400&q=80', category: 'flower', categoryLabel: '🌸 꽃' },
  { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80', category: 'travel', categoryLabel: '✈️ 여행' }
];
// Handle photo upload
photoUpload.addEventListener('change', async (e) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  // Show loading section
  loadingSection.style.display = 'block';

  // Process files
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Simulate AI Processing time (1.5 seconds per batch)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Read file as data URL to display it
    const reader = new FileReader();
    reader.onload = (e) => {
      // Simulate Gemini API classification by randomly picking a category
      // In a real app, we would send the base64 image to Google AI Studio here
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      photosData.push({
        url: e.target.result,
        category: randomCategory.id,
        categoryLabel: randomCategory.label
      });
      
      // If this is the last file, render the gallery
      if (i === files.length - 1) {
        const activeTab = document.querySelector('.tab-button.active').getAttribute('data-category');
        renderGallery(activeTab);
        loadingSection.style.display = 'none';
      }
    };
    reader.readAsDataURL(file);
  }
  
  // Reset input
  photoUpload.value = '';
});

// Render the gallery based on selected category
function renderGallery(filterCategory) {
  photoGrid.innerHTML = '';
  
  const filteredPhotos = filterCategory === 'all' 
    ? photosData 
    : photosData.filter(p => p.category === filterCategory);
    
  if (filteredPhotos.length === 0) {
    photoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.5rem; color: #666; padding: 40px;">이 카테고리에 해당하는 사진이 없습니다.</p>';
    return;
  }

  filteredPhotos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
      <img src="${photo.url}" alt="분류된 사진">
      <div class="photo-tag">${photo.categoryLabel}</div>
    `;
    photoGrid.appendChild(card);
  });
}

// Handle tab clicks
categoryTabs.addEventListener('click', (e) => {
  if (e.target.classList.contains('tab-button')) {
    // Update active tab styling
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Filter gallery
    const category = e.target.getAttribute('data-category');
    renderGallery(category);
  }
});

});

// Render the default gallery on load
renderGallery('all');
