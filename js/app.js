// ****** Variables *******//
const products = document.querySelector('.products .row');
const searchName = document.getElementById('name');
const searchSpecies = document.getElementById('species');
const searchGender = document.getElementById('gender');
const today = new Date().getFullYear();
const sort = document.getElementById('sort');

const url = 'https://rickandmortyapi.com/api/character';

// ****** AddEventListeners ******* //
eventListener()
function eventListener() {
    document.addEventListener('DOMContentLoaded', function () {
        fecthData(url) 
    })

    //searchSpecies
    searchSpecies.addEventListener('change', showChange)

    //searchGender
    searchGender.addEventListener('change', showChange);

    //sort
    sort.addEventListener('click', sortItem);

    // search
    searchName.addEventListener('keyup', showName)
}


// ****** functions ******* //
function fecthData(url) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText)
            let result = '';

            //options species
            const optionValue = [...new Set(data.results.map(item => item.species))];
            const optionGender = [...new Set(data.results.map(item => item.gender))];
            let op  = '';
            let op1
            optionValue.forEach(item =>{
                op += `
                <option value=${item}>${item}</option>
                `
            });
            optionGender.forEach(item =>{
                op1 += `
                <option value=${item}>${item}</option>
                `
            })
            searchSpecies.innerHTML = op;
            searchGender.innerHTML = op1;


            data.results.forEach(item => {
                result += `
                <div class="col-6 col-lg-3 col">
                <div class="in-col">
                    <div class="img-part">
                        <img src=${item.image} class="img-fluid" alt="">
                        <div class="abs-text">
                            <h3 id="sname">${item.name}</h3>
                            <span>id:${item.id} - created ${today - item.created.slice(0, 4)} years ago</span>
                        </div>
                    </div>
                    <div class="content-part">
                        <p><span>Status</span> <span>${item.status}</span></p>
                        <p><span>species</span> <span>${item.species}</span></p>
                        <p><span>gender</span> <span>${item.gender}</span></p>
                        <p><span>Origin</span> <span>${item.origin.name}</span></p>
                        <p><span>last location</span> <span>${item.location.name}</span></p>
                    </div>
                </div>
            </div>
                `;
            })
            products.innerHTML = result
        }
    }
    xhr.send();
}


//species
function showChange(e){
    const value = e.target.value;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(){
        if(this.status === 200){
            const data = JSON.parse(this.responseText)
            let result = '';
            data.results.forEach(item =>{
                if(value.toUpperCase() == item.species.toUpperCase()){
                    result += `
                    <div class="col-6 col-lg-3 col">
                    <div class="in-col">
                        <div class="img-part">
                            <img src=${item.image} class="img-fluid" alt="">
                            <div class="abs-text">
                                <h3 id="sname">${item.name}</h3>
                                <span>id:${item.id} - created ${today - item.created.slice(0, 4)} years ago</span>
                            </div>
                        </div>
                        <div class="content-part">
                            <p><span>Status</span> <span>${item.status}</span></p>
                            <p><span>species</span> <span>${item.species}</span></p>
                            <p><span>gender</span> <span>${item.gender}</span></p>
                            <p><span>Origin</span> <span>${item.origin.name}</span></p>
                            <p><span>last location</span> <span>${item.location.name}</span></p>
                        </div>
                    </div>
                </div>
                    `;
                } else if(value.toUpperCase() == item.gender.toUpperCase()){
                    result += `
                    <div class="col-6 col-lg-3 col">
                    <div class="in-col">
                        <div class="img-part">
                            <img src=${item.image} class="img-fluid" alt="">
                            <div class="abs-text">
                                <h3 id="sname">${item.name}</h3>
                                <span>id:${item.id} - created ${today - item.created.slice(0, 4)} years ago</span>
                            </div>
                        </div>
                        <div class="content-part">
                            <p><span>Status</span> <span>${item.status}</span></p>
                            <p><span>species</span> <span>${item.species}</span></p>
                            <p><span>gender</span> <span>${item.gender}</span></p>
                            <p><span>Origin</span> <span>${item.origin.name}</span></p>
                            <p><span>last location</span> <span>${item.location.name}</span></p>
                        </div>
                    </div>
                </div>
                    `;
                }
            })
            products.innerHTML = result
        }
    }
    xhr.send()
}

// sort item
function sortItem(e){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(){
        if(this.status === 200){
            const data = JSON.parse(this.responseText);
            const rever = data.results
            let result ='';
            let cond = false;
            if(!cond){
                rever.reverse()
                rever.forEach(item => {
                    result += `
                    <div class="col-6 col-lg-3 col">
                    <div class="in-col">
                        <div class="img-part">
                            <img src=${item.image} class="img-fluid" alt="">
                            <div class="abs-text">
                                <h3 id="sname">${item.name}</h3>
                                <span>id:${item.id} - created ${today - item.created.slice(0, 4)} years ago</span>
                            </div>
                        </div>
                        <div class="content-part">
                            <p><span>Status</span> <span>${item.status}</span></p>
                            <p><span>species</span> <span>${item.species}</span></p>
                            <p><span>gender</span> <span>${item.gender}</span></p>
                            <p><span>Origin</span> <span>${item.origin.name}</span></p>
                            <p><span>last location</span> <span>${item.location.name}</span></p>
                        </div>
                    </div>
                </div>  
                    `;
                })
            }  
            products.innerHTML = result
        }
    }
    xhr.send()
}


//show Name
function showName(e){
    const value = e.target.value.toLowerCase();
    const incol = document.querySelectorAll('.col');
    const name = document.querySelectorAll('#sname');
    for(i=0; i < incol.length; i++){
        if(!value || name[i].textContent.toLowerCase().indexOf(value)> -1){
            incol[i].style.display ="";
        } else{
            incol[i].style.display="none";
        }
    }
}

