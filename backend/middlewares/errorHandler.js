const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    error: {
      message: error.message
    }
  }) 
}

export default errorHandler;
