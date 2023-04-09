const fs = require("fs");
// Script to create a new component
// Usage: node CreateComponent.js <componentName>
// Creates directory with component name and creates componentName.tsx, index.tsx, and styles.tsx files
const pascalCase = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const componentTemplate = (name) => `import React from 'react'
import { View, Text } from 'react-native'
import styles from './${name}.style'

export default function ${name}() {
  return (
    <View style={styles.container}>
      <Text>${name}</Text>
    </View>
  );
}`;
const stylesTemplate = (name) => `import { StyleSheet } from 'react-native'

const ${name}Styles = StyleSheet.create({})

export default ${name}Styles
`;

const files = (name) => [
  {
    name: `${name}.tsx`,
    content: componentTemplate(name),
  },
  {
    name: `${name}.style.ts`,
    content: stylesTemplate(name),
  },
  {
    name: "index.ts",
    content: `export { default } from './${name}'`,
  },
];

(function main() {
  const componentName = process.argv[2] || "component";
  const path = process.argv[3] || "components";

  const pascalCaseName = pascalCase(componentName);
  const componentPath = `${path}/${pascalCaseName}`;

  console.log(`Creating ${pascalCaseName} component in ${componentPath}`);

  // print current directory
  console.log(`Current directory: ${process.cwd()}`);

  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath);
  }

  files(pascalCaseName).forEach((file) => {
    const filePath = `${componentPath}/${file.name}`;
    console.log(`Creating ${filePath}`);
    const fileContent = file.content;
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
      console.log(`${filePath} created`);
    });
  });
})();
