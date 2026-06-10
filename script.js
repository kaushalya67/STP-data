const shops=['Main Shop'];
const sales=[];

document.getElementById('date').value=new Date().toISOString().split('T')[0];

function login(){
 if(username.value==='admin' && password.value==='1234'){
  loginPage.style.display='none';
  appPage.style.display='block';
  loadShops();
 }
 else alert('Invalid Login');
}

function logout(){location.reload();}

function loadShops(){
 const s=document.getElementById('shop');
 s.innerHTML='';
 shops.forEach(x=>{
  let o=document.createElement('option');
  o.text=x;
  s.add(o);
 });
}

function addShop(){
 if(newShop.value){
  shops.push(newShop.value);
  newShop.value='';
  loadShops();
 }
}

function getPrice(item){
 return Number(document.getElementById('p'+item).value||0);
}

function addSale(){
 const item=document.getElementById('item').value;
 const qty=Number(document.getElementById('qty').value);
 const price=getPrice(item);
 const total=qty*price;

 sales.push({
  date:date.value,item,shop:shop.value,qty,price,total
 });

 render();
}

function render(){
 salesBody.innerHTML='';
 sales.forEach(r=>{
  salesBody.innerHTML+=`<tr>
  <td>${r.date}</td>
  <td>${r.item}</td>
  <td>${r.shop}</td>
  <td>${r.qty}</td>
  <td>${r.price}</td>
  <td>${r.total}</td>
  </tr>`;
 });
}

function downloadCSV(){
 let csv='Date,Item,Shop,Quantity,Unit Price,Total\n';
 sales.forEach(r=>{
  csv+=`${r.date},${r.item},${r.shop},${r.qty},${r.price},${r.total}\n`;
 });

 const blob=new Blob([csv],{type:'text/csv'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='sales.csv';
 a.click();
}
