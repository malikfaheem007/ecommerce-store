import {defineField, defineType} from "sanity";
import {TrolleyIcon} from "@sanity/icons";
export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{type: "brand"}],
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          {title: "New", value: "new"},
          {title: "Hot", value: "hot"},
          {title: "Sale", value: "sale"},
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          {title: "Gadget", value: "gadget"},
          {title: "Appliance", value: "appliance"},
          {title: "Refrigerator", value: "refrigerator"},
          {title: "Others", value: "others"},
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      description: "Toggle to Featured on or off",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
    },
    prepare(selection) {
      const {title, media, subtitle} = selection;
      return {
        title: title,
        subtitle: `$${subtitle}`,
        media: media,
      };
    },
  },
});
