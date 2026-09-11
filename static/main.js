function fetchData(){
            fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                console.log("Date primite de la server: ", data)
                document.getElementById('temp').innerText = data.temperatura;
                document.getElementById('umid').innerText = data.umiditate;
                document.getElementById('prag_temp').innerText = data.prag_temp;
                document.getElementById('prag_umid').innerText = data.prag_umid;

                let led = document.getElementById('led')
                let marja = 2;
                if(data.temperatura !== "--" && data.prag_temp !== "--"){
                    if(parseInt(data.temperatura) < parseInt(data.prag_temp) + marja){
                        led.style.backgroundColor = "red";
                    }
                    else if(parseInt(data.temperatura) > parseInt(data.prag_temp) - marja){
                        led.style.backgroundColor = "blue";
                    }
                    else{
                        led.style.backgroundColor = "green";
                    }
                }

                let led_umid = document.getElementById('led_umid');
                if(data.umiditate !== "--" && data.prag_umid !== "--"){
                    if(parseInt(data.prag_umid) > parseInt(data.umiditate)){
                        led_umid.style.backgroundColor = "red";
                    }
                    else{
                        led_umid.style.backgroundColor = "green";
                    }
                }
            })
            .catch(err => console.error("Eroare comunicare: ", err));
        }
        setInterval(fetchData, 1000);