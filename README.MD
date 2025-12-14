FlipTrackr (Minimal Viable Product) MVP

# Project Overview

## **FlipTrackr: Streamlined Inventory for Thrift Flippers**

Tired of juggling notebooks, scraps of paper, and endless POS entries? **FlipTrackr** is built for thrift flippers who want to:

- Log purchases on the spot
- Make smarter buying decisions
- Track inventory effortlessly
- Generate monthly and yearly reports

Spend less time managing items and more time flipping them!

## **Project Description**

I created **FlipTrackr** because I'm a thrift flipper, and managing inventory the old-fashioned way is exhausting. My process used to involve **way too many touches per item**:

- At the thrift store, I'd spot an item and immediately do a quick Google search to see if it was worth buying. If the potential profit wasn't there, it went back on the shelf.
- If I bought it, I brought it home **with the original sticker still on**, logged the item in my notebook, and later entered the purchase into Quicken (sometimes weeks later).
- When I finally got around to preparing items for consignment, I'd gather them, clean them, remove the tags, and perform **another Google search** to collect product details. I'd write everything down on a separate sheet of paper and bring the items to the store.
- At the store, I used their POS system to create listings, print labels, and place items on the shelves. End-of-year reporting meant digging through receipts, notebooks, and POS reports to update Quicken and prepare taxes-**a huge, tedious mess**.

**FlipTrackr** streamlines all of that:

- Log items immediately at the point of purchase.
- Make better purchase decisions by tracking potential profit early.
- Track inventory in one central place without multiple notebooks and scraps of paper.
- Prepare **end-of-month or end-of-year reports** easily.

This app is built to **save time, reduce repetitive tasks, and make inventory management painless**-so I can focus more on flipping and less on logging.

# Features

- User Authentication:
  - JWT-only authentication (login/logout/registration)
  - Authentication-protected routes in React
  - Owner based data management.
- Item Management:
  - FastAdd - product add with minimum required fields intended for mobile use
  - Add or edit any item with dependent Product Type 🡪 Categories
  - Image uploads for products
- Workflow Tracking
  - Product ownership and status tracking ((acquired, ready_to_list, listed, sold, removed)
  - Users update the status during edit.
  - Bulk status changes from ready to list to listed.
  - Removed items are filtered out by default for clean UI/UX.
- Insights & Reports:
  - Profit by Month: Includes cost, sale price, commission, and auto-calculated profit
  - Ready-to-List product report: Items ready to be loaded into the consignment system
  - Product Table with sorting, filtering and actions (edit, remove/restore

# Tech Stack

- **Frontend:** React (Create React App), React-Bootstrap, React-Select
- **Backend:** Django, Django REST Framework, Django Filters, Simple JWT
- **Database:** SQLite (for dev)
- **API Calls:** Axios (with JWT token handling)

Data Model: <https://dbdiagram.io/d/FlipTrackr-692664e77d9416ddff1fca6f>

# File Structure

FlipTracker-02/  
│

├── venv/ # Virtual Environment  
├── server/ # Django REST API  
│ ├── core/ # Settings, Project urls, etc.  
│ ├── inventory/ # App with models, views, and serializers (auth)

| ├── user/ # App with models, views, and serializers

| ├── images/ # images are stored

│ └── ...  
│  
└── client/ # React application  
├── src/  
│ ├── api/ # apiConfig  
│ ├── components / # formFields, home, insights, inventory, CustomNavbar, PersistLogin  
│ ├── context/ # AuthContext

│ ├── hooks/ # hooks for authorization, token management and form state.

│ ├── lists/ # static data for public home page

│ ├── middlewares/ # auth

│ ├── pages/ # pages by admin, auth, insights and inventory and public home.

│ ├── styles/ # UI css

│ ├── util/ # helper files

│ └── ...

# Setup / Installation

- Clone the repository & create a virtual environment:
  - git clone <https://github.com/Lizanne-B33/fliptracker-02.git>
  - cd fliptracker-02
  - python -m venv venv // create a
  - venv/bin/activate
- Environment Variables.
  - Create a .env file in backend folder (server)
  - Update values: Django Secret Key & Debug Mode

SECRET_KEY=your-secret-key-here

DEBUG=True

- Backend Setup
  - cd server // change directory to the backend
  - python manage.py makemigrations
  - python manage.py migrate
  - python manage.py loaddata seed.json
  - python manage.py createsuperuser
  - python manage.py runserver
- Frontend Setup.
  - Create a new terminal
  - Cd client // navigate to the client
  - Npm install // Dependencies
  - Npm start

# Workflow

- **Register/Login:** Users must log in to access the app.
  - **Register** 🡪 complete information
  - **Login 🡪** with new user data.
- **Create Product Type and Category**
  - **Admin 🡪 Product Type-_suggest: tooling:_**
  - **Admin 🡪 Select Product Type & add Category _suggest hand tools_**
- **Add Product:** Use FastAdd form to add a minimum item; select Product Type → Category. Or Select Add from the menu bar to add a complete product.
- **Search:** <https://www.google.com/search?q=hand+tools>, and select a image.
  - **Save one of the images, and capture the descption**
  - **Enter a Title: your choice**
  - **Product type:** Tooling,
  - **Category:** Hand tools, Cost:
  - **Cost:** 5
  - **Default:** qty, unit or change if desired.
  - **Condition:** Used: good
  - **Product Image:** from the search
  - **Ai desc:** test or other.
  - **Fast Notes:** notes about your selection in your own words,
  - **Note: App calculates proposed price:** cost \* condition weight \* .75.
  - proposed price - 15, profit 6.25
  - **Commit Item?:** Yes
  - **Create.**
  - **Result:** Saved Successfully.
- **Menu🡪 Product Inventory:** Products display in tables with sorting, filtering, and actions. Items can be removed as needed or restored if removed in error.
- **Edit Products:** Click Edit🡪 Edit any field.
  - **Note:** the date sold can only be changed if the inventory Status is changed to Sold.
  - **Change status to Ready to List:**
  - **Change price** to 25
  - **Update**
- **Reports:** Access "Ready to List" to print out a report usable for POS entry. And bulk mark items as Listed.
  - Click Insights 🡪 Ready to list
  - See the report (can be printed)
  - Click Mark as listed.
- **Update Status:** Mark products as sold via reports or tables
  - **Inventory** 🡪 Product Inventory
  - **Sort by status = Listed find your tool in the listed**
  - **Edit 🡪 change status to sold. -- Update**
  - **See the date change to current date.**
- **Reports**: Profit by month, aggregate of items sold by month calculated by **profit = sold price − cost − (sold price × 0.25 commission)**
  - **Profit: 6.25.**
- **To see full working application:**
  - **Logout**
  - **Login: Credentials:** [admin@fliptrackr.com](mailto:admin@fliptrackr.com) **/Wonderland**

# Notes / Known Limitations

- Sorting in tables is limited to loaded data due to implementation of pagination.
- MVP focuses on core functionality via desktop. Mobile use is not fleshed out.
- Product Type list does not automatically refresh, user needs to click refresh.
- Insights into trends, and statistics was removed from MVP due to time constraints.

# Authentication Summary

The frontend communicates with Django using JWT tokens:

- React stores token securely in memory or local storage
- Requests include the Authorization: Bearer &lt;token&gt; header
- Backend verifies token and returns protected data

# Testing

- API endpoints tested using Django's built-in test tools, Pytest and Postman
- React frontend tested with manual workflow and basic component checks
- Functional walkthrough completed before submission
- App development on Chrome.

# Key Learnings

- Using a two-part application is extremely complex, especially with JWT.
- React is not as easy as expected. Billed to be a library that reduced coding.
- Use of Pytest was helpful to assure clean backend consistency during development.
- Authentication stability is paramount:
  - Use of a pre-defined fork for environment and user Authentication was beneficial, although not error free. Needed extensive updates and modifications.
  - Single Axios Private instance prevented inconsistent token use and complex debugging.
- Frontend/Backend contract must be explicit
  - URL alignment: DRF auto-generated endpoints require both the project URLs and the app urls.
  - Foreign Key normalization: backend expects integer ids, but React stores objects for display. This requires additional manipulation to pass proper ids.
  - File uploads must use FormData and require multipart/form-data header.
- Frontend component structure and Data Flow must be clean & organized in order to manage complex state interactions.
  - When a dependent parent changes, the child must be explicitly reset.
  - Media files require explicit configuration in root urls.py and within settings.

# Credits & Resources

- Project initially forked from: <https://github.com/sinansarikaya/django-react-auth>
- AI Assistance: CS50ai, ChatGPT, Copilot, GitHub
- References:
  - CSS: [BoilerPlate](https://raw.githubusercontent.com/frontaid/natural-selection/main/boilerplate.css)
  - Environment:
    - [Getting Started | Axios Docs](https://axios-http.com/docs/intro)
    - [How to Make HTTP Requests with Axios in 2025](https://apidog.com/blog/http-request-axios/)
    - [Axios in React: A Guide for Beginners - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs/axios-in-react-a-guide-for-beginners/)
    - [Axios Tutorials - Mastering JS](https://masteringjs.io/axios)
    - [Quick Start - React](https://react.dev/learn)
    - [React Hook Form: Working with Multipart Form Data and File Uploads | ClarityDev blog](https://claritydev.net/blog/react-hook-form-multipart-form-data-file-uploads)
    - [File Uploading In ReactJS - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/)
    - [Getting started with React - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started)
    - [How to Use a Simple Form Submit with Files in React | Online Courses, Learning Paths, and Certifications - Pluralsight](https://www.pluralsight.com/resources/blog/guides/how-to-use-a-simple-form-submit-with-files-in-react)
    - [React Tutorial](https://www.w3schools.com/react/)
    - [React Tutorial - GeeksforGeeks](https://www.geeksforgeeks.org/reactjs/react/)
    - [nareshbhatia/react-learning-resources: A curated list of resources to learn React as fast as possible](https://github.com/nareshbhatia/react-learning-resources)
    - [JWT Authentication With React JS and Django | by Ronak Chitlangya | Medium](https://medium.com/@ronakchitlangya1997/jwt-authentication-with-react-js-and-django-c034aae1e60d)
    - [How to Implement Authentication in React: A Beginner's Guide](https://codezup.com/learn-react-authentication-step-by-step-guide/)
    - [Auth & Context in React 18](https://www.sammeechward.com/use-context-auth)
    - [Forms | React Bootstrap](https://react-bootstrap.github.io/docs/forms/overview)
    - [Full-Stack Inventory System: Django, DRF & Next.js Guide](https://www.nnamdiekechi.com/blog/how-i-use-react-django--drf-together-in-real-proje)
    - [Building a Django Inventory App: Displaying Item Details](https://tech-champion.com/database/building-a-django-inventory-app-displaying-item-details/)
    - [Serializers - Django REST framework](https://www.django-rest-framework.org/api-guide/serializers/#modelserializer)
    - [Built in & Custom Model Managers in Django - GeeksforGeeks](https://www.geeksforgeeks.org/python/built-in-custom-model-managers-in-django/)
    - [Liam Li | Django Development Naming Conventions](https://www.liamli.com/articles/3)
    - [Quickstart - Django REST framework](https://www.django-rest-framework.org/tutorial/quickstart/)
    - [How to Master CRUD Operations in Django | Complete Tutorial](https://codezup.com/mastering-crud-operations-in-django/)
    - [11.2: Sample Responsive WAD with Bootstrap and Django - Engineering LibreTexts](https://eng.libretexts.org/Bookshelves/Computer_Science/Programming_and_Computation_Fundamentals/Introduction_to_Computer_Science_%28OpenStax%29/11%3A_Web_Applications_Development/11.02%3A_Sample_Responsive_WAD_with_Bootstrap_and_Django)
    - [11.4: Sample Responsive WAD with Bootstrap/React and Django - Engineering LibreTexts](https://eng.libretexts.org/Bookshelves/Computer_Science/Programming_and_Computation_Fundamentals/Introduction_to_Computer_Science_%28OpenStax%29/11%3A_Web_Applications_Development/11.04%3A_Sample_Responsive_WAD_with_Bootstrap_React_and_Django)
    - [13 Best React Bootstrap Templates 2025 - Colorlib](https://colorlib.com/wp/react-bootstrap-templates/)
    - [raw.githubusercontent.com/frontaid/natural-selection/main/boilerplate.css](https://raw.githubusercontent.com/frontaid/natural-selection/main/boilerplate.css)
    - [Building a Django and React Web Application: A Step-by-Step Guide | by Akhand Pratap Singh | Medium](https://medium.com/@akhandsinghofficial/building-a-django-and-react-web-application-a-step-by-step-guide-e93000692c9e)
    - [Word to Markdown](https://word2md.com/)
  - Testing:
    - [Comprehensive Step-by-Step Guide to Testing Django REST APIs with Pytest | Pytest with Eric](https://pytest-with-eric.com/pytest-advanced/pytest-django-restapi-testing/)
    - [Getting started with pytest and pytest-django - pytest-django documentation](https://pytest-django.readthedocs.io/en/latest/tutorial.html)
    - [How to Test Your Django App With Pytest?](https://djangostars.com/blog/django-pytest-testing/)
    - [Testing - Django REST framework](https://www.django-rest-framework.org/api-guide/testing/)
    - [Test Smarter in Django: A Practical Guide to factory_boy | by Yogesh Kumar | Python in Plain English](https://python.plainenglish.io/test-smarter-in-django-a-practical-guide-to-factory-boy-4e49e600fe43)
    - [factory_boy - Factory Boy stable documentation](https://factoryboy.readthedocs.io/en/stable/index.html)
    - [Generating Fake Django Model Instances with Factory Boy - DjangoTricks](https://www.djangotricks.com/blog/2024/05/generating-fake-django-model-instances-with-factory-boy/)
    - [Django DRF Project | Model Factories with Factory Boy | 24 - YouTube](https://www.youtube.com/watch?v=ktuOUaOyMmo)
    - [APITestCase](https://django-rest-testing.readme.io/docs/api-test-case)
    - [Django: Testing APIs with Django REST Framework (DRF) | RUSTCODE](https://www.rustcodeweb.com/2025/07/testing-apis-with-django-rest-framework-drf.html)
    - [pytest-django Documentation - pytest-django documentation](https://pytest-django.readthedocs.io/en/latest/index.html)
  - UI
    - [How to Add Items - Sortly Help Center](https://help.sortly.com/hc/en-us/articles/360042658292-How-to-Add-Items)
    - [Free React Form Creator](https://paperform.co/tools/free-react-form-creator/)
    - [Introduction | React Bootstrap](https://react-bootstrap.github.io/docs/getting-started/introduction)
  - Forms
    - [Create Form UI using React-Bootstrap | LetsReact.org](https://letsreact.org/create-form-ui-using-react-bootstrap)
    - [React-Bootstrap Form Component: The Complete Guide - TheLinuxCode](https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/)
    - [Forms | React Bootstrap](https://react-bootstrap.github.io/docs/forms/overview/)
  - Cards
    - [Using Bootstrap with React: Practical Examples](https://www.telerik.com/blogs/using-bootstrap-react-practical-examples)
  - Tables
    - [Tables | React Bootstrap](https://react-bootstrap.github.io/docs/components/table)
    - [Column Filtering Guide - Material React Table V3 Docs](https://www.material-react-table.com/docs/guides/column-filtering)
    - [(20) React Data Table Made Easy: Add Search, Filtering, and Sorting in Minutes | LinkedIn](https://www.linkedin.com/pulse/react-data-table-made-easy-add-search-filtering-sorting-srikanth-r-kawsc/)
    - [React Bootstrap Table Filter - free examples, templates & tutorial](https://mdbootstrap.com/docs/react/extended/table-filter)
    - [GitHub - mdbootstrap/react-table-filter: Responsive Table Filter built with React Bootstrap 5. Search filter is the most common useful table control. Filter any table with ease using datatables features.](https://github.com/mdbootstrap/react-table-filter)