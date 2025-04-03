/*hammenu*/
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const menuLinks = document.querySelectorAll('.off-screen-menu a');


/*carousel*/
const carousel = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.box');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = - 1; // Starta på första bilden
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
        currentIndex = totalSlides - 3; // Hoppa till sista bilden om du är på första
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
})

/*-------*/
/*modal - reservation/register button and form*/
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function openRegisterPopup(){
    document.getElementById("register-popup").style.display = "block";
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
    openPopup(); // Show the reservation popup
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
        });
    }
});