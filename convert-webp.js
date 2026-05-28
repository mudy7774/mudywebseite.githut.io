const Jimp = require('jimp');

const files = ['my1.jpeg', 'my2.jpeg', 'mudy1.jpeg'];

Promise.all(
  files.map(async (file) => {
    const image = await Jimp.read(file);
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
    await image.quality(82).writeAsync(out);
    console.log(`created ${out}`);
  })
)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
