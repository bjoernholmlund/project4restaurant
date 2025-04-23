# Bite – Restaurant booking system 🍽️

![mockup](<static/img/mockup p4.png>) 


**Live version**: <br>
<a href="https://my-restaurant-booking-project-9719877ce119.herokuapp.com/">Restaurant Page</a>  

## Table of contents:

* [About the project](#-about-the-project)
* [User experience](#user-experience)
    * [User Stories](#user-stories)
    * [UX-design](#-ux--design)
        * [1.Font](#1-font)
        * [2.Logo](#2-color-scheme)
        * [3.Color Scheme](#3-logo)
        * [4.Geometry Layout](#4-geometry--layout)
        * [5.Wireframing & Proposed / Implemented Functionality per Page](#5-wireframing--proposed--implemented-functionality-per-page)
* [Technologies used](#️-technologies-used)
* [Deployment & Security](#-deployment--security)
* []()
* []()

## 📖 About the project

Bite is a full-stack web application developed for a modern restaurant experience. The application makes it easy for both new and returning guests to interact with the restaurant digitally – directly via the website. The focus has been on user experience (UX), responsive design and interactive functionality.

- Book a table directly via a convenient pop-up form placed on top of the page for increased accessibility.

- Create an account or log in to access personalized functionality.

- View your own reservations, including the ability to cancel directly in a user-friendly pop-up window.

- Read menus and wine lists in separate pop-ups with a clear structure, inspired by fine-dining aesthetics.

- Send messages to the restaurant via a contact form with confirmation and automatic reset.


## User experience:
👥 User Stories:

🧑‍🍳 Visitor (Guest)

As a visitor, I want to be able to book a table online so that I can secure a seat when I visit.

As a visitor, I want to be able to see the restaurant's menu and drink selection so that I can plan my order in advance.

As a visitor, I want to be able to contact the restaurant via a form so that I can ask questions or provide feedback.

As a visitor, I want to be able to see the restaurant's opening hours and contact information so that I know when and how to visit.

As a visitor, I want to be able to see pictures of the restaurant so that I can get a feel for the atmosphere.

🧾 Registered User
As a registered user, I want to be able to log in to my account so that I can manage my bookings.

As a registered user, I want to be able to see my past and upcoming bookings so that I have an overview of my reservations.

As a registered user, I want to be able to cancel a booking so that I can change my plans if necessary.

As a registered user, I want to be able to update my account details so that my information is up to date.

As a registered user, I want to be able to log out of my account so that my information remains secure.

🧑‍💼 Restaurant Owner / Administrator
As an administrator, I want to be able to manage reservations via an admin panel so that I can organize the restaurant's schedule efficiently.

As an administrator, I want to be able to update the menu and beverage offerings so that the information on the website is up-to-date.

As an administrator, I want to be able to view and respond to messages from the contact form so that I can communicate with customers.

As an administrator, I want to be able to manage user accounts so that I can assist customers when needed.

As an administrator, I want to be able to view statistics on reservations so that I can make informed decisions about the business.

👨‍💻 Developer
As a developer, I want to be able to implement a responsive design so that the website works well on all devices.

As a developer, I want to be able to use the Django framework to structure the backend logic efficiently.

As a developer, I want to be able to use Git and GitHub for version control so that I can track changes and collaborate with others.

As a developer, I want to be able to deploy the website via Heroku so that it is available to users online.

As a developer, I want to be able to write unit tests to ensure that the functionality works as expected.


## 🎨 UX & Design 

#### 1. Font

The project uses Google Fonts to create a modern yet elegant feel:
- Poppins - used for body text – a sans-serif font that is stylish and easy to read.
- Playfair Display - used for headlines – a serif font that adds personality and a touch of luxury.

#### 2. Color Scheme

The color palette is chosen to create a warm and inviting experience that suits an exclusive restaurant environment:
- Background: Dark tones (black / dark gray) for elegance.
- Text color: White for high contrast and readability.
- Accent colors: Natural shades of beige, brown and champagne to enhance the feeling of harmony, balance and exclusivity.

The color palette was also tested in contrast controls for accessibility.


#### 3. Logo

The logo (“logo-bite”) is centrally positioned and responsive.
- It is clearly displayed on larger screens but is automatically hidden during pop-up activities and mobile menus so as not to block features.
- The image is vector-based and adapted to maintain high quality in all resolutions.


#### 4. Geometry / Layout
- Grid structure: Flexbox is used to create dynamic sections, centering and popup positioning.
- Carousel layout: Built with vw and vh dimensions to take up the entire screen and work smoothly on all devices.
- Popup forms: All forms (booking, contact, registration, login) are placed centrally and are overlaid with a dark background for focus.


#### 5. Wireframing & Proposed / Implemented Functionality per Page
- Wireframes were developed early in the development process and iterated as the project progressed.
- Home page: Welcome text + image
- Carousel section: Navigation between menu blocks with arrows
- Popup design: Used for all forms
- Mobile layout: Adapted with media queries for optimal experience

- Fullscreen carousel

    - A full-screen image carousel that appears immediately after the home page. 
<br>The user can scroll between sections using arrows. The carousel contains both images and menus.

- Popup-forms

    - All forms (booking, registration, contact, login) open in stylish popups on top of the page.
        SCREENSHOTS
- Mobile-friendly layout

    -  Responsive design with custom popups and navigation for smaller screens.

- Overlay menus and contact forms

    -  The wine list, menu, and contact form appear over all content and make the rest of the page inaccessible until the popup is closed.

- "My side"-view for users with login

    - Shows logged in user's bookings

    - Ability to cancel directly in the view

    - Dynamic content display based on login status




## 🛠️ Technologies used

#### Languages, Frameworks & Tools

- **HTML5, CSS3, JavaScript (ES6), Python** – These were used to build the structure, styling, interactivity, and backend logic of the application. Python served as the foundation for the server-side code, especially through the Django framework.

- <a href="https://github.com/bjoernholmlund/project4restaurant">Github</a> - was used for version control and as a remote repository for the project's code base. It also served as a connection point to Heroku, where the latest version of the application could be automatically deployed after each push to the master branch. This enabled continuous delivery and a smooth development process.

- <a href="https://www.heroku.com/">Heroku</a> - is a cloud-based Platform as a Service (PaaS) that enables easy and seamless deployment of this full-stack Django application. It handles everything from server environment to database connections and allows automatic updates directly from GitHub, making development and deployment to production fast and secure.

- <a href="https://www.djangoproject.com/">Django</a> - was used as the architectural framework for the project and follows the Model-Template-View (MTV) principle. It separates logic, database structure, and presentation, creating a clear and scalable structure for the application – perfect for a restaurant booking solution with multiple features and user flows.

#### Tools used

- <a href="">PostgreSQL</a> - A free and open-source relational database management system emphasizing extensibility and technical standards compliance. Designed to handle high range of workloads including Web services with many concurrent users.

- <a href="http://whitenoise.evans.io/en/stable/">WhiteNoise</a> - Used to easily allow the Deployed project to serve it's own static files.

-  <a href="https://validator.w3.org/">W3C HTML Validator</a>, <a href="https://jigsaw.w3.org/css-validator/">W3C CSS Validator</a> & <a href="https://jshint.com/">JSHint</a> - Used to validate and improve the quality of my code, both in terms of syntax and structure. Running HTML, CSS, and JavaScript validation ensured that the code followed standards and was free of common errors that could impact functionality or compatibility.

- <a href="https://www.codewof.co.nz/style/python3/">PEP 8 Online Validator</a> - to check my python code to be consistent with PEP8 requirements.

- <a href="https://freebiesupply.com/blog/css-arrows/">Arrows</a> - The left and right arrow icons in the image carousel are inspired by this resource. They were adapted and integrated with custom SVG styling to blend into the design and provide a smooth navigation experience between slides. The arrows are responsive, accessible, and work on both desktop and mobile devices.

---


