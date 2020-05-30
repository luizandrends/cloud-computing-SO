import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(400).json({ err: 'Users dosen`t exist' });
    }

    const passwordValidate = await compare(password, user.password);

    if (!passwordValidate) {
      return response.status(400).json({ err: 'Invalid mail or password' });
    }

    const { id, name } = user;

    const createToken = sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: createToken,
    });
  }
}

export default new SessionController();
