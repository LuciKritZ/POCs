import { HTTP_STATUS_CODE } from '../constants/http-status.constant.js';

const devErrorHandler = (controller) => {
  return async (req, res) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.error(error);
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong! Please try again later.',
      });
    }
  };
};

export default devErrorHandler;
