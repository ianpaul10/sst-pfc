import { Table } from "@serverless-stack/resources";

export function StorageStack({ stack, app }) {
    // Create the DynamoDB table
    const table = new Table(stack, "pfc-table", {
        fields: {
            pk: "string",
            sk: "string",
        },
        primaryIndex: { partitionKey: "pk", sortKey: "sk" },
    });

    return {
        table,
    };
}