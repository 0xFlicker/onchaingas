export interface IAttributeString {
  value: string;
  trait_type: string;
  colors?: string[];
}

export interface IAttributeNumeric {
  value: number;
  trait_type: string;
  display_type?: "number" | "boost_number" | "boost_percentage";
}

export type IMetadataAttribute = IAttributeString | IAttributeNumeric;

export interface IMetadata {
  image: string;
  description?: string;
  tokenId?: string;
  external_url?: string;
  animation_url?: string;
  name: string;
  attributes?: IMetadataAttribute[];
  properties?: Record<string, string>;
  edition?: string | number;
  id?: string | number;
}

export const defaultDescription = `Fame Lady Society is the wrapped token for the first ever generative all-female avatar collection on the Ethereum blockchain. Yes, we are THE community who took over a project TWICE to write our own story. This is NFT history. This is HERstory. FLS are 8888 distinctive Ladies made up of millions of fierce trait combinations. Community = Everything. Commercial IP rights of each Lady NFT belong to its owner.`;

export function thumbnailImageUrl(tokenId: string | number) {
  return `https://fls-prod-imagestoragef1b24905-1ftqhtk2cy7nl.s3.amazonaws.com/thumb/${tokenId}.png`;
}

export function imageUrl(tokenId: string | number) {
  return `https://ipfs.fameladysociety.com/bafybeifrehxmpmvh4hiywtpmuuuvt4lotol7wl7dnxlsxikfevn2ivvm7m/${tokenId}.png`;
}
