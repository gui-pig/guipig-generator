export const schema = {
  title: "WorkSpace schema",
  description: "Database schema for WorkSpace",
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true,
    },
    name: {
      type: "string",
    },
  },
  required: ["name"],
};
