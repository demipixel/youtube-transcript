const { YoutubeTranscript } = require('../');
YoutubeTranscript.fetchTranscript({ videoIdOrUrl: process.argv[2] })
  .then(console.log)
  .catch(console.error);
