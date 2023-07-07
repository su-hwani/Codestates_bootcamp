const status_format = {
    200: "OK",
    201: "Created AD",
    400: "Bad Requested",
    403: "Forbidden",
    404: "Not Found AD"
}

export function json_format(status, data){   
    const result = {status: status, statusText: status_format[status], data: data}
    return result
}