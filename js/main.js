/// <reference types="../@types/jquery" />

$(document).ready(function() {
    $("#leftNav").addClass("d-none");
    $("#bar").removeClass("d-none");
    $("#close").addClass("d-none");

    $("#bar").on("click", function() {
        $("#sideBar").animate({ left: "0px" }, 400); 
        $("#close").removeClass("d-none"); 
        $("#bar").addClass("d-none"); 
        $("#leftNav").removeClass("d-none"); 

        
        $(".side-links a").each(function(index) {
            $(this).delay(200 * index).queue(function(next) {
                $(this).addClass("animate__animated animate__bounceInUp");
                next();
            });
        });
    });

    $("#close").on("click", function() {
        var leftNavWidth = $(".leftNav").innerWidth();
        $("#sideBar").animate({ left: `-${leftNavWidth}px` }, 400);
        $("#close").addClass("d-none"); 
        $("#bar").removeClass("d-none");

        $(".side-links a").removeClass("animate__animated animate__bounceInUp");
    });
});




//.................................................start Home.............................................

async function getHome() {
    try {
        document.getElementById("spinner").classList.remove("d-none")
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        
        if (!api.ok) {
            throw new Error('Failed to fetch data');
        }
        
        let data = await api.json();
        console.log(data);
        displayHome(data);
    } catch (error) {
        console.error('Error fetching data:', error);
       
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }
}



function displayHome(data) {
  let homeData = ``;
  for (let i = 0; i < data.meals.length-5; i++) {
    homeData += `

 <div class="col-sm-12 col-md-4 col-lg-3   " >
                <div class="img-hov position-relative " onclick="getDetails('${data.meals[i].idMeal}')">
                    <img src="${data.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="layer-img px-2  position-absolute rounded-3 d-flex justify-content-start align-items-center overflow-hidden">
                        <h2 class="">${data.meals[i].strMeal}</h2>
                    
                    </div>
                </div>

            </div>



`;
  }
  document.getElementById("rowData").innerHTML = homeData;
}

getHome();


async function getDetails(id){
    try {
        document.getElementById("spinner").classList.remove("d-none")
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        if (!api.ok) {
            throw new Error('Failed to fetch data');
        }
        
        let data = await api.json();
        console.log(data);
        displayDetails(data.meals[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
       
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }



}

function displayDetails(data){
   


let ingredients = ``

for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1 list-unstyled w-25">${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}</li>`
    }
}


let box =``
    
    box += `
    <div class="col-md-4 text-white">
              <img src="${data.strMealThumb}" class="w-100 rounded-3" alt="">
              <h2>${data.strMeal}</h2>
             </div>
             <div class="col-md-8 text-white">
              <h2>Instructions</h2>
              <p>${data.strInstructions}</p>
              <h3>Area : ${data.strArea}</h3>
              <h3>Category : ${data.strCategory}</h3>
              <h3>Recipes : </h3>
               <ul class="d-flex g-3 flex-wrap">
               ${ingredients}
            </ul>
              <h3 class="">Tags :<br> <br> <span class="bg-primary rounded-2 px-3 mt-3">${data.strTags}</span></h3>
             
             <button class="btn btn-success text-white mt-3" ><a href="${data.strSource}" target="-blank" class="text-decoration-none text-white">Source</a> </button>
             <button class="btn btn-danger text-white mt-3" ><a href="${data.strYoutube}" target="-blank" class="text-decoration-none text-white">Youtube</a> </button>
             </div>
     
    
    
    
    `;
  document.getElementById("rowData").innerHTML = box;
    searchContainer.innerHTML=""



}



//....................................................End Home...............................................


//....................................................Start Search...............................................

function displaySearch(){
    let searchContainer = document.getElementById("searchContainer")
   
    searchContainer.innerHTML = `
    <div class="col-md-6">
    <input  oninput="searchByName(this.value)"  type="text" id="searchInput" class="w-100 form-control bg-transparent text-white" placeholder="Search by Name">
</div>
<div class="col-md-6">
    <input maxlength="1" oninput="searchByFirstLetter(this.value)" type="text" class="w-100 form-control bg-transparent text-white" placeholder="Search by First Letter">
</div>
    
    
    
    `
   rowData.innerHTML=""
//    
}
document.getElementById("search").addEventListener("click",function(event){
    event.preventDefault(); 
displaySearch();
})

async function searchByName(name) {
    try {
        document.getElementById("spinner").classList.remove("d-none");

        if (!name) {
            document.getElementById("searchContainer").innerHTML = ''; 
        }

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        
        if (!api.ok) {
            throw new Error('Failed to fetch data');
        }
        
        let data = await api.json();
        console.log(data);
        displaySearchName(data);

    } catch (error) {
        console.error('Error fetching data:', error);
       
    }
    finally {
        document.getElementById("spinner").classList.add("d-none");
    }
}


function displaySearchName(data) {
    let searchName = ``;
    for (let i = 0; i < data.meals.length; i++) {
      searchName += `
  
   <div class="col-sm-12 col-md-4 col-lg-3   " >
                  <div class="img-hov position-relative " onclick="getDetails('${data.meals[i].idMeal}')">
                      <img src="${data.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                      <div class="layer-img px-2  position-absolute rounded-3 d-flex justify-content-start align-items-center overflow-hidden">
                          <h2 class="">${data.meals[i].strMeal}</h2>
                      
                      </div>
                  </div>
  
              </div>
  
  
  
  `;
  
    }
    document.getElementById("rowData").innerHTML = searchName;
  }


  async function searchByFirstLetter(letter) {
    try {
        document.getElementById("spinner").classList.remove("d-none");

       
        if (!letter) {
            document.getElementById("searchContainer").innerHTML = ''; 
            return;
        }

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        
        if (!api.ok) {
            throw new Error('Failed to fetch data');
        }
        
        let data = await api.json();
        console.log(data);
        displayFirstLetter(data);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    finally {
        document.getElementById("spinner").classList.add("d-none");
    }
}

function displayFirstLetter(data) {
   
    let searchName = ``;
    for (let i = 0; i < data.meals.length; i++) {
        searchName += `
            <div class="col-sm-12 col-md-4 col-lg-3">
                <div class="img-hov position-relative" onclick="getDetails('${data.meals[i].idMeal}')">
                    <img src="${data.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="layer-img px-2 position-absolute rounded-3 d-flex justify-content-start align-items-center overflow-hidden">
                        <h2>${data.meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("rowData").innerHTML = searchName;
  

}


//.........................................End Search.......................................................

//..........................................start Categories....................................................


async function getCategories() {
    try {
        document.getElementById("spinner").classList.remove("d-none")

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let result = await api.json();
        console.log(result);
        displayCategories(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }
}

function displayCategories(result) {
    let category = '';
    for (let i = 0; i < result.categories.length; i++) {
        category += `
            <div class="col-sm-12 col-md-4 col-lg-3" >
                <div class="img-hov position-relative" onclick="getCatMeals('${result.categories[i].strCategory}')">
                    <img src="${result.categories[i].strCategoryThumb}" class="w-100 rounded-3" alt="">
                    <div class="layer-img px-2 flex-column position-absolute rounded-3 d-flex justify-content-center align-items-center overflow-hidden">
                        <h2>${result.categories[i].strCategory}</h2>
                        <p class="text-center">${result.categories[i].strCategoryDescription.slice(0,130)}</p>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("rowData").innerHTML = category;
}

document.getElementById("Categories").addEventListener("click", function(event) {
    event.preventDefault();
    getCategories();
});



async function getCatMeals(category){
    try {
        document.getElementById("spinner").classList.remove("d-none")

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let result = await api.json();
        console.log(result);
        displayCatMeals(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }

}
function displayCatMeals(result){

    let meals = '';
    for (let i = 0; i < result.meals.length; i++) {
        meals += `
            <div class="col-sm-12 col-md-4 col-lg-3" >
                <div class="img-hov position-relative" onclick="displayMealsDetails(${result.meals[i].idMeal})">
                    <img src="${result.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="layer-img px-2  position-absolute rounded-3 d-flex justify-content-center align-items-center overflow-hidden">
                        <h2>${result.meals[i].strMeal}</h2>
                       
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("rowData").innerHTML = meals;



}


async function displayMealsDetails(mealId) {
    try {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        let result = await api.json();
        
        let meal = result.meals[0]; 
        
        let ingredients = '';
        
        
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            
            if (ingredient && measure) {
                ingredients += `<li class="alert alert-info m-2 p-1 list-unstyled w-25">${measure} ${ingredient}</li>`;
            }
        }
        
        let boxMeals = `
            <div class="row">
                <div class="col-md-4 text-white">
                    <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3>Area: ${meal.strArea}</h3>
                    <h3>Category: ${meal.strCategory}</h3>
                    <h3>Recipes:</h3>
                    <ul class="d-flex flex-wrap">
                        ${ingredients}
                    </ul>
                    <h3>Tags:<br><br><span class="bg-primary rounded-2 px-3 mt-3">${meal.strTags}</span></h3>
                    <button class="btn btn-success text-white mt-3"><a href="${meal.strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
                    <button class="btn btn-danger text-white mt-3"><a href="${meal.strYoutube}" target="_blank" class="text-decoration-none text-white">Youtube</a></button>
                </div>
            </div>
        `;
        
        document.getElementById("rowData").innerHTML = boxMeals;
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}






//.....................................................End Categories............................................


//.......................................................start Area.........................................


async function getArea() {
    try {
        document.getElementById("spinner").classList.remove("d-none")

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let result = await api.json();
        console.log(result);
        displayAreas(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }
}


function displayAreas(result) {
    let area = '';
    for (let i = 0; i < result.meals.length; i++) {
        area += `
            <div class="col-md-3 text-white d-flex justify-content-center align-items-center flex-column" onclick="getAreaMeals('${result.meals[i].strArea}')">
            <i class="fa-solid fa-house-laptop text-white" id="areaIcon"></i>
            <h2>${result.meals[i].strArea}</h2>
           </div>
        `;
    }
    document.getElementById("rowData").innerHTML = area;
}


document.getElementById("area").addEventListener("click",function(event){
    event.preventDefault();
    getArea();
})



async function getAreaMeals(country) {
    try {
        document.getElementById("spinner").classList.remove("d-none")

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
        let result = await api.json();
        console.log(result);
        displayAreaMeals(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }
}


function displayAreaMeals(result){

    let areaMeals = '';
    for (let i = 0; i < result.meals.length; i++) {
        areaMeals += `
            <div class="col-sm-12 col-md-4 col-lg-3" >
                <div class="img-hov position-relative" onclick="displayMealsDetails(${result.meals[i].idMeal})">
                    <img src="${result.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="layer-img px-2  position-absolute rounded-3 d-flex justify-content-center align-items-center overflow-hidden">
                        <h2>${result.meals[i].strMeal}</h2>
                       
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("rowData").innerHTML = areaMeals;



}




//.......................................................End Area.........................................



//.......................................................start Ingredients.........................................



async function getIngredients() {
    try {
        document.getElementById("spinner").classList.remove("d-none")

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let result = await api.json();
        console.log(result);
        displayIngredients(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }
}


function displayIngredients(result) {
    let ingred = '';
    for (let i = 0; i < result.meals.length-555; i++) {
        ingred += `
            <div class="col-md-3 text-white d-flex justify-content-center align-items-center flex-column" onclick="getIngredientsMeals('${result.meals[i].strIngredient}')">
            <i class="fa-solid fa-drumstick-bite text-white"></i>
            <h2>${result.meals[i].strIngredient}</h2>
            <p class="text-center">${result.meals[i].strDescription.slice(0,150)}</p>
           </div>
        `;
    }
    document.getElementById("rowData").innerHTML = ingred;
}


document.getElementById("Ingredients").addEventListener("click",function(event){
    event.preventDefault();
    getIngredients()
})





async function getIngredientsMeals(type) {
    try {
        document.getElementById("spinner").classList.remove("d-none")

        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`);
        let result = await api.json();
        console.log(result);
        displayIngredientsMeals(result);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    finally{
        document.getElementById("spinner").classList.add("d-none")

    }
}



function displayIngredientsMeals(result){

    let areaMeals = '';
    for (let i = 0; i < result.meals.length; i++) {
        areaMeals += `
            <div class="col-sm-12 col-md-4 col-lg-3" >
                <div class="img-hov position-relative" onclick="displayMealsDetails(${result.meals[i].idMeal})">
                    <img src="${result.meals[i].strMealThumb}" class="w-100 rounded-3" alt="">
                    <div class="layer-img px-2  position-absolute rounded-3 d-flex justify-content-center align-items-center overflow-hidden">
                        <h2>${result.meals[i].strMeal}</h2>
                       
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("rowData").innerHTML = areaMeals;



}


//.......................................................End Ingredients........................................



// ............................................start Contact.....................................................


document.getElementById("contact").addEventListener("click", function(event) {
        event.preventDefault();
        displayContact();

})

function displayContact() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation('nameInput')" type="text" class="text-white bg-transparent form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation('emailInput')" type="email" class="bg-transparent text-white form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation('phoneInput')" type="text" class="bg-transparent text-white form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation('ageInput')" type="number" class="bg-transparent text-white form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation('passwordInput')" type="password" class="bg-transparent text-white form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password Minimum eight characters, at least one letter and one number:
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation('repasswordInput')" type="password" class="bg-transparent text-white form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3" onclick="handleSubmit(event)">Submit</button>
    </div>
</div>`;
}



let isNameValid = false;
let isEmailValid = false;
let isPhoneValid = false;
let isAgeValid = false;
let isPasswordValid = false;
let isRepasswordValid = false;


function inputsValidation(inputId) {
    const nameInput = document.getElementById('nameInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const ageInput = document.getElementById('ageInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();
    const repasswordInput = document.getElementById('repasswordInput').value.trim();

    const nameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,14}$/;
    const ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][0-9]|200)$/;
    const passwordRegex = /^(?=.*[A-Za-z])[A-Za-z\d@$!%*?&]{8,}$/;
   
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.classList.add('d-none'));

   
    switch (inputId) {
        case 'nameInput':
            if (!nameRegex.test(nameInput)) {
                document.getElementById('nameAlert').classList.remove('d-none');
            }
            break;
        case 'emailInput':
            if (!emailRegex.test(emailInput)) {
                document.getElementById('emailAlert').classList.remove('d-none');
            }
            break;
        case 'phoneInput':
            if (!phoneRegex.test(phoneInput)) {
                document.getElementById('phoneAlert').classList.remove('d-none');
            }
            break;
        case 'ageInput':
            if (!ageRegex.test(ageInput)) {
                document.getElementById('ageAlert').classList.remove('d-none');
            }
            break;
        case 'passwordInput':
            if (!passwordRegex.test(passwordInput)) {
                document.getElementById('passwordAlert').classList.remove('d-none');
            }
            break;
        case 'repasswordInput':
            if (passwordInput !== repasswordInput) {
                document.getElementById('repasswordAlert').classList.remove('d-none');
            }
            break;
        default:
            break;
    }

    isNameValid = nameRegex.test(nameInput);
    isEmailValid = emailRegex.test(emailInput);
    isPhoneValid = phoneRegex.test(phoneInput);
    isAgeValid = ageRegex.test(ageInput);
    isPasswordValid = passwordRegex.test(passwordInput);
    isRepasswordValid = passwordInput === repasswordInput;

   
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
}


function handleSubmit(event) {
    event.preventDefault();

    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid) {
        

        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.classList.add('d-none'));

        document.getElementById('submitBtn').disabled = true;
  }
}


//............................................End Contact.....................................................