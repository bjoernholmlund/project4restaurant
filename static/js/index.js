/*hammenu*/
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const menuLinks = document.querySelectorAll('.off-screen-menu a');


/*carousel*/
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = - 1 // Starta på första bilden
const totalSlides = slides.length;

function updateCarousel() {
    const offset = -currentIndex * 100; // Flytta till rätt bild
    carousel.style.transform = `translateX(${offset}vw)`;
}

// Starta på första bilden vid laddning
document.addEventListener("DOMContentLoaded", () => {
    updateCarousel();
});

// Knapp för att gå bakåt
prevBtn.addEventListener('click', () => {
    if (currentIndex > - 1) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 5; // Hoppa till sista bilden om du är på första
    }
    updateCarousel();
});

// Knapp för att gå framåt
nextBtn.addEventListener('click', () => {
    if (currentIndex < totalSlides - 3) {
        currentIndex++;
    } else {
        currentIndex = - 1; // Hoppa tillbaka till första bilden
    }
    updateCarousel();
});

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
})
// så man hamnar högst upp på sidan vid start, förhindrar vid mobiler.
window.onload = function () {
  if (window.innerWidth < 768) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 360);
  }
};


//document.addEventListener("DOMContentLoaded", function () {
//  if (window.location.hash === "") {
//    window.scrollTo(0, 0);
//  }
//});

/*-------*/
/*modal - reservation/register/login button and form*/
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

//  REGISTRATION POPUP
function openRegisterPopup(){
    document.getElementById("register-popup").style.display = "flex";
}

function closeRegisterPopup() {
    document.getElementById("register-popup").style.display = "none";
}



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("popup").style.display = "none"; // Tvinga att det är dolt vid start
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register-popup").style.display = "none"; // Tvinga att det är dolt vid start
});

// Event listener for the Reservation link
document.getElementById("reservation-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior (no scrolling or page refresh)
    openPopup(); // Show the reservation popup
});
// Event listener for the Register link
document.getElementById("register-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior (no scrolling or page refresh)
    openRegisterPopup(); // Show the reservation popup
});


// Stänger popup om användaren klickar utanför
window.onclick = function(event) {
    let popup = document.getElementById("popup");
    if (event.target == popup) {
        closePopup();
    }
};

// Vänta tills sidan har laddats helt
window.onload = function() {
    // Sätt en fördröjning innan texten blir synlig
    setTimeout(function() {
        // Lägg till 'hidden' klassen som triggar animationen
        document.getElementById('delayed-text').classList.remove('hidden');
        document.getElementById('delayed-text').classList.add('visible');
    }, 1000); // Fördröjningen innan animationen startar
};


//----------------------Så man åker upp på sida----------//

document.addEventListener("DOMContentLoaded", function () {
    const homeLink = document.getElementById("home-link");
    const topSection = document.getElementById("top");

    if (homeLink && topSection) {
        homeLink.addEventListener("click", function (e) {
            e.preventDefault(); // förhindra vanlig hopp-länk
            topSection.scrollIntoView({
                behavior: "smooth"
            });

            // Stäng hamburgermenyn om öppen
            document.querySelector('.off-screen-menu').classList.remove('active');
            document.querySelector('.ham-menu').classList.remove('active');
        });
    }
});

//Förhindra att man hamnar fel vid laddning
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 768 && window.location.hash === "#carousel-section") {
      window.scrollTo(0, 0); // Scrolla till toppen om hash är inställd
    }
  });


//---- Bokningsformuläret ----------//

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservationForm");
    const messageBox = document.getElementById("reservationMessage");

    if (!form || !messageBox) {
        console.warn("reservationForm or messageBox not found in DOM");
        return;
    }

    const bookTableUrl = form.dataset.url;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch(bookTableUrl, {
            method: "POST",
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageBox.textContent = "✅ Thank you! Your reservation is registered.";
                messageBox.classList.remove("hidden", "text-red-600");
                messageBox.classList.add("text-green-600");
                form.reset();

                    // 🔁 Ladda om sidan efter 3 sekunder
                setTimeout(() => {
                    location.reload();
    }           , 3000);
            } else {
                let errorText = data.message || "❌ Something went wrong.";
                messageBox.innerHTML = `<p>${errorText}</p>`;

                if (data.suggested_times && data.suggested_times.length > 0) {
                    const suggestionButtons = data.suggested_times.map(time => {
                        return `<button type="button" class="suggestion-btn" data-time="${time}">${time}</button>`;
                    }).join('');

                    messageBox.innerHTML += `
                        <p>Choose a free time:</p>
                        <div class="suggestions">${suggestionButtons}</div>
                    `;

                    document.querySelectorAll(".suggestion-btn").forEach(btn => {
                        btn.addEventListener("click", function () {
                            const selectedTime = this.dataset.time;
                            const input = form.querySelector('input[name="date_time"]');
                            input.value = selectedTime.replace(" ", "T");
                            messageBox.classList.remove("text-red-600");
                            messageBox.classList.add("text-green-600");
                            messageBox.textContent = `✅ The time ${selectedTime} is selected. Click again to book!`;
                        });
                    });
                }

                messageBox.classList.remove("hidden", "text-green-600");
                messageBox.classList.add("text-red-600");
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
            messageBox.textContent = "❌ Something went wrong. Please try again.";
            messageBox.classList.remove("hidden", "text-green-600");
            messageBox.classList.add("text-red-600");
        });
    });
});


//------- Registreringsformuläret och länk ner till carousel--------//

document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('registerform');
    const regMessage = document.getElementById('registerMessage');

    if (regForm) {
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(regForm);
            const csrfToken = formData.get('csrfmiddlewaretoken');

            fetch(regForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            })
            .then(res => res.json())
            .then(data => {
                regMessage.classList.remove('hidden', 'text-red-600', 'text-green-600');
                if (data.success) {
                    regMessage.textContent = "✅ Registration successful!";
                    regMessage.classList.add('text-green-600');
                    regForm.reset();
                } else {
                    regMessage.textContent = data.message || "❌ Registration failed.";
                    regMessage.classList.add('text-red-600');
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                regMessage.classList.remove('hidden', 'text-green-600');
                regMessage.classList.add('text-red-600');
                regMessage.textContent = "❌ An error occurred. Please try again.";
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuLink = document.getElementById("menu-link");
    const carouselSection = document.getElementById("carousel-section");

    if (menuLink && carouselSection) {
        menuLink.addEventListener("click", function (e) {
            e.preventDefault();
            carouselSection.scrollIntoView({ behavior: "smooth" });

            document.querySelector('.off-screen-menu').classList.remove('active');
            document.querySelector('.ham-menu').classList.remove('active');
        });
    }
});

// ------------------ MENY ------------------
function openMenuPopup() {
  document.getElementById("menu-popup").style.display = "flex";
  document.body.classList.add("popup-open");
}

function closeMenuPopup() {
  document.getElementById("menu-popup").style.display = "none";
  document.body.classList.remove("popup-open");
}

document.getElementById("show-full-menu").addEventListener("click", function (e) {
  e.preventDefault();
  openMenuPopup();
});

// Klick utanför popupen stänger den
window.addEventListener("click", function (event) {
  const menuPopup = document.getElementById("menu-popup");
  if (event.target === menuPopup) {
    closeMenuPopup();
  }
});


// ------------------ DRINK / VINLISTA ------------------
const drinkPopup = document.getElementById("drink-popup");
const drinkOverlay = document.getElementById("drink-overlay");
const showDrinkBtn = document.getElementById("show-drink-list");

showDrinkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  drinkOverlay.style.display = "block";
  drinkPopup.style.display = "flex";
 
});

function closeDrinkPopup() {
  drinkOverlay.style.display = "none";
  drinkPopup.style.display = "none";

}

drinkOverlay.addEventListener("click", function () {
  closeDrinkPopup();
});

//--------------PROFILE--------------


function closeProfilePopup() {
    document.getElementById("profilePopup").classList.add("hidden");
     // ⬅️ Ladda om sidan för att hämta nya bokningar
  }


document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.getElementById("profile-link"); // <- ID på din "Min sida"-länk
    const profilePopup = document.getElementById("profilePopup");
    const closeBtn = document.querySelector('#profilePopup .close');
  
    if (profileLink && profilePopup) {
      profileLink.addEventListener("click", function (e) {
        e.preventDefault();
        profilePopup.style.display = "flex";
      });
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        profilePopup.style.display = "none";
      });
    }
  
    profilePopup?.addEventListener("click", function (e) {
      if (e.target === profilePopup) {
        profilePopup.style.display = "none";
      }
    });
    
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const formData = new FormData(loginForm);
  
        fetch(loginForm.action, {
          method: "POST",
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": formData.get("csrfmiddlewaretoken"),
          },
          body: formData,
        })
          .then((response) => {
            if (response.redirected) {
              // Inloggning lyckades, ladda om sidan (eller popupen via fetch)
              location.reload();
            } else {
              return response.text();
            }
          })
          .then((html) => {
            if (html) {
              loginMessage.classList.remove("hidden");
              loginMessage.innerHTML = "❌ Fel användarnamn eller lösenord";
            }
          })
          .catch((error) => {
            console.error("Login error:", error);
            loginMessage.classList.remove("hidden");
            loginMessage.textContent = "❌ Något gick fel, försök igen.";
          });
      });
    }
});

//CONTACTFORM//
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(contactForm);

  fetch(contactForm.action, {
    method: "POST",
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': formData.get('csrfmiddlewaretoken')
    },
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    contactMessage.classList.remove("hidden", "text-red-600", "text-green-600");

    if (data.success) {
      contactMessage.textContent = data.message;
      contactMessage.classList.add("text-green-600");
      contactForm.reset();

      // ⏳ Vänta 3 sekunder, sen stäng popup
      setTimeout(() => {
        document.getElementById("contact-popup").style.display = "none";
        contactMessage.classList.add("hidden");
      }, 3000);

    } else {
      contactMessage.textContent = data.message;
      contactMessage.classList.add("text-red-600");
    }
  })
  .catch(() => {
    contactMessage.textContent = "❌ Ett fel inträffade.";
    contactMessage.classList.remove("hidden");
    contactMessage.classList.add("text-red-600");
  });
});

// CONTACT POPUP
function openContactPopup() {
  document.getElementById("contact-popup").style.display = "flex";
}

function closeContactPopup() {
  document.getElementById("contact-popup").style.display = "none";
}

// Event för hamburgermenyns "Contact"-länk
document.addEventListener("DOMContentLoaded", function () {
  const contactLink = document.getElementById("contact-link");
  if (contactLink) {
    contactLink.addEventListener("click", function (e) {
      e.preventDefault();
      openContactPopup();

      // Stäng hamburgermenyn
      document.querySelector(".off-screen-menu").classList.remove("active");
      document.querySelector(".ham-menu").classList.remove("active");
    });
  }
});