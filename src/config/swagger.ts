import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition : {
        openapi: '3.0.4',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            },
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for Products'
        },
    },
    apis: ['../**/*.ts'] //src/router.ts se cambio para visualizar el schema de swagger
}



const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://logos-world.net/wp-content/uploads/2023/05/Blockbuster-Symbol.png');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #0E3CA5
        }
    `,
    customSiteTitle : 'Documentacion REST API Express / Typescript',
}


export default swaggerSpec
export {
    swaggerUiOptions
}