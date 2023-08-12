let successResponse = (res, statusCode, message, result) => {
    res.status(statusCode).json({
      success: true,
      message,
      result,
    });
  };
  
  export default successResponse;