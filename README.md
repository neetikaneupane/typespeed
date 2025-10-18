# TypeSpeed
> A fast, responsive, and type-speed testing web application.  
> Explore your typing speed, accuracy, and improvements over time.

---
## Overview

**TypeSpeed** is a web-based typing test tool that allows users to measure how quickly and accurately they can type. It provides real-time feedback, performance statistics, and historical insights to help users track their improvement over time.

Key objectives:

- Provide a clean, responsive UI that works across devices.  
- Offer accurate metrics: words per minute (WPM), accuracy,etc.  
- Persist user scores (optionally) so users can see improvements.  
---

## Features

- **Real-time speed & accuracy measurement**  
- **Customizable test duration** (e.g. 30s, 60s, 120s)  
- **Error highlighting** with correction hints  
- **Performance dashboard** — track best scores and trends  
- **Responsive & accessible UI** (works on desktop and mobile)  
- **Support for multiple languages / text sources**  
- **Dark / Light mode toggle**  
- **Optional user account & statistics persistence**

---
## Demo


**State**
<img width="1895" height="786" alt="image" src="https://github.com/user-attachments/assets/9e5d3118-3c30-4fcc-b717-6427a532cfe4" />
<img width="1865" height="798" alt="image" src="https://github.com/user-attachments/assets/fb0eb645-f76c-4774-9e29-9da2ada8f4d6" />
<img width="1886" height="705" alt="image" src="https://github.com/user-attachments/assets/904ebaf4-9cf3-4dbd-a174-cfec18d7679a" />
<img width="1871" height="828" alt="image" src="https://github.com/user-attachments/assets/680b078a-4a90-4de1-a049-af788b24aee7" />
<img width="1719" height="712" alt="image" src="https://github.com/user-attachments/assets/a9adedf9-e2a1-4c90-9de1-06a34d44fb28" />
---

## Architecture & Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | HTML, CSS, JavaScript | UI, user interactions, real-time typing logic |
| Backend | Java / Spring Boot  | API endpoints, data persistence |
| Database | MySQL | Store user profiles, test results, history |
| Build / Tooling | Maven  | Dependency management, builds, packaging |

**Why this stack?**

- Java offers strong type safety and well-established tooling.  
- Maven gives clear build lifecycles and dependency resolution.  
- Decoupling frontend / backend allows independent scaling and flexibility.

---

## Installation & Setup

### Prerequisites

- Java JDK (version 17 or above)  
- Maven (or your preferred build tool)  
- Springboot
- Use Intellij IDE to get maven and springboot pre installed

### Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/neetikaneupane/typespeed.git
   cd typespeed

2. Configure environment variables / properties

Create application.properties (or application.yml) in the backend/src/main/resources/ directory (or appropriate location):
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/typespeed_db
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update
```
---

## Roadmap
| Milestone                                | Status      | Notes                    |
| ---------------------------------------- | ----------- | ------------------------ |
| Basic typing test                        | ✅ Complete  | Core logic working       |
| User authentication & result persistence | In progress | Save user history        |
| Dark / Light mode                        | ✅ Complete  | UI toggle                |
| Multiplayer / Competition mode           | Planned     | Real-time typing battles |
| Mobile app version                       | Planned     | React Native / Flutter   |
| Leaderboards / Social features           | Planned     | Share scores & compete   |





