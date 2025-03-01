export interface TemplateGenerateParam {
    situation: string;
    tone: string;
    usage: string;
    detail: string;
}

export interface TemplateSaveParam {
    title: string;
    suggestion: string;
    tags: Array<string> | [];
}

export interface TemplateWriteParam {
    title: string;
    suggestion: string;
    tags: Array<string>;
}

export interface SuggestionType {
    title: string;
    content: string;
}
export type SuggestionTypeArr = Array<SuggestionType>;

export interface TemplateHistory {
    suggestions: SuggestionTypeArr;
    created_at: string;
    updated_at: string;
}
export type TemplateHistoryArray = Array<TemplateHistory>;

export interface TemplateDetailType {
    id: string;
    title?: string;
    suggestion: string;
    created_at: string;
    updated_at: string;
    tags: Array<string>;
}
export type TemplateDetailTypeArray = Array<TemplateDetailType>;