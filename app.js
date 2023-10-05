require('colors');

const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
    } = require('./helpers/inquirer');

const main = async () => {

    let option = '';

    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) { // Cargar tareas.
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        
        opcion = await inquirerMenu();

        switch (opcion) {
            case '1':   // Crear tarea
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':   // Listar tareas
                tareas.listadoCompleto();
            break;

            case '3':  // Listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': // Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': // Completar tareas
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                console.log(ids);
            break;

            case '6': // Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Esta seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('\n Tarea borrada'.red);
                    }
                }
            break;

        }
        
        
        guardarDB(tareas.listadoArr);
        
        await pausa();
        
    } while (opcion !== '0');

};

main();