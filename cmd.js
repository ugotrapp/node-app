const yargs = require('yargs');
const fs = require("fs");
const chalk = require("chalk");
const { title } = require('process');

yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {
        console.log("Voici la liste des notes");

        fs.readFile("data.json", "utf-8", (err,dataJSON) => {
            if(err) console.log(err);
            else {
                const notes = JSON.parse(dataJSON);
                notes.forEach(note => {
                    console.log(chalk.inverse.green(`${note.id}. ${note.title}`));
                })    
            }
        })
    }
}).command({
    command: 'add',
    describe: "Ajoute une note",
    builder: {

        id:{
            describe:"id de la note",
            demandOption:true,
            type: Number
        },
        title: {
            describe: "Titre de ma note",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Message de ma note",
            demandOption: false,
            type: "string"
        }
    },
    handler: (argv) => {
        // Pour modifier le contenu d'un fichier
        // 1. le récupérer
        fs.readFile("data.json", "utf-8", (err,dataJSON) => {
            // 1a. Grâce à utf-8, le contenu du fichier
            // est en  en chaîne de caractère
            console.log(dataJSON)

            // 1b. Je transforme la string JSON en valeur JS
            const notes = JSON.parse(dataJSON)
            console.log(notes);
    
            // 2. Exécuter les modifications en JS

            const objetNotes = {
                id:argv.id,
                title: argv.title,
                body: argv.body
            }

            notes.push(objetNotes);
            console.log(notes);
    
            // 2b. Transformer mes modifs valeurs JS en chaine JSON
            const notesJSON = JSON.stringify(notes);
            console.log(notesJSON);

            // 3. Envoyer les modifs de mon JSON en écrasant le fichier
            fs.writeFile("data.json",notesJSON,(err) => {
                if(err) console.log(err);
                else {
                    console.log(chalk.green("La note a été ajoutée"));
                }
            });
        })
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    handler: (argv) => {
        fs.readFile("data.json", "utf-8", (err,dataJSON) => {
            console.log(dataJSON);
            const id = JSON.parse(dataJSON)
            console.log(id)
               
                

            for(let i=0;i < id.length; i++){
                if (id[i].id === argv.id) {
                    id.splice(i, 1)
                }
            }

    

            const idJSON = JSON.stringify(id);
            console.log(idJSON);

            fs.writeFile("data.json",idJSON,(err) => {
                if(err) console.log(err);
                else {

                    
        console.log(chalk.bold.red("la note a été supprimé"));
            }
        });
    })
    }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    handler: (argv) => {

        fs.readFile("data.json", "utf-8", (err,dataJSON) => {
            if(err) console.log(err);
            else {
                const notes = JSON.parse(dataJSON);
                
                const note = notes.find(note => note.id === argv.id)
                    {
                        console.log(chalk.inverse.green(`Voici la note ${argv.id}`))
                        console.log(note);
                        
                    }
            
                }

                
                  
            })
        
    }
        

        
        
        
    
        
}).argv;