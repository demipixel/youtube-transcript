import * as Axios from 'axios';
export declare class YoutubeTranscriptError extends Error {
    constructor(message: any);
}
export interface TranscriptConfig {
    lang?: string;
    country?: string;
    AxiosClient?: Axios.AxiosInstance;
}
export interface TranscriptResponse {
    text: string;
    duration: number;
    offset: number;
}
/**
 * Class to retrieve transcript if exist
 */
export declare class YoutubeTranscript {
    /**
     * Fetch transcript from YTB Video
     * @param input Video id, url, or the video page body
     * @param config Get transcript in another country and language ISO
     */
    static fetchTranscript(input: {
        videoIdOrUrl: string;
    } | {
        videoPageBody: string;
    }, config?: TranscriptConfig): Promise<TranscriptResponse[]>;
    /**
     * Generate tracking params for YTB API
     * @param page
     * @param config
     */
    private static generateRequest;
    /**
     *  'base.js' function
     */
    private static generateNonce;
    /**
     * Retrieve video id from url or string
     * @param videoId video url or video id
     */
    private static retrieveVideoId;
}
