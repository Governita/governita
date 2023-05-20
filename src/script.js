
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

function load(){
    const list = [aperitivos, tostas, piadinas, saladas, tabuas, sobremesas, agua_sumos, cafeteria, vinhos, cervejas, cocktails, espirituosas];
    list.forEach( element =>{
        let item = document.getElementById(element);
        request(element);
    })
}

function onClick(item){
    if(item.style.display == 'block'){
        item.style.display = 'none';
    }else{
        //request(item);
        item.style.display = 'block';
    }
}
 
function request(item){
    item.innerHTML = "";
    const url = 'https://docs.google.com/spreadsheets/d/';
    const ssid = '12DfFGnumxEpjz99TZq9CHpZBsPVULcH_KExm8-oI8ck'
    //const ssid = '1G4p_2e8SEiZykeXgDC0C5DK53x3DTRWbuaJHvWuyYrM';
    const q1 = '/gviz/tq?';
    const q2 = 'tqx=out:json';
    const q3 = 'sheet=Menu';
    let q = 'Select * WHERE A ="'+item.id+'"';
    const q4 = encodeURIComponent(q);
    //const q4 = 'Select%20*%20WHERE%20A%20%3D%22Tostas%22';

    const endpoint1 = `${url}${ssid}${q1}&${q2}&${q3}&tq=${q4}`;


    fetch(endpoint1)
    .then(res => res.text())
    .then(data => {
        const temp = data.substring(47).slice(0, -2);
        //console.log(temp);
        //console.log(data);
        const json = JSON.parse(temp);
        //console.log(json);
        const rows = json.table.rows;
        rows.forEach(element => {
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

            if ( element.c[1] != null){
                product.textContent = element.c[1].v;
            }else{
                product.textContent = "";
            }

            if ( element.c[2] != null){
                price.textContent = "\u20AC "+element.c[2].v;
            }else{
                price.textContent = "";
            }

            if ( element.c[3] != null){
                description.textContent = element.c[3].v;

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

        })
    })
}
