import {defineField, defineType} from 'sanity'
export const socialIcons = defineType(
    {
        name:"SocialIcons",
        title:"Social Media Icons",
        type:"document",
        fields:[
        defineField(    {
                name:"name",
                title:"Name of Social Media",
                type:"string",
            }),
            defineField(    {
                name:"link",
                title:"link of Social Media",
                type:"string",
            }),
        ]

    }
)