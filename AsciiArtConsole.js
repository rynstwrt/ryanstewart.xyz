/*
    Author: Ryan Stewart
    Started: 03 March 2021
    For: www.ryanstewart.xyz
*/

class AsciiArtConsole
{
    constructor(files)
    {
        this.files = files;
    }

    printRandom()
    {
        // Get random index of text file to print
        const fileIndex = Math.floor(Math.random() * this.files.length);
        const file = this.files[fileIndex];

        // Set up request to get file
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", () =>
        {
            console.log(xhr.responseText);
        });

        // Start request
        xhr.open("GET", file);
        xhr.send();
    }
}