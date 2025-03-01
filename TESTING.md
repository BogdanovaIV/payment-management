## TESTING

### Purpose Of Testing

The purpose of testing is to make sure the application does not have critical errors and works properly, providing a positive experience for the user.

## Functional Testing

Functional testing ensures that all features and functionalities of the application work as expected, regardless of the device or screen size.

| **Feature** | **Action** | **Expected Result** | **Tested** | **Passed** | **Comments** |
|------------|-----------|--------------------|-----|-----|-------------|
|**Navigation bar**| | | | | |
| **Navigation bar visibility** | Open different pages of the system | The navigation bar should be visible on all pages | ✅  | ✅  |  |
| **Logo Image** | Click on the logo | The system should redirect to the Home page | ✅  | ✅ |  |
| **Home Link** | Click on the "Home" link | The system should redirect to the Home page | ✅  | ✅  |  |
| **Language Selector** | Click on the flag icon | A drop-down menu with language options should appear | ✅ | ✅ |  |
| **Sign In Link** (visible only to non-authenticated users) | Click on "Sign In" | The system should redirect to the Sign In page | ✅ | ✅ |  |
| **Sign Up Link** (visible only to non-authenticated users) | Click on "Sign Up" | The system should redirect to the Sign Up page | ✅ | ✅ |  |
| **Dictionaries Menu** (visible only to authorized users) | Log in and check if the menu appears | The "Dictionaries" menu should be visible | ✅ | ✅ |  |
| **Partners Link** | Click on "Partners" under Dictionaries menu | The system should redirect to the Partner list page | ✅ | ✅ |  |
| **Transactions Menu** (visible only to authorized users) | Log in and check if the menu appears | The "Transactions" menu should be visible | ✅ | ✅ |  |
| **Payment Requests Link** | Click on "Payment Requests" under Transactions menu | The system should redirect to the Payment Requests list page | ✅ | ✅ |  |
| **User Name Link** (visible only to authorized users) | Click on the displayed user name | The system should redirect to the User Profile page | ✅ | ✅ |  |
| **Sign Out Link** (visible only to authorized users) | Click on "Sign Out" | The user should be logged out and redirected to the Sign Out page | ✅ | ✅ |  |
| **Hover Effect on Buttons** | Hover over various buttons | Buttons should change appearance (color, underline, etc.) | ✅ | ✅ |  |
| **Active Page Highlighting** | Navigate to different pages | The active page should be highlighted with a different color | ✅ | ✅ |  |
| **Toggle Menu (Mobile View)** | Resize the browser to a mobile screen width and click the toggle button | The menu should expand and allow navigation | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | All interface elements, buttons, messages, and labels should be correctly translated | ✅ | ✅ |  |  
|**Home Page**| | | | | |
| **Sign In/Sign Up Prompt** | Visit the home page as a non-authenticated user  | "Sign In" and "Sign Up" links are visible | ✅ | ✅|  |
| **Sign In/Sign Up Hover Effect** | Hover over the "Sign In" or "Sign Up" links | Links change color and slightly enlarge | ✅ | ✅ |  |
| **Unverified Profile Message** | Log in as an authorized user with an unverified profile | A verification message is displayed | ✅ | ✅ |  |
| **Instagram & Facebook Links** | Check for Instagram and Facebook links | Links to both social media platforms are present | ✅ | ✅ |  |
| **Social Media Hover Effect** | Hover over the Instagram or Facebook links | Links change color and slightly enlarge | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | All interface elements, buttons, messages, and labels should be correctly translated | ✅ | ✅ |  | 
|**Sign In Page**| | | | | |  
| **Page Load** | Navigate to the Sign In page | The page should load correctly with all fields and buttons visible | ✅ | ✅ | |  
| **User Authentication** | Enter correct username and password, then click "Sign In" | The user should be successfully logged in and redirected to the home page | ✅ | ✅ | |  
| **Invalid Credentials** | Enter incorrect username or password and click "Sign In" | An error message should appear: "Unable to log in with provided credentials." | ✅ | ✅ | |  
| **Blank Fields** | Try signing in without entering credentials | An error message should appear: "This field is required" | ✅ | ✅ | |  
| **Hover Effect on Sign In Button** | Hover over the "Sign In" button | The button should change color and slightly enlarge | ✅ | ✅ | |  
| **New User Registration Link** | Click on "Sign Up" | The system should redirect to the Sign Up page | ✅ | ✅ | |  
| **Hover Effect on Sign Up Link** | Hover over the "Sign Up" link | The link should change color and slightly enlarge | ✅ | ✅ | |  
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |  
| **Error Messages in Different Languages** | Switch to Kazakh and Russian and trigger error messages | Error messages should be correctly translated | ✅ | ✅ |  |
| **Sign Up Page** | | | | | |
| **Navigation to Sign In** | Click on the **Sign In** link on the Sign-Up page | The system redirects to the Sign-In page | ✅ | ✅ |  |
| **Sign In Link Hover Effect** | Hover over the **Sign In** link | The link changes color and slightly enlarges | ✅ | ✅ |  |
| **Sign Up Form Fields** | Enter **Username, First Name, Last Name, Email, Password, Confirm Password** | All fields accept input correctly | ✅ | ✅ |  |
| **Sign Up Button Hover Effect** | Hover over the **Sign Up** button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Form Submission - Valid Input** | Fill in the form with valid data and submit | The system creates an account and redirects to the next step | ✅ | ✅ |  |
| **Form Submission - Missing Fields** | Submit the form with one or more empty fields | An error message appears. | ✅ | ✅ |  |
| **Form Submission - Invalid Email** | Enter an incorrectly formatted email (e.g., `user@com`) | An error message appears, instructing the user to enter a valid email | ✅ | ✅ |  |
| **Form Submission - Password Mismatch** | Enter different values for **Password** and **Confirm Password** | An error message appears, indicating password mismatch | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Sign-Up page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |  
| **Error Messages in Different Languages** | Switch to Kazakh and Russian and trigger error messages | Error messages should be correctly translated | ✅ | ✅ |  |
| **User's Profile Page** | | | | | |
| **Profile Page Read-Only** | Open the profile page | User details are displayed but cannot be edited | ✅ | ✅ |  |
| **Edit Profile Button** | Click on the **Edit Profile** button | User is redirected to the profile edit page | ✅ | ✅ |  |
| **Edit Profile Button Hover Effect** | Hover over the **Edit Profile** button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Change Password Button** | Click on the **Change Password** button | User is redirected to the password change page | ✅ | ✅ |  |
| **Change Password Button Hover Effect** | Hover over the **Change Password** button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the User's Profile page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |  
| **Edit User's Profile Page** | | | | | |
| **Edit Profile Page Load** | Navigate to the edit profile page | The page displays user details in editable fields | ✅ | ✅ |  |
| **Modify First Name, Last Name, Email** | Enter a new first name/last name/email and click "Save"                | Profile is updated, and success message is shown | ✅ | ✅ |  |
| **Invalid Email Format** | Enter an incorrectly formatted email and click "Save"  | Error message appears, preventing submission | ✅ | ✅ |  |
| **Empty Required Field** | Leave any required field blank and click "Save" | Error message appears, preventing submission | ✅ | ✅ |  |
| **Cancel Profile Edit** | Click the "Cancel" button | Navigates back to the previous page without saving changes | ✅ | ✅ |  |
| **Save Button Hover Effect** | Hover over the "Save" button | Button changes color and slightly enlarges | ✅ | ✅ |  |
| **Cancel Button Hover Effect** | Hover over the "Cancel" button | Button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Edit User's Profile page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |  
| **Error Messages in Different Languages** | Switch to Kazakh and Russian and trigger error messages | Error messages should be correctly translated | ✅ | ✅ |  |
| **Partner's List Page** | | | | | |
| **Responsive Display** | Resize the browser window to different screen sizes | Table format appears on large screens, card format on small screens | ✅ | ✅ |  |
| **Add Button** | Click the "Add" button | User is redirected to a new page to enter Partner details | ✅ | ✅ |  |
| **Show Filters Button** | Click "Show Filters" | Filter options appear, and the button text changes to "Hide Filters" | ✅ | ✅ |  |
| **Hide Filters Button** | Click "Hide Filters" | Filter options are hidden, and the button text changes back to "Show Filters" | ✅ | ✅ |  |
| **Clear Individual Filter** | Click the trash can icon next to a filter field | The corresponding field is cleared | ✅ | ✅ |  |
| **Clear Filters Button** | Click "Clear Filters" | All filter fields are reset | ✅ | ✅ |  |
| **Edit Partner Details** | Click anywhere on a row (large screen) or card (small screen) | User is redirected to the Partner details page | ✅ | ✅ |  |
| **Infinite Scrolling** | Scroll down the list | More Partners load automatically without refresh | ✅ | ✅ |  |
| **No Results Handling** | Apply filters that return no results | "No results found" message is displayed | ✅ | ✅ |  |
| **Loading Indicator** | Load the Partner List | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Partner's List  page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Add Partner Page** | | | | | |
| **Add Partner Form** | Open the Add Partner form | The form loads with all required fields and labels. | ✅ | ✅ |  |
| **Trade Name** | Enter a name within 255 characters | The name is accepted. | ✅ | ✅ |  |
| **Trade Name** | Enter a name exceeding 255 characters | An error message is displayed. | ✅ | ✅ |  |
| **Full Name** | Enter a name within 255 characters | The name is accepted. | ✅ | ✅ |  |
| **Full Name** | Enter a name exceeding 255 characters | An error message is displayed. | ✅ | ✅ |  |
| **BIN** | Leave blank | An error message is displayed. | ✅ | ✅ |  |
| **BIN** | Enter a value within 20 characters | The value is accepted. | ✅ | ✅ |  |
| **BIN** | Enter a value exceeding 20 characters | An error message is displayed. | ✅ | ✅ |  |
| **Partner Type** | Select a value from the dropdown list | The value is accepted. | ✅ | ✅ |  |
| **Legal Address** | Enter multiple lines of text | The field accepts multiline input. | ✅ | ✅ |  |
| **Actual Address** | Enter multiple lines of text | The field accepts multiline input. | ✅ | ✅ |  |
| **Phone Number** | Enter a valid phone number (e.g., +1234567890) | The phone number is accepted. | ✅ | ✅ |  |
| **Phone Number** | Enter an invalid phone number | An error message is displayed. | ✅ | ✅ |  |
| **Own Partner** | Check the checkbox | The checkbox is selected. | ✅ | ✅ |  |
| **Own Partner** | Uncheck the checkbox | The checkbox is deselected. | ✅ | ✅ |  |
| **Save Button** | Click "Save" with all required fields filled | The Partner is saved successfully. | ✅ | ✅ |  |
| **Save Button** | Click "Save" with missing required fields | An error message is displayed. | ✅ | ✅ |  |
| **Cancel Button** | Click "Cancel" | The user is redirected to the previous page. | ✅ | ✅ |  |
| **Hover Effects** | Hover over buttons | Buttons change color and slightly enlarge. | ✅ | ✅ |  |
| **Loading Indicator** | Load the Add Partner page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Add Partner page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **View Partner Page** | | | | | |
| **View Partner Details** | Open the **View Partner** page | Partner details are displayed in read-only format | ✅ | ✅ |  |
| **Read-Only Fields** | Try to edit any field | Fields cannot be edited | ✅ | ✅ |  |
| **Edit Button** | Click the **Edit** button | Redirects to **Edit Partner** page | ✅ | ✅ |  |
| **Delete Button** | Click the **Delete** button | Redirects to **Delete Partner** page | ✅ | ✅ |  |
| **Cancel Button** | Click the **Cancel** button | Navigates back to the previous page | ✅ | ✅ |  |
| **Hover Effect** | Hover over action buttons | Buttons change color and slightly enlarge | ✅ | ✅ |  |
| **Error Handling** | Load the page with an invalid Partner ID | Displays "Results not found" error message | ✅ | ✅ |  |
| **Loading Indicator** | Load the View Partner page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the View Partner page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Edit Partner Page** | | | | | |
| **Edit Partner Form** | Open the Edit Partner form | The form loads with all required fields and labels. | ✅ | ✅ |  |
| **ID, Created At, Updated At** | Try to edit any field | These fields are automatically managed by the system and cannot be modified by the user. | ✅ | ✅ |  |
| **Trade Name** | Enter a name within 255 characters | The name is accepted. | ✅ | ✅ |  |
| **Trade Name** | Enter a name exceeding 255 characters | An error message is displayed. | ✅ | ✅ |  |
| **Full Name** | Enter a name within 255 characters | The name is accepted. | ✅ | ✅ |  |
| **Full Name** | Enter a name exceeding 255 characters | An error message is displayed. | ✅ | ✅ |  |
| **BIN** | Leave blank | An error message is displayed. | ✅ | ✅ |  |
| **BIN** | Enter a value within 20 characters | The value is accepted. | ✅ | ✅ |  |
| **BIN** | Enter a value exceeding 20 characters | An error message is displayed. | ✅ | ✅ |  |
| **Partner Type** | Select a value from the dropdown list | The value is accepted. | ✅ | ✅ |  |
| **Legal Address** | Enter multiple lines of text | The field accepts multiline input. | ✅ | ✅ |  |
| **Actual Address** | Enter multiple lines of text | The field accepts multiline input. | ✅ | ✅ |  |
| **Phone Number** | Enter a valid phone number (e.g., +1234567890) | The phone number is accepted. | ✅ | ✅ |  |
| **Phone Number** | Enter an invalid phone number | An error message is displayed. | ✅ | ✅ |  |
| **Own Partner** | Check the checkbox | The checkbox is selected. | ✅ | ✅ |  |
| **Own Partner** | Uncheck the checkbox | The checkbox is deselected. | ✅ | ✅ |  |
| **Save Button** | Click "Save" with all required fields filled | The Partner is saved successfully. | ✅ | ✅ |  |
| **Save Button** | Click "Save" with missing required fields | An error message is displayed. | ✅ | ✅ |  |
| **Cancel Button** | Click "Cancel" | The user is redirected to the Partner's List page. | ✅ | ✅ |  |
| **Hover Effects** | Hover over buttons | Buttons change color and slightly enlarge. | ✅ | ✅ |  |
| **Loading Indicator** | Load the Edit Partner page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Edit Partner page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Delete Partner Page** | | | | | |
| **Delete Partner** | Click the **Delete** button | A confirmation prompt appears. | ✅ | ✅ |  |
| **Confirm deletion**  | Confirm deletion in the prompt | Partner record is permanently deleted. | ✅ | ✅ |  |
| **Delete Partner**  | Try deleting a Partner referenced in other records | Error message appears: "Cannot delete this item because it is referenced in another record." | ✅ | ✅ |  |
| **Cancel Button**  | Click the **Cancel** button | Navigates back to the previous page without deleting. | ✅ | ✅ |  |
| **Hover Effects** | Hover over buttons | Buttons change color and slightly enlarge. | ✅ | ✅ |  |
| **Loading Indicator** | Load the Delete Partner page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Payment Request's List Page** | | | | | |
| **Responsive Display** | Resize the browser window to different screen sizes | Table format appears on large screens, card format on small screens | ✅ | ✅ |  |
| **Add Button** | Click the "Add" button | User is redirected to a new page to enter Payment Request's details | ✅ | ✅ |  |
| **Show Filters Button** | Click "Show Filters" | Filter options appear, and the button text changes to "Hide Filters" | ✅ | ✅ |  |
| **Hide Filters Button** | Click "Hide Filters" | Filter options are hidden, and the button text changes back to "Show Filters" | ✅ | ✅ |  |
| **Valid date range** | Enter a valid date range in filters | The filter applies successfully  | ✅ | ✅ |  |
| **invalid date range** | Enter an invalid date range (start > end) | System prevents selection and shows an error message | ✅ | ✅ |  |
| **Clear Individual Filter** | Click the trash can icon next to a filter field | The corresponding field is cleared | ✅ | ✅ |  |
| **Clear Filters Button** | Click "Clear Filters" | All filter fields are reset | ✅ | ✅ |  |
| **User Filter** | Open the Payment Request form | User filter is automatically set to the current user | ✅ | ✅ |  |
| **Foreign Key Selection** | Click a filter that requires foreign key input | A selection modal opens to choose a value. | ✅ | ✅ |  |
| **Edit Payment Request's Details** | Click anywhere on a row (large screen) or card (small screen) | User is redirected to the Partner details page | ✅ | ✅ |  |
| **Infinite Scrolling** | Scroll down the list | More Partners load automatically without refresh | ✅ | ✅ |  |
| **No Results Handling** | Apply filters that return no results | "No results found" message is displayed | ✅ | ✅ |  |
| **Loading Indicator** | Load the Payment Request's List | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Payment Request's List  page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Add Payment Request Page** | | | | | |
| **Open Add Payment Request Page** | Navigate to the **Add Payment Request** page | The form loads with all input fields available | ✅ | ✅ |  |
| **Payer Selection** | A selection modal opens to choose a value | The payer is assigned correctly | ✅ | ✅ |  |
| **Recipient Selection** | A selection modal opens to choose a value. | The recipient is assigned correctly | ✅ | ✅ | |
| **Invoice Number Validation**  | Enter more than 50 characters in Invoice Number | An error message appears indicating character limit | ✅ | ✅ |  |
| **Invoice Date Validation** | Leave the Invoice Date field blank | An error message appears stating the field is required | ✅ | ✅ |  |
| **Invoice Amount Validation**  | Enter a negative value in Invoice Amount | An error message appears indicating invalid value | ✅ | ✅ |  |
| **Payment Priority Validation** | Enter a value outside the range (1-10) | An error message appears indicating allowed range | ✅ | ✅ |  |
| **Payment Amount Validation** | Enter a negative value in Payment Amount | An error message appears indicating invalid value | ✅ | ✅ |  |
| **Deadline  Validation**| Leave the Deadline field blank | An error message appears stating the field is required | ✅ | ✅ |  |
| **Comment Entry** | Enter a comment in the field | The system accepts the input (optional field) | ✅ | ✅ |  |
| **User Field** | Check if the **User** field is visible | The field should be hidden from the user | ✅ | ✅ |  |
| **User Field Assignment** | Submit the form and check the database | The **User** field should be set to the current user | ✅ | ✅ |  |
| **Save Button** | Click the **Save** button with valid inputs | The Payment Request is successfully saved |  |  |  |
| **Save Button** | Click the **Save** button with missing required fields | An error message appears guiding user to fix input | ✅ | ✅ |  |
| **Cancel Button** | Click the **Cancel** button | Navigates back to the previous page without saving changes | ✅ | ✅ |  |
| **Foreign Key Selection** | Click a field that requires foreign key input  | A selection modal opens to choose a value | ✅ | ✅ |  |
| **Hover Effects** | Hover over buttons | Buttons change color and slightly enlarge. | ✅ | ✅ |  |
| **Loading Indicator** | Load the Add Payment Request Page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Add Payment Request Page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Payment Request Page** | | | | | |
| **Payment Request Details** | Open the **Payment Request** page | Payment Request details are displayed in read-only format | ✅ | ✅ |  |
| **Read-Only Fields** | Try to edit any field | Fields cannot be edited | ✅ | ✅ |  |
| **Edit Button** | Click the **Edit** button | Redirects to **Edit Payment Request** page | ✅ | ✅ |  |
| **Delete Button** | Click the **Delete** button | Redirects to **Delete Payment Request** page | ✅ | ✅ |  |
| **Cancel Button** | Click the **Cancel** button | Navigates back to the previous page | ✅ | ✅ |  |
| **Hover Effect** | Hover over action buttons | Buttons change color and slightly enlarge | ✅ | ✅ |  |
| **Error Handling** | Load the page with an invalid Payment Request ID | Displays "Results not found" error message | ✅ | ✅ |  |
| **Loading Indicator** | Load the View Payment Request page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the View Payment Request page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Edit Payment Request Page** | | | | | |
| **Open Edit Payment Request Page** | Navigate to the **Edit Payment Request** page | The form loads with all input fields available | ✅ | ✅ |  |
| **ID, Created At, Updated At, User** | Try to edit any field | These fields are automatically managed by the system and cannot be modified by the user. | ✅ | ✅ |  |
| **Payer Selection** | A selection modal opens to choose a value | The payer is assigned correctly | ✅ | ✅ |  |
| **Recipient Selection** | A selection modal opens to choose a value. | The recipient is assigned correctly | ✅ | ✅ | |
| **Invoice Number Validation**  | Enter more than 50 characters in Invoice Number | An error message appears indicating character limit | ✅ | ✅ |  |
| **Invoice Date Validation** | Leave the Invoice Date field blank | An error message appears stating the field is required | ✅ | ✅ |  |
| **Invoice Amount Validation**  | Enter a negative value in Invoice Amount | An error message appears indicating invalid value | ✅ | ✅ |  |
| **Payment Priority Validation** | Enter a value outside the range (1-10) | An error message appears indicating allowed range | ✅ | ✅ |  |
| **Payment Amount Validation** | Enter a negative value in Payment Amount | An error message appears indicating invalid value | ✅ | ✅ |  |
| **Deadline  Validation**| Leave the Deadline field blank | An error message appears stating the field is required | ✅ | ✅ |  |
| **Comment Entry** | Enter a comment in the field | The system accepts the input (optional field) | ✅ | ✅ |  |
| **Save Button** | Click the **Save** button with valid inputs | The Payment Request is successfully saved |  |  |  |
| **Save Button** | Click the **Save** button with missing required fields | An error message appears guiding user to fix input | ✅ | ✅ |  |
| **Cancel Button** | Click the **Cancel** button | Navigates back to the previous page without saving changes | ✅ | ✅ |  |
| **Foreign Key Selection** | Click a field that requires foreign key input  | A selection modal opens to choose a value | ✅ | ✅ |  |
| **Hover Effects** | Hover over buttons | Buttons change color and slightly enlarge. | ✅ | ✅ |  |
| **Loading Indicator** | Load the Edit Payment Request Page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Instruction Button Visibility** | Check for the instruction button on the Edit Payment Request Page | The button is visible | ✅ | ✅ |  |
| **Instruction Button Hover Effect** | Hover over the instruction button | The button changes color and slightly enlarges | ✅ | ✅ |  |
| **Instruction Content** | Click on the instruction button | A pop-up or section displays instructions on how to fill the form | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |
| **Delete Payment Request Page** | | | | | |
| **Delete Payment Request** | Click the **Delete** button | A confirmation prompt appears. | ✅ | ✅ |  |
| **Confirm deletion**  | Confirm deletion in the prompt | Payment Request record is permanently deleted. | ✅ | ✅ |  |
| **Cancel Button**  | Click the **Cancel** button | Navigates back to the previous page without deleting. | ✅ | ✅ |  |
| **Hover Effects** | Hover over buttons | Buttons change color and slightly enlarge. | ✅ | ✅ |  |
| **Loading Indicator** | Load the Delete Payment Request page | A spinner appears while data is loading, then disappears when data is loaded | ✅ | ✅ |  |
| **Language Support** | Switch between Kazakh, English, and Russian | The page should be fully translated in the selected language | ✅ | ✅ |  |

| Locking on Edit       | User clicks **Edit** on an item                  | The item is locked, preventing other users from editing         |            |            |             |
| Lock Expiration       | User does not take any action for 20 minutes      | The lock expires automatically after 20 minutes                 |            |            |             |
| Lock Prevention       | Another user attempts to edit a locked item      | The system displays a message stating the item is locked        |            |            |             |
| Lock Release - Save   | User makes changes and clicks **Save**           | The lock is released, and other users can edit the item         |            |            |             |
| Lock Release - Cancel | User clicks **Cancel**                           | The lock is released, and other users can edit the item         |            |            |             |
| Lock Release - Exit   | User navigates away from the page                | The lock is released, and other users can edit the item         |            |            |             |
| Lock Notification     | Another user tries to edit a locked item         | The system displays a clear message about the lock status       |            |            |             |
| Edit After Lock Expiry | Another user edits after the 20-minute expiry   | The edit is allowed, as the lock has been automatically removed |            |            |             |
| System Version Check  | One user locks the item, lock expires, another user edits, first user tries to edit | System detects version conflict and shows message: **"The record has been updated by another user. Please refresh the page and try again."** |            |            |             |

## Admin Panel Functional Testing

Admin panel testing ensures that the admin interface works as expected and provides the correct functionality for managing the application's data.

| feature | action  | expected result  | tested | passed | comments |
|---|---|---|----|---|---|


### Admin Panel Access Control

| feature | action | expected result  | tested | passed | comments |
|---|---|---|---|---|---|
| Admin login without permissions | Log in as a non-admin user | The system prevents access to the admin panel and redirects to the home page or appropriate page. | Yes | Yes | - |
| Access control on models | Log in as an admin user and navigate to various models | The admin user has access to all models, can add/edit/delete data, and access restricted functionalities. | Yes | Yes | - |

## Testing User Stories


## Performance Testing
To ensure the application is optimized and performs efficiently, we use **[Lighthouse](https://developers.google.com/web/tools/lighthouse)** for performance testing. 

Lighthouse is an open-source, automated tool for improving the quality of web pages. It provides insights and metrics across several categories, including:

1. **Performance**: Evaluates load times, speed indices, and how quickly key content is displayed.
2. **Accessibility**: Checks the site's compliance with accessibility standards.
3. **Best Practices**: Analyzes adherence to modern web development practices.
4. **SEO**: Assesses the website's ability to rank on search engines.
5. **Progressive Web App (PWA)**: Verifies the features and reliability of a PWA (if applicable).
- the 'Home' page

## User Interface Testing

Ensuring a consistent and responsive user interface across different screen sizes is crucial for an optimal user experience. Here are the steps and considerations for UI testing:

### Displaying on Different Screens
The application was tested on various screen sizes and devices to ensure responsiveness and usability:
1. **Desktop Screens**: Verify layout and design on common resolutions like 1920x1080 and 1366x768.
2. **Tablet Screens**: Check functionality and layout for resolutions such as 768x1024 (portrait) and 1024x768 (landscape).
3. **Mobile Screens**: Test responsiveness on small screens like 360x640 and 375x667.
- the 'Home' page

### Testing on Different Browsers
The following browsers are commonly tested to ensure broad compatibility:
**Google Chrome**: Latest version and recent updates.
- the 'Home' page

**Mozilla Firefox**: Standard version and ESR (Extended Support Release).
- the 'Home' page

**Microsoft Edge**: Chromium-based versions.
- the 'Home' page
 
## Automated Testing
This project includes a suite of automated tests to ensure the functionality, reliability, and stability of the application. Below is an overview of the testing setup, the process, and the results.
### Django
1. **Running the Tests**
You can run the test suite using the Django management command:
```
python manage.py test
```
2. **Testing Structure**
The tests are located in a dedicated tests folder for each app. Below is an example of the folder structure:
```
app_name/
├── test-cases/
│   ├── test_models.py
│   ├── test_views.py
│   ├── ...
```
3. **Key Test Results**
After running the tests, here are the results obtained from the project:
- Command: `Python manage.py test`
- Output Summary:
**common**
```
----------------------------------------------------------------------
Ran 16 tests in 6.370s

OK
```
**django_api**
```
.......
----------------------------------------------------------------------
Ran 7 tests in 0.408s

OK
```
**partner**
```
..................
----------------------------------------------------------------------
Ran 18 tests in 1.399s

OK
```
**payment**
```
......................
----------------------------------------------------------------------
Ran 22 tests in 4.677s

OK
```
**user**
```
...................
----------------------------------------------------------------------
Ran 19 tests in 5.960s

OK
```

- Code Coverage:
  - Prerequisites:
  Before getting reports, make sure you have installed all the dependencies by running:
  ```
  pip install coverage
  ```
  - Command:
  ```
  coverage run --source=app_name manage.py test app_name
  coverage report
  ```
  - Results:

  **common**

    ![coverage - common](documentation/coverage/common.png)

  **django_api**

    ![coverage - django_api](documentation/coverage/django_api.png)

  **partner**

    ![coverage - partner](documentation/coverage/partner.png)

  **payment**

    ![coverage - payment](documentation/coverage/payment.png)

  **user**

    ![coverage - user](documentation/coverage/user.png)

### Jest (React)
1. **Prerequisites**
Before running the tests, make sure you have installed all the dependencies by running:
```
npm install
```
2. **Running the Tests**
To run the test suite, use the following command:
```
npm test
```
3. **Key Test Results**
After running the tests, here are the results obtained from the project:
- Command: `npm test`
- Output Summary:
  ![outcomes - jest](documentation/jest/jest-outcomes.png)

## Validation
### W3C Validator (HTML)
Quality checking was tested by [Markup validator service](https://validator.w3.org/)
All files were checked and did not have errors.
These warnings do not indicate issues that would degrade the user experience or functionality of the application. The `aria-label` attributes were added deliberately to enhance accessibility for screen readers. The use of `aria-label` conforms to accessibility best practices by providing explicit descriptions when needed. The warnings do not affect the semantic correctness or performance of the application.
- the 'Home' page

### W3C CSS Validator (CSS)
Quality checking was tested by [CSS validator service](https://jigsaw.w3.org/css-validator/).
All files were checked and did not have errors or warnings.


### JS Hint
Quality checking was tested by [JS Hint](https://jshint.com/).
All files were checked and did not have errors or warnings.
- dashboard.js
 
### Validator PEP8 (Python)
Quality checking was tested by [PEP8](https://pep8ci.herokuapp.com/#).
All files were checked and did not have errors or warnings.
Notes: Each Python file contains a newline at the end of the file.

**common**
- mixins/pessimistic_locking_view.py

  ![validator - pessimistic_locking_view.py](documentation/validator/pep8/common/pessimistic_loccking_view.png)

- test_cases/test_models.py

  ![validator - test_models.py](documentation/validator/pep8/common/test_models.png)

- test_cases/test_pessimistic_locking_view.py

  ![validator - test_pessimistic_locking_view.py](documentation/validator/pep8/common/test_pessimistic_loccking_view.png)

- test_cases/test_urls.py

  ![validator - test_urls.py](documentation/validator/pep8/common/test_urls.png)

- models.py

  ![validator - models.py](documentation/validator/pep8/common/models.png)

**django_api**

- test_cases/test_permissions.py

  ![validator - test_permissions.py](documentation/validator/pep8/djamgo_api/test_permissions.png)

- test_cases/test_serializers.py

  ![validator - test_serializers.py](documentation/validator/pep8/djamgo_api/test_serializers.png)

- permissions.py

  ![validator - permissions.py](documentation/validator/pep8/djamgo_api/permissions.png)

- serilizers.py

  ![validator - serilizers.py](documentation/validator/pep8/djamgo_api/serializers.png)

- settings.py

  ![validator - settings.py](documentation/validator/pep8/djamgo_api/settings.png)

- urls.py

  ![validator - urls.py](documentation/validator/pep8/djamgo_api/urls.png)

- views.py

  ![validator - views.py](documentation/validator/pep8/djamgo_api/views.png)

- wsgi.py

  ![validator - wsgi.py](documentation/validator/pep8/djamgo_api/wsgi.png)

**partner**

- commands/create_test_partners.py

  ![validator - test_filters.py](documentation/validator/pep8/partner/test_filters.png)

- test_cases/test_filters.py

  ![validator - test_filters.py](documentation/validator/pep8/partner/test_filters.png)

- test_cases/test_models.py

  ![validator - test_models.py](documentation/validator/pep8/partner/test_models.png)

- test_cases/test_serializers.py

  ![validator - test_serializers.py](documentation/validator/pep8/partner/test_serializers.png)

- test_cases/test_views.py

  ![validator - test_views.py](documentation/validator/pep8/partner/test_views.png)

- admin.py

  ![validator - admin.py](documentation/validator/pep8/partner/admin.png)

- apps.py

  ![validator - apps.py](documentation/validator/pep8/partner/apps.png)

- filters.py

  ![validator - filters.py](documentation/validator/pep8/partner/filters.png)

- models.py

  ![validator - models.py](documentation/validator/pep8/partner/models.png)

- serilizers.py

  ![validator - serilizers.py](documentation/validator/pep8/partner/serializers.png)

- urls.py

  ![validator - urls.py](documentation/validator/pep8/partner/urls.png)

- views.py

  ![validator - views.py](documentation/validator/pep8/partner/views.png)

**payment**

- commands/create_test_payment_request.py

  ![validator - test_filters.py](documentation/validator/pep8/payment/create_test_payment_request.png)

- test_cases/test_filters.py

  ![validator - test_filters.py](documentation/validator/pep8/payment/test_filters.png)

- test_cases/test_models.py

  ![validator - test_models.py](documentation/validator/pep8/payment/test_models.png)

- test_cases/test_serializers.py

  ![validator - test_serializers.py](documentation/validator/pep8/payment/test_serializers.png)

- test_cases/test_views.py

  ![validator - test_views.py](documentation/validator/pep8/payment/test_views.png)

- admin.py

  ![validator - admin.py](documentation/validator/pep8/payment/admin.png)

- apps.py

  ![validator - apps.py](documentation/validator/pep8/payment/apps.png)

- filters.py

  ![validator - filters.py](documentation/validator/pep8/payment/filters.png)

- models.py

  ![validator - models.py](documentation/validator/pep8/payment/models.png)

- serilizers.py

  ![validator - serilizers.py](documentation/validator/pep8/payment/serializers.png)

- urls.py

  ![validator - urls.py](documentation/validator/pep8/payment/urls.png)

- views.py

  ![validator - views.py](documentation/validator/pep8/payment/views.png)

**user**

- test_cases/test_models.py

  ![validator - test_models.py](documentation/validator/pep8/user/test_models.png)

- test_cases/test_serializers.py

  ![validator - test_serializers.py](documentation/validator/pep8/user/test_serializers.png)

- test_cases/test_views.py

  ![validator - test_views.py](documentation/validator/pep8/user/test_views.png)

- admin.py

  ![validator - admin.py](documentation/validator/pep8/user/admin.png)

- apps.py

  ![validator - apps.py](documentation/validator/pep8/user/apps.png)

- models.py

  ![validator - models.py](documentation/validator/pep8/user/models.png)

- serilizers.py

  ![validator - serilizers.py](documentation/validator/pep8/user/serializers.png)

- urls.py

  ![validator - urls.py](documentation/validator/pep8/user/urls.png)

- views.py

  ![validator - views.py](documentation/validator/pep8/user/views.png)


## Bugs

__Solved Bugs__

   
__Unsolved Bugs__

 - None.

__Mistakes__

 - Using different formats of 'Commit' comments.
 - Some grammar and spelling mistakes.