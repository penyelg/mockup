# IsabelCare: AI-Assisted Healthcare Navigation and Clinic Appointment Booking System

> **Proposed IT Capstone Project Prototype**  
> *“Design and Development of an AI-Assisted Healthcare Navigation and Clinic Appointment Booking System for Patients and Healthcare Providers in Isabel, Leyte.”*

---

## 1. Project Overview

**IsabelCare** is a modern, responsive healthcare platform tailored for the municipality of **Isabel, Leyte, Philippines**. It bridges the gap between rural and semi-urban patients and local healthcare facilities by providing:

1. **AI-Assisted Healthcare Navigation**: A conversational interface where patients can describe their medical concern in everyday language (e.g. *"I have a severe toothache and want a nearby dental clinic"*) to discover matching healthcare specialties, recommended preparations, and accredited clinics in Isabel.
2. **Transparent Clinic Directory**: Detailed clinic profiles featuring operating hours, barangay addresses, PhilHealth / DOH accreditations, and transparent starting fees.
3. **Closed-Loop Appointment Booking**: A realistic workflow allowing patients to select available time slots and submit requests, which clinic representatives can confirm or decline in real time.
4. **Three Dedicated Stakeholder Interfaces**:
   - **Patient (Mobile-First PWA View)**: Optimized for smartphone touch ergonomics with bottom navigation and quick concern search. Includes a toggle between a realistic **Phone Mockup Frame** and a **Fluid Responsive View**.
   - **Clinic Representative Dashboard**: Desktop-first provider portal for managing clinic profiles, listing healthcare services & prices in Philippine Pesos (₱), configuring appointment availability slots, and confirming/declining requests.
   - **System Administrator Console**: Municipal oversight portal for the Isabel Health Office to audit clinic registrations, approve/reject clinic submissions, review user accounts, and analyze healthcare demand metrics.

---

## 2. Running the Prototype Locally

To run this static React prototype on your computer:

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes bundled with Node.js)

### Steps
1. **Clone or extract the project repository**:
   ```bash
   cd isabelcare-prototype
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to interact with the system.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 3. Key Interactive User Journeys

The prototype features synchronized state stored in `localStorage` so actions in one role immediately update other roles:

- **Patient Journey**:
  1. Open **Patient View** $\rightarrow$ Search or click a sample health concern (e.g. *Toothache*, *Child fever*, *Prenatal checkup*).
  2. View the **AI-Assisted Healthcare Navigation** interpretation, preparation checklist, and matching clinics in Isabel, Leyte.
  3. Click **Check Availability & Request** on a clinic (e.g. *Isabel Smile Dental*).
  4. Select a preferred date and available time slot $\rightarrow$ Submit the request.
  5. The request status is set to **Pending Clinic Confirmation** and appears under **My Appointments**.

- **Clinic Representative Journey**:
  1. Switch to **Clinic Representative** using the top toolbar.
  2. In **Appointment Requests**, see the incoming request from the patient.
  3. Click **Confirm** (or **Decline**) with an optional instruction note (e.g. *"Please bring your PhilHealth ID"*).
  4. Switch back to **Patient View** $\rightarrow$ **My Appointments** to verify that the request status updated to **Confirmed**!

- **Administrator Journey**:
  1. Switch to **Administrator** using the top toolbar.
  2. Navigate to **Clinic Submissions** to inspect *CarePoint Pediatric & Wellness Center*.
  3. Click **Approve Listing** $\rightarrow$ The clinic is approved and instantly appears in the public clinic directory for patients!

---

## 4. Safety & Academic Disclaimer

- **Informational Navigation Only**: Suggestions provided by the system match stated concerns to relevant healthcare categories and do **not** constitute a medical diagnosis, medical advice, or prescription of drugs.
- **Emergency Situations**: Patients experiencing severe trauma or life-threatening symptoms are directed to the **Isabel MDRRMO Emergency Hotline** `(0917-555-3877)` or the nearest emergency department.
- **Fictional Demo Data**: All clinic records, practitioner profiles, fees, and contact numbers are realistic simulations designed for capstone evaluation.
