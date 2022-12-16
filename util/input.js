import fs from 'fs';
import axios from 'axios';
import {env} from 'process';
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * Reads the data from the input file into memory as a list of lines
 * 
 * @param {string} year The year of the challenge
 * @param {string} day They day of the challenge
 * @param {string} file (input || example) without file extension
 * @returns an array of lines from the input
 */
export function read( year, day, file="example" )
{
    return fs.readFileSync(`./${year}/${day}/${file}.txt`, 'utf8').toString().trim().split(/\r?\n/);
}

/**
 * Reads the data from the input file into memory as a list of lines
 * 
 * @param {string} dir The directory of the file
 * @param {string} file (input || example) without file extension
 * @returns an array of lines from the input
 */
export function readFromDir( dir, file="example" )
{
    let [day,year] = dir.split('/').reverse();
    return read(year,day,file);
}

/**
 * Downloads the challenge's input. Must have SESSION set in dotenv.
 * 
 * @param {string} year The year of the challenge
 * @param {string} day They day of the challenge
 * @returns The response's data, or '' if failure
 */
export async function download(year, day){
    try {
        if( !env.SESSION ) {
            console.log( "Set SESSION variable in .env");
            return '';
        }
        return (await axios.get( `https://adventofcode.com/${year}/day/${day}/input`, {
                headers:{
                    Cookie:`session=${env.SESSION}`
                },
                withCredentials: true
            }
        )).data;
    }
    catch( ex )
    {
        console.log( `Error: ${ex}`)
        return '';
    }
}