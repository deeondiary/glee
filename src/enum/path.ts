export const PATH: {[key: string]: string} = {
    analyze_view_results: '/suggestion/analyze/results', // 슬라이더
    analyze_select_result: '/suggestion/analyze/select',

    image_upload: '/suggestion/image/upload',
    image_detail: '/suggestion/image/detail',
    image_analysis_result: '/suggestion/image/analysis',

    option_situation: '/suggestion/option/situation',
    option_tone: '/suggestion/option/tone',
    option_usage: '/suggestion/option/usage',
    option_detail: '/suggestion/option/detail',

    template_search: '/template/search',
} as const;

export const PATH_NO_HEADERS : Array<string> = [
    '/suggestion/analyze/select',
    '/suggestion/analyze/results',
    '/suggestion/analyze/loading'
] as const;