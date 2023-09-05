import {defineField, defineType} from 'sanity'
export const subCategory = defineType(
{
    name:"subCategory",
        title:"Prodcut Sub Category",
        type:"document",
        fields:[
            
        defineField(    {
                name:"name",
                title:"Sub Category Name",
                type:"string",
            }),
        ]
    }

)