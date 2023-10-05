require('colors');

const mostrarMenu = () => {
        
    return new Promise(resolve => {

        console.clear();
        console.log('\n        Tareas por hacer         '.bgYellow);
        
        console.log('================================='.cyan);
        console.log('      Seleccione una opcion'.cyan);
        console.log('=================================\n'.cyan);
        
        console.log(`   ${'1.'.cyan} Crear una tarea`)
        console.log(`   ${'2.'.cyan} Listar tareas`)
        console.log(`   ${'3.'.cyan} Listar tareas completadas`)
        console.log(`   ${'4.'.cyan} Listar tareas pendientes`)
        console.log(`   ${'5.'.cyan} Completar tarea(s)`)
        console.log(`   ${'6.'.cyan} Borrar tarea`)
        console.log(`   ${'0.'.cyan} Salir`)
        
        console.log('\n=================================\n'.cyan);
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question('Seleccione una opcion: ', (opcion) => {
            readline.close();
            resolve(opcion);
        })

    })
}

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.cyan} para continuar\n`, (opcion) => {
            readline.close();
            resolve();
        })

    })


}

module.exports = {
    mostrarMenu,
    pausa
}