// Simulate fetching the file names from the directory
const mediaFiles = [
  {
    src: 'pictures/manhigot.jpg',
    price: '₪3-₪5',
    testimonial: '״רציתי לתת לחברים שלי מתנה אישית ומשמעותית, ופניתי ליהלי להדפסת מחזיקי מפתחות בהתאמה אישית. התוצאה הייתה מדהימה – החומר איכותי, הפרטים חדים, וכל מחזיק יצא בדיוק כמו שתכננתי. השירות היה מהיר וסבלני לכל הבקשות שלי. תודה רבה!'
  },
  {
    src: 'pictures/sofi.jpg',
    price: '₪60-₪150',
    testimonial: '״חיפשתי מתנה מקורית ומרשימה לחברה שלי, ומשום מקום עלה לי הרעיון להדפיס עבורה פריט אישי בתלת-ממד. יהלי ליווה אותי בתהליך מבחירת העיצוב ועד התוצאה הסופית, והתוצאה הייתה מושלמת! ההדפסה יצאה נקייה ומדויקת, והמתנה הייתה הצלחה מסחררת. ממליץ בחום!'
  },
  {
    src: 'pictures/barazi.jpg',
    price: '₪60-₪150',
    testimonial: '״רציתי להפתיע את החברה שלי עם משהו מיוחד שאין לאף אחד אחר. בזכות ההדפסה של יהלי, קיבלתי מוצר מרשים באיכות גבוהה בדיוק כמו שדמיינתי. הפרטים הקטנים, החומר והגימור – הכל היה ברמה הגבוהה ביותר. שירות מצוין ותוצאה מושלמת!'
  },
  {
    src: 'pictures/handler.jpg',
    price: '₪30-₪50',
    testimonial: '״חיפשתי פתרון חכם ויפה למחזיק לכוסות פלסטיק, ופניתי ליהלי. לא רק שהוא הבין את הצרכים שלי במהירות, אלא גם סיפק הדפסה איכותית עם גימור מעולה. המוצר יצא חזק, מדויק, ובעיקר – שימושי בדיוק כמו שרציתי. בהחלט אחזור להדפיס שוב!'
  },
  {
    src: 'pictures/ironStand.jpg',
    price: '₪100-₪160',
    testimonial: '״עבדתי על עיצוב מחזיק למלחם ורציתי לבדוק כמה וריאציות לפני הייצור הסופי. האפשרות להדפיס אב-טיפוס בעלות נמוכה עזרה לי לחסוך הרבה כסף ולשפר את המוצר שלי לפני ייצור המוני. יהלי עשה עבודה מדהימה – ההדפסות היו מדויקות, החומרים איכותיים, והכל סופק במהירות שיא. מומלץ בחום!'
  }

];

// Gallery and Modal Elements
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close');

// Touch device detection
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

// Function to create video element
const createVideoElement = (src, isModal = false) => {
  const video = document.createElement('video');
  video.src = src;
  video.controls = isModal; // Show controls only in modal
  video.muted = !isModal; // Mute only in gallery
  video.loop = !isModal; // Loop only in gallery
  video.playsInline = true;
  video.autoplay = !isModal; // Autoplay only in gallery
  return video;
};

// Function to create image element
const createImageElement = (src) => {
  const img = document.createElement('img');
  img.src = src;
  img.loading = 'lazy';
  img.alt = 'דוגמאת הדפסה תלת מימד';
  return img;
};

const createGalleryItem = (media) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';

  // Create media container
  const mediaContainer = document.createElement('div');
  mediaContainer.className = 'media-container';
  
  const mediaElement = media.src.endsWith('.mp4') ? 
    createVideoElement(media.src) : 
    createImageElement(media.src);

  // Add price badge
  const priceBadge = document.createElement('div');
  priceBadge.className = 'price-badge';
  priceBadge.textContent = media.price;

  mediaContainer.appendChild(mediaElement);
  mediaContainer.appendChild(priceBadge);

  // Click handler
  if (!isTouchDevice) {
    mediaContainer.style.cursor = 'zoom-in';
    mediaContainer.addEventListener('click', () => 
      openModal(media.src, mediaElement.tagName.toLowerCase())
    );
  }

  // Testimonial
  const testimonial = document.createElement('div');
  testimonial.className = 'testimonial';
  testimonial.innerHTML = `
    <div class="quote-icon">״</div>
    <p>${media.testimonial}</p>
  `;

  item.appendChild(mediaContainer);
  item.appendChild(testimonial);

  return item;
};


// Function to open modal
// Update the openModal function
const openModal = (src, type) => {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
  modalContent.innerHTML = '';

  const mediaElement = type === 'video' ? 
    createVideoElement(src, true) : 
    createImageElement(src);

  mediaElement.classList.add('modal-media');
  modalContent.appendChild(mediaElement);

  // Add close button to modal content
  const closeButton = document.createElement('div');
  closeButton.id = 'close';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  modal.appendChild(closeButton);

  // Rest of your existing sizing logic...
};

// Close modal on click outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
  }
});

// Close modal when "X" button is clicked
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Populate the gallery
mediaFiles.forEach((file) => {
  const item = createGalleryItem(file);
  gallery.appendChild(item);
});

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Improved FAQ functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.style.display === 'block';

      // Close all answers
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.style.display = 'none';
      });

      // Toggle current answer
      if (!isOpen) {
        question.classList.add('active');
        answer.style.display = 'block';
        answer.style.animation = 'fadeIn 0.3s ease';
      }
    });
  });
});



// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Get the uploader element
  const uploader = document.querySelector('uc-file-uploader-regular');
  
  // Listen for when a file is uploaded
  uploader.addEventListener('upload-complete', (event) => {
      const fileInfo = event.detail.fileInfo;
      // Set the CDN URL to the hidden input
      document.getElementById('file-url').value = fileInfo.cdnUrl;
  });

  // Optional: Listen for form submission
  document.querySelector('form').addEventListener('submit', (event) => {
      // You can add additional validation or handling here if needed
      console.log('Form submitted with data:', {
          name: document.querySelector('[name="name"]').value,
          phone: document.querySelector('[name="phone"]').value,
          email: document.querySelector('[name="email"]').value,
          file: document.getElementById('file-url').value
      });
  });
});





// Scroll Animation Trigger
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.x1c-features, .target-audience, .faq-section').forEach((el) => {
  observer.observe(el);
});





document.addEventListener('DOMContentLoaded', () => {
  const uploader = document.querySelector('uc-file-uploader-regular');
  const fileUrlInput = document.getElementById('file-url');
  const form = document.getElementById('contact-form');
  
  // Initialize with empty value
  fileUrlInput.value = '';

  // Handle successful file upload
  uploader?.addEventListener('change', (event) => {
      const file = event.detail.file;
      if (file) {
          file.done(fileInfo => {
              // Construct URL using UUID and original filename
              const cdnUrl = `https://ucarecdn.com/${fileInfo.uuid}/${encodeURIComponent(fileInfo.originalFilename)}`;
              fileUrlInput.value = cdnUrl;
              console.log('File URL set:', cdnUrl);
          }).fail(error => {
              console.error('Upload failed:', error);
              alert('שגיאה בהעלאת הקובץ');
          });
      }
  });

  // Handle form submission
  form.addEventListener('submit', async (event) => {
      event.preventDefault();


      // Create form data with all fields
      const formData = new FormData(form);
      
      // Add debug logging
      console.log('Submitting with file URL:', fileUrlInput.value);
      console.log('Form data:', Object.fromEntries(formData.entries()));

      try {
          // Submit using Fetch API
          const response = await fetch(form.action, {
              method: 'POST',
              body: formData,
              headers: {
                  'Accept': 'application/json'
              }
          });

          if (response.ok) {
              alert('הטופס נשלח בהצלחה!');
              form.reset();
              fileUrlInput.value = '';
              uploader.value = null; // Reset uploader
          } else {
              throw new Error('שגיאה בשליחת הטופס');
          }
      } catch (error) {
          console.error('Submission error:', error);
          alert('שגיאה בשליחת הטופס, נסה שוב');
      }
  });
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    const yPos = -(window.pageYOffset * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// Hover Effect for Profile Image
document.querySelector('.my-pic').addEventListener('mousemove', (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.target.style.transform = `
    perspective(1000px) 
    rotateX(${(y - rect.height/2) * 0.02}deg) 
    rotateY(${(x - rect.width/2) * -0.02}deg)
  `;
});

document.querySelector('.my-pic').addEventListener('mouseleave', (e) => {
  e.target.style.transform = 'perspective(1000px) rotateY(15deg)';
});







// target audens
const windows = document.querySelectorAll('.window');
const dots = document.querySelectorAll('.nav-dot');
let currentActive = 0;
let autoRotateInterval;


function nextWindow() {
  currentActive = (currentActive + 1) % windows.length;
  showWindow(currentActive);
}

function startAutoRotate() {
  autoRotateInterval = setInterval(nextWindow, 5000);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentActive = index;
    showWindow(currentActive);
    clearInterval(autoRotateInterval);
    startAutoRotate();
  });
});

// Pause on hover
windows.forEach(window => {
  window.addEventListener('mouseenter', () => {
    clearInterval(autoRotateInterval);
  });
  window.addEventListener('mouseleave', startAutoRotate);
});




function showWindow(index) {
  windows.forEach((window, i) => {
    window.style.transitionDelay = `${Math.abs(index - i) * 0.1}s`;
    window.classList.remove('active');
  });
  
  dots.forEach(dot => dot.classList.remove('active'));
  
  windows[index].classList.add('active');
  dots[index].classList.add('active');
  
  // Particle animation
  const particles = document.createElement('div');
  particles.className = 'particles';
  windows[index].appendChild(particles);
  setTimeout(() => particles.remove(), 1000);
}

// Initialize
showWindow(0);
startAutoRotate();


document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
      duration: 800,
      once: true
  });
});




