# PAYMENT MANAGEMENT

The Payment Management System is a web-based platform that enables users to manage financial transactions efficiently. It provides secure authentication with token-based login, user role management, and an intuitive interface for handling partners and payment requests.

The website can be accessed by this [link](https://payment-management-biv-cc4a949bb411.herokuapp.com/)
The repository can be accessed by this [link](https://github.com/BogdanovaIV/payment-management)
![The Home page](documentation/features/home.png)

## User Stories

### First Time Visitors
| **ID** | **User Story** | **Acceptance Criteria** |
|-|-|-|
| [4](https://github.com/BogdanovaIV/payment-management/issues/4) | As a user, I want to be able to log in, log out, and register an account securely so that I can access the app and my personal data with a safe and efficient authentication process using tokens, and if my account is not verified by the administrator, I can still see a welcome message with information that all features will be available after my account is checked. | - Registration: As a user, I can create a new account by providing a username, email, first name, last name, and password. After successful registration, I will be able to log in immediately with the credentials I used during registration. <br> - Login: As a registered user, I can log in using my username and password. Upon successful login, I will be granted access to the app and receive a token to store in my browser for session management. My login credentials will be securely sent to the server, and I will be redirected to the dashboard or homepage if successful. <br> - Welcome Message for Unverified Users: As a user, if my profile is not yet verified (i.e., checked is False), I will be redirected to the home page. On the home page, I will see a welcome message explaining that all features will be available after my profile is verified by the administrator. <br> - Logout: as a logged-in user, I can log out from the app. Once logged out, my token will be cleared, and I will be redirected to the login page. I will no longer be able to access protected parts of the app after logging out. <br> - Protected Routes: As a user, I can access certain pages only after logging in. If I try to access these pages without being logged in, I will be redirected to the login page. <br> - Session Management: As a user, my session will be maintained using a token stored in my browser (localStorage or sessionStorage). When I refresh the page, I will remain logged in as long as the token is valid. <br> - Error Handling: If I enter incorrect credentials during login, I will be notified with a helpful error message. If I attempt to access a protected route without being logged in, I will be redirected to the login page. |
| [5](https://github.com/BogdanovaIV/payment-management/issues/5) | As a user, I want to be able to select my preferred language so that I can navigate and use the website in a language I understand. | - Users can switch between available languages via a language selector. <br> - The selected language persists across pages and sessions. <br> - If a user is logged in, their preferred language is stored in the backend. <br> - If a user is not logged in, their language preference is saved in localStorage. <br> - All UI elements (buttons, menus, messages) are translated based on the selected language. |
| [14](https://github.com/BogdanovaIV/payment-management/issues/14) | As a user, I want to see clear instructions, so that I can understand how to use its features effectively. Users should have access to concise, easy-to-understand instructions. These instructions should be displayed within the page itself, guiding users on how to interact with different elements and complete tasks efficiently. | - The text should be simple, clear, and concise. <br> - If applicable, use bullet points, numbered steps, or short paragraphs for readability. |

### Returning or Regular Visitors
| **ID** | **User Story** | **Acceptance Criteria** |
|-|-|-|
| [6](https://github.com/BogdanovaIV/payment-management/issues/6) | As a user, I want to be able to change my profile data (interface language, first name, last name, email, and password) so that I can keep my personal information up-to-date and customize my user experience. | - The user should be able to edit their first name, last name, and email address in the input fields. <br> - The user should be able to change their password by entering a new one in a password input field. |
| [7](https://github.com/BogdanovaIV/payment-management/issues/7) | As a user, I can create a partner, view all partners in a table, and filter partners. Users should be able to manage partners efficiently. They can create new partners, view a list of all partners in a structured table, and filter partners based on relevant criteria. | - Create Partner A user can add a new partner by filling out a form with the following fields: <br> Trade Name (required), Full Name, BIN (Business Identification Number), Partner Type (Company or Individual), Legal Address, Actual Address, Phone Number, Contact Person, and Is Own Partner (Boolean field). <br> - The partner is saved in the system with automatic timestamps (created_at, updated_at). <br> - View Partners in a Table A user can see all partners in a tabular format. <br> - The table includes the following columns: Trade Name, BIN, Partner Type, Is Own Partner, Contact Person, Phone Number, and Created At. <br> - The table is sorted by trade_name by default. <br> - Filter Partners A user can filter partners using the following criteria: Trade Name (text search), BIN (text search), Partner Type (dropdown: Company, Individual), Is Own Partner (checkbox: Yes/No), and The table updates dynamically based on filter selection. |
| [8](https://github.com/BogdanovaIV/payment-management/issues/8) | As a user, I want to be able to create, view, update, and delete Payment Requests so that I can manage financial transactions efficiently. The system should allow users to perform CRUD (Create, Read, Update, Delete) operations on PaymentRequest records. The user must select a payer and recipient from partner's list. The payment request should include invoice details, amount, priority, deadline, and optional comments. | 1. Create a Payment Request: <br> - The user can open a form to create a new PaymentRequest. <br> - The user must select payer and recipient. <br> - The user must enter invoice details, amounts, priority, and deadline. <br> - The system should validate the form and display appropriate error messages if required fields are missing or incorrect. <br> - Upon successful creation, the request should be saved and appear in the list of payment requests. <br> 2. View Payment Requests: <br> - The user can see a list of all PaymentRequest records sorted by deadline. <br> - Each entry should display key details such as recipient, payment amount, and deadline. <br> - The user can click on a request to view its full details. <br> 3. Update a Payment Request: <br> - The user can edit an existing PaymentRequest. <br> - Only the creator of the request. <br> - The system should allow updates to payment details while enforcing validation rules. <br> 4. Delete a Payment Request: <br> - The user can delete a PaymentRequest if they have the necessary permissions. <br> - The system should prompt for confirmation before deletion. <br> - Once deleted, the request should be removed from the database. |
| [9](https://github.com/BogdanovaIV/payment-management/issues/9) | As a user, I want to see clear and consistent error messages so that I can understand and resolve issues easily. Users should receive error messages in a structured and visually consistent manner across the application. A reusable error-handling function should be implemented to capture errors and display appropriate notifications (e.g., Toast messages or UI alerts). | 1. Error Handling Functionality: <br> - The system should have a centralized function to handle errors from API requests, form submissions, and unexpected failures. <br> - The function should classify errors (e.g., network errors, authentication errors, server errors) and provide corresponding messages. <br> - The function should log errors for debugging purposes without exposing sensitive details to the user. <br> 2. Notification System (Toast Messages/UI Alerts): <br> - Error messages should be displayed as Toast notifications or UI alerts. <br> - Different error types should have distinct styles (e.g., red for critical errors, yellow for warnings). <br> - Messages should be auto-dismissed after a few seconds but allow manual dismissal. |
| [10](https://github.com/BogdanovaIV/payment-management/issues/10) | As a user, I want to delete "Partners" and "Payment Requests", so that I can manage my data efficiently. However, the system must prevent deletion if the item is referenced in other records. | - Successfully Delete a "Partner" or "Payment Request". <br> - Prevent Deleting a "Partner" Referenced in Other Records |
| [11](https://github.com/BogdanovaIV/payment-management/issues/11) | As a user of the system I want to be notified when another user is already editing a "Partner" or "Payment Request" so that I do not make conflicting changes and avoid data inconsistencies. | 1. Locking an Item: <br> - When User A clicks "Edit" on a Partner or Payment Request, the system locks the item. <br> - Other users trying to edit the same item see a message: "This item is being edited by another user." <br> 2. The lock is released when: <br> - User A saves the changes. <br> - User A cancels the edit. <br> - User A is inactive for 20 minutes. <br> - Unlocking the Item: <br> - If a user closes the page or loses connection, the lock is released after 20 minutes of inactivity. <br> - Admins can force unlock if necessary. <br> 3. Lock Expiry: <br> - If a user locks an item but does not save/cancel within 5 minutes, the lock is automatically removed to prevent permanent blocking. |
| [12](https://github.com/BogdanovaIV/payment-management/issues/12) | As a user, I want to set and update the status of a payment request so that I can track its progress efficiently. Users need to manage the lifecycle of payment requests by assigning statuses such as Draft, Pending Approval, Approved, and Paid. | - When creating a payment request, the status is automatically set to Draft. <br> - The system prevents unauthorized status changes (e.g., skipping approval). <br> - Users can filter payment requests by status. |
| [13](https://github.com/BogdanovaIV/payment-management/issues/13) | As a user, I want to be redirected to the home page if I try to access a page I am not authorized to view, so that I can return to the main page where I can continue using the site. | - The user goes to pages: Partners, Add/Edit/View/Delete Partners, Payment Requests, Add/Edit/View/Delete Payment Request and User Profile. The system checks whether the user is logged in (authenticated). If the user is not logged in, they should be redirected to the home page. |

### Developers
| **ID** | **User Story** | **Acceptance Criteria** |
|-|-|-|
| [1](https://github.com/BogdanovaIV/payment-management/issues/1) | As a developer, I want to create a Django project and store sensitive settings (SECRET_KEY, DEBUG, ALLOWED_HOSTS) in environment variables so that I can secure sensitive information and keep my settings configurable. | - Create the Django project. <br> - Move SECRET_KEY, DEBUG, and ALLOWED_HOSTS to environment variables. <br> - Update settings.py to read these values. <br> - Create a .env file for storing these variables and add it to .gitignore.|
| [2](https://github.com/BogdanovaIV/payment-management/issues/2) | As a developer I want to create a User app with a UserProfile model linked to the Django User model, REST Framework serializers, and Profile details API endpoints so that users can view and update their profiles securely using API endpoints with authentication and proper validation. | - Create the User App: <br> - Add a UserProfile model linked to the User model using a OneToOneField. Include a checked BooleanField to track user verification (default: False). <br> - Automatically create a UserProfile instance for every new User via Django signals (post_save). <br> - Create a UserProfileSerializer to serialize UserProfile data. Include serializer method fields (e.g., full name) as needed. <br> - Add Profile API Views: GET: Fetch user profile details (e.g., username, email, checked status). PUT: Allow authenticated users to update their profile information. <br> - Secure the profile API endpoints to allow access only to authenticated users. <br> - Ensure users can only view or edit their own profiles. |
| [3](https://github.com/BogdanovaIV/payment-management/issues/3) | As a developer I want to deploy my Django application to Heroku so that I can make my application accessible on the web. | - Set Up Heroku Account. <br> - Prepare the Django App for Deployment. <br> - Create a Procfile. <br> - Configure Environment Variables on Heroku. |

## Features

### Existing Features

The system provides users with access to view partners and payment requests. However, if a user's profile has not been verified (i.e., if the ```checked``` field is set to ```False```), all system features remain inaccessible until verification is completed.

Additionally, throughout the entire process of adding, editing, and deleting records, the system ensures transparency by notifying users about the execution status of their actions. These notifications help users stay informed about the success or failure of their requests, ensuring a smooth and clear user experience.

It also supports **language translation** in **English, Kazakh, and Russian** through a built-in language selector.

__Navigation Bar__
 
 The navigation bar is a core component available on all pages, ensuring seamless access to essential features and functionalities. 

 1. **Contents & Functionalities:**
    - **Logo Image** – A clickable logo that redirects users to the Home page.
    - **Home Link** – A direct link to the Home page.
    - **Language Selector** – A flag icon that opens a drop-down menu, allowing users to choose the current language.

    ![Navigation Bar (Language Selector)](documentation/features/nav-language-selector.png)

    - **Authentication Links** (Visible only to non-authorized users):
        - **Sign In** – Redirects to the Sign In page.
        - **Sign Up** – Redirects to the Sign Up page.
    
     ![Navigation Bar (non-authorized users)](documentation/features/nav-non-authorized-users.png)

     ![Navigation Bar (non-authorized users (Kazakh))](documentation/features/nav-non-authorized-users-kk.png)

     ![Navigation Bar (non-authorized users (Russian))](documentation/features/nav-non-authorized-users-ru.png)     
    
    - **Dictionaries** Drop-Down Menu (Visible only to authorized users):
       - **Partners** – Redirects to the Partner list page.
    - **Transactions** Drop-Down Menu (Visible only to authorized users):
       - **Payment Requests** – Redirects to the Payment Requests list page.
    - **User-Specific Links** (Visible only to authorized users):
       - **User Name (current user's name)** – Redirects to the User Profile page.
       - **Sign Out** -  – Redirects to the Sign Out page.

    ![Navigation Bar (authorized users)](documentation/features/nav-authorized-users.png)

    ![Navigation Bar (authorized users (Kazakh))](documentation/features/nav-authorized-users-kk.png)

    ![Navigation Bar (authorized users (Russian))](documentation/features/nav-authorized-users-ru.png)
 
 2. **User Experience & Design Enhancements:**
    - All buttons feature a **hover effect** for better interactivity.

    ![Navigation Bar (a hover affect)](documentation/features/nav-hover.png)

    - The currently active page is visually highlighted by a color change in the corresponding button.
    - A **toggle menu** is available for better usability on small-screen devices.

    ![Navigation Bar (small-screen devices)](documentation/features/nav-toggle.png)

    - The navigation structure ensures users can easily access key sections without relying on the browser’s "Back" button.
  
  __Home__
The Home Page serves as the main entry point for users, welcoming them to the platform and providing essential navigation options. It includes authentication prompts, key features, benefits, and social media links.

![Home (authorized users)](documentation/features/home-authorized-users.png)

![Home (authorized users (Kazakh))](documentation/features/home-authorized-users-kk.png)

![Home (authorized users (Russian))](documentation/features/home-authorized-users-ru.png)  

1. **User Authentication Messages:**
    - Non-authenticated users are prompted to create an account (**Sign Up**) or sign in (**Sign In**).

    ![Home (non-authorized users)](documentation/features/home-non-authorized-users.png)

    ![Home (non-authorized users (Kazakh))](documentation/features/home-non-authorized-users-kk.png)

    ![Home (non-authorized users (Russian))](documentation/features/home-non-authorized-users-ru.png)

    - The **Sign In** and **Sign Up** links feature a **hover effect**, changing color and slightly enlarging for better interactivity.

    ![Home (the hover effect of the sign in/sign up)](documentation/features/home-sign-hover.png)

    - Authorized users with unverified profiles receive a notification regarding their verification status.

    ![Home (authorized users)](documentation/features/home-non-verificated-user.png)

    ![Home (authorized users (Kazakh))](documentation/features/home-non-verificated-user-kk.png)

    ![Home (authorized users (Russian))](documentation/features/home-non-verificated-user-ru.png)

2. **Feature Highlights:**
    - Links to **Instagram** and **Facebook** allow users to stay connected.
    - Each link features a **hover effect**, changing color and slightly enlarging the icon for improved interactivity and engagement.

    ![Home (the hover effect of the social links)](documentation/features/home-social-links-hover.png)

 __Sign In__
 The Sign In page allows registered users to access their accounts securely. It includes fields for entering login credentials, authentication feedback, and password recovery options.

 ![Sign In](documentation/features/sign-in.png)

 ![Sign In (Kazagh)](documentation/features/sign-in-kk.png)

 ![Sign In (Russian)](documentation/features/sign-in-ru.png)

 1. **User Authentication:**
    - Users enter their **Username** and **Password** to sign in.
    - The **Sign In** button features a hover effect, changing color and slightly enlarging for better interactivity.

    ![Sign In (a hover effect of the button)](documentation/features/sign-in-button-hover.png)

 2. **Error Handling & Feedback:**
    - If incorrect credentials are entered, an error message is displayed, guiding users to correct their input.

     ![Sign In (error blank)](documentation/features/sign-in-error-blank.png)

     ![Sign In (error blank) (Kazakh)](documentation/features/sign-in-error-blank-kk.png)

     ![Sign In (error blank) (Russian)](documentation/features/sign-in-error-blank-ru.png)

     ![Sign In (error credentials)](documentation/features/sign-in-error-credentials.png)

     ![Sign In (error credentials) (Kazakh)](documentation/features/sign-in-error-credentials-kk.png)

     ![Sign In (error credentials) (Russian)](documentation/features/sign-in-error-credentials-ru.png)

 3. **New User Registration:**
    - Users who do not have an account can navigate to the **Sign Up** page.
    - The **Sign Up**S link includes a hover effect, enhancing visibility and engagement.

    ![Sign In (a hover effect of the link)](documentation/features/sign-in-link-hover.png)

__Sign Up__

The sign-up form allows new users to create an account securely. All fields in the form are required, and the inputs must meet validation criteria.

![Sign Up](documentation/features/sign-up.png)

![Sign Up (Kazagh)](documentation/features/sign-up-kk.png)

![Sign Up (Russian)](documentation/features/sign-up-ru.png)

1. **Existing Users:**
    - Users who do have an account can navigate to the **Sign In** page.
    - The **Sign In**S link includes a hover effect, enhancing visibility and engagement.

    ![Sign Up (a hover effect of the link)](documentation/features/sign-up-link-hover.png)

2. **User Registration:**
    - New users must enter the following details to create an account:
      - **Username**
      - **First Name**
      - **Last Name**
      - **Email**
      - **Password**
      - **Confirm Password**
    - The **Sign In** button features a hover effect, changing color and slightly enlarging for better interactivity.

    ![Sign Up (a hover effect of the button)](documentation/features/sign-up-button-hover.png)

 3. **Error Handling & Feedback:**
    - If any field is left blank or contains an incorrect format, an error message is displayed, guiding users to correct their input.

    ![Sign In (error)](documentation/features/sign-up-error.png)

    ![Sign In (error) (Kazakh)](documentation/features/sign-up-error-kk.png)

    ![Sign In (error) (Russian)](documentation/features/sign-up-error-ru.png)
 
 4. **Instruction**
    - The system provides clear instructions, explaining how to complete the form correctly, ensuring a smooth registration process.

   ![Sign In (instruction)](documentation/features/sign-up-instruction.png)

   ![Sign In (instruction) (Kazakh)](documentation/features/sign-up-instruction-kk.png)

   ![Sign In (instruction) (Russian)](documentation/features/sign-up-instruction-ru.png)

    - The **Instruction** button features a hover effect, changing color and slightly enlarging for better visibility and usability.

   ![Sign Up (a hover effect of the instruction button)](documentation/features/sign-up-instruction-button-hover.png)

__User's Profile__

The profile page presents the user's details in a read-only format, ensuring that no fields can be edited directly. It provides three key action buttons:

![User's Profile](documentation/features/user-profile.png)

![User's Profile (Kazagh)](documentation/features/user-profile-kk.png)

![User's Profile (Russian)](documentation/features/user-profile-ru.png)

   - **Edit Profile** – Allows users to navigate to a separate page where they can update their profile information.
   - **Change Password** – Redirects users to the password update page for enhanced account security.
   - **Instructions** – Displays guidance on how to manage account settings.

   ![User's Profile (instruction)](documentation/features/user-profile-instruction.png)

   ![User's Profile (instruction) (Kazakh)](documentation/features/user-profile-instruction-kk.png)

   ![User's Profile (instruction) (Russian)](documentation/features/user-profile-instruction-ru.png)

   - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

   ![User's Profile (a hover effect of the link)](documentation/features/user-profile-link-hover.png)

__Edit User's Profile__

The edit profile page allows users to update their personal details in a structured and user-friendly manner. All input fields support validation to ensure data accuracy.

![Edit User's Profile](documentation/features/edit-user-profile.png)

![Edit User's Profile (Kazagh)](documentation/features/edit-user-profile-kk.png)

![Edit User's Profile (Russian)](documentation/features/edit-user-profile-ru.png)

1. **Editing User Profile**
    - Users can modify the following details::
      - **First Name**
      - **Last Name**
      - **Email**

    - The page includes two key action buttons:
      - **Save** – Saves the changes and updates the profile.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

      ![Edit User's Profile (a hover effect of the button)](documentation/features/edit-user-profile-hover-button.png)

2. **Error Handling & Feedback:**
    - If a required field is left blank or contains an incorrect format, an error message is displayed, guiding the user to correct the input.

    ![Edit User's Profile (error)](documentation/features/edit-user-profile-error.png)

    ![Edit User's Profile (error) (Kazakh)](documentation/features/edit-user-profile-error-kk.png)

    ![Edit User's Profile (error) (Russian)](documentation/features/edit-user-profile-error-ru.png)

3. **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

    ![Edit User's Profile (instruction)](documentation/features/edit-user-profile-instruction.png)

    ![Edit User's Profile (instruction) (Kazakh)](documentation/features/edit-user-profile-instruction-kk.png)

    ![Edit User's Profile (instruction) (Russian)](documentation/features/edit-user-profile-instruction-ru.png)

__Change Password__

The Change Password page allows users to securely update their account passwords through a structured and user-friendly interface.

![Change Password](documentation/features/change-password.png)

![Change Password (Kazagh)](documentation/features/change-password-kk.png)

![Change Password (Russian)](documentation/features/change-password-ru.png)

1. Password Update Process
   - Users are required to enter the following details:
      - **Old Password** – The current password for authentication.
      - **New Password** – A new password that meets security requirements.
      - **Confirm New Password** – Must match the new password to ensure accuracy.
   - Action Buttons:
      - **Save** – Saves the changes and updates the profile.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.
- **Error Handling & Feedback:**
    - If a required field is left blank or contains an incorrect format, an error message is displayed, guiding the user to correct the input.
    - If the old password is incorrect, an error message prevents the update.
    - If the new password does not meet security criteria (e.g., minimum length, special characters), an error message appears.
    - If the new password and confirmation password do not match, an error message is displayed.

- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.
      
    ![Change Password (instruction)](documentation/features/change-password-instruction.png)

    ![Change Password (instruction) (Kazakh)](documentation/features/change-password-instruction-kk.png)

    ![Change Password (instruction) (Russian)](documentation/features/change-password-instruction-ru.png)

__Partners List__

The **Partner List** enables users to efficiently view, filter, and manage Partners. The interface adapts to different screen sizes and includes advanced filtering, selection, and infinite scrolling functionalities.

![Partners](documentation/features/partners.png)

![Partners (Kazagh)](documentation/features/partners-kk.png)

![Partners (Russian)](documentation/features/partners-ru.png)

1. **Responsive Display:**
   - Displays Partners in a table format on larger screens.
   - Shows individual cards on smaller screens for improved accessibility.

   ![Partners (small size)](documentation/features/partners-small-size.png)

2. **Action Buttons:**
   - **Add** - Redirects users to a new page to enter Partner details.
   - **Show Filters** - Displays filter options to refine the list
      - Users can input values to narrow down results.
      - Automatic validation prevents incorrect date ranges (e.g., start date cannot be after end date).
      - Clicking the trash can icon clears an individual filter field.
      - When filters are displayed, the button text changes to **Hide Filters**.

      ![Partners (filters)](documentation/features/partners-filters.png)

   - **Clear Filters** - Resets all filters.
   - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

   ![Partners (a hover effect of the button)](documentation/features/partners-button-hover.png)

3. **Managing Partner Details**
   - To edit Partner details, users can click anywhere on a row (for larger screens) or any part of a card (for smaller screens) to access the details page.

4. **Infinite Scrolling:**
   - The list automatically loads more data as the user scrolls.
   - If additional pages exist, new Partners appear without requiring a manual refresh. 
5. **Handling No Results:**
   - If no matching Partners are found, a ‘No results found’ message is displayed.
7. **Loading Indicator:**
   - A spinner animation appears while data is loading.
   - Once loaded, the Partner details are displayed instantly.

   ![Partners (spinner)](documentation/features/partners-spinner.png)

8. **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.
    ![Partners (instruction)](documentation/features/partners-instruction.png)

    ![Partners (instruction) (Kazakh)](documentation/features/partners-instruction-kk.png)

    ![Partners (instruction) (Russian)](documentation/features/partners-instruction-ru.png)

__Add Partner__

The **Add Partner Page** allows users to create a Partner record by entering relevant details and ensuring all required fields meet validation criteria. 

![Add Partner](documentation/features/add-partner.png)

![Add Partner (Kazagh)](documentation/features/add-partner-kk.png)

![Add Partner (Russian)](documentation/features/add-partner-ru.png)

1. **Adding a Partner**
   - Users must provide the following details:
      - **Trade Name**:
         - Required field.
         - Maximum 255 characters.
      - **Full Name**: 
         - Maximum 255 characters.
      - **Business Identification Number (BIN)**:
         - Required field.
         - Maximum 20 characters.
      - **Partner Type**:
         - The dropdown list.
      - **Legal Address**:
         - Supports multiline input.
      - **Actual Address**:
         - Supports multiline input.
      - **Phone Number**:
         - Must be in international format (e.g., +1234567890).
         - Maximum 255 characters.
      - **Own Partner**:
         - Indicates whether the Partner is owned by the organization.
         - Users can check or uncheck this option as needed.
   - Action Buttons:
      - **Save** – Saves the Partner details.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.
- **Error Handling & Feedback:**
    - If a required field is left blank or contains an incorrect format, an error message is displayed, guiding the user to correct the input.
   ![Add Partner (error)](documentation/features/add-partner-error.png)

   ![Add Partner (error) (Kazakh)](documentation/features/add-partner-error-kk.png)

   ![Add Partner (error) (Russian)](documentation/features/add-partner-error-ru.png)

- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

    ![Add Partner (instruction)](documentation/features/add-partner-instruction.png)

    ![Add Partner (instruction) (Kazakh)](documentation/features/add-partner-instruction-kk.png)

    ![Add Partner (instruction) (Russian)](documentation/features/add-partner-instruction-ru.png)

__View Partner Details__

The **Partner View** allows users to view Partner details in a read-only format. From this page, users can navigate to the **Edit** or **Delete** page.

![View Partner Details](documentation/features/view-partner.png)

![View Partner Details (Kazagh)](documentation/features/view-partner-kk.png)

![View Partner Details (Russian)](documentation/features/view-partner-ru.png)

1. **Read-Only Fields**
   - All Partner details are displayed in a structured format.
   - Fields cannot be edited from this page.

1. **Action Buttons**:
      - **Edit** –  Redirects to the **Edit Partner** page, allowing modifications.
      - **Delete** –  Redirects to the **Delete Partner** page for removal confirmation.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

    ![View Partner Details (instruction)](documentation/features/view-partner-instruction.png)

    ![View Partner Details (instruction) (Kazakh)](documentation/features/view-partner-instruction-kk.png)

    ![View Partner Details (instruction) (Russian)](documentation/features/view-partner-instruction-ru.png)

__Edit Partner__

The **Edit Partner Page** allows users to edit a Partner record by entering relevant details and ensuring all required fields meet validation criteria. 

![Edit Partner](documentation/features/edit-partner.png)

![Edit Partner (Kazakh)](documentation/features/edit-partner-kk.png)

![Edit Partner (Russian)](documentation/features/edit-partner-ru.png)

1. **Edditing a Partner**
   - Users must provide the following details:
      - **ID**:
         - Read-only field.
      - **Created At**:
         - Read-only field.
      - **Updated At**:
         - Read-only field.
      - **Trade Name**:
         - Required field.
         - Maximum 255 characters.
      - **Full Name**: 
         - Maximum 255 characters.
      - **Business Identification Number (BIN)**:
         - Required field.
         - Maximum 20 characters.
      - **Partner Type**:
         - The dropdown list.
      - **Legal Address**:
         - Supports multiline input.
      - **Actual Address**:
         - Supports multiline input.
      - **Phone Number**:
         - Must be in international format (e.g., +1234567890).
         - Maximum 255 characters.
      - **Own Partner**:
         - Indicates whether the Partner is owned by the organization.
         - Users can check or uncheck this option as needed.
   - Action Buttons:
      - **Save** – Saves the Partner details.
      - **Cancel** – Navigates back to the Partner's List page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.
- **Error Handling & Feedback:**
    - If a required field is left blank or contains an incorrect format, an error message is displayed, guiding the user to correct the input.
- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

__Delete Partner__

The **Delete Partner Page** allows users to remove a Partner record from the system permanently.

![Delete Partner](documentation/features/delete-partner.png)

![Delete Partner (Kazakh)](documentation/features/delete-partner-kk.png)

![Delete Partner (Russian)](documentation/features/delete-partner-ru.png)

- **Deleting a Partner**
   - Users have to confirm the deletion in the prompt to proceed.
   - This action is irreversible—once deleted, the Partner cannot be restored.
   - Before deletion, the system checks if the Partner is referenced in other records.
   - If deletion is not possible, an error message will appear: 'Cannot delete this item because it is referenced in another record.'
- **Action Buttons**:
   - **Delete** – Remove the Partner.
   - **Cancel** – Navigates back to the previous page without saving any changes.
   - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

__Payment Request's List__

The **Payment Request's List** enables users to efficiently view, filter, and manage Payment Requests. The interface adapts to different screen sizes and includes advanced filtering, selection, and infinite scrolling functionalities.

![Payment Request's List](documentation/features/payment-request.png)

![Payment Request's List (Kazagh)](documentation/features/payment-request-kk.png)

![Payment Request's List (Russian)](documentation/features/payment-request-filters-ru.png)

1. **Responsive Display:**
   - Displays Payment Requests in a table format on larger screens.
   - Shows individual cards on smaller screens for improved accessibility.

   ![Payment Request's List (small size)](documentation/features/payment-request-small-size.png)

2. **Action Buttons:**
   - **Add** - Redirects users to a new page to enter Payment Requests details.
   - **Show Filters** - Displays filter options to refine the list
      - Users can input values to narrow down results.
      - Automatic validation prevents incorrect date ranges (e.g., start date cannot be after end date).
      - Clicking the trash can icon clears an individual filter field.
      - When filters are displayed, the button text changes to **Hide Filters**.
      - When the form opens, the User filter is automatically set to the current user.

   - **Clear Filters** - Resets all filters.
   - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

3. **Foreign Key Selection**
   - Some filters require selecting values from another list (e.g., categories, references).
   - The system opens a selection modal for easy assignment.
   ![Selection form](documentation/features/selection-form.png)

3. **Managing Payment Requests Details**
   - To edit Payment Requests details, users can click anywhere on a row (for larger screens) or any part of a card (for smaller screens) to access the details page.

4. **Infinite Scrolling:**
   - The list automatically loads more data as the user scrolls.
   - If additional pages exist, new Partners appear without requiring a manual refresh. 
5. **Handling No Results:**
   - If no matching Payment Requests are found, a ‘No results found’ message is displayed.
7. **Loading Indicator:**
   - A spinner animation appears while data is loading.
   - Once loaded, the Partner details are displayed instantly.
8. **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

__Add Payment Request__

The **Add Payment Request Page** allows users to create a Payment Request record by entering relevant details and ensuring all required fields meet validation criteria. 

![Payment Request](documentation/features/add-payment-request.png)

![Payment Request (Kazagh)](documentation/features/add-payment-request-kk.png)

![Payment Request (Russian)](documentation/features/add-payment-request-ru.png)

1. **Adding a Payment Request**
   - Users must provide the following details:
      - **Payer**:
         - Required field.
         - Selected the payer from the available options.
      - **Recipient**: 
         - Required field.
         - Selected the recipient from the available options.
      - **Invoice Number**:
         - Required field.
         - Maximum 50 characters.
      - **Invoice Date**:
         - Required field.
      - **Invoice Amount:**:
         - The value must be greater than or equal to 0.
      - **Payment Priority**:
         - The value must be between 1 and 10.
      - **Payment Amount**:
         - The value must be greater than or equal to 0..
      - **Deadline**:
         - Optional field.
      - **Comment**:
         - Required field.
      - **User**:
         - Non-visiable.
         - Set automatically to the current user.
   - Action Buttons:
      - **Save** – Saves the Payment Request details.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.
**Foreign Key Selection**
   - Some fields require selecting values from another list (e.g., categories, references).
   - The system opens a selection modal for easy assignment.
- **Error Handling & Feedback:**
    - If a required field is left blank or contains an incorrect format, an error message is displayed, guiding the user to correct the input.
- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

__View Payment Request Details__

The **Payment Request View** allows users to view Payment Request details in a read-only format. From this page, users can navigate to the **Edit** or **Delete** page.

![Payment Request Details](documentation/features/view-payment-request.png)

![Payment Request Details (Kazagh)](documentation/features/view-payment-request-kk.png)

![Payment Request Details (Russian)](documentation/features/view-payment-request-ru.png)

1. **Read-Only Fields**
   - All Partner details are displayed in a structured format.
   - Fields cannot be edited from this page.

1. **Action Buttons**:
      - **Edit** –  Redirects to the **Edit Payment Request** page, allowing modifications.
      - **Delete** –  Redirects to the **Delete Payment Request** page for removal confirmation.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

__Edit Payment Request__

The **Edit Payment Request Page** allows users to edit a Payment Request record by entering relevant details and ensuring all required fields meet validation criteria. 

![Edit Payment Request](documentation/features/ed)

![Edit Payment Request (Kazagh)](documentation/features/add-payment-request-kk.png)

![Edit Payment Request (Russian)](documentation/features/add-payment-request-ru.png)

1. **Adding a Payment Request**
   - Users must provide the following details:
      - **ID**:
         - Read-only field.
      - **Created At**:
         - Read-only field.
      - **Updated At**:
         - Read-only field.
      - **User**:
         - Read-only field.
      - **Payer**:
         - Required field.
         - Selected the payer from the available options.
      - **Recipient**: 
         - Required field.
         - Selected the recipient from the available options.
      - **Invoice Number**:
         - Required field.
         - Maximum 50 characters.
      - **Invoice Date**:
         - Required field.
      - **Invoice Amount:**:
         - The value must be greater than or equal to 0.
      - **Payment Priority**:
         - The value must be between 1 and 10.
      - **Payment Amount**:
         - The value must be greater than or equal to 0..
      - **Deadline**:
         - Optional field.
      - **Comment**:
         - Optional field.
      - **User**:
         - Non-visiable.
         - Set automatically to the current user.
   - Action Buttons:
      - **Save** – Saves the Payment Request details.
      - **Cancel** – Navigates back to the previous page without saving any changes.
      - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.
**Foreign Key Selection**
   - Some fields require selecting values from another list (e.g., categories, references).
   - The system opens a selection modal for easy assignment.
- **Error Handling & Feedback:**
    - If a required field is left blank or contains an incorrect format, an error message is displayed, guiding the user to correct the input.
- **Instruction**
    - A dedicated Instructions section provides clear guidelines on how to update profile details correctly.
    - The Instruction button features a hover effect, improving visibility and user interaction.

__Delete Payment Request__

The **Delete Payment Request Page** allows users to remove a Payment Request record from the system permanently.

![Delete Payment Request](documentation/features/delete-payment-request.png)

![Delete Payment Request (Kazakh)](documentation/features/delete-payment-request-kk.png)

![Delete Payment Request (Russian)](documentation/features/delete-payment-request-ru.png)

- **Deleting a Payment Request**
   - Users have to confirm the deletion in the prompt to proceed.
   - This action is irreversible—once deleted, the Payment Request cannot be restored.
- **Action Buttons**:
   - **Delete** – Remove the Payment Request.
   - **Cancel** – Navigates back to the previous page without saving any changes.
   - All buttons feature a hover effect, changing color and slightly enlarging to improve visibility and user interaction.

__Pessimistic Locking__
To prevent conflicts in multi-user environments, the system uses **pessimistic locking** when a user edits an item.

- When a user clicks **Edit**, the system **locks the item for 20 minutes**, preventing other users from making modifications.
- if no action is taken, the lock **automatically expires after 20 minutes**.
- While the item is locked, other users cannot edit or modify it.
- The lock is **released immediately** when the user:
   - **Saves** the changes.
   - **Cancels** the edit.
   - **Leaves** the page.
- The system displays a clear message to inform users when an item is locked and when it becomes available for editing again.

   ![Locking](documentation/features/locking.png)

- **System Version Check:** If one user locks an item and the lock expires, another user edits it, and the first user then attempts to save changes, the system detects the version conflict and displays the message:
**"The record has been updated by another user. Please refresh the page and try again."**

   ![Locking](documentation/features/locking-expired.png)