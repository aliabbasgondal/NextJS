import {defineField, defineType} from 'sanity'
export const pcolor = defineType(
    {
        name:"color",
        title:"Prodcut color",
        type:"document",
        fields:[
        defineField(    {
                name:"name",
                title:"Color",
                type:"string",
               
            }),
        ]

    }
)