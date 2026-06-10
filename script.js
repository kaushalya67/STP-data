
const products=["Yogurt","Watalappan","Jelly Yogurt","Caramel Pudding"];
let shops=JSON.parse(localStorage.getItem("shops")||'["Main Shop"]');
let prices=JSON.parse(localStorage.getItem("prices")||'{"Yogurt":100,"Watalappan":150,"Jelly Yogurt":120,"Caramel Pudding":180}');
let sales=JSON.parse(localStorage.getItem("sales")||"[]");

date.value=new Date().toISOString().split('T')[0];

function login(){
 if(u.value==="admin" && p.value==="admin123"){
   login.style.display="none";
   app.style.display="block";
   init();
 } else alert("Invalid Login");
}
function logout(){location.reload();}

function init(){
 item.innerHTML=products.map(x=>`<option>${x}</option>`).join("");
 renderShops();
 renderPrices();
 renderTable();
}

function renderShops(){
 shop.innerHTML=shops.map(x=>`<option>${x}</option>`).join("");
 localStorage.setItem("shops",JSON.stringify(shops));
}

function addShop(){
 if(newShop.value){
  shops.push(newShop.value);
  newShop.value="";
  renderShops();
 }
}

function renderPrices(){
 prices.innerHTML="";
 const box=document.getElementById("prices");
 box.innerHTML="";
 products.forEach(pn=>{
   box.innerHTML += `<label>${pn}</label><input value="${prices[pn]}" onchange="updatePrice('${pn}',this.value)">`;
 });
}

function updatePrice(name,val){
 prices[name]=Number(val);
 localStorage.setItem("prices",JSON.stringify(prices));
 renderTable();
}

function saveSale(){
 const rec={
 date:date.value,
 item:item.value,
 shop:shop.value,
 qty:Number(qty.value),
 price:prices[item.value]
 };
 rec.total=rec.qty*rec.price;
 sales.push(rec);
 localStorage.setItem("sales",JSON.stringify(sales));
 renderTable();
}

function renderTable(){
 tbody.innerHTML="";
 let grand=0;
 sales.forEach(r=>{
 grand+=r.total;
 tbody.innerHTML += `<tr><td>${r.date}</td><td>${r.item}</td><td>${r.shop}</td><td>${r.qty}</td><td>${r.price}</td><td>${r.total}</td></tr>`;
 });
 summary.innerText=`Records: ${sales.length} | Total Sales: Rs. ${grand}`;
}

function downloadCSV(){
 let csv="Date,Item,Shop,Qty,Price,Total\n";
 sales.forEach(r=>csv+=`${r.date},${r.item},${r.shop},${r.qty},${r.price},${r.total}\n`);
 const a=document.createElement("a");
 a.href=URL.createObjectURL(new Blob([csv]));
 a.download="sales.csv";
 a.click();
}
