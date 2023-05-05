# CX-Weather

![Oracle](https://img.shields.io/badge/Oracle-F80000.svg?style=for-the-badge&logo=Oracle&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=black)
![Heroku](https://img.shields.io/badge/Heroku-430098.svg?style=for-the-badge&logo=Heroku&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B.svg?style=for-the-badge&logo=Nodemon&logoColor=white)
![.env](https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)


## Intro

A demo [Oracle CX app](https://docs.oracle.com/en/cloud/saas/marketing/ams-develop/Developers/rsys/responsys-apps-overview.htm) for Oracle Responsys.
* Built with Node.js and Express, 
* hosted on Heroku, 
* with a Firestore backend.

---

## Background

Oracle CX Apps enable clients and partners to build integrations between their systems and Oracle Marketing platforms by building apps. For Oracle Responsys, this enables marketers to extend the functionality of Responsys program orchestration, by invoking an app in the program journey. 


## Brief

To build a demo app for use in internal and client-facings demos. The app should be installable in Oracle Responsys, with a stretch goal to implement the other routes in the [app lifecycle](https://docs.oracle.com/en/cloud/saas/marketing/ams-develop/Developers/ams/develop/service-lifecycle.htm).


## Scope

This demo app can be successfully installed and uninstalled in Oracle Responsys; and saves critical install/uninstall metadata in Google Firestore.
I also made some progress on the [installConfig](https://docs.oracle.com/en/cloud/saas/marketing/ams-develop/Developers/ams/develop/app-configuration.htm) and [serviceConfig](https://docs.oracle.com/en/cloud/saas/marketing/ams-develop/Developers/rsys/concepts/design-time-overview.htm) routes, which can be invoked with Postman.


## Key Files

* [App.js](https://github.com/johanolofolsson/CX-Weather/blob/master/app.js)
  * [Install Route](https://github.com/johanolofolsson/CX-Weather/blob/master/routes/install.js)
  * [Uninstall Route](https://github.com/johanolofolsson/CX-Weather/blob/master/routes/uninstall.js)
  * [Config Route](https://github.com/johanolofolsson/CX-Weather/blob/master/routes/config.js)
    * [Config View](https://github.com/johanolofolsson/CX-Weather/blob/master/views/install/config.njk)
  	* [Config Error View](https://github.com/johanolofolsson/CX-Weather/blob/master/views/shared/config-error.njk)
