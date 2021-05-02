import { parse } from "https://deno.land/std@0.95.0/flags/mod.ts";
import fetchFact from "./fact.ts";

const VERSION = "0.1.0";

function showHelp() {
  console.log(`forchure shows trivia about cat like fortune command.

Usage:
  forchure [-a animal] [--help] [--version]
`);
}

const args = parse(Deno.args, {
  alias: {
    a: "animal",
  },
  default: {
    animal: "cat",
  },
});

if (args.help) {
  showHelp();
}

if (args.version) {
  console.log(`forchure version ${VERSION}`);
}

try {
  const animal = args.animal;
  const facts = await fetchFact(animal);
  facts.forEach((fact) => {
    console.log(fact.text);
  });
} catch (e) {
  console.error(e);
}
