document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector("#main-container");
  const splashContainer = document.querySelector("#splash-container");
  const stickyHeader = document.querySelector("#sticky-header");
  const slider = document.querySelector(".image-slider");
  const dots = document.querySelector(".dot-container");
  const header = document.querySelector(".header-content");
  const media = document.querySelector(".img-content");
  const body = document.querySelector(".body-content");
  const textCell = document.querySelector(".text-cell");

  function updateStickyHeader() {
    if (!mainContainer || !splashContainer || !stickyHeader) {
      return;
    }

    const revealPoint = Math.max(
      splashContainer.offsetTop + splashContainer.offsetHeight - stickyHeader.offsetHeight,
      0
    );
    const isVisible = mainContainer.scrollTop >= revealPoint;

    stickyHeader.classList.toggle("is-visible", isVisible);
  }

  if (mainContainer && splashContainer && stickyHeader) {
    updateStickyHeader();
    mainContainer.addEventListener("scroll", updateStickyHeader, { passive: true });
    window.addEventListener("resize", updateStickyHeader);
  }

  if (!slider || !dots || !header || !media || !body || !textCell) {
    return;
  }

  const projects = [
    {
      image: "assets/images/pilot.jpg",
      title: "Wall-mounted Pots",
      body:
        "I designed wall-mounted pots with both the indoor plant enthusiast and 3D printer in mind. These pots have dovetail mounts that can be screwed into the wall or adhered to the wall using Command Strips (a useful feature for renters). The pots slide in and out of the mounts easily, which is convenient for watering and care. An important feature of the pots is the removable bottom, which twists on and off, allowing proper drainage and preventing root rot. On top of it all, the pots print without support, making 3D prints a breeze! <br><br>I've made several different designs of these wall-mounted pots. I print them all using Polymaker Polyterra, a high-quality bioplastic-based filament with a nice matte finish.",
      detailImages: [
        "assets/images/sheep.jpg",
        "assets/images/elephant.jpg",
        "assets/images/hanging-pot.gif",
      ],
    },
    {
      image: "assets/images/mid-century-pot.jpg",
      title: "Mid-century Desktop Pot Stand",
      body:
        "I wanted to add a little modern flair on the pot housing my baby pilea, so I designed and printed this mid-century pot stand. It's the perfect size for a desktop, and it looks cute and chic in Polyterra filament!",
      detailImages: [],
    },
    {
      image: "assets/images/kettle-can.jpg",
      title: '"Kettle" Watering Can',
      body:
        "I make coffee with my Stagg kettle nearly every morning, so I decided to make a mini one to water my plants with! Modeled after the Stagg, this desktop watering can was 3D printed using Polymaker Polyterra filament. I sanded down the handle and knob to make them look more like wood. Everything is held together with PLA Pro pegs and superglue, and a thin layer of epoxy coats the inside to make it watertight.",
      detailImages: [
        "assets/images/kettle-can-2.jpg",
        "assets/images/kettle-can-3.jpg",
        "assets/images/water-the-pot.gif",
      ],
    },
    {
      image: "assets/images/coffee-pot.jpg",
      title: 'Self-watering "Pourover" Pot',
      body:
        "Continuing with my coffee and plant obsession, I designed and printed this pourover-inspired pot. The pot is designed to be self-watering, so the reservoir holds water for the soil and plant to absorb over time. The reservoir has a thin layer of epoxy on the inside to make it watertight, and there is a cotton wick attached to the inner pot to aid with water absorption. Water can be poured directly into the spout on the side, or the inner pot can be removed for easier access to the reservoir.",
      detailImages: [
        "assets/images/coffee-pot-2.jpg",
        "assets/images/coffee-pot-vid.gif",
        "assets/images/coffee-pot-vid-2.gif",
      ],
    },
    {
      image: "assets/images/stunt-jump.jpg",
      title: "Stunt Jump",
      body:
        "Stunt Jump is a class I helped design for SeeME, an outreach program for teaching middle school to early high school students about mechanical engineering concepts. In this class, we taught students about how engineers use computer simulations for design through a hands-on Hot Wheels activity. Students were tasked with designing a track for a stunt jump, where a Hot Wheels car had to jump through pre-specified hoops. The challenge was to do the entire design using a computer, and their designs are informed by physics we teach them in the classroom. <br><br>For this class, I designed and 3D printed custom wall mounts for the Hot Wheels tracks. I designed the mounts to attach to the tracks using the existing track-to-track connection mechanism. I attached magnets to the mounts so that they could stick to a whiteboard and be moved around easily by the students. This allowed us to efficiently change the tracks throughout the class and visualize the accuracy of the computer simulation by projecting it onto the tracks on the board. <br><br>In addition to 3D printing material for the class, I also assisted in designing the lesson plan and the computer simulation code and GUI.",
      detailImages: [
        "assets/images/stunt-jump-wall-mount.jpg",
        "assets/images/stunt-jump-2.gif",
        "assets/images/stunt-jump-1.gif",
      ],
    },
  ];

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function renderSlides() {
    const slideMarkup = projects
      .map(
        (project, index) =>
          `<div class="image-slide${index === 0 ? " active" : ""}" style="background-image: url('${project.image}')"></div>`
      )
      .join("");

    const dotMarkup = projects
      .map(
        (_, index) =>
          `<button class="dot${index === 0 ? " active-dot" : ""}" type="button" data-index="${index}" aria-label="Show project ${index + 1}"></button>`
      )
      .join("");

    slider.innerHTML = slideMarkup;
    dots.innerHTML = dotMarkup;
  }

  function renderDetails(index) {
    const project = projects[index];

    header.textContent = project.title;
    body.innerHTML = project.body;
    media.innerHTML = project.detailImages
      .map(
        (image) =>
          `<img class="text-cell-img" src="${image}" alt="">`
      )
      .join("");

    slider.querySelectorAll(".image-slide").forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    dots.querySelectorAll(".dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active-dot", dotIndex === index);
    });

    textCell.scrollTop = 0;
  }

  function showProject(index) {
    currentIndex = (index + projects.length) % projects.length;
    renderDetails(currentIndex);
  }

  renderSlides();
  renderDetails(currentIndex);

  dots.addEventListener("click", (event) => {
    const dot = event.target.closest(".dot");
    if (!dot) {
      return;
    }

    showProject(Number(dot.dataset.index));
  });

  slider.addEventListener("click", () => {
    showProject(currentIndex + 1);
  });

  slider.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    (event) => {
      touchEndX = event.touches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener("touchend", () => {
    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50) {
      showProject(currentIndex - 1);
    } else if (deltaX < -50) {
      showProject(currentIndex + 1);
    }
  });
});
