//select element
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let temp ;

// get total
function gettotal() {
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
    total.innerHTML = result;
    total.style.background = '#040'
  }else {

     total.innerHTML = '';
    total.style.background = '#a00d0a'
  }

  

}
// create product
let dataPro ;
if(localStorage.product !=null ){
  dataPro = JSON.parse(localStorage.product);

}else{
  dataPro = [] ;

}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase() ,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML ,
    count: count.value,
    category: category.value.toLowerCase(),
    
  }
  //clean data
  if(title.value != '' && price.value != '' && category.value != '' && count.value < 100){
    if(mode === 'create'){
      //count
  if(newPro.count > 1){
    for(let i = 0 ;i<newPro.count ;i++){
      dataPro.push(newPro);

    }
  }else{
    dataPro.push(newPro);
 

  }

  }else{
    //update
    // x = [1,2,3]
    // x[1] =5;
    dataPro[temp] = newPro;
    mode = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block' ;

  }
  clear();

  }
 

  // save data in localstorage
  localStorage.setItem('product',JSON.stringify(dataPro));
  showData() ;

  
 
}

//clear inputs
function clear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;

}
//read 
function showData() {
  gettotal();
  let table = '' ;
  for(let i =0 ;i<dataPro.length ;i++){
    table += `
       <tr>
            <td>${i +1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
    
    `
  }

  document.getElementById('tbody').innerHTML = table ;
  let btnDelete =  document.getElementById('deleteAll');
  //لو عندي داتا الزرار يظهر
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All (${dataPro.length})</button>
    `

  }else{
    btnDelete.innerHTML = '';
  }
}
showData() ;

//delete 
function deleteData(i){
  dataPro.splice(i,1)  ;
  localStorage.product = JSON.stringify(dataPro);
  showData() ;

}
// delete All
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData() ;
}
// update 
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  gettotal();
  count.style.display = 'none';
  category.value = dataPro[i].category;
  submit.innerHTML = 'Update' ;
  mode = 'update' ;
  temp = i ;
  scroll({
    top:0,
    behavior:"smooth",

  })

}
// search

let searchMode = 'title' ;
function getSearchMode(id){
  let search = document.getElementById('search');

  if(id == 'searchTitle'){

    searchMode = 'title';

    
  }else{

    searchMode = 'category';
  }
  search.placeholder = `Search By  ${searchMode}`;
  search.focus();
  search.value = '' ;
 showData() ;

}

function searchData(value){
  let table = '' ;
  for(let i =0 ; i < dataPro.length ; i++){
    if(searchMode == 'title'){
    
      if(dataPro[i].title.includes(value)){
        table += `
        <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateData(${i})" id="update">update</button></td>
             <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
     
     `
       
        
      }
    }

  
  else{
    
      if(dataPro[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
             <td>${i}</td>
             <td>${dataPro[i].title}</td>
             <td>${dataPro[i].price}</td>
             <td>${dataPro[i].taxes}</td>
             <td>${dataPro[i].ads}</td>
             <td>${dataPro[i].discount}</td>
             <td>${dataPro[i].total}</td>
             <td>${dataPro[i].category}</td>
             <td><button onclick="updateData(${i})" id="update">update</button></td>
             <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
     
     `
       
        
      }
    }
    
  

  }
  document.getElementById('tbody').innerHTML = table ;
}


    
  


//clen data
