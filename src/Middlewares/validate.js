
export const validate = (schema) => (req, res, next) => {
    try {
      req.validated = schema.parse(req.body);

      next();
    } catch (err) {
      return res.status(400).json({
        status: 400,
        message: "Validation failed",
        errors: err.errors,
      });
    }
  };
  