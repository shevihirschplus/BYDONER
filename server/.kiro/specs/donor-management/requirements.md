# Requirements Document

## Introduction

A web-based Donor Management Application that enables institutional staff to manage donor profiles, record donations, generate printable receipts, and view analytics. The application supports role-based access for Admin and Staff users, with a modern responsive interface built on Angular with a C# ASP.NET Core backend and PostgreSQL database.

## Glossary

- **Application**: The Donor Management web application
- **Donor_Manager**: The module responsible for creating, updating, and deleting donor profiles
- **Donation_Manager**: The module responsible for recording, editing, and deleting donations
- **Receipt_Generator**: The module responsible for generating donation receipts in PDF and Word formats
- **Search_Engine**: The module responsible for searching and filtering donors and donations
- **Dashboard**: The module responsible for displaying aggregate statistics and analytics
- **Auth_System**: The module responsible for user authentication and role-based authorization
- **Notification_System**: The module responsible for displaying user feedback messages
- **Validator**: The module responsible for validating user input data
- **Admin**: A user role with full access to manage donors, donations, receipts, and users
- **Staff**: A user role with access to view donors, add donations, and print receipts
- **Donor**: A person whose profile and donation history is tracked in the system
- **Receipt**: A formatted document containing institution, donor, and donation details

## Requirements

### Requirement 1: Create Donor Profile

**User Story:** As a staff member, I want to create donor profiles with personal information, so that I can maintain a record of all donors.

#### Acceptance Criteria

1. WHEN a user submits a valid donor form, THE Donor_Manager SHALL create a new donor record with a unique UUID identifier
2. THE Donor_Manager SHALL store the following donor fields: Full Name (text), Birthdate (date), Email (email), Phone Number (text), Country/City/Location (text), Full Address (text area), Family Status (one of: Single, Married, Divorced, Widowed), and Number of Kids (non-negative integer)
3. WHEN a donor record is created successfully, THE Notification_System SHALL display a confirmation message within 3 seconds
4. IF a required field is missing or invalid, THEN THE Validator SHALL display a specific error message identifying the invalid field

### Requirement 2: Edit and Delete Donor Profile

**User Story:** As a staff member, I want to edit or delete donor profiles, so that I can keep donor information accurate and up to date.

#### Acceptance Criteria

1. WHEN a user submits an updated donor form, THE Donor_Manager SHALL persist the changes to the donor record
2. WHEN a user requests deletion of a donor profile, THE Application SHALL display a confirmation dialog before proceeding
3. WHEN a user confirms donor deletion, THE Donor_Manager SHALL remove the donor record and all associated donation records
4. IF a donor deletion is cancelled, THEN THE Donor_Manager SHALL retain the donor record unchanged

### Requirement 3: Donor Card View

**User Story:** As a staff member, I want to view a donor's complete profile including donation history, so that I can quickly access all relevant donor information.

#### Acceptance Criteria

1. WHEN a user selects a donor, THE Application SHALL display a donor card showing: Full Name, Birthdate, Email, Phone Number, Location, Address, Family Status, and Number of Kids
2. THE Application SHALL display the donor's donation history as an expandable accordion list within the donor card
3. WHEN a donation history entry is expanded, THE Application SHALL display: Donation Amount, Donation Date, Notes, Payment Method, and Receipt Status

### Requirement 4: Record Donation

**User Story:** As a staff member, I want to record donations against a donor profile, so that I can maintain an accurate donation history.

#### Acceptance Criteria

1. WHEN a user submits a valid donation form, THE Donation_Manager SHALL create a new donation record linked to the specified donor
2. THE Donation_Manager SHALL store the following donation fields: Amount (positive currency value), Donation Date (date), Notes (optional text), and Payment Method (one of: Cash, Credit Card, Bank Transfer, Check, Other)
3. THE Donation_Manager SHALL generate a unique receipt number for each donation record
4. WHEN a donation is recorded successfully, THE Notification_System SHALL display a confirmation message within 3 seconds
5. IF the donation amount is zero or negative, THEN THE Validator SHALL reject the submission and display an error message

### Requirement 5: Edit and Delete Donation

**User Story:** As a staff member, I want to edit or delete donation records, so that I can correct errors in donation history.

#### Acceptance Criteria

1. WHEN a user submits an updated donation form, THE Donation_Manager SHALL persist the changes to the donation record
2. WHEN a user requests deletion of a donation, THE Application SHALL display a confirmation dialog before proceeding
3. WHEN a user confirms donation deletion, THE Donation_Manager SHALL remove the donation record
4. IF a donation deletion is cancelled, THEN THE Donation_Manager SHALL retain the donation record unchanged

### Requirement 6: Generate PDF Receipt

**User Story:** As a staff member, I want to generate a PDF receipt for a donation, so that I can provide donors with official documentation.

#### Acceptance Criteria

1. WHEN a user requests a PDF receipt for a donation, THE Receipt_Generator SHALL produce a PDF document
2. THE Receipt_Generator SHALL include the following institution information in the receipt: Institution Name, Logo, Address, and Contact Information
3. THE Receipt_Generator SHALL include the following donor information in the receipt: Full Name, Address, Email, and Phone Number
4. THE Receipt_Generator SHALL include the following donation information in the receipt: Donation Amount, Donation Date, Receipt Number, and Payment Method
5. THE Receipt_Generator SHALL include a footer section with a thank-you message and an authorized signature area
6. THE Receipt_Generator SHALL format the PDF receipt for print-ready output on standard paper sizes

### Requirement 7: Generate Word Receipt

**User Story:** As a staff member, I want to generate a Word document receipt for a donation, so that I can edit receipts before printing if needed.

#### Acceptance Criteria

1. WHEN a user requests a Word receipt for a donation, THE Receipt_Generator SHALL produce a .docx document
2. THE Receipt_Generator SHALL include the same institution, donor, donation, and footer information in the Word receipt as specified for the PDF receipt
3. THE Receipt_Generator SHALL format the Word document for print-ready output

### Requirement 8: Search Donors

**User Story:** As a staff member, I want to search for donors by name, email, or phone number, so that I can quickly find specific donor records.

#### Acceptance Criteria

1. WHEN a user enters a search query, THE Search_Engine SHALL return matching donors by Full Name, Email, or Phone Number
2. THE Search_Engine SHALL perform partial matching on search queries (substring search)
3. THE Search_Engine SHALL display search results within 2 seconds of query submission
4. WHEN no donors match the search query, THE Search_Engine SHALL display a "no results found" message

### Requirement 9: Filter Donors

**User Story:** As a staff member, I want to filter donors by various criteria, so that I can narrow down donor lists for reporting purposes.

#### Acceptance Criteria

1. THE Search_Engine SHALL support filtering donors by Family Status
2. THE Search_Engine SHALL support filtering donors by Location
3. THE Search_Engine SHALL support filtering donors by Donation Amount Range (minimum and maximum)
4. THE Search_Engine SHALL support filtering donors by Donation Date Range (start date and end date)
5. WHEN multiple filters are applied, THE Search_Engine SHALL return donors matching all active filter criteria (AND logic)

### Requirement 10: Dashboard Analytics

**User Story:** As a staff member, I want to view a dashboard with donation statistics, so that I can understand overall donation trends and performance.

#### Acceptance Criteria

1. THE Dashboard SHALL display the total number of donors in the system
2. THE Dashboard SHALL display the total sum of all donation amounts
3. THE Dashboard SHALL display a list of recent donations ordered by date (most recent first)
4. THE Dashboard SHALL display a list of top donors ranked by total donation amount
5. THE Dashboard SHALL display monthly donation statistics for the current year
6. THE Dashboard SHALL update displayed statistics when underlying data changes

### Requirement 11: User Authentication

**User Story:** As an administrator, I want users to authenticate before accessing the application, so that donor data remains secure.

#### Acceptance Criteria

1. WHEN a user provides valid credentials, THE Auth_System SHALL grant access to the application
2. IF a user provides invalid credentials, THEN THE Auth_System SHALL deny access and display an error message
3. THE Auth_System SHALL hash all stored passwords using a secure hashing algorithm
4. WHEN a user session expires, THE Auth_System SHALL redirect the user to the login page
5. THE Auth_System SHALL enforce secure HTTPS connections for all authentication requests

### Requirement 12: Role-Based Access Control

**User Story:** As an administrator, I want to assign roles to users, so that access to features is controlled based on responsibility.

#### Acceptance Criteria

1. THE Auth_System SHALL support two roles: Admin and Staff
2. WHILE a user is authenticated as Admin, THE Application SHALL permit access to: manage donors, manage donations, generate receipts, and manage users
3. WHILE a user is authenticated as Staff, THE Application SHALL permit access to: view donors, add donations, and print receipts
4. IF a user attempts to access a feature outside their role permissions, THEN THE Auth_System SHALL deny the request and display an "access denied" message

### Requirement 13: Input Validation

**User Story:** As a staff member, I want the application to validate my input, so that I can avoid submitting incorrect data.

#### Acceptance Criteria

1. THE Validator SHALL enforce required fields: Full Name, Email, and Phone Number for donor creation
2. THE Validator SHALL verify that email fields conform to a valid email format (contains @ and domain)
3. THE Validator SHALL verify that phone number fields contain only valid phone characters (digits, plus sign, hyphens, parentheses, spaces)
4. THE Validator SHALL verify that donation amounts are positive numeric values
5. IF validation fails, THEN THE Validator SHALL display specific error messages adjacent to the invalid fields

### Requirement 14: Responsive User Interface

**User Story:** As a staff member, I want the application to work on desktop and mobile devices, so that I can access donor information from any device.

#### Acceptance Criteria

1. THE Application SHALL render correctly on screen widths from 320px to 2560px
2. THE Application SHALL use a card-based layout for donor profiles
3. THE Application SHALL use modal forms for data entry (create/edit donors and donations)
4. THE Application SHALL provide a sidebar for search filters on desktop and a collapsible filter panel on mobile
5. THE Application SHALL use accordion panels for expandable donation history within donor cards

### Requirement 15: API Security

**User Story:** As an administrator, I want all API endpoints to be secured, so that unauthorized access to donor data is prevented.

#### Acceptance Criteria

1. THE Auth_System SHALL require a valid authentication token for all API endpoints except login
2. IF a request contains an invalid or expired token, THEN THE Auth_System SHALL return a 401 Unauthorized response
3. THE Auth_System SHALL validate role permissions on each API request before processing
4. THE Application SHALL support data backup operations for disaster recovery

### Requirement 16: Notification Feedback

**User Story:** As a staff member, I want to receive clear feedback for my actions, so that I know whether operations succeeded or failed.

#### Acceptance Criteria

1. WHEN a donor is created successfully, THE Notification_System SHALL display a success notification
2. WHEN a donation is added successfully, THE Notification_System SHALL display a success notification
3. WHEN a receipt is generated successfully, THE Notification_System SHALL display a success notification
4. IF an operation fails, THEN THE Notification_System SHALL display an error notification describing the failure reason
