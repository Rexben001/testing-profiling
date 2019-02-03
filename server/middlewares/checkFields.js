
class CheckFields {
  static checkIfBodyIsEmpty(req, res, nect) {
    if (!party_id || !name || !hqAddress || !logoUrl) {
      req.redFlag = true;
      return res.status(400).json({
        status: 400,
        error: 'Make sure you enter the fields correctly'
      });
      next();
    }
  }
}

export default CheckFields;
