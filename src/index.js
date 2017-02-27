const bb = require('./lib/birdbrain.js');
const fs = require('fs');

const toFileName = str => str.replace(/\W+/g, '-').toLowerCase();

// replace en-XX with other localization to start a fresh file from BB
bb.avianSpecies.forEach( species => {
    const fileName = './data/en-CA/' + toFileName(species.sN) + '.json';
    const json = {
        commonName: species.cN,
        classification: {
            kingdom: 'Animalia',
            phylum: 'Chordata',
            clade: 'Ornithurae',
            class: 'Aves'
        },
        scientificName: species.sN,
        nonSpeciesTaxon: species.nT || false,
        codes: {
            spec: species.c4,
            spec6: species.c6,
            conflicts: {
                spec: species.c4x || false,
                spec6: species.c6x || false
            }
        }
    };

    fs.writeFile(fileName, JSON.stringify(json, null, 4), err => {
        if (err) {
            return console.log(err);
        }

        console.log("Added file: " + fileName);
    });
});