import esbuild from 'esbuild';
import fs from 'fs';

esbuild.build({
  entryPoints: ['web/gas.js'],
  minify: true,
  outfile: 'dist/gas-min.js',
}).then(() => {
  const jsFile = fs.readFileSync('dist/gas-min.js', 'utf8');

  const htmlFile = `<style>
  * {
    margin: 0;
    padding: 0;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  ${jsFile}
</script>`
  fs.writeFileSync('dist/index.urlhtml', encodeURIComponent(encodeURIComponent(htmlFile)));


  const svgContent = fs.readFileSync('web/gas.svg', 'utf8');
  // save w/ base64 encoded svg
  fs.writeFileSync('dist/index.urlsvg', Buffer.from(svgContent).toString('base64'));
  console.log('Done!');
})
