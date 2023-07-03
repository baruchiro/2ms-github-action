const core = require("@actions/core");
const path = require("path");
const { cwd } = require("process");
const resultsPath = path.resolve(cwd(), process.argv[2]);
const results = require(resultsPath);

const parseSource = (source) => {
  const [commitHash, filePath] = source.split(" ")[2].split(":");
  return {
    commitHash,
    filePath,
  };
};

function extractAnnotations() {
  return Object.values(results.results)
    .flat()
    .map((result) => {
      const { filePath } = parseSource(result.source);
      return {
        description: result.ruleId,
        file: filePath,
        startLine: result.startLine,
        endLine: result.endLine,
        startColumn: result.startColumn,
        endColumn: result.endColumn,
      };
    });
}

const annotations = extractAnnotations(results);
annotations.forEach((annotation) => {
  console.warn(`::warning title=Secret found%3A ${annotation.description},file=${annotation.file},line=${annotation.startLine},endLine=${annotation.endLine},col=${annotation.startColumn},endColumn=${annotation.endColumn}::${annotation.description}`);
});
