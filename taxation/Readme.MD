# Taxation progress

## For Development Purpose

```
docker-compose build
```

```
docker-compose up
```

## To run single container and migrate backend

```
docker exec -it container_id /bin/bash
```

# Tax Management System

Welcome to the Tax Management System project! This system allows users to register, log in, and track their progress through various steps of the taxation process. Below, you'll find key functionalities and relevant information about the project.

## 1. User Registration

- **Endpoint:** `server/authentication/api/viewset.py::SignUpViewset`
- **Description:** Users can register to the system using the SignUpViewset, which handles the user registration process.

## 2. User Login

- **Endpoint:** `server/authentication/api/viewset.py::SignInViewset`
- **Description:** Users can log into the system using the SignInViewset, which manages the user authentication process.

## 3. Taxation Model

- **File:** `server/progress/models.py::TaxationProgress`
- **Description:** The TaxationProgress model is defined in this file, representing the data structure for storing users' taxation progress.

## 4. Retrieve Users Tax Status

- **Endpoint:** `server/progress/api/viewset.py::TaxationViewset`
- **Description:** Users can retrieve their tax status using the TaxationViewset, which handles the request to fetch and display the user's taxation progress.

## 5. User Taxation Progress

- **Endpoint:** `server/progress/api/viewset.py::TaxationViewset`
- **Example Response:**
  ```json
  {
    "id": 1,
    "step": "Tax return in progress",
    "total_steps": 8,
    "progress": 50.0,
    "steps": [
      { "key": 1, "value": "Account Setup" },
      { "key": 2, "value": "Provide tax docs" },
      { "key": 3, "value": "Provide missing info" },
      { "key": 4, "value": "Tax return in progress" },
      { "key": 5, "value": "Review" },
      { "key": 6, "value": "Esign" },
      { "key": 7, "value": "Submitted to IRS" },
      { "key": 8, "value": "Accepted" }
    ]
  }
  ```
- **Description:** After user signup or login, the system provides information about the user's taxation progress. The response includes the current step, total steps, progress percentage, and a list of steps with their corresponding keys and values.

## Postman Documentation

- **Postman Documentation:** [TaxationViewset Endpoint](https://documenter.getpostman.com/view/8004198/2s9YeD8Yvc)
