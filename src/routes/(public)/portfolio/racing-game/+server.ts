import html from './index.html?raw';
import script from './game.js?raw';
import css from './style.css?raw';

export function GET() {
  return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lightning McQueen Racing Game - 6 Car Championship</title>
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${script}</script>
</body>
</html>
    `, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
