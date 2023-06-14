
window.onscroll = function() {scrollFunction()};
window.onload = function() {load()};

function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        document.getElementById("header").style.height = "100px";
        document.getElementById("logo").style.width = "110px";
        document.getElementById("main").style.marginTop = "200px";

        //document.getElementById("header_holder").style.textAlign = "left";
        
    } else {
        document.getElementById("header").style.height = "200px";
        document.getElementById("logo").style.width = "220px";
        document.getElementById("main").style.marginTop = "200px";


    }
}

function onClick(item){
    let box = document.getElementById(item.getAttribute('arg'));
    if(box.style.display == 'block'){
        box.style.display = 'none';
    }else{
        //request(item);
        box.style.display = 'block';
    } 
}
 
function load(){
    request_button("menu");
    request_button("bebidas");

    // list.forEach( element =>{
       //let item = document.getElementById(element);
       //request_item(element);
   // })
}

function request_item(item){
    item.innerHTML = "";
    const url = 'https://docs.google.com/spreadsheets/d/';
    const ssid = '12DfFGnumxEpjz99TZq9CHpZBsPVULcH_KExm8-oI8ck'
    //const ssid = '1G4p_2e8SEiZykeXgDC0C5DK53x3DTRWbuaJHvWuyYrM';
    const q1 = '/gviz/tq?';
    const q2 = 'tqx=out:json';
    const q3 = 'sheet=items';
    let q = 'Select * WHERE B ="'+item.id+'"';
    const q4 = encodeURIComponent(q);
    //const q4 = 'Select%20*%20WHERE%20A%20%3D%22Tostas%22';


    const endpoint1 = `${url}${ssid}${q1}&${q2}&${q3}&tq=${q4}`;

    console.log(endpoint1);

    fetch(endpoint1)
    .then(res => res.text())
    .then(data => {
        const temp = data.substring(47).slice(0, -2);
        //console.log(temp);
        //console.log(data);
        const json = JSON.parse(temp);
        console.log(json);
        const rows = json.table.rows;
        rows.forEach(element => {
        if(element.c[0].v == true){ 

            console.log(element);
            const new_row = document.createElement('div');
            const pd = document.createElement('div');
            const price = document.createElement('div');

            const product = document.createElement('div');
            const description = document.createElement('div');

            new_row.classList.add('row');
            pd.classList.add('column');
            price.classList.add('column');
            product.classList.add('product');
            description.classList.add('description');


            if ( element.c[2] != null){
                product.textContent = element.c[2].v;
            }else{
                product.textContent = "";
            }

            if ( element.c[3] != null){
                price.textContent = "\u20AC "+element.c[3].v;
            }else{
                price.textContent = "";
            }

            if ( element.c[4] != null){
                description.textContent = element.c[4].v;

            }else{
                description.textContent = "";
            }

            pd.append(product);
            pd.append(description);
            new_row.append(pd);
            new_row.append(price);

            item.append(new_row);


            /*
             element.c.forEach( (cell)=>{
                const box = document.createElement('div');
                if(cell == null){
                    box.textContent = "";
                }else{
                    box.textContent = cell.v;
                }
                box.classList.add('box');
                new_row.append(box);
            }) 
            */
        }
        })
    })
}

function request_button(item){
   // item.innerHTML = "";
    const url = 'https://docs.google.com/spreadsheets/d/';
    const ssid = '12DfFGnumxEpjz99TZq9CHpZBsPVULcH_KExm8-oI8ck'
    //const ssid = '1G4p_2e8SEiZykeXgDC0C5DK53x3DTRWbuaJHvWuyYrM';
    const q1 = '/gviz/tq?';
    const q2 = 'tqx=out:json';
    const q3 = 'sheet=buttons';
    let q = 'Select * WHERE A ="'+item+'"';
    const q4 = encodeURIComponent(q);

    const endpoint1 = `${url}${ssid}${q1}&${q2}&${q3}&tq=${q4}`;

    let menu_list = document.getElementById(item+"_list");
    
    fetch(endpoint1)
    .then(res => res.text())
    .then(data => {
        const temp = data.substring(47).slice(0, -2);
        const json = JSON.parse(temp);
        const rows = json.table.rows;
         
        rows.forEach(element => {
            console.log(element);

            const new_li = document.createElement('li');
            const button = document.createElement('div');
            const box = document.createElement('div');

            button.classList.add('main_button');
            button.setAttribute("arg", element.c[1].v);
            button.onclick = function() {onClick(this)};
            button.textContent = element.c[2].v;


            box.id = element.c[1].v;
            box.classList.add('box_content');
            box.style.display = 'none';
            request_item(box);

            new_li.append(button);
            new_li.append(box);
            menu_list.append(new_li);

        })
    })
}