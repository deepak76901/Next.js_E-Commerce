export function ApiResponse (success,message,status){
    return Response({
        success: success || false,
        message : message || "Internal Server Error"
    },{
        status: status || 500
    })
}