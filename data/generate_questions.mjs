import * as fs from 'fs'
import fetch from 'node-fetch'
import { compress } from 'compress-json'

const questions_limit = -1;

// Download from URL and return text
async function get_data(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data
}

// Do all analysis like categories and such
function analyze_questions(questions) {
  let categories = {};
  let sources = new Set();
  let difficulties = new Set();

  // Populate the above
  questions.forEach(question => {
    if (categories[question.category] == undefined) categories[question.category] = new Set();

    categories[question.category].add(question.subcategory);
    sources.add(question.source);
    difficulties.add(question.difficulty);
  });

  // Convert categories from sets
  for (var category in categories) {
    categories[category] = Array.from(categories[category]);
  }

  return {
    questions: questions,
    metadata: {
      categories: categories,
      sources: Array.from(sources),
      difficulties: Array.from(difficulties)
    }
  }
}

async function save_questions(name, link, cleaner) {
  const raw_file = `./data/questions_${name}_raw.json`

  // If data file exists, read it and load it. Otherwise, download it
  let data = undefined;
  if (fs.existsSync(raw_file)) data = JSON.parse(fs.readFileSync(raw_file))
  else {
    data = (await get_data(link)).questions
    fs.writeFileSync(raw_file, JSON.stringify(data))
  }

  // Clean up data
  data = data.map(cleaner)
  if (questions_limit > 0) data = data.slice(0, questions_limit);
  let { questions, metadata } = analyze_questions(data)

  // Save data
  fs.writeFileSync(`./public/questions_${name}.json`, JSON.stringify(compress(questions)))
  fs.writeFileSync(`./src/assets/questions_${name}_metadata.json`, JSON.stringify(metadata))
  console.log(`Saved ${questions.length} ${name} questions`)
}

// Save Science Bowl questions
await save_questions("sciencebowl", "https://scibowldb.com/api/questions", (it, index) => {
  delete it["api_url"]
  delete it["search_vector"]
  delete it["uri"]
  it.source = it.source.split("-")[0]
  it.id = "SCI-" + index
  return it
})


// Save Quiz Bowl questions
await save_questions("quizbowl", "https://s3-us-west-2.amazonaws.com/pinafore-us-west-2/qanta-jmlr-datasets/qanta.unmapped.2018.04.18.json", (it, index) => {
  delete it["page"]
  delete it["proto_id"]
  delete it["qdb_id"]

  it.source = it.dataset
  delete it["dataset"]

  delete it["qanta_id"]
  it.id = "QB-" +  index

  if (!it.subcategory) it.subcategory = "Uncategorized"

  return it
})
