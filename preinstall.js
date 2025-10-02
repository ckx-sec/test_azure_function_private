const { execSync } = require('child_process');
const script = `
    echo "2222";
`
console.log(execSync(script).toString())
