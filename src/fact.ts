export interface Fact {
  status: {
    verified: boolean;
    sentCount: number;
    feedback?: string; // exists in doc. but not used?
  };
  _id: string;
  _v: number;
  user: string;
  text: string;
  updateAt: string;
  createdAt: string;
  deleted: boolean;
  source: string;
  used: boolean;
}

export default async function fetchFact(
  animalType = "cat",
  length = 1
): Promise<Fact[]> {
  const endpoint = "https://cat-fact.herokuapp.com/facts/random";
  const query = `animal_type=${animalType}&amount=${length}`;
  const url = `${endpoint}?${query}`;

  try {
    const rawResponse = await fetch(url);
    const responseJson = await rawResponse.json();
    if (length === 1) {
      return [responseJson as Fact];
    }
    return responseJson as Fact[];
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.error("Cannot parse as Json.");
    }
    throw e;
  }
}
