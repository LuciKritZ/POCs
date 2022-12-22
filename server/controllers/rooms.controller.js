export const createRoom = async (req, res) => {
  // Testing resource access
  res.status(201).json({
    success: true,
    result: {
      id: 123,
      title: 'Testing rooms',
    },
  });
};
