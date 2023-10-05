require('colors');

const Tarea = require('./tarea');

/**
 * _listado:
 *      { 'uuid-1223445666-556565-2': desc: Comprar comida, completadoEn: 9399393939} },
 */

class Tareas {

    _listado = {
        'abc': 123
    };

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            // const tarea = this._listado[key];
            // listado.push(tarea);
            listado.push(this._listado[key]);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // console.log(this._listado);
        // console.log(this.listadoArr);
        console.log('\n');

        this.listadoArr.map(({desc, completadoEn}, index) => {
    
            const completado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${index + 1}.`.cyan, `${desc}`, '::', completado);
        
        });
    }

    listarPendientesCompletadas(completadas) {
        console.log('\n');

        // let index = 0;
        
        this.listadoArr.map(({desc, completadoEn}, index) => {
            
            if (completadas && completadoEn) {
                    
                console.log(`${index + 1}.`.cyan, `${desc}`, '::', `${completadoEn}`.cyan);
                // index ++;

            } else if (!completadas && !completadoEn) {
                
                const completado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red
    
                console.log(`${index + 1}.`.cyan, `${desc}`, '::', completado);
                // index ++;

            } 
        });
    }

    toggleCompletadas(ids = []) {
        console.log('\n');

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toDateString();
            }
        });
        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;