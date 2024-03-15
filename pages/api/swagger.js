// pages/api/swagger.js
import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';

export default function handler(req, res) {
    const swaggerPath = path.join(process.cwd(), 'pages/api/swagger.yaml');
    const swaggerFile = fs.readFileSync(swaggerPath, 'utf8');
    const swaggerData = YAML.load(swaggerFile);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(swaggerData);
}
