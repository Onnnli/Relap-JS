import { max, set } from 'lodash';
import moment from 'moment';
moment().format();


import {attribute} from './helperForContact'
import {drawHeading} from './helperForContact'
import {table} from './helperForContact'
import {informationTable} from './helperForContact'
import {activeRow} from './helperForContact'
import {createColumn} from './helperForContact'
import {clickBtnDelete} from './helperForContact'
import {registrationDate} from './helperForContact'
import {scrollTab} from './helperForContact'




export function allClient(){
    let result = fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json')
        .then((response) => response.json())
        .then(data => {getClientName(data)});

        return result
};



function getClientName(client){
    informationTable(client) // client 
    drawHeading() 
    for(let i = 0; i < client.length; i++){
        let cli = client[i] 
        const row = activeRow(cli);
        for(let key in attribute){
            let keys = cli[key]
            let column = createColumn(keys, row, table);
            let attrKey = attribute[key];
            if(attrKey.label === 'Удалить' || attrKey.label === 'Регистрация'){
                if(attrKey.label === 'Удалить'){
                    const btnDelete = "<p class='btnDelete'> X </p>";
                    column.innerHTML = btnDelete;
                    column.addEventListener('click', () => clickBtnDelete(cli, row))
                }else{
                    registrationDate(keys, column);
                }
            } 
        }       
    }
    scrollTab()

    return true
}



