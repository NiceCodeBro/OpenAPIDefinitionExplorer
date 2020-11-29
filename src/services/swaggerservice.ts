import SwaggerParser from "@apidevtools/swagger-parser";

export function openApiSpecParser(apiFileName:string): Array<any> {
    var validEndPoints = [];

     const parser = new SwaggerParser();
     
     parser.dereference(apiFileName).then((api)=> {
       for (let [key, value] of Object.entries(api.paths)) {
           //key: /random-string -  value: {get : {...}}
           for (let [key2, value2] of Object.entries(value)) {
               // key2: get - value2: summary -  value2: responses
               for (let [key3, value3] of Object.entries(value2['responses'])) {
                   // key3: 200 (error code) - value3.description - value3.content
                   // if we can reach this point, content is valid, we can save it into our array
                   if (value3['content'] && value3['content']['application/json'] && 
                       key3 && value3['content']['application/json'].schema) { 
                         
                       var tempObj = { name: key.substring(1)}
                       tempObj['type']='endpoint';
                       tempObj['properties'] = value3['content']['application/json'].schema.properties;
                       validEndPoints.push(tempObj);
                   }
               }
           }
       }
     });
     return validEndPoints;
   }