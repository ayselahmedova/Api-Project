const getData = async ()=> {
    const data = await fetch(`http://api.exchangerate.host/live?access_key=7802788bd3aa7bf0158b85ffdd18215b`);
    const result = await data.json();
    console.log(result);
}
// getData();

let btns = document.querySelectorAll(".btns .btn");
let changeBtns = document.querySelectorAll(".change-btns .btn");
let money = "RUB";
let changedMoney = "USD";
let amount = 0;
let firstInput =document.querySelector(".first");
let secondInput =document.querySelector(".second");
let show = document.querySelector(".show");
let show2 = document.querySelector(".show2");
console.log(btns);
btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        btns.forEach((btn)=>{
            btn.classList.remove("active");
        });
        e.target.classList.add("active");
        money = e.target.innerHTML;
        changeValyuta(firstInput.value.replace(/\s+/g, ''));
        changeShow()
    });
})
changeBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        changeBtns.forEach((btn)=>{
            btn.classList.remove("active");
        });
        e.target.classList.add ("active");
        changedMoney = e.target.innerHTML;
        changeValyuta(secondInput.value.replace(/\s+/g, ''));
        changeShow()
    });
});


firstInput.addEventListener('keyup',(e)=>{
    changeValyuta(e.target.value.replace(/\s+/g, ''));
});
secondInput.addEventListener('keyup',(e)=>{
    changeValyuta(e.target.value.replace(/\s+/g, ''));
});

function changeValyuta(amount){
    const apiKey = '7802788bd3aa7bf0158b85ffdd18215b';
    let query=`http://api.exchangerate.host/convert?from=${money}&to=${changedMoney}&amount=${amount}&access_key=${apiKey}`;
    

    
    fetch(query).then(res => res.json()).then(data =>{
    
    console.log(data);
        if(data.result==undefined){
               secondInput.value='0';
       }
       else{
            secondInput.value= parseFloat(data.result).toFixed(4);
       }});
}
function changeShow(){
    const apiKey = '7802788bd3aa7bf0158b85ffdd18215b';
    let query=`http://api.exchangerate.host/convert?from=${money}&to=${changedMoney}&amount=1&access_key=${apiKey}`;
    

    
    fetch(query).then(res => res.json()).then(data =>{
    
    console.log(data);
        if(data.result==undefined){
            show.innerHTML='0';
            show2.innerHTML='0';
       }
       else{
            let res = parseFloat(data.result).toFixed(4);
            show.innerHTML= `
            1 ${money} = ${res} ${changedMoney}
            `
            show2.innerHTML= `
            1 ${money} = ${res} ${changedMoney}
            `
       }});
}
   

