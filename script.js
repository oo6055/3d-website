// Simulate fetching the file names from the directory (this would require server-side processing in a real environment)
const mediaFiles = [
    'pictures/hand.jpg',
    'pictures/madrid.jpg',
    'pictures/video.mp4',
    'pictures/manhigot.jpg',
    'pictures/owl.jpg',
  ];


// Gallery and Modal Elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close');

// Function to Create Gallery Items
const createGalleryItem = (src) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';

  if (src.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = false;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    item.appendChild(video);
    video.addEventListener('click', () => openModal(src, 'video'));
  } else {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Image';
    item.appendChild(img);
    img.addEventListener('click', () => openModal(src, 'image'));
  }

  return item;
};

// Populate the Gallery
mediaFiles.forEach((file) => {
  const item = createGalleryItem(file);
  gallery.appendChild(item);
});

// Open Modal
const openModal = (src, type) => {
  modal.style.display = 'block';
  modalContent.innerHTML = ''; // Clear previous content

  if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.onloadedmetadata = () => {
          modalContent.style.width = `${video.videoWidth}px`;
          modalContent.style.height = `${video.videoHeight}px`;
      };
      modalContent.appendChild(video);
  } else {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
          modalContent.style.width = `${img.naturalWidth}px`;
          modalContent.style.height = `${img.naturalHeight}px`;
      };
      modalContent.appendChild(img);
  }
};

// Close Modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close Modal on Click Outside
modal.addEventListener('click', (e) => {
  // Close modal only if clicking outside the modal content
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});