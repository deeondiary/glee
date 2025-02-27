export interface TemplateGenerateParam {
    situation: string;
    tone: string;
    usage: string;
    detail: string;
}

export interface TemplateSaveParam {
    suggestion: string;
    tags: Array<string>;
}

export interface MyTemplate {
    id: string;
    suggestion: string;
    created_at: string;
    updated_at: string;
    tags: Array<string>;
}
export type MyTemplateArray = Array<MyTemplate>;