# HemoCare — Blood Bank Management System (BBMS)

A full-stack **MERN** (MongoDB, Express, React, Node.js) web application for managing blood donations, blood stock and blood distribution between donors, blood bank organizations and hospitals.

> Group project (**Group L1**) for **EEY4189 – Software Design in Group**, supervised by **Mr. Saliya Wickramasinghe**.

---

## Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Features](#features)
- [Non-Functional Requirements](#non-functional-requirements)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Limitations & Future Work](#limitations--future-work)
- [Project Documentation](#project-documentation)
- [Team](#team)
- [License](#license)

---

## Overview

Sri Lanka needs about 400,000 units of blood a year and has around 900,000 donors — enough to meet demand, yet blood is still lost or short because hospitals, donors and blood bank organizations work in separate, largely manual systems. HemoCare replaces this with one **centralized** platform.

HemoCare digitises the day-to-day work of a blood bank. Organizations record blood coming **in** from donors and going **out** to hospitals, and every movement updates the live stock for each blood group. Each user role gets its own dashboard, and an administrator can manage every account in the system.

### User roles

| Role             | What they can do                                                                 |
| ---------------- | -------------------------------------------------------------------------------- |
| **Admin**        | View and manage all donors, hospitals and organizations; view system-wide stock and analytics |
| **Organization** | Record blood donations (in) and blood issued to hospitals (out); view own donors, hospitals and analytics |
| **Donor**        | View their donation history and the organizations they donated to                |
| **Hospital**     | View blood received (consumer history) and the organizations that supplied it   |

## Problem Statement

Existing blood bank processes are decentralized and largely manual, which causes:

- **No self-service for donors** — donor details can only be updated by blood bank staff (by phone, fax or email).
- **Fragile donor cards** — the physical card is the only record of a donor's donations; if it is lost or damaged, the history is hard to recover.
- **Poor record accessibility** — donors cannot easily see their last donation to plan the next one.
- **Inaccurate stock records** — blood stock must rise with every donation and fall with every hospital issue; manual tracking leads to errors, lost documents and wastage.

## Objectives

1. Let donors view and manage their own information conveniently.
2. Show the availability of required blood groups in blood banks.
3. Keep centralized records of donors, donations and blood stock.
4. Support administrators in maintaining all users and inventory records.
5. Improve communication between donors, hospitals and organizations.
6. Provide a user-friendly interface for every stakeholder.

## Features

- 🔐 **Authentication** — register and log in with role selection; passwords hashed with bcrypt; JWT-protected routes
- 🩸 **Inventory management** — record blood *in* / *out* by blood group (A±, B±, AB±, O±) and quantity, with stock validation before issuing
- 📊 **Analytics** — per-blood-group totals (in, out, available) and recent transactions for organizations and admin
- 🏥 **Role-based dashboards** — separate views for admin, organizations, donors and hospitals
- 🛠️ **Admin panel** — list, update and delete donors, hospitals and organizations
- 🔔 **Toast notifications** and a responsive Bootstrap UI

## Non-Functional Requirements

| Requirement     | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| **Performance** | Handle multiple concurrent users                                   |
| **Security**    | Protect sensitive donor and blood stock data (hashed passwords, JWT, role-based access) |
| **Scalability** | Grow to accommodate more users and data                            |
| **Usability**   | Simple, consistent interface for all user roles                    |

## Tech Stack

| Layer      | Technology                                                       |
| ---------- | ---------------------------------------------------------------- |
| Frontend   | React 18, Redux Toolkit, React Router 7, Axios, Bootstrap 5, React Toastify |
| Backend    | Node.js, Express 4, Mongoose 8, JSON Web Token, bcryptjs, Morgan, CORS |
| Database   | MongoDB (MongoDB Atlas in production)                            |
| Deployment | Render (backend), Vercel (frontend)                              |

## Project Structure

```
BBMS_MernStack/
├── client/              # React frontend (Create React App)
│   ├── public/
│   └── src/
│       ├── components/  # Layout, routes guards, forms, modal
│       ├── pages/       # Auth, dashboards, admin pages
│       ├── redux/       # Store and auth slice
│       └── services/    # Axios instance (API.js)
├── config/              # MongoDB connection (db.js)
├── controllers/         # Route handlers / business logic
├── middlewares/         # Auth (JWT) and admin guards
├── models/              # Mongoose schemas (users, inventory)
├── router/              # Express routers
├── server.js            # Express app entry point
├── .env.example         # Backend env template
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm
- A MongoDB database (local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### 1. Clone the repository

```bash
git clone https://github.com/HemoCare-BBMS/BBMS_MernStack.git
cd BBMS_MernStack
```

### 2. Install dependencies

```bash
npm install
npm install --prefix client
```

### 3. Set up environment variables

```bash
cp .env.example .env
cp client/.env.example client/.env
```

Open both `.env` files and replace the placeholder values (see [Environment Variables](#environment-variables)).

### 4. Run the app

```bash
npm run dev
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8080/api/v1/test>

## Environment Variables

### Backend — `.env` (project root)

| Variable     | Description                                         | Example                                   |
| ------------ | --------------------------------------------------- | ----------------------------------------- |
| `PORT`       | Port the API listens on (Render sets this itself)   | `8080`                                    |
| `DEV_MODE`   | Environment label shown in the server log           | `development`                             |
| `MONGO_URL`  | MongoDB connection string                           | `mongodb+srv://<user>:<password>@<cluster-host>/<db_name>` |
| `JWT_SECRET` | Secret used to sign login tokens                    | `<long_random_secret>`                    |
| `CLIENT_URL` | Allowed frontend origin(s), comma-separated, no trailing slash | `http://localhost:3000`        |

### Frontend — `client/.env`

| Variable            | Description                         | Example                          |
| ------------------- | ----------------------------------- | -------------------------------- |
| `REACT_APP_BASEURL` | Base URL of the backend API         | `http://localhost:8080/api/v1`   |

> ⚠️ Never commit real `.env` files. Only the `.env.example` templates belong in Git.

Generate a strong `JWT_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Available Scripts

Run from the project root:

| Command          | Description                                   |
| ---------------- | --------------------------------------------- |
| `npm start`      | Start the backend with Node (production)      |
| `npm run server` | Start the backend with nodemon (auto-reload)  |
| `npm run client` | Start the React dev server                    |
| `npm run dev`    | Run backend and frontend together             |

## API Endpoints

All routes are prefixed with `/api/v1`. 🔒 = requires `Authorization: Bearer <token>`, 👑 = admin only.

| Method | Route                                         | Description                          |
| ------ | --------------------------------------------- | ------------------------------------ |
| GET    | `/test`                                       | Health check                         |
| POST   | `/auth/register`                              | Register a user                      |
| POST   | `/auth/login`                                 | Log in and receive a JWT             |
| GET    | `/auth/current-user` 🔒                       | Get the logged-in user               |
| POST   | `/inventory/create-inventory` 🔒              | Record blood in / out                |
| GET    | `/inventory/get-inventory` 🔒                 | Organization's inventory records     |
| GET    | `/inventory/get-recent-inventory` 🔒          | Latest inventory records             |
| POST   | `/inventory/get-inventory-hospital` 🔒        | Inventory filtered for hospital/donor views |
| GET    | `/inventory/get-donors` 🔒                    | Donors of the organization           |
| GET    | `/inventory/get-hospital` 🔒                  | Hospitals of the organization        |
| GET    | `/inventory/get-organization` 🔒             | Organizations of a donor             |
| GET    | `/inventory/get-organization-for-hospital` 🔒 | Organizations of a hospital          |
| GET    | `/analytics/bloodGroups-data` 🔒              | Blood group stock for an organization |
| GET    | `/analytics/admin-bloodGroups-data` 🔒        | System-wide blood group stock        |
| GET    | `/admin/donor-list` 🔒👑                      | All donors                           |
| GET    | `/admin/hospital-list` 🔒👑                   | All hospitals                        |
| GET    | `/admin/org-list` 🔒👑                        | All organizations                    |
| PUT    | `/admin/update-donor/:id` 🔒👑                | Update a donor                       |
| PUT    | `/admin/update-hospital/:id` 🔒👑             | Update a hospital                    |
| PUT    | `/admin/update-organization/:id` 🔒👑         | Update an organization               |
| DELETE | `/admin/delete-donor/:id` 🔒👑                | Delete a donor                       |

## Testing

The system was tested manually against a documented test case suite, and the REST API was tested with **Postman**.

| Test type       | Total | Passed | Failed |
| --------------- | :---: | :----: | :----: |
| Functional      | 63    | 63     | 0      |
| Non-functional  | 10    | 10     | 0      |

Full test cases and results: [Test Case Document](https://docs.google.com/spreadsheets/d/1NH2q-f3Z1dyMaHXAnb1agea1ZDpYURRqOOpGiX1RLUA/edit?usp=sharing)

## Deployment

The app is deployed as two parts: the **backend** on [Render](https://render.com) and the **frontend** on [Vercel](https://vercel.com), both using a **MongoDB Atlas** database.

### 1. MongoDB Atlas

1. Create a free **M0** cluster at <https://cloud.mongodb.com>.
2. **Database Access** → *Add New Database User* → username + auto-generated password (role: *Read and write to any database*).
3. **Network Access** → *Add IP Address* → `0.0.0.0/0` (Render's free tier has no fixed outbound IP).
4. **Database** → *Connect* → *Drivers* → copy the connection string and add a database name, e.g.
   `mongodb+srv://<user>:<password>@<cluster-host>/bbms?retryWrites=true&w=majority`

### 2. Backend on Render

*New* → *Web Service* → connect the GitHub repo, then:

| Setting        | Value                         |
| -------------- | ----------------------------- |
| Root Directory | *(leave empty — repo root)*   |
| Runtime        | Node                          |
| Build Command  | `npm install`                 |
| Start Command  | `npm start`                   |
| Health Check Path | `/api/v1/test`             |

Environment variables: `MONGO_URL`, `JWT_SECRET`, `DEV_MODE=production`, `CLIENT_URL=https://<your-app>.vercel.app`. Do **not** set `PORT` — Render provides it.

### 3. Frontend on Vercel

*Add New* → *Project* → import the GitHub repo, then:

| Setting          | Value                     |
| ---------------- | ------------------------- |
| Root Directory   | `client`                  |
| Framework Preset | Create React App          |
| Build Command    | `CI=false npm run build`  |
| Output Directory | `build`                   |

Environment variable: `REACT_APP_BASEURL=https://<your-backend>.onrender.com/api/v1`

`client/vercel.json` rewrites all paths to `index.html` so refreshing a page such as `/donor-list` does not return a 404.

After Vercel gives you the final URL, update `CLIENT_URL` on Render to match it exactly (no trailing slash).

> Render's free tier sleeps after ~15 minutes of inactivity, so the first request after a pause can take up to a minute.

## Limitations & Future Work

**Current limitations**

- Requires a stable internet connection; inventory updates are only as fast as the server responds.
- Blood group and donor information depends on correct user input.
- English-only interface; some users (e.g. smaller hospitals) may need training.
- Older browsers may not render the app correctly.

**Planned enhancements**

- Low-stock alerts for each blood group
- Hospital blood requests and donor eligibility checks
- Notifying donors of their blood test results after donation
- Multi-language support and offline functionality
- Advanced analytics and reporting

## Project Documentation

| Document                    | Link |
| --------------------------- | ---- |
| Project demo video          | [Google Drive](https://drive.google.com/file/d/1VOSvUpYomN_jfrJlY7AK5cr7_Hl9Qrz9/view?usp=sharing) |
| SRS                         | [Google Drive](https://drive.google.com/drive/folders/1-hjysPAhyAWZK8zEEjI2wuY6Z2PODwjv?usp=sharing) |
| Design diagrams (use case, class, activity, ER, architecture) | [Google Drive](https://drive.google.com/drive/folders/1P1ZVu7XWIioMvH5vipk6q2XvbuF0FAAI?usp=sharing) |
| Test cases & results        | [Google Sheets](https://docs.google.com/spreadsheets/d/1NH2q-f3Z1dyMaHXAnb1agea1ZDpYURRqOOpGiX1RLUA/edit?usp=sharing) |
| Testing evidence            | [Google Drive](https://drive.google.com/drive/folders/18v3lrhdqH8nhszqEiWz-weL3Hg8cSom-?usp=sharing) |

The project was managed on a Trello board and in the [HemoCare-BBMS](https://github.com/HemoCare-BBMS) GitHub organization.

## Team

**Group L1** — supervised by **Mr. Saliya Wickramasinghe**

| Name                 | Role                   | GitHub                                   |
| -------------------- | ---------------------- | ---------------------------------------- |
| M. Fathima Samla     | Full Stack Development | [@MFSAMLA](https://github.com/MFSAMLA)   |
| H. Shaffron Wazny    | Frontend Development   | [@WAZNY-HS](https://github.com/WAZNY-HS) |
| A.M.M. Sajeeth       | Backend Development    | [@sajeethamm](https://github.com/sajeethamm) |
| I.L.M. Kamil         | Backend Development    | [@Kamildev353](https://github.com/Kamildev353) |

## License

This project was developed by Group L1 as coursework for EEY4189 – Software Design in Group.
All rights reserved by the authors.
