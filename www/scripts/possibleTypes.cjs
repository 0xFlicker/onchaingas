
const fs = require('fs');
const possibleTypes = require("../src/graphql/graphql.schema.json")

possibleTypes.__schema.types.forEach(supertype => {
  if (supertype.possibleTypes) {
    possibleTypes[supertype.name] =
      supertype.possibleTypes.map(subtype => subtype.name);
  }
});

fs.writeFile('./src/graphql/possibleTypes.json', JSON.stringify(possibleTypes), err => {
  if (err) {
    console.error('Error writing possibleTypes.json', err);
  } else {
    console.log('Fragment types successfully extracted!');
  }
});
