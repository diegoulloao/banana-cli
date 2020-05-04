/**
 * 
 *  Banana Client
 *  v.1.0.2
 *  @diegoulloao
 * 
 *  2020 · Apache Licence 2.0
 * 
 */

import arg from 'arg'
import shell from 'shelljs'
import chalk from 'chalk'

function parseArgumentsIntoOptions( rawArgs ) {
    const args = arg(
        {
            '--git': Boolean,
            '-g': '--git'
        },
        {
            argv: rawArgs.slice(2)
        }
    )

    return {
        git: args['--git'] || false,
        action: args._[0],
        project: args._[1]
    }
}

async function createBananaProject( options ) {
    if ( options.action ) {
        switch ( options.action ) {
            case 'new':
                if ( options.project ) {
                    const clone = await shell.exec( `git clone https://github.com/diegoulloao/bananasplit-express-template.git ${options.project}` )

                    if ( clone.code === 0 ) {
                        await shell.rm([ `${options.project}/README.md`, `${options.project}/LICENSE` ])
                        await shell.rm( '-rf', `${options.project}/.git` )

                        if ( options.git ) {
                            await shell.exec( `cd ${options.project} && git init` )
                        }

                        console.log( chalk.bgYellow.black(`${options.project} created!`) )
                    } else {
                        console.log( chalk.bgYellow.black('Project not created.') )
                        break
                    }
                } else
                    console.log( chalk.bgWhite.black('Need specify a project name.') )

                break
            
            default:
                console.log( chalk.bgWhite.black(`Action "${options.action}" not valid.`) )
        }
    } else {
        console.log( chalk.bgWhite.black('Action required.') )
    }
}

export function cli( args ) {
    let options = parseArgumentsIntoOptions( args )
    createBananaProject( options )
}
