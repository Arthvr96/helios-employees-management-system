# Helios Employees Management System - demonstration version

## Table of contents
* [General info](#general-info)
* [List of features](#list-of-features)
* [Technologies](#technologies)
* [Setup](#setup)
* [Guide](#guide)
* [Note](#note)
* [Documentation](#documentation)


## General info
Branch with a demonstration version of the application. <br>
The application has been developed to facilitate the collection of employees dispositions. (In the past, proposals for days they could work were sent via email )<br>
The application grew very quickly. The list of current and future features can be found here [List of features](#list-of-features)<br>
The application supports only the <strong>Polish language</strong>. I recommend using google chrome translator if you don't know this language

## List of features
* Adding users to the database. 
* Dividing users into roles. (Administrator/User)
* Regular users (i.e. employees) have permissions to work on specific job roles. (Functionality to be used in the future)
* One login system that recognizes user roles
* Application state stored in database and updated in real time.
* System of creating cycles of sending dispositions by employees. (Cycle is rigidly set to a length of 7 days and each cycle starts from Friday)
* Form for sending dispositions by employees (only possible during an active cycle)
* Generate a list of all employees' dispositions and save the list in the archive.
* Generation of an email when the employee saves a disposition (emails are sent to the specified email address. Currently fixed in the code, in the future you will be able to change the e-mail in the settings of the admin panel)
  <br><br><strong>In the future</strong><br>
* Settings panel in admin view
* Creating a work schedule templates
* Creating a work schedule, manual
* Automatic creation of a work schedule
* Work schedule archive
* System of collecting statistics for employees and administrator.
* Separating logic and creating back-end based on node.js using firebase-sdk-admin

## Technologies
* React version: 17.0.2
* firebase: 9.4.1,
* formik: 2.2.9,
* react-helmet-async: 1.1.2,
* react-router-dom: 5.2.0,
* styled-components: 5.3.3,
* uniqid: 5.4.0,
* yup: 0.32.11

Dev deps:
* babel-eslint: 10.1.0,
* eslint: 7.32.0,
* eslint-config-airbnb: 19.0.0,
* prettier: 2.4.1
* husky: 4.3.8,
* lint-staged: 11.2.6,


Database: Firebase-firestore<br>
Authentication: Firebase-authentication

## Setup

Node version used to creating this project by create-react-app : 16.13.1

* Clone the repository.
* npm install.
* Create env.local file (in the src/demo/demoData file you will find all the secrets.) without it app will not work. <br> Remember to specify the e-mail address to which copies of employee instructions are to be sent
* npm run start.


## Guide

Several example users have been entered into the database.
For the administrator account and for one user, the password has been reset in order to be able to log in.

Admin :<br>
login: admin@hemademo.com<br>
pass: zaq1@WSX

User :<br>
login: demohema123@gmail.com<br>
pass: zaq1@WSX


## Note

This is the first demo version. The application has still a lot of optimization to do. Many bugs have been fixed but many more will appear. <br>
Due to the fact that the application is on the frontend I could not use the firebase admin SDK which would facilitate many things<br> but at the moment I can not node.js to such an extent to take on this task.

The problem is also a mess in styles. A couple of commits ago I did some cleanup with the styles but there is still a lot to do.<br>
The lack of react-storybook is noticeable. The choice of styled-components was also rather unsuccessful.

The reason for the lack of storybook or component tests is that the application was supposed to be much simpler.

Nevertheless, I'm providing this very early demo version to showcase my 300 hours of work.

## Documentation

Will be created in the near future
