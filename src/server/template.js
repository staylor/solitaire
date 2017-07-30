import Helmet from 'react-helmet';

export default ({
  root,
  css,
  ids,
  preloadedState,
  manifestJSBundle,
  vendorJSBundle,
  mainJSBundle,
}) => {
  const helmet = Helmet.rewind();

  return `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
<meta charset="utf-8" />
${helmet.title.toString()}
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
<style>${css}</style>
${helmet.meta.toString()}${helmet.link.toString()}${helmet.script.toString()}
</head>
<body>
<script>window._glam = ${JSON.stringify(ids)}</script>
<script>
  // WARNING: See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
</script>
<div id="main">${root}</div>
${manifestJSBundle ? `<script defer src="${manifestJSBundle}"></script>` : ''}
${vendorJSBundle ? `<script defer src="${vendorJSBundle}"></script>` : ''}
${mainJSBundle ? `<script defer src="${mainJSBundle}"></script>` : ''}
</body>
</html>`;
};
