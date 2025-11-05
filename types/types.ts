export interface Article {
    attributes: {
        body: {
            format: string
            value: string
        }
        changed: string
        created: string
        langcode: string
        revision_timestamp: string
        title: string
        type: string
    }
    id: string
}