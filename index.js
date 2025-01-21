import fs from 'fs';
import inquirer from 'inquirer';
const questions = [
  {
    type: 'input',
    name: 'title',
    message: "What is the title of your project?",
  },
  {
    type: 'input',
    name: 'description',
    message: "Provide a short description of your project:",
  },
  {
    type: 'input',
    name: 'installation',
    message: "What are the installation instructions?",
  },
  {
    type: 'input',
    name: 'usage',
    message: "Provide usage information:",
  },
  {
    type: 'input',
    name: 'contributing',
    message: "What are the contribution guidelines?",
  },
  {
    type: 'input',
    name: 'tests',
    message: "What are the test instructions?",
  },
  {
    type: 'list',
    name: 'license',
    message: "Choose a license for your project:",
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
  },
  {
    type: 'input',
    name: 'github',
    message: "What is your GitHub username?",
  },
  {
    type: 'input',
    name: 'email',
    message: "What is your email address?",
  },
];

const generateREADME = (data) => {
  const licenseBadge = data.license !== 'None' ? `![License](https://img.shields.io/badge/license-${data.license.replace(' ', '%20')}-blue)` : '';
  const licenseSection = data.license !== 'None' ? `## License\n\nThis project is licensed under the ${data.license} license.` : '';

  return `
# ${data.title}
${licenseBadge}

## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

${licenseSection}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

If you have any questions, you can reach me at [${data.email}](mailto:${data.email}).  
You can also find more of my work on GitHub: [${data.github}](https://github.com/${data.github}).
`;
};

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log('README.md has been generated!')
  );
};

const init = () => {
  inquirer.prompt(questions).then((answers) => {
    const readmeContent = generateREADME(answers);
    writeToFile('README.md', readmeContent);
  });
};

init();
