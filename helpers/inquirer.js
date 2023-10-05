require('colors');

const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `   ${'1.'.cyan} Crear una tarea`
            },
            {
                value: '2',
                name: `   ${'2.'.cyan} Listar tareas`
            },
            {
                value: '3',
                name: `   ${'3.'.cyan} Listar tareas completadas`
            },
            {
                value: '4',
                name: `   ${'4.'.cyan} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `   ${'5.'.cyan} Completar tarea(s)`
            },
            {
                value: '6',
                name: `   ${'6.'.cyan} Borrar tarea`
            },
            {
                value: '0',
                name: `   ${'0.'.cyan} Salir`
            },
        ]
    }
];
const preguntaPausa = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione ${'ENTER'.cyan} para continuar`
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('\n        Tareas por hacer         '.bgYellow);
    
    console.log('================================='.cyan);
    console.log('      Seleccione una opcion');
    console.log('=================================\n'.cyan);
    
    const {opcion} = await inquirer.prompt(preguntas);
    
    // console.log('\n=================================\n'.cyan);
    
    return opcion;
};

const pausa = async () => {
    
    // const pausa = await inquirer.prompt(preguntaPausa);
    // return pausa;
    console.log('\n');
    await inquirer.prompt(preguntaPausa);
};

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingerese un valor'.red;
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

    const choices = tareas.map(({id, desc}, index) => {

        return {
            value: id,
            name: `${index + 1}.`.cyan +' '+ `${desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.cyan + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar: '.red,
            choices
        }
    ]
    console.log();
    const {id} = await inquirer.prompt(preguntas);
    return id;
    
}

const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoCheckList = async (tareas = []) => {

    const choices = tareas.map(({id, desc, completadoEn}, index) => {

        return {
            value: id,
            name: `${index + 1}.`.cyan +' '+ `${desc}`,
            checked: (completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    console.log();
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
    
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
};