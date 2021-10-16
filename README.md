# BNZ Technical Test - Front End (React)

Hello 👋 

Thank you so much for taking the time to interview with us here at BNZ. Before the in-person/remote interview, we'd appreciate if you could begin a small exercise, which will facilitate some discussion during the interview.

The aim of this exercise is to gauge your knowledge of Front End frameworks and browsers. Your time is valuable, so we ask you don't spend more than **30 minutes** coding - we'll use the example you create for review/peer programming during the interview (don't worry if you don't get more than a "hello world" running and only bring some ideas how you might implement this feature).

This isn't a exam, there are no right or wrong solutions. We are more interested in your approach and reasoning behind the decisions you have (or would) implement.

## Background
* BNZ is creating a pattern library website for commonly used patterns of some of our components
* A **navigation** component is required to be built by a developer (you!)
* This navigation component will serve as a starting point for our UX Research team, who wish to test the information architecture of the navigation items, before UI designs are created.

## Requirements
* Navigation component takes an array of data (<code>data.js</code>) which displays the name of the item.
* Navigation items may be **nested** with children
* No routing or links are required - only display the name of the item for this exercise
* Each navigation item has an <code>id</code>, <code>name</code> and (optionally) <code>children</code>
* If an item has children, its respective children should be show a relationship to their parent (e.g. indenting).

An example of a completed navigation list is shown below, but feel free to only use this as a suggestion.

<img src="https://github.com/bnz-digital/techincal-test-front-end-react/blob/main/IA.png?raw=true" alt="IA image" width="400"/>

## Task

### Installation
* Create a new React application for the browser
* Download the <code>data.js</code> file located in this repository and place it inside your application - we'll treat this as our api.

### Data
The <code>data.js</code> file exports one function <code>fetchData()</code>, which should be used instead of an HTTP request (for simplicity of this test). This function simulates a small bit of network delay. We suggest fetching this data from your <code>App.js</code> file.

### Create Navigation Component
We suggest creating a reusable component that can be rendered from your <code>App.js</code> component, using the data from the <code>data.js</code> file.

The Information Architecture in the data looks like this:

* Home
* Alerts
    * Usage and examples
    * Alert
    * Warning Alert
* Buttons
    * Usage and Examples
    * Button
    * Button Group
* Forms
    * Usage and examples
    * Inputs
        * Credit Card Input
        * Number Input
    * Selectors
        * Checkbox
        * Date Picker
        * Radio

## Submission
Please push your code to this repository, and let us know when you're done. We'll get the interviewers to have a look over your code before the interview.

Best of luck! 🎉
