import { APIGatewayProxyHandler } from "aws-lambda";
import { providers, Contract } from "ethers";

const provider = new providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/382301aaaf3f4060bdefdbd132ae3c8f"
);
const contractAddress = "0x25ec84abe25174650220b83841e0cfb39d8aab87";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  // Supports either the "iframe", "svg" or "metadata" path parameter
  const type = event.pathParameters?.type;
  // extract the tokenId id from the path
  const imageId = event.pathParameters?.tokenId;

  // Fetch the token URI from the contract
  const contract = new Contract(
    contractAddress,
    [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    provider
  );
  const metadataPayload = await contract.tokenURI(imageId);
  const jsonPayload = JSON.parse(
    decodeURIComponent(metadataPayload.split("data:application/json,")[1])
  );
  if (type === "metadata") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPayload),
    };
  } else if (type === "svg") {
    const svgPayload = Buffer.from(
      jsonPayload.image.split("data:image/svg+xml;base64,")[1],
      "base64"
    ).toString("utf8");
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
      body: svgPayload,
    };
  } else if (type === "iframe") {
    const iframePayload = decodeURIComponent(
      jsonPayload.animation_url.split("data:text/html,")[1]
    );
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: iframePayload,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
    }),
  };
};
