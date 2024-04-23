import { YoutubeTranscript } from '../dist/youtube-transcript.js';

(async () => {
    console.log(await YoutubeTranscript.fetchTranscript({ videoIdOrUrl: process.argv[2] }));
})();