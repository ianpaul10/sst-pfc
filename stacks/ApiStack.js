import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
    const { table } = use(StorageStack);

    // Create the API
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName,
                },
            },
        },
        routes: {
            "GET /recipes": "functions/list.main",
            "GET /recipes/{id}": "functions/get.main",
            "PUT /recipes/{id}": "functions/update.main",
            "DELETE /recipes/{id}": "functions/delete.main",
            "POST /recipes": "functions/create.main",
            "GET /": "functions/lambda.handler",
        },
    });

    // Show the API endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    // Return the API resource
    return {
        api,
    };
}