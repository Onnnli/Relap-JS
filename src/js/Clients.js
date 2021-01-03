export class Clients{
    /**
     * proporties
     * @param [array] _tableClass -- сыы классы оформления
     * @param [array] data -- выходные данные
     * @param [array] _attribute -- управляем что выводим  и как
     * @param [array] _element -- куда выводить табл
     * @param [array] _header -- заголовок таблицы
     * @param [array] _headerClass -- css
     * 
     * 
     */

    constructor(){
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = '.forTable';
        this.attribute = [];
    }
    /**
     * method for set header
     * 
     */ 
    header(header) {
        if(typeof header === 'string' && header.trim() != ""){
            this._header = header.trim()
            console.log('header', this._header);
            return true;
        }
        return false;

    }    
    
    
    headerClass(headerClass) {
        if(typeof headerClass === 'object'){
            this._headerClass = headerClass
            return true;
        }
        return false;
    }

     /**
     * method for show table
     * 
     */
    element(element) {
        if(document.querySelector(element)){
            this._element = element;
            return true;
        }
        return false;
    }

    /**
     * method for show table
     * 
     */

     
    //рисуем таблицу
    render(data){      
        this.attribute = data.attribute;
        this.element(data.element);
        this.headerClass(data.headerClass);
        this.header(data.header);
        this.tableClass = data.tableClass;
        this.data = data.data;

        


        //header



        if(this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });

            document.querySelector(this._element).append(header)
        }


        // show table
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass);
        });
        //create table

        let trHeader = document.createElement('tr');

        for(let key in this.attribute){
            let th = document.createElement('th');
            if(this.attribute[key].label){
                th.textContent = this.attribute[key].label;
            } else{
                th.textContent = key;
            }
            trHeader.append(th);
        }
        table.append(trHeader);

        // рисуем табличку

        for (let i = 0; i < this.data.length; i++){
            
            let dataArr = this.data[i];
            let tr = document.createElement('tr');



            for(let key in this.attribute){
                let td = document.createElement('td');
                let value = dataArr[key];

                //есть ли функция в value

                if(this.attribute[key].value){
                    value = this.attribute[key].value[dataArr];
                    td.textContent = value;
                }else{}
                tr.append(td);    
            }
            table.append(tr)

        }
        document.querySelector(this._element).append(table)
    }
}