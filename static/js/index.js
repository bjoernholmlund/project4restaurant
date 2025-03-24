/*hammenu*/
const hamMenu = document.querySelector('.ham-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const menuLinks = document.querySelectorAll('.off-screen-menu a');

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
/*modal - reservation button and form*/
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("popup").style.display = "none"; // Tvinga att det är dolt vid start
});

// Event listener for the Reservation link
document.getElementById("reservation-link").addEventListener("click", function(event) {
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

document.querySelector('form').addEventListener('submit', function(event) {
    console.log('Formuläret skickas!');
});

//-------------------------

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("reservationForm");
    const messageBox = document.getElementById("reservationMessage");
    const bookTableUrl = form.dataset.url; // 👈 hämta URL från data-attribut

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch(bookTableUrl, {
            method: "POST",
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken'),
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageBox.textContent = "Tack! Din bokning är registrerad.";
                messageBox.classList.remove("hidden");
                messageBox.classList.remove("text-red-600");
                messageBox.classList.add("text-green-600");
                form.reset();
            } else {
                messageBox.textContent = "Något gick fel. Försök igen.";
                messageBox.classList.remove("hidden");
                messageBox.classList.remove("text-green-600");
                messageBox.classList.add("text-red-600");
            }
        })
        .catch(error => {
            messageBox.textContent = "Fel vid skickande.";
            messageBox.classList.remove("hidden");
            messageBox.classList.add("text-red-600");
        });
    });
});