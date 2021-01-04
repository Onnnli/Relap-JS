import { max, set } from 'lodash';
import moment from 'moment';
moment().format();


import {attribute} from './helperForContact'
import {drawHeading} from './helperForContact'
import {table} from './helperForContact'
import {informationTable} from './helperForContact'
import {modalSayNo} from './helperForContact'
    
import {scrollTab} from './helperForContact'




export function allClient(){
    let result = fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json')
        .then((response) => response.json())
        .then(data => {getClientName(data)});

        return result
};



function getClientName(client){
    informationTable(client)
    drawHeading()
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
    scrollTab()

    
    return true
}



