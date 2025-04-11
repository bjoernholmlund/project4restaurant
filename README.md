# Bite – Restaurant booking system 🍽️

![mockup](<static/img/mockup p4.png>) 


**Live version**: <br>
<a href="https://my-restaurant-booking-project-9719877ce119.herokuapp.com/">Restaurant Page</a>  


## 📖 About the project

Bite is a full-stack web application for a restaurant where users can:

- Book a table directly via a pop-up form

- Create an account or log in

- View and cancel their own reservations

- Read the menu and drink list in interactive pop-ups

- Send contact messages to the restaurant

The project is built with a focus on UX, responsive design and modern functionality.

---

## 🛠️ Technology stack

- **Back-end**: Django, Python, SQLite

- **Front-end**: HTML, CSS, Tailwind CSS, JavaScript (AJAX)

- **Database**: SQLite (locally), PostgreSQL (Heroku)

- **Hosting**: Heroku (app), GitHub Pages (mockup)

- **Version management**: Git & GitHub

- **Agile planning**: GitHub Projects with User Stories & Tasks

---


## 📂 Functions

### ✅ Guest Users

- Book a table

- See menues

- Send a contactform

### 🔐 Logged in Users

- Register an account

- See own reservations

- Cancel a table 

- Log out

---


## 🎨 UX & Design 


- Fullscreen carousel

    - A full-screen image carousel that appears immediately after the home page. 
<br>The user can scroll between sections using arrows. The carousel contains both images and menus.

- Popup-forms

    - All forms (booking, registration, contact, login) open in stylish popups on top of the page.

- Mobilanpassad layout

    -  Responsive design with custom popups and navigation for smaller screens.

- Överlagrade menyer och kontaktformulär

    -  The wine list, menu, and contact form appear over all content and make the rest of the page inaccessible until the popup is closed.

- "Min sida"-vy för användare med inloggning

    - Visar inloggad användares bokningar

    - Möjlighet att avboka direkt i vyn

    - Dynamisk innehållsvisning baserat på inloggningsstatus

