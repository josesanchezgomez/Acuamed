
      // ======================= JAVASCRIPT LOGIC =======================
      // (No changes were needed to the logic, only to the styles it controls)

      // Tab functionality
      function openTab(evt, tabName) {
        const tabContents = document.querySelectorAll(".tab-content");
        tabContents.forEach((content) => {
          content.classList.remove("active");
        });

        const tabButtons = document.querySelectorAll(".tab-btn");
        tabButtons.forEach((button) => {
          button.classList.remove("active");
        });

        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
      }

      // Modal functionality
      const modal = document.getElementById("imageModal");
      const modalImage = document.getElementById("modalImage");
      const body = document.body;

      function openModal(imageSrc) {
        modal.style.display = "block";
        modalImage.src = imageSrc;
        body.classList.add("overflow-hidden");
      }

      function closeModal() {
        modal.style.display = "none";
        body.classList.remove("overflow-hidden");
      }

      modal.onclick = function (event) {
        // Close if clicking on the backdrop
        if (
          event.target === modal ||
          event.target.classList.contains("modal-container")
        ) {
          closeModal();
        }
      };

      // Lucide Icons initialization
      lucide.createIcons();

      // Animated counters
      function animateCounters() {
        const counters = document.querySelectorAll(".stat-card .number");
        const speed = 200;

        counters.forEach((counter) => {
          const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace(/[+%]/g, "");
            const inc = target / speed;

            if (count < target) {
              let newCount = Math.ceil(count + inc);
              if (counter.dataset.target.includes("%")) {
                counter.innerText = newCount + "%";
              } else {
                counter.innerText = "+" + newCount;
              }
              setTimeout(updateCount, 15);
            } else {
              if (counter.dataset.target.includes("%")) {
                counter.innerText = target + "%";
              } else {
                counter.innerText = "+" + target;
              }
            }
          };
          if (counter.dataset.target.includes("%")) {
            counter.innerText = "0%";
          } else {
            counter.innerText = "+0";
          }
          updateCount();
        });
      }

      // Scroll Fade-in Animation
      const sections = document.querySelectorAll(".section-fade-in");
      const statsGrid = document.getElementById("stats-grid");
      let hasAnimated = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.target.classList.contains("section-fade-in") &&
              entry.isIntersecting
            ) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
            if (
              entry.target === statsGrid &&
              entry.isIntersecting &&
              !hasAnimated
            ) {
              animateCounters();
              hasAnimated = true;
              observer.unobserve(statsGrid); // Stop observing after animation
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });

      if (statsGrid) {
        observer.observe(statsGrid);
      }

      // Set initial active tab
      document.addEventListener("DOMContentLoaded", () => {
        document.querySelector(".tab-btn").click();
      });
