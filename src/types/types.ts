export interface DrupalArticleObject {
    data: Article[]
    links: {
        self: {
            href: string
        }
    }
    jsonapi: {
        version: string
        meta: {
            links: {
                self: {
                    href: string
                }
            }
        }
    }
}

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