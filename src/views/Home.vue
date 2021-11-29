<template>
  <div class="home">
    <Products :key="key" :products="products" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import DBResponse from "@/interfaces/DBResponse";
import Products from "@/components/Products.vue";

export default defineComponent({
  name: "Home",
  components: {
    Products,
  },
  data() {
    return {
      key: 0,
      products: [] as DBResponse[],
    };
  },
  methods: {
    forceRerender() {
      this.key += 1;
    },
    async getProductData() {
      const region = process.env.VUE_APP_AWS_REGION as string;
      const clientDynamoDB = new DynamoDBClient({
        region,
        credentials: fromCognitoIdentityPool({
          identityPoolId: process.env.VUE_APP_IDENTITY_POOL_ID as string,
          accountId: process.env.VUE_APP_AWS_ACCOUNT_ID,
          clientConfig: { region },
        }),
      });
      const query_input = {
        TableName: process.env.VUE_APP_TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "SK = :sort_key and DK1 = :data_key",
        ExpressionAttributeValues: {
          ":sort_key": { S: "PRODUCT#BLEND" },
          ":data_key": { S: "listed" },
        },
        Select: "ALL_ATTRIBUTES",
      };
      const command = new QueryCommand(query_input);
      try {
        const results = await clientDynamoDB.send(command);
        const items = results.Items;
        const cloudfrontHost = process.env.VUE_APP_CLOUDFRONT_HOST as string;
        if (items) {
          for (const key in items) {
            const item = items[key];
            this.products.push({
              id: item.PK.S?.split("PRODUCT#")[1],
              name: item.Name.S,
              src: cloudfrontHost.concat(
                "/products/assets/",
                item.PK.S?.split("PRODUCT#")[1] as string,
                ".png"
              ),
              href: "localhost:8080/about",
              description: item.Description.S,
              price: item.Price.S,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
      console.log(this.products);
      this.forceRerender();
    },
  },
  created() {
    this.getProductData();
  },
});
</script>
