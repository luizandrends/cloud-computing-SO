import { compare } from 'bcryptjs';

import User from '../models/User';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const findUser = await User.findOne({
      where: { email },
    });

    const passwordValidate = await compare(password, findUser.password);

    if (!passwordValidate) {
      return response.json({ err: 'Invalid mail or password' });
    }

    return response.json(passwordValidate);
  }
}

export default new SessionController();
