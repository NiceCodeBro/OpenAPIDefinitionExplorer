//import SwaggerParser from "@apidevtools/swagger-parser";
const SwaggerParser = require('@apidevtools/swagger-parser');

exports.openApiSpecParser = function(apiFileName) {
//export function openApiSpecParser(apiFileName) {
    const validEndPoints = [];
  
    const parser = new SwaggerParser();
  
    return parser.dereference(apiFileName).then((api) => {
      for (const [key, value] of Object.entries(api.paths)) {
        //key: /random-string -  value: {get : {...}}
        for (const [key2, value2] of Object.entries(value)) {
          // key2: get - value2: summary -  value2: responses
          for (const [key3, value3] of Object.entries(value2['responses'])) {
            // key3: 200 (error code) - value3.description - value3.content
            // if we can reach this point, content is valid, we can save it into our array
            if (
              value3['content'] &&
              value3['content']['application/json'] &&
              key3 &&
              value3['content']['application/json'].schema
            ) {
              const endpoint = { name: key.substring(1) };
              endpoint['type'] = 'endpoint';
              endpoint['properties'] =
                value3['content']['application/json'].schema.properties;
              validEndPoints.push(endpoint);
            }
          }
        }
      }
      return validEndPoints;
    });
  }
  