function prevPage() {
    // Add functionality for previous page
    console.log('Previous page');
    changePage(now)
    now -= 1;
    renderObjects(now);
    resetRadioStatus(now);
}

function nextPage() {
    // Add functionality for next page
    console.log('Next page');
    if (changePage(now)) {
        if(now === data_list.length-1) {
            MySubmit = form_url;
            MySubmit += `${username_entry}=` + data_list[0]["username"] + "&";
            
            for(let i=1; i<data_list.length; i++) {
                if(i>=9 && i<=12) {
                    for(let q = 1; q <= gray_questions.length; q++) {
                        MySubmit += entry_list[i-1][q-1] + "=" + data_list[i][`Q${q}`] + "&";
                    };
                } else {
                    for(let q = 1; q <= questions.length; q++) {
                        MySubmit += entry_list[i-1][q-1] + "=" + data_list[i][`Q${q}`] + "&";
                    };
                }
            }

            MySubmit += "submit=Submit";
            window.location.replace(MySubmit);
        } else {
            now += 1;
            renderObjects(now);
            resetRadioStatus(now);
        }
        
    } else {
        alert("Cannot be empty!!!!");
    }
}

function changePage(now) {
    if (now == 0) {
        username = document.getElementById("username");
        if (username.value == "") {
            return false;
        }
        data_list[0]['username'] = username.value;
        console.log(data_list[0]['username'])
        return true;
    }

    let query_checked = true

    if(now>=9 && now<=12) {
        for(let q = 1; q <= gray_questions.length; q++) {
            let query = document.querySelector(`input[name="Q${q}"]:checked`);
            if (query == null) {
                query_checked = false;
            } else {
                data_list[now][`Q${q}`] = data_list[now]['data'][parseInt(query.value)-1]['value'] 
            }
        };
    } else {
        for(let q = 1; q <= questions.length; q++) {
            let query = document.querySelector(`input[name="Q${q}"]:checked`);
            if (query == null) {
                query_checked = false;
            } else {
                data_list[now][`Q${q}`] = data_list[now]['data'][parseInt(query.value)-1]['value'] 
            }
        }
    }

    return query_checked
}

function resetRadioStatus(now) {
    if(now>=9 && now<=12) {
        for(let q = 1; q <= gray_questions.length; q++) {
            for(let v = 1; v <= data_list[now]['data'].length; v++) {
                document.getElementById(`q${q}v${v}`).checked = false;
            }
    
            for(let v = 1; v <= data_list[now]['data'].length; v++) {
                if(data_list[now][`Q${q}`] === data_list[now]['data'][v-1]['value']) {
                    document.getElementById(`q${q}v${v}`).checked = true;
                    break;
                }
            }
        };
    } else {
        for(let q = 1; q <= questions.length; q++) {
            for(let v = 1; v <= data_list[now]['data'].length; v++) {
                document.getElementById(`q${q}v${v}`).checked = false;
            }
    
            for(let v = 1; v <= data_list[now]['data'].length; v++) {
                if(data_list[now][`Q${q}`] === data_list[now]['data'][v-1]['value']) {
                    document.getElementById(`q${q}v${v}`).checked = true;
                    break;
                }
            }
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function generateElements(data, width, type) {
    if(type === "video") {
        return `
            <video width="${width}" controls loop autoplay>
                <source src="${data}" type="video/mp4" />
            </video>
        `
    }
    else if(type === "image") {
        return `
            <img src="${data}" width="${width}"/>
        `
    }
}

function renderObjects(now) {
    if(now == 0) {
        let txt = `
            <br><br><br><br><br><br>
            <h1>User Study</h1>
            <form style="text-align: center;" align=“center”>
                <fieldset>
                    <legend>Username</legend>
                    <input type="text" id="username" value="">
                </fieldset>
            </form>
        `;
        document.getElementById("images").innerHTML = txt;
    } else {
        let imgs_element = ""
        for(let i = 1; i <= data_list[now]['data'].length; i++){
            imgs_element += `
                <div class="input-object">
                    ${generateElements(data_list[now]['data'][i-1]['url'], obj_width, element_type)}
                    <div class="titles">${obj_title} ${i}</div>
                </div>
            `
        }

        let txt = `
            <div>
                <label for="${data_list[now]["name"]}">
                    <div class="input-object">
                        ${generateElements(data_list[now]['input'], obj_width, element_type)}
                        <div class="titles">${input_title}</div>
                    </div>
                </label>
                <div class="video-row">
                    ${imgs_element}
                </div>
            </div>
        `;

        document.getElementById("images").innerHTML = txt;
        document.getElementById("text_prompt").innerHTML = `Questions`
        renderQuestions();
        document.getElementById("num_page").innerHTML = `${now}/${data_list.length-1}`;
    }
    if(now == 0) {
        document.getElementById("question").style.visibility="hidden";
    } else {
        document.getElementById("question").style.visibility="visible";
    }

    if(now == 0 || now == 1) {
        document.getElementById("prev_button").style.visibility="hidden";
    } else {
        document.getElementById("prev_button").style.visibility="visible";
    }

    if(now == data_list.length-1) {
        document.getElementById("next_button").innerHTML = `SUBMIT`;
    } else {
        document.getElementById("next_button").innerHTML = `NEXT`;
    }
}

function renderQuestions() {
    let txt = ""

    if(now>=9 && now<=12) {
        for(let q = 1; q <= gray_questions.length; q++) {
            txt += `
            <p>Q${q}. ${gray_questions[q-1]}</p>
            <div>`

            for(let v = 1; v <= data_list[now]['data'].length; v++){
                txt +=`
                    <input type="radio" id="q${q}v${v}" name="Q${q}" value="${v}" class="radio-container"/>
                    <label for="q${q}v${v}">${v}</label>
                `
            } 

            txt +=`
            </div>
            `
            document.getElementById("questions").innerHTML = txt
        };
    } else {
        for(let q = 1; q <= questions.length; q++) {
            txt += `
            <p>Q${q}. ${questions[q-1]}</p>
            <div>`

            for(let v = 1; v <= data_list[now]['data'].length; v++){
                txt +=`
                    <input type="radio" id="q${q}v${v}" name="Q${q}" value="${v}" class="radio-container"/>
                    <label for="q${q}v${v}">${v}</label>
                `
            } 

            txt +=`
            </div>
            `
            document.getElementById("questions").innerHTML = txt
        }
    }
}

function prohibitpreviouspage(){

    if(navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6 ){
        //Firefox
        setTimeout("fn_forward()",1);
        window.history.go(1);
    } else if (
        navigator.userAgent.indexOf('Safari') !== -1 &&
        navigator.userAgent.indexOf('Chrome') === -1 &&
        navigator.userAgent.indexOf('Chromium') === -1
    ) {
        // Safari
        setTimeout("fn_forward()", 1);
        window.history.forward();
    } else { //IE.Chrome.Edge
        window.history.forward();
    }
}

function fn_forward() {
    history.forward();
    setTimeout("fn_forward()",1);
}