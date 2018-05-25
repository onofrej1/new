const user = {
    title: "Users",
    form: [
        { name: "name", type: "text" },
        { name: "email", type: "text" },
        {
            name: "roles",
            type: "pivotRelation",
            resourceTable: "role",
            show: "title",
            label: "Roles"
        }
    ],
    list: [{ field: "name", label: "Name" }, { field: "email", label: "Email" }]
};

const article = {
    title: "Articles",
    form: [
        { name: "title", type: "text" },
        { name: "author", type: "text" },
        { name: "content", type: "textarea" },
        {
            name: "tags",
            type: "pivotRelation",
            resourceTable: "tag",
            show: "title",
            label: "Tags"
        }
    ],
    list: [{ field: "title" }, { field: "author" }]
};

const menuItem = {
    title: "Menu items",
    form: [
        { label: "Title", name: "title", type: "text" },
        {
            label: "Menu",
            name: "menu_id",
            type: "relation",
            resourceTable: "menu",
            show: "title"
        },
        {
            label: "Page",
            name: "page_id",
            type: "relation",
            resourceTable: "page",
            show: "title"
        },
        {
            label: "Parent",
            name: "parent_id",
            type: "relation",
            resourceTable: "menuItem",
            show: "title"
        }
    ],
    list: [
        { field: "title", label: "Title" },
        { label: "Parent", render: params => params.row.parent.title },
        { label: "Page", render: params => params.row.page.title }
    ]
};

const page = {
    title: "Pages",
    form: [
        { label: "Title", name: "title", type: "text" },
        { type: "editor", label: "Body", name: "body" }
    ],
    list: [{
        field: "title",
        label: "Title",
        renderHtml: (h, params) => {
            return h("span", `${params.row.title}`);
        }
    }]
};

const hamburg = {
    title: "Pages",
    form: [
        { label: "Title", name: "title", type: "text" },
        { label: "Date", name: "event_date", type: "datepicker" },
        { label: "Notes", type: "textarea", rows: 8, name: "notes" }
    ],
    list: [
        { field: "title", label: "Title" },
        { label: "Event date", render: params => `${params.row.event_date}` },
        { field: "notes", label: "Notes" }
    ]
};

const tag = {
    title: "Tags",
    form: [{ label: "title", name: "title", type: "text" }],
    list: [{ field: "title", label: "Title" }]
};

const models = { user, page, tag, article, menuItem, hamburg };

export default models;