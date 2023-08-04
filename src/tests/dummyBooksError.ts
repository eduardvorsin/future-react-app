export default {
  code: 400,
  message: "Invalid value at 'order_by' (type.googleapis.com/books.api.proto.frontend.v1.BooksVolumesListRequest.OrderBy), \"relevnce\"",
  errors: [
    {
      message: "Invalid value at 'order_by' (type.googleapis.com/books.api.proto.frontend.v1.BooksVolumesListRequest.OrderBy), \"relevnce\"",
      reason: 'invalid',
    },
  ],
  status: 'INVALID_ARGUMENT',
  details: [
    {
      '@type': 'type.googleapis.com/google.rpc.BadRequest',
      fieldViolations: [
        {
          field: 'order_by',
          description: "Invalid value at 'order_by' (type.googleapis.com/books.api.proto.frontend.v1.BooksVolumesListRequest.OrderBy), \"relevnce\"",
        },
      ],
    },
  ],
};
