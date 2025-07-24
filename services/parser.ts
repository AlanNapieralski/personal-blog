import * as cheerio from 'cheerio';

interface ParsedElement {
    type: 'paragraph' | 'link' | 'image' | 'heading' | 'list' | 'blockquote' | 'code';
    content: string;
    href?: string;
    src?: string;
    alt?: string;
    level?: number; // for headings (h1, h2, etc)
    items?: string[]; // for lists
    order: number;
    links?: { text: string; href: string }[];
    codes?: { text: string }[];
}

export function parseArticleBody(htmlContent: string): ParsedElement[] {
    const $ = cheerio.load(htmlContent);
    const parsedElements: ParsedElement[] = [];
    let order = 0;

    // Walk through the HTML in order
    $('body > *').each((_, element) => {
        const el = $(element);
        
        switch(element.tagName.toLowerCase()) {
            case 'p':
                const links = el.find('a');
                const codes = el.find('code');

                const linkData = links.map((i, link) => {
                    const $link = $(link);
                    return {
                        text: $link.text(),
                        href: $link.attr('href') || '' 
                    };
                }).get();

                const codeData = codes.map((i, code) => {
                    const $code = $(code);
                    return {
                        text: $code.text()
                    };
                }).get();

                parsedElements.push({
                    type: 'paragraph',
                    content: el.text(),
                    links: linkData,
                    codes: codeData,
                    order: order++
                });
                break;
                
            case 'a':
                parsedElements.push({
                    type: 'link',
                    content: el.text(),
                    href: el.attr('href'),
                    order: order++
                });
                break;
                
            case 'img':
                parsedElements.push({
                    type: 'image',
                    content: '',
                    src: el.attr('src'),
                    alt: el.attr('alt'),
                    order: order++
                });
                break;

            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                parsedElements.push({
                    type: 'heading',
                    content: el.text(),
                    level: parseInt(element.tagName[1]),
                    order: order++
                });
                break;

            case 'ul':
            case 'ol':
                parsedElements.push({
                    type: 'list',
                    content: '',
                    items: el.find('li').map((_, li) => $(li).text()).get(),
                    order: order++
                });
                break;
            case 'blockquote':
                parsedElements.push({
                    type: 'blockquote',
                    content: el.text(),
                    order: order++
                });
                break;
            case 'code':
                parsedElements.push({
                    type: 'code',
                    content: el.text(),
                    order: order++
                });
                break;
        }
    });

    return parsedElements;
}