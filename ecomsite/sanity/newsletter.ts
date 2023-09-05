import { defineField } from "sanity";

export default {
    name: 'newsletter',
    type: 'document',
    title: 'News Letter',
    fields: [
     
        {
            title: 'News Letter Backdrop Text',
            name: 'backdropText',
            type: 'string'
          },
       
        {
            name: "subHdeading",
            title: "Sub Heading",
            type: "string"
        },
        {
            name: "text",
            title: "News Letter Text",
            type: "string"
        },

    ]
}