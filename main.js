
alert("Bienvenidos a mi Dietética");

let compra = prompt("¿Sobre qué producto quieres consultar?\n 1- Harinas\n 2- Frutos Secos\n 3- Almohaditas Rellenas\n 4- Lista de condimentos\n 5- Legumbres").toLowerCase();

if (compra == "harinas" || compra == "1"){
    let harinas = prompt("1- Harina 0000\n2- Harina integral \n3- Harina de almendra").toLowerCase();
    if (harinas == "harina 0000" || harinas == "1"){
        console.log("La Harina 0000 cuesta $1000 por KG.");
    }
    else if(harinas == "harina integral" || harinas == "2"){
        console.log("La Harina integral cuesta $1200 por KG.");          
    }
    else if(harinas == "harina de almendra" ||harinas == "3"){
        console.log("La Harina de almendra cuesta $1500 por KG.");
    }
    else{
         console.log("Solo tenemos esas 3 harinas.");
    }
}

else if(compra == "frutos secos" || compra == "2"){

     let frutos = prompt("1- Almendras \n2- Maní Pelado \n3- Nuez").toLowerCase();
    if (frutos == "almendras" ||frutos == "1"){
        console.log("El KG de Almendras cuesta $10000.");
    }
    else if(frutos == "mani" ||frutos == "maní" ||frutos == "maní pelado" || frutos == "mani pelado" || frutos == "2"){
        console.log("El KG de Maní Pelado cuesta $3000.");
    }
    else if(frutos == "nuez" ||frutos == "3"){
        console.log("El KG de Nuez cuesta $8000.");
    }
    else{
         console.log("Solo tenemos esos frutos secos.");
    }

}

else if(compra == "almohaditas rellenas" || compra == "3"){

     let frutos = prompt("Elije tu sabor\n1- Limón \n2- De frutilla \n3- De chocolate").toLowerCase();
    if (frutos == "limon" ||frutos == "limón" ||frutos == "1" ||frutos == "frutilla"||frutos == "2"||frutos == "chocolate"||frutos == "3"){
        console.log("El KG de cualquier sabor de almohaditas cuesta $7000.");
    }
   else{
    console.log("Solo tenemos esos sabores de almohaditas.");
   }
}
else if (compra == "lista de condimentos" || compra == "4"){           //Array
    const condimentos = [" Orégano $6100 Kg", " Ají molido $7400 Kg", " Pimienta $5600 Kg"];
    console.log("Los condimentos disponibles son: " + condimentos);
}
else if (compra == "legumbres" || compra == "5"){                      //Objetos

    const arvejas = {
        nombre:  "Arvejas",
        precio: "$1300 Por Kg",
    }
     const garbanzos = {
        nombre:  "Garbanzos",
        precio: "$1800 Por Kg",
    }
    legumbres = prompt(" 1- Arvejas\n 2- Garbanzos").toLowerCase();

    if(legumbres == "arvejas" || legumbres == "1"){
        console.log(arvejas.precio);
    }
    else if (legumbres == "garbanzos" || legumbres == "2"){
        console.log(garbanzos.precio);
    }

}

else { console.log("Solo tenemos esos productos."); }







