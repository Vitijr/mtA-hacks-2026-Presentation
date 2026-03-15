const slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const navDotsContainer = document.getElementById("navDots");
const navCounter = document.getElementById("navCounter");

let currentIndex = 0;

function clampIndex(index) {
  if (index < 0) return 0;
  if (index >= slides.length) return slides.length - 1;
  return index;
}

function createDots() {
  navDotsContainer.innerHTML = "";
  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "nav-dot";
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    dot.addEventListener("click", () => goToSlide(idx));
    navDotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = Array.from(navDotsContainer.children);
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });
}

function updateCounter() {
  navCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
}

function goToSlide(index) {
  const target = clampIndex(index);
  if (target === currentIndex) return;

  slides[currentIndex].classList.remove("active");
  slides[target].classList.add("active");

  currentIndex = target;
  updateDots();
  updateCounter();
  updateButtons();
}

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    goToSlide(currentIndex + 1);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  }
}

function handleKeydown(event) {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    nextSlide();
  } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    prevSlide();
  }
}

// Initialize
if (slides.length > 0) {
  createDots();
  slides[0].classList.add("active");
  currentIndex = 0;
  updateDots();
  updateCounter();
  updateButtons();

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
  window.addEventListener("keydown", handleKeydown);
}

