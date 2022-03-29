const handler = (req, res) => {
  if (req.method === "POST") {
    const code = process.env.ACCESS_CODE;

    const suppliedCode = req.body.access_code;

    if (code === suppliedCode) {
      return res.status(200).send();
    } else {
      return res.status(401).send();
    }
  }

  return res.status(404).send();
};

export default handler;
