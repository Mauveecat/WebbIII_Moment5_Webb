"use strict";

//Variabler
let coursesEl = document.getElementById("courses");
let addCoursebtn = document.getElementById('addCourse');
let deleteCoursebtn = document.getElementById('deleteCourse');
let codeInput = document.getElementById("code");
let course_nameInput = document.getElementById("course_name");
let progressionInput = document.getElementById("progression");
let course_descriptionInput = document.getElementById("course_description");

//REST-link
let restAPIlink = "http://studenter.miun.se/~jens2001/writeable/WebbIII_Moment5/API/courses.php"
    //REST-link with id
let apiLinkCode = restAPIlink + "?id=";


//Eventlistener
window.addEventListener('load', getCourses);


//Om man är på index-sidan körs denna eventlistener
if (checkPage == true) {
    addCoursebtn.addEventListener('click', addCourse);
}
/*Om man är på edit-sidan körs denna event-listener - används ej i denna uppgift
if (checkPage == false) {
    document.getElementById("updateCourse").addEventListener('submit', updateCourse);

} */

//Funktioner
//Hämta alla kurser
function getCourses() {

    if (checkPage == true) {
        coursesEl.innerHTML = '';
        fetch(restAPIlink)
            .then(response => response.json())
            .then(data => {
                data.forEach(course => {
                    coursesEl.innerHTML +=
                        `<div class = "course">
                        <p>
                        <b>Course code:</b> ${course.code}
                        <br>
                        <b>Course name:</b> ${course.course_name}
                        <br>
                        <b>Course progression:</b> ${course.progression}
                        <br>
                        <b>Course description:</b> <a href="${course.course_description}" target="_blank">Länk</a>
                        <b>
                        </p>
                        <button id="${course.id}" onClick="deleteCourse(${course.id})">Delete</button>
                        </div>
                        `;
                })
            })
            //Om det finns en kod medskickad, körs detta på edit-sidan
    } else {

        //Hämta information om kursen med id
        fetch(restAPIlink + window.location.search)
            .then(response => response.json())
            .then(data => {
                data.forEach(courses => {
                    codeInput.value = courses.code;
                    course_nameInput.value = courses.course_name;
                    progressionInput.value = courses.progression;
                    course_descriptionInput.value = courses.course_description;
                })
            })
    }

}

//Radera kurs
function deleteCourse(id) {
    fetch(apiLinkCode + id, { method: 'DELETE', })

    .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
}

/* Uppdatera kurs - används ej i denna uppgift 
function updateCourse(id) {
    event.preventDefault();
    let code = codeInput.value;
    let course_name = course_nameInput.value;
    let progression = progressionInput.value;
    let course_description = course_descriptionInput.value;


    let course1 = { 'id': id, 'code': code, 'course_name': course_name, 'progression': progression, 'course_description': course_description };

    fetch(restAPIlink + window.location.search, {
        method: 'PUT',
        body: JSON.stringify(course1),
    })

    .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error:', error);
        })
} */

//Lägg till kurs
function addCourse(e) {
    e.preventDefault();
    let code = codeInput.value;
    let course_name = course_nameInput.value;
    let progression = progressionInput.value;
    let course_description = course_descriptionInput.value;

    let course1 = { 'code': code, 'course_name': course_name, 'progression': progression, 'course_description': course_description };

    fetch(apiLinkCode, {
        method: 'POST',
        body: JSON.stringify(course1),
    })


    .then(response => response.json())
        .then(data => {
            getCourses();
        })

    .catch(error => {
        console.log('Error: ', error);
    })


}