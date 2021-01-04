export const attribute = {
    'name': {
        'label': 'Имя'
    },
    'company': {
        'label': 'Компания'
    },
    'email': {
        'label': 'E-mail'
    },
    'phone': {
        'label': 'Телефон'
    },
    'balance': {
        'label': 'Баланс'
    },
    'registered': {
        'label': 'Регистрация'
    },
    'delete': {
        'label': 'Удалить'
    }
};

export const table = document.querySelector('.table-client');

export function drawHeading() {
    let headingRow = document.createElement('tr')
    for(let key in attribute){
        let nameHeadingRow = document.createElement('th');
        if(attribute[key].label){
            nameHeadingRow.textContent = attribute[key].label;
        }else{
            nameHeadingRow.textContent = key;
        }
        headingRow.append(nameHeadingRow);
    }
    table.append(headingRow);
}
export function mainTable(client) {
    for(let i = 0; i < client.length; i++){
    
        let cli = client[i] 
               
        const row = document.createElement('tr');
            if(cli.isActive){
                row.style.backgroundColor = 'white'
                row.style.color = '#333333';
                row.style.boxShadow = '0px 5px 15px 5px rgba(0,0,0,0.5)'
            }else{
                row.style.color = '#33333356'
            }
            
        for(let key in attribute){
            
            const column = document.createElement('td');
            
            row.append(column);
            table.append(row)
            column.textContent = cli[key]; 
            
            
            if(attribute[key].label === 'Удалить' || attribute[key].label === 'Регистрация'){
                if(attribute[key].label === 'Удалить'){
                    const btnDelete = "<p class='btnDelete'> X </p>";
                    column.innerHTML = btnDelete;
                    column.onclick = function(){
                        const modal = document.querySelector('.delete-overlay');
                        modal.classList.remove('close');
                        modal.classList.add('open')
                        const text = document.querySelector('.delete-text');
                        text.innerHTML = `Вы действительно хотите удалить ${cli.name}?`
                        document.querySelector('.yes').onclick = function(){
                            row.remove();
                            modal.classList.add('close');
                            modal.classList.remove('open');
                        
                            let success = document.querySelector('.success-delete');
                        
                            function sh() {
                                success.classList.add('open');
                                success.classList.remove('close');
                            }
                            setTimeout(sh, 700);
                            function cl() {
                                success.classList.add('close');
                                success.classList.remove('open')
                            }
                            setTimeout(cl, 2000)
                        };

                        document.querySelector('.no').onclick = modalSayNo;
                    };

                    
                }else{
                    let thisTime = cli[key];
                        thisTime = thisTime.split('T').join(' '); // удаляем букву Т
                    let time = moment(thisTime)
                    let timeFormate = time.format("Do MMMM YYYY");
                    column.innerHTML = timeFormate;
                }
            } 
        }    
    }
}
export function informationTable(client){
    let female = 0;
    let male = 0;
    let numBalFemale = []
    let maxBalanceFemale = 0
    let numBalMale = []
    let maxBalanceMale = 0

    for(let i = 0; i < client.length; i++){
        let cli = client[i]
        if(cli.gender === 'female' && cli.balance){
            female++
            let bal = cli.balance;
            let newBal = bal.replace('$', '')
            .replace(',', '')
            .trim();
            numBalFemale.push(+newBal)
            maxBalanceFemale = Math.max.apply(null, numBalFemale);
        }else{
            male++
            let bal = cli.balance;
            let newBal = bal.replace('$', '')
            .replace(',', '')
            .trim();
            numBalMale.push(+newBal)
            maxBalanceMale = Math.max.apply(null, numBalMale);
            
        }
        let maleAmount = document.querySelector('.maleAmount');
        maleAmount.textContent = male;
        let femaleAmount = document.querySelector('.femaleAmount');
        femaleAmount.textContent = female;
            let a = maxBalanceFemale.toString();
            let aa = a.slice(0, 1);
            let ab = a.slice(1)
            
            let b = maxBalanceMale.toString();
            let ba = b.slice(0, 1);
            let bb = b.slice(1);


        document.querySelector('.maxFemale').textContent = `$ ${aa}, ${ab}`;
        document.querySelector('.maxMale').textContent = `$ ${ba}, ${bb}`;
    }
}

const row = document.createElement('tr');
const modal = document.querySelector('.delete-overlay');


export function modalSayNo(){
    modal.classList.add('close');
    modal.classList.remove('open');
}

export function scrollTab() {
    let blockTab = document.querySelector('.blockTable');
    let btnScroll = document.createElement('div');
    btnScroll.classList.add('btnScroll')
    btnScroll.textContent = `\u2191`
    blockTab.addEventListener('scroll', function(){
    if(blockTab.scrollTop > 500){
        btnScroll.style.opacity = '100'

    }else{
        btnScroll.style.opacity = '0'
    }
        
    blockTab.append(btnScroll);

    btnScroll.addEventListener('click', function n(){
        if(blockTab.scrollTop > 0){
            blockTab.scrollBy(0,-100)
            setTimeout(n(), 20);
        }
        
    })
})
}


