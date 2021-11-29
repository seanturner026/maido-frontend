import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import Home from "../views/Home.vue";

// async function listProducts(to, from, next): {
//   interface DBResponse {
//     id: string | undefined;
//     name: string | undefined;
//     src: string | undefined;
//     alt: string;
//     description: string | undefined;
//     price: string | undefined;
//   }

//   const response: DBResponse[] = [];
//   const region = "us-east-1";
//   const client_dynamodb = new DynamoDBClient({
//     region,
//     credentials: fromCognitoIdentityPool({
//       identityPoolId: "us-east-1:9b5fa543-a10e-47cb-a6cd-873d373408b6",
//       accountId: "744000309083",
//       clientConfig: { region },
//     }),
//   });
//   const query_input = {
//     TableName: "maido_table",
//     IndexName: "GSI1",
//     KeyConditionExpression: "SK = :sort_key and DK1 = :data_key",
//     ExpressionAttributeValues: {
//       ":sort_key": { S: "PRODUCT#BLEND" },
//       ":data_key": { S: "listed" },
//     },
//     Select: "ALL_ATTRIBUTES",
//   };
//   const command = new QueryCommand(query_input);
//   try {
//     const results = await client_dynamodb.send(command);
//     const items = results.Items;
//     if (items) {
//       for (const key in items) {
//         const item = items[key];
//         response.push({
//           id: item.PK.S?.split("PRODUCT#")[1],
//           name: item.Name.S,
//           src: "https://d2u9u35mbza7qo.cloudfront.net/products/assets/".concat(
//             item.PK.S?.split("PRODUCT#")[1] as string,
//             ".png"
//           ),
//           alt: "hihi",
//           description: item.Description.S,
//           price: item.Price.S,
//         });
//       }
//       for (const key in items) {
//         const item = items[key];
//         response.push({
//           id: item.PK.S?.split("PRODUCT#")[1],
//           name: item.Name.S,
//           src: "https://d2u9u35mbza7qo.cloudfront.net/products/assets/".concat(
//             item.PK.S?.split("PRODUCT#")[1] as string,
//             ".png"
//           ),
//           alt: "hihi",
//           description: item.Description.S,
//           price: item.Price.S,
//         });
//       }
//     }
//   } catch (err) {
//     console.error(err);
//     next("/");
//   }
//   console.log(response);
//   next("/");
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // props: true,
    // beforeEnter: listProducts,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
